import Clipboard from '@react-native-clipboard/clipboard';
import React, { useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';
import { Easing, useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import MineCart from '#assets/icons/mine-cart.svg';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
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
import InAppNotifications from '#common/InAppNotifications';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

function EditCheckIn(props: HistoryTabStackRouteProps<'EditCheckIn'>) {
  const { movement, coolingUnitId } = props.route.params;

  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { user } = useAuthStore();
  const { refreshData } = useDashboardStore();

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
      skip: !coolingUnitId,
      defaultData: [],
    }
  );

  const { data: crops } = useApiCall('getAllCrops', ColdtivateService.getAllCrops, {});

  const farmer = useMemo(() => {
    return farmers?.find(
      (farmer) => `${farmer.user.firstName} ${farmer.user.lastName}` === movement.farmer
    );
  }, [farmers]);

  const matchingProduces = useMemo(() => {
    return produces?.filter((produce) => produce.movementCode === movement.code) ?? [];
  }, [produces, movement]);

  const { handleSubmit, control } = useForm<Schema>({
    resolver: zodResolver(() => EditCheckInSchema()),
    defaultValues: {
      produces: matchingProduces.map((produce) => ({
        id: produce.id,
        crop: produce.cropName,
        plannedDays: `${produce.plannedDays ?? ''}`,
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
            cropId: crops?.find((crop) => crop.name === produce.crop)?.id as number,
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
        console.log(error);
      }
    },
    [toast, t, matchingProduces, farmer, refreshData, crops]
  );

  if (loadingFarmers || loadingProduces) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 items-center justify-center space-y-4 bg-white">
      <View tw="my-2">
        <Text variant="TextMedium" tw="text-gray-400 text-base">
          {t('Dashboard.History.editCheckIn.coolingUserLabel')}
        </Text>
        <Text variant="TextMedium" tw="text-green-primary">
          {movement.farmer}
        </Text>

        <Text variant="TextMedium" tw="text-gray-400 text-base mt-2">
          {t('Dashboard.History.editCheckIn.contactLabel')}
        </Text>
        <View tw="flex flex-row items-center space-x-3">
          <Text variant="TextMedium">{farmer?.user.phone ?? ''}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(farmer?.user.phone ?? '')}>
            <Icon source="content-copy" size={15} />
          </TouchableOpacity>
        </View>
      </View>

      <Carousel
        width={deviceWidth}
        height={deviceHeight * 0.7}
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
                  {`${produce.crates.length} ${produce.crates.length === 1 ? t('Dashboard.ProduceDetails.crate') : t('Dashboard.ProduceDetails.crates')}`}
                </Text>
              </View>

              <View tw="w-full px-3">
                <FlatList
                  data={generateData(produce, t)}
                  keyExtractor={(item, idx) => `${item.label}-#${index}-${idx}`}
                  renderItem={({ item }) => {
                    return (
                      <ProduceDetailsOption
                        index={index}
                        option={item}
                        crops={crops}
                        control={control}
                      />
                    );
                  }}
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

      <Button mode="contained" tw="w-[80%]" onPress={handleSubmit(onSubmit)}>
        {t('actions.save-changes')}
      </Button>
    </View>
  );
}

export default withSafeArea(EditCheckIn);
