import React from 'react';
import { View, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
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

export default function PriceRankingMarketFilters(props: {
  datums: AvailableMarketsDatum;
  onMarketSelect: (markets: Array<PredictionMarket>) => void;
}) {
  const { datums, onMarketSelect } = props;

  const filterOptions = React.useMemo(() => {
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
      marketOptions: Object.fromEntries(
        states.flatMap((state) =>
          Object.entries(datums[state]).map(([district, markets]) => [camelCase(district), markets])
        )
      ) satisfies Record<string, Array<PredictionMarket>>,
    };
  }, [datums]);

  const [filteringState, dispatch] = React.useReducer(_reducer, {
    selectedState: Object.keys(filterOptions.stateOptions),
    selectedDistrict: Object.values(filterOptions.disctrictOptions).flat(),
    selectedMarkets: Object.values(filterOptions.marketOptions)
      .flat()
      .map((market) => market.id),
  } satisfies State);

  const [isStateModalVisible, setIsStateModalVisible] = React.useState<boolean>(false);
  const stateFilterOptions = React.useMemo(
    () =>
      Object.entries(filterOptions.stateOptions).map(
        ([state, heading]) =>
          ({
            identifier: state,
            content: heading,
          }) satisfies OptionDatum
      ),
    [filterOptions.stateOptions]
  );
  const stateLabel = React.useMemo(
    () =>
      filteringState.selectedState.map((id) => filterOptions.stateOptions[id]).join(', ') ||
      'State',
    [filteringState.selectedState, filterOptions.stateOptions]
  );

  const [isDistrictModalVisible, setIsDistrictModalVisible] = React.useState<boolean>(false);
  const districtFilterOptions = React.useMemo(() => {
    const derivedOptions: Array<OptionDatum<string>> = [];
    for (const selectedState of filteringState.selectedState) {
      const districts = filterOptions.disctrictOptions[selectedState] || [];
      for (const district of districts) {
        derivedOptions.push({
          identifier: district,
          content: district,
        });
      }
    }
    return derivedOptions;
  }, [filteringState.selectedState, filterOptions.disctrictOptions]);
  const districtLabel = React.useMemo(
    () => filteringState.selectedDistrict.join(', ') || 'District',
    [filteringState.selectedDistrict]
  );

  const [isMarketModalVisible, setIsMarketModalVisible] = React.useState<boolean>(false);
  const marketFilterOptions = React.useMemo(() => {
    const derivedOptions: Array<OptionDatum<number>> = [];
    for (const selectedDistrict of filteringState.selectedDistrict) {
      const markets = filterOptions.marketOptions[camelCase(selectedDistrict)] || [];
      for (const market of markets) {
        derivedOptions.push({
          identifier: market.id,
          content: market.name,
        });
      }
    }
    return derivedOptions;
  }, [filteringState.selectedDistrict, filterOptions.marketOptions]);
  const marketLabel = React.useMemo(
    () =>
      filteringState.selectedMarkets
        .map((id) => marketFilterOptions.find((item) => item.identifier === id)?.content)
        .join(', ') || 'Market',
    [filteringState.selectedMarkets, marketFilterOptions]
  );

  return (
    <React.Fragment>
      <_LocationFilterSelect
        label={stateLabel}
        heading="Select a state"
        isVisible={isStateModalVisible}
        setIsVisible={setIsStateModalVisible}
        options={stateFilterOptions}
        selection={filteringState.selectedState}
        onSelect={(newSelection) => dispatch({ type: 'SET_STATE', payload: newSelection })}
      />
      <_LocationFilterSelect
        label={districtLabel}
        heading="Select a district"
        isVisible={isDistrictModalVisible}
        setIsVisible={setIsDistrictModalVisible}
        options={districtFilterOptions}
        selection={filteringState.selectedDistrict}
        onSelect={(newSelection) => dispatch({ type: 'SET_DISTRICT', payload: newSelection })}
      />
      <_LocationFilterSelect
        label={marketLabel}
        heading="Select a market"
        isVisible={isMarketModalVisible}
        setIsVisible={setIsMarketModalVisible}
        options={marketFilterOptions}
        selection={filteringState.selectedMarkets}
        onSelect={(newSelection) => {
          dispatch({ type: 'SET_MARKETS', payload: newSelection });
          onMarketSelect(
            marketFilterOptions
              .filter((item) => filteringState.selectedMarkets.includes(item.identifier))
              .map((item) => ({ id: item.identifier, name: item.content }))
          );
        }}
      />
    </React.Fragment>
  );
}

type OptionDatum<T = string> = { identifier: T; content: string };

const ESTIMATED_LIST_SIZE = {
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH - 40,
};

function _LocationFilterSelect<S = string>(props: {
  label: string;
  heading: string;
  selection: Array<S>;
  onSelect: (newSelection: Array<S>) => void;
  options: Array<OptionDatum<S>>;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}) {
  const { t } = useTranslationUtils();

  const [isVisible, setIsVisible] = useControlledState(props.isVisible, props.setIsVisible);

  const [internalSelection, setInternalSelection] = React.useState<Array<S>>(props.selection);

  return (
    <React.Fragment>
      <View tw="pt-1 pb-2.5">
        <Select
          variant="lg"
          isOpen={isVisible}
          onOpenChange={setIsVisible}
          onDismiss={() => setInternalSelection(props.selection)}
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
                      props.onSelect(internalSelection);
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
