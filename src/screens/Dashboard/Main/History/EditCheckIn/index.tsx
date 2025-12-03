import Clipboard from '@react-native-clipboard/clipboard';
import React, { useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';
import { Easing, useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { useShallow } from 'zustand/react/shallow';

import MineCart from '#assets/icons/mine-cart.svg';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';
import { useManagementStore } from '#stores/management';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import InAppNotifications from '#common/InAppNotifications';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { HistoryTabStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';

import { DTInfo } from './components/DTInfo';
import { Pagination } from './components/Pagination';
import { ProduceDetailsOption } from './components/ProduceDetailsOption';
import { EditCheckInSchema, Schema } from './schema';
import { generateData } from './utils';
import type { DashboardProduce } from '#types/global';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function EditCheckIn(props: HistoryTabStackRouteProps<'EditCheckIn'>) {
  const { movement, coolingUnitId } = props.route.params;

  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { user } = useAuthStore();
  const { refreshData } = useDashboardStore();
  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));

  const progress = useSharedValue<number>(0);

  const { data: farmers, isLoading: loadingFarmers } = useApiCall(
    'getOperatorFarmers',
    ColdtivateService.getOperatorFarmers,
    {
      operator: user?.id as number,
    },
    {
      skip: !user?.id,
      defaultData: [],
    }
  );

  const { data: produces, isLoading: loadingProduces } = useApiCall(
    'getDashboardProduces',
    ColdtivateService.getDashboardProduces,
    {
      coolingUnit: coolingUnitId as number,
    },
    {
      skip: !user?.id || !coolingUnitId,
      defaultData: [],
    }
  );

  const { data: crops } = useApiCall('getAllCrops', ColdtivateService.getAllCrops, undefined, {
    skip: !user?.id,
    defaultData: [],
  });

  const farmer = useMemo(() => {
    return farmers?.find(
      (farmer) => `${farmer.user.firstName} ${farmer.user.lastName}` === movement.checkin?.ownerName
    );
  }, [farmers]);

  const locale = LanguageManager.read();

  const matchingProduces = useMemo(() => {
    if (!produces) return [];

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    const datums: Array<DashboardProduce> = [];

    for (const produce of produces) {
      if (produce.movementCode !== movement.code) continue;
      datums.push({
        ...produce,
        cropName: find(translationMap, {
          name: produce.cropName,
          country: companyCountry,
          locale,
        }),
      });
    }

    return datums;
  }, [produces, movement, companyCountry, locale]);

  const cropsTranslations = useMemo(() => {
    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    const cropsTranslations: Record<number, string> = {};

    for (const crop of crops) {
      if (!cropsTranslations[crop.id]) {
        cropsTranslations[crop.id] = find(translationMap, {
          name: crop.name,
          country: companyCountry,
          locale,
        });
      }
    }

    return cropsTranslations;
  }, [crops, companyCountry, locale]);

  const { handleSubmit, control, formState } = useForm<Schema>({
    resolver: zodResolver(() => EditCheckInSchema()),
    defaultValues: {
      produces: matchingProduces.map((produce) => ({
        id: produce.id,
        cropId: produce.cropId,
        plannedDays: produce?.plannedDays?.toString() ?? '',
      })),
    },
  });

  const copyToClipboard = useCallback(
    (text: string) => {
      Clipboard.setString(text);
      toast.show(t('Dashboard.ProduceDetails.contactCopied'), { type: 'md_success' });
    },
    [toast]
  );

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (values) => {
      try {
        const promises = values.produces.map((produce) => {
          return ColdtivateService.editCheckIn({
            id: produce.id,
            cropId: produce.cropId,
            plannedDays: Number(produce.plannedDays) as number,
            farmerId: farmer?.id as number,
          });
        });

        await Promise.all(promises);

        toast.show(t('Dashboard.History.editCheckIn.successMessage'), { type: 'md_success' });
        refreshData.forEach((fn) => fn());
        props.navigation.navigate('RootHistoryTabStack');
      } catch (error) {
        toast.show(t('Dashboard.History.editCheckIn.errorMessage'), { type: 'md_danger' });
        reportCrash(error as Error);
      }
    },
    [toast, t, matchingProduces, farmer, refreshData]
  );

  if (loadingFarmers || loadingProduces) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="h-full items-center justify-between space-y-4 bg-white">
      <View tw="my-2">
        <Text variant="TextMedium" tw="text-gray-400 text-base">
          {t('Dashboard.History.editCheckIn.coolingUserLabel')}
        </Text>
        <Text variant="TextMedium" tw="text-green-primary">
          {movement.checkin?.ownerName}
        </Text>

        <Text variant="TextMedium" tw="text-gray-400 text-base mt-2">
          {t('Dashboard.History.editCheckIn.contactLabel')}
        </Text>
        <TouchableOpacity
          tw="flex flex-row items-center space-x-3"
          onPress={() => copyToClipboard(farmer?.user.phone ?? '')}
          activeOpacity={0.7}
        >
          <Text variant="TextMedium">{farmer?.user.phone ?? ''}</Text>
          <Icon source="content-copy" size={15} />
        </TouchableOpacity>
      </View>

      <Carousel
        width={deviceWidth * 0.95}
        height={deviceHeight}
        enabled={matchingProduces.length > 1}
        data={matchingProduces}
        onProgressChange={(_, absoluteProgress) => (progress.value = absoluteProgress)}
        modeConfig={{
          showLength: 2,
        }}
        withAnimation={{
          type: 'timing',
          config: {
            duration: 100,
            easing: Easing.linear,
          },
        }}
        renderItem={({ item: produce, index }) => {
          return (
            <View tw="space-y-3 items-center bg-white">
              {produce.runDt && produce.qualityDt !== -1 ? (
                <DTInfo produce={produce} />
              ) : (
                <Text variant="TextMedium" tw="text-lg px-2">
                  {t('Dashboard.ProduceDetails.noDTMessage')}
                </Text>
              )}

              <View tw="flex flex-row items-center space-x-2">
                <MineCart width={16} height={16} />
                <Text variant="TitleBold">
                  {`${produce.checkedInCrates.length} ${produce.checkedInCrates.length === 1 ? t('Dashboard.ProduceDetails.crate') : t('Dashboard.ProduceDetails.crates')}`}
                </Text>
              </View>

              <View tw="w-full px-3">
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={generateData(produce, t)}
                  keyExtractor={(item, idx) => `${item.label}-#${index}-${idx}`}
                  renderItem={({ item }) => (
                    <ProduceDetailsOption
                      index={index}
                      option={item}
                      crops={cropsTranslations}
                      control={control}
                    />
                  )}
                />
              </View>
            </View>
          );
        }}
        mode="horizontal-stack"
        loop={false}
      />

      {matchingProduces.length > 1 && (
        <Pagination data={matchingProduces} currentIndex={progress} />
      )}

      <Button
        mode="contained"
        tw="w-[80%] mb-2"
        onPress={handleSubmit(onSubmit)}
        disabled={formState.isSubmitting}
      >
        {t('actions.save-changes')}
      </Button>
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(EditCheckIn, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
