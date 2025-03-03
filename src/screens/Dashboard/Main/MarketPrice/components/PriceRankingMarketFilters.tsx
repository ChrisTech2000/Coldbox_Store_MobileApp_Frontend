import React from 'react';
import { View, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useDebouncedCallback } from 'use-debounce';
import startCase from 'lodash/startCase';
import camelCase from 'lodash/camelCase';

import { Select } from '#ui/components/Select';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { Checkbox } from '#ui/components/Checkbox';

import type { AvailableMarketsDatum, PredictionMarket } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';
import { useControlledState } from '#ui/hooks/useControlledState';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { cn } from '#ui/lib/cn';

type State = {
  selectedState: Array<string>;
  selectedDistrict: Array<string>;
  selectedMarkets: Array<number>;
};

type Action =
  | { type: 'SET_STATE'; payload: Array<string> }
  | { type: 'SET_DISTRICT'; payload: Array<string> }
  | { type: 'SET_MARKETS'; payload: Array<number> };

function _reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        selectedState: action.payload,
        selectedDistrict: [],
        selectedMarkets: [],
      };
    case 'SET_DISTRICT':
      return {
        ...state,
        selectedDistrict: action.payload,
        selectedMarkets: [],
      };
    case 'SET_MARKETS':
      return {
        ...state,
        selectedMarkets: action.payload,
      };
    default:
      return state;
  }
}

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get('window');

export function getMarketsGroupedByDistrict(datums: AvailableMarketsDatum) {
  const filters = (): Record<string, Array<PredictionMarket>> => {
    const states = Object.keys(datums);
    const districtsByState = states.flatMap((state) =>
      Object.entries(datums[state]).map(([district, markets]) => [camelCase(district), markets])
    );
    return Object.fromEntries(districtsByState);
  };
  const filtersCache = filters();
  return {
    filters: () => filtersCache,
    defaultList: () => Object.values(filtersCache).flat(),
  };
}

export default function PriceRankingMarketFilters(props: {
  datums: AvailableMarketsDatum;
  onMarketSelect: (markets: Array<PredictionMarket>) => void;
}) {
  const { datums, onMarketSelect } = props;

  const { t } = useTranslationUtils();

  const filteringDatums = React.useMemo(() => {
    const states = Object.keys(datums);
    return {
      stateOptions: Object.fromEntries(
        states.map((state) => [state, startCase(state)])
      ) satisfies Record<string, string>,
      disctrictOptions: Object.fromEntries(
        states.map((state) => [
          state,
          Object.keys(datums[state]).map((district) => startCase(district)),
        ])
      ) satisfies Record<string, Array<string>>,
      marketOptions: getMarketsGroupedByDistrict(datums).filters(),
    };
  }, [datums]);

  const syncInitialSelection = useDebouncedCallback(onMarketSelect, 1_000);
  const initialFilteringState = React.useRef<State | null>(null);
  if (!initialFilteringState.current) {
    initialFilteringState.current = {
      selectedState: Object.keys(filteringDatums.stateOptions),
      selectedDistrict: Object.values(filteringDatums.disctrictOptions).flat(),
      selectedMarkets: Object.values(filteringDatums.marketOptions)
        .flat()
        .map((market) => market.id),
    };
    syncInitialSelection(getMarketsGroupedByDistrict(datums).defaultList());
  }

  const [filteringState, dispatch] = React.useReducer(_reducer, initialFilteringState.current);

  const [isStateModalVisible, setIsStateModalVisible] = React.useState<boolean>(false);
  const stateFilterOptions = React.useMemo(
    () =>
      Object.entries(filteringDatums.stateOptions).map(
        ([state, heading]) =>
          ({
            identifier: state,
            content: heading,
          }) satisfies OptionDatum
      ),
    [filteringDatums.stateOptions]
  );
  const stateLabel = React.useMemo(
    () =>
      filteringState.selectedState.map((id) => filteringDatums.stateOptions[id]).join(', ') ||
      t('Dashboard.MarketPrice.Trend.stateLabel'),
    [filteringState.selectedState, filteringDatums.stateOptions, t]
  );

  const [isDistrictModalVisible, setIsDistrictModalVisible] = React.useState<boolean>(false);
  const districtFilterOptions = React.useMemo(() => {
    const derivedOptions: Array<OptionDatum<string>> = [];
    for (const selectedState of filteringState.selectedState) {
      const districts = filteringDatums.disctrictOptions[selectedState] || [];
      for (const district of districts) {
        derivedOptions.push({
          identifier: district,
          content: district,
        });
      }
    }
    return derivedOptions;
  }, [filteringState.selectedState, filteringDatums.disctrictOptions]);
  const districtLabel = React.useMemo(
    () =>
      filteringState.selectedDistrict.join(', ') ||
      t('Dashboard.MarketPrice.Ranking.district-placeholder'),
    [filteringState.selectedDistrict, t]
  );

  const [isMarketModalVisible, setIsMarketModalVisible] = React.useState<boolean>(false);
  const marketFilterOptions = React.useMemo(() => {
    const derivedOptions: Array<OptionDatum<number>> = [];
    for (const selectedDistrict of filteringState.selectedDistrict) {
      const markets = filteringDatums.marketOptions[camelCase(selectedDistrict)] || [];
      for (const market of markets) {
        derivedOptions.push({
          identifier: market.id,
          content: market.name,
        });
      }
    }
    return derivedOptions;
  }, [filteringState.selectedDistrict, filteringDatums.marketOptions]);
  const marketLabel = React.useMemo(
    () =>
      filteringState.selectedMarkets
        .map((id) => marketFilterOptions.find((item) => item.identifier === id)?.content)
        .join(', ') || t('Dashboard.MarketPrice.Ranking.market-placeholder'),
    [filteringState.selectedMarkets, marketFilterOptions, t]
  );

  return (
    <React.Fragment>
      <_LocationFilterSelect
        label={stateLabel}
        heading={t('Dashboard.MarketPrice.Trend.stateModalTitle')}
        isVisible={isStateModalVisible}
        setIsVisible={setIsStateModalVisible}
        options={stateFilterOptions}
        selection={filteringState.selectedState}
        onConfirm={(newSelection) => dispatch({ type: 'SET_STATE', payload: newSelection })}
      />
      <_LocationFilterSelect
        label={districtLabel}
        heading={t('Dashboard.MarketPrice.Ranking.district-label')}
        isVisible={isDistrictModalVisible}
        setIsVisible={setIsDistrictModalVisible}
        options={districtFilterOptions}
        selection={filteringState.selectedDistrict}
        onConfirm={(newSelection) => dispatch({ type: 'SET_DISTRICT', payload: newSelection })}
        disabled={!filteringState.selectedState.length}
      />
      <_LocationFilterSelect
        label={marketLabel}
        heading={t('Dashboard.MarketPrice.Ranking.market-label')}
        isVisible={isMarketModalVisible}
        setIsVisible={setIsMarketModalVisible}
        options={marketFilterOptions}
        selection={filteringState.selectedMarkets}
        onConfirm={(newSelection) => {
          dispatch({ type: 'SET_MARKETS', payload: newSelection });
          onMarketSelect(
            marketFilterOptions
              .filter((item) => newSelection.includes(item.identifier))
              .map((item) => ({ id: item.identifier, name: item.content }))
          );
        }}
        disabled={!filteringState.selectedDistrict.length}
      />
    </React.Fragment>
  );
}

type OptionDatum<T = string> = { identifier: T; content: string };

const ESTIMATED_LIST_SIZE = {
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH - 52,
};

function _LocationFilterSelect<S = string>(props: {
  label: string;
  heading: string;
  selection: Array<S>;
  onConfirm: (newSelection: Array<S>) => void;
  options: Array<OptionDatum<S>>;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  disabled?: boolean;
}) {
  const { t } = useTranslationUtils();

  const [isVisible, setIsVisible] = useControlledState(props.isVisible, props.setIsVisible);

  const [internalSelection, setInternalSelection] = React.useState<Array<S>>(props.selection);

  const syncSelectionWithProps = useDebouncedCallback(
    () => setInternalSelection(props.selection),
    180
  );
  React.useEffect(syncSelectionWithProps, [props.selection]);

  return (
    <React.Fragment>
      <View tw="pt-2.5 pb-2.5">
        <Select
          variant="lg"
          isOpen={isVisible}
          onOpenChange={setIsVisible}
          onDismiss={() => setInternalSelection(props.selection)}
          disabled={props.disabled}
        >
          <Select.Touchable label={props.label} minifyLabel />
          <Select.Dialog
            enableScroll
            header={props.heading}
            FooterElement={
              <View
                tw={
                  DEVICE_HEIGHT > SMALL_SCREEN_THRESHOLD
                    ? 'flex flex-row items-center justify-end'
                    : 'items-center'
                }
              >
                <View
                  tw={cn(
                    'flex flex-row items-center',
                    DEVICE_HEIGHT <= SMALL_SCREEN_THRESHOLD && 'space-x-2'
                  )}
                >
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setInternalSelection(props.options.map((option) => option.identifier));
                    }}
                  >
                    {t('actions.all')}
                  </Button>
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setInternalSelection([]);
                    }}
                  >
                    {t('actions.none')}
                  </Button>
                </View>
                <View
                  tw={cn(
                    'flex flex-row items-center',
                    DEVICE_HEIGHT <= SMALL_SCREEN_THRESHOLD && 'space-x-2'
                  )}
                >
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setIsVisible(false);
                      setInternalSelection(props.selection);
                    }}
                  >
                    {t('actions.cancel')}
                  </Button>
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setIsVisible(false);
                      props.onConfirm(internalSelection);
                    }}
                  >
                    {t('actions.ok')}
                  </Button>
                </View>
              </View>
            }
          >
            <FlashList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              data={props.options}
              extraData={internalSelection}
              keyExtractor={(_, itemIdx) =>
                `location-filter-select-list-item-${props.label}-#${itemIdx}`
              }
              renderItem={({ item, extraData }) => {
                const _extraData = extraData as typeof internalSelection;
                return (
                  <React.Fragment>
                    <View tw="w-full flex flex-row items-center justify-between px-4 py-2">
                      <Text tw="text-base w-[70%]" numberOfLines={2}>
                        {item.content}
                      </Text>
                      <Checkbox
                        status={_extraData.includes(item.identifier) ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setInternalSelection((prev) =>
                            prev.includes(item.identifier)
                              ? prev.filter((id) => id !== item.identifier)
                              : [...prev, item.identifier]
                          );
                        }}
                      />
                    </View>
                    <Divider />
                  </React.Fragment>
                );
              }}
              nestedScrollEnabled
              estimatedItemSize={40}
              estimatedListSize={ESTIMATED_LIST_SIZE}
            />
          </Select.Dialog>
        </Select>
      </View>
      <Divider tw="w-full bg-gray-600" />
    </React.Fragment>
  );
}
