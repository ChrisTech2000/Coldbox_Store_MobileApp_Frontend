import Clipboard from '@react-native-clipboard/clipboard';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
//import { useSharedValue } from 'react-native-reanimated';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import { useToast } from 'react-native-toast-notifications';

import MineCart from '#assets/icons/mine-cart.svg';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { HistoryTabStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { DashboardProduce, ECoolingUnitMetric, EPricingType } from '#types/global';
import { DisclaimerModal } from './components/DisclaimerModal';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

function EditCheckIn(props: HistoryTabStackRouteProps<'EditCheckIn'>) {
  const { movement, coolingUnitId } = props.route.params;

  const { t } = useTranslationUtils();
  const toast = useToast();
  const { user } = useAuthStore();

  //const progress = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);

  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState<boolean>(false);

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

  const farmerContact = useMemo(() => {
    return (
      farmers?.find(
        (farmer) => `${farmer.user.firstName} ${farmer.user.lastName}` === movement.farmer
      )?.user.phone ?? ''
    );
  }, [farmers]);

  const matchingProduces = useMemo(() => {
    return produces?.filter((produce) => produce.movementCode === movement.code) ?? [];
  }, [produces, movement]);

  const copyToClipboard = useCallback(
    (text: string) => {
      Clipboard.setString(text);
      toast.show(t('Dashboard.ProduceDetails.contactCopied'), { type: 'success' });
    },
    [toast]
  );

  const generateData = useCallback((produce: DashboardProduce) => {
    const pricing = produce.crates[0].pricing[0];
    const metric =
      produce.crates[0].coolingUnitMetric === ECoolingUnitMetric.KILOGRAMS
        ? produce.cratesCombinedWeight
        : produce.cratesAmount;

    let price: number | string = '';

    if (pricing.pricingType === EPricingType.FIXED) {
      price = pricing.fixedRate * metric;
    } else {
      price = produce.plannedDays ? pricing.dailyRate * metric * produce.plannedDays : 'N/A';
    }

    return [
      {
        label: t('Dashboard.ProduceDetails.cropType'),
        value: produce.cropName,
      },
      {
        label: t('Dashboard.ProduceDetails.numberOfCrates'),
        value: produce.crates.length,
      },
      {
        label: t('Dashboard.ProduceDetails.crateIds'),
        value: produce.crates.map((crate) => crate.id).join(', '),
      },
      {
        label: t('Dashboard.ProduceDetails.combinedWeight'),
        value: produce.cratesCombinedWeight,
      },
      {
        label: t('Dashboard.ProduceDetails.remainingTime'),
        value: produce.minimumRemainingShelfLife,
      },
      {
        label: t('Dashboard.ProduceDetails.currentStorageDays'),
        value: produce.currentStorageDays,
      },
      {
        label: t('Dashboard.ProduceDetails.plannedDays'),
        value: produce.plannedDays,
      },
      produce.crates[0].pricing[0].pricingType === EPricingType.PERIODICITY
        ? {
            label: t('Dashboard.ProduceDetails.pricePerDay'),
            value: produce.crates[0].pricing[0].dailyRate,
          }
        : {},
      {
        label: t('Dashboard.ProduceDetails.plannedStorageCost'),
        value: price,
      },
    ];
  }, []);

  const getPercentage = useCallback((produce: DashboardProduce) => {
    const quality = produce.qualityDt * 100;
    if (quality > 100) return 100;
    if (quality < 0 || isNaN(quality)) return 0;
    return quality;
  }, []);

  // const onPressPagination = useCallback((index: number) => {
  //   ref.current?.scrollTo({
  //     /**
  //      * Calculate the difference between the current index and the target index
  //      * to ensure that the carousel scrolls to the nearest index
  //      */
  //     count: index - progress.value,
  //     animated: true,
  //   });
  // }, []);

  if (loadingFarmers || loadingProduces) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <View tw="my-4">
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
          <Text variant="TextMedium">{farmerContact}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(farmerContact)}>
            <Icon source="content-copy" size={15} />
          </TouchableOpacity>
        </View>
      </View>

      <Carousel
        ref={ref}
        width={deviceWidth}
        height={deviceHeight * 0.8}
        data={matchingProduces}
        modeConfig={{
          showLength: 1,
          scaleInterval: 0.2,
          stackInterval: 50,
          opacityInterval: 0.2,
        }}
        renderItem={({ item: produce }) => (
          <View tw="space-y-4 items-center">
            {produce.runDt && produce.qualityDt !== -1 ? (
              <View tw="w-full px-2">
                <View
                  tw={cn(
                    'w-full bg-green-300 rounded-lg h-3',
                    produce.minimumRemainingShelfLife <= 7 &&
                      produce.minimumRemainingShelfLife > 2 &&
                      'bg-yellow-400',
                    produce.minimumRemainingShelfLife < 2 && 'bg-red-500',
                    (!produce.minimumRemainingShelfLife ||
                      produce.minimumRemainingShelfLife === -1) &&
                      'bg-gray-300'
                  )}
                />

                <View tw="flex flex-row items-center justify-between">
                  <Text variant="TextMedium" tw="px-2">
                    {getPercentage(produce)}%
                  </Text>
                  <Text variant="TextMedium" tw="px-2">
                    {t('Dashboard.ProduceDetails.pickUp')}
                  </Text>
                  <Text
                    variant="TextMedium"
                    tw="px-2"
                  >{`${produce.minimumRemainingShelfLife} ${t('Dashboard.ProduceDetails.days')}`}</Text>
                </View>

                <View tw="flex flex-row items-center mt-4">
                  <Text variant="TextMedium" tw="text-gray-400 mr-1" numberOfLines={2}>
                    {t('Dashboard.History.editCheckIn.disclaimer')}
                  </Text>
                  <TouchableOpacity onPress={() => setIsDisclaimerModalOpen(true)}>
                    <Icon source="information" size={15} />
                  </TouchableOpacity>
                  <DisclaimerModal
                    isOpen={isDisclaimerModalOpen}
                    dismiss={() => setIsDisclaimerModalOpen(false)}
                  />
                </View>
              </View>
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
                data={generateData(produce)}
                renderItem={({ item, index }) => (
                  <View tw="space-y-1 my-2" key={`${item.label}-${index}`}>
                    <View tw="flex flex-row justify-between items-center">
                      <Text variant="TextMedium" tw="text-base">
                        {item.label}
                      </Text>
                      <Text variant="TextMedium" tw="text-base text-gray-400">
                        {item.value ?? '-'}
                      </Text>
                    </View>
                    <Divider />
                  </View>
                )}
              />
            </View>
          </View>
        )}
        mode="horizontal-stack"
        loop={false}
      />
      <Button mode="contained" tw="w-[80%]">
        {t('actions.save-changes')}
      </Button>
      {/* 
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      /> 
      */}
    </View>
  );
}

export default withSafeArea(EditCheckIn);
