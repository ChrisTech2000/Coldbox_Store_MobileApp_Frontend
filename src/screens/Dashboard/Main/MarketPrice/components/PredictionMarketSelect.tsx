import React, { useMemo, useCallback } from 'react';
import { Dimensions, type GestureResponderEvent, View } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';
import { FlashList, type FlashListProps } from '@shopify/flash-list';
import startCase from 'lodash/startCase';
import camelCase from 'lodash/camelCase';
import { create } from 'zustand';

import { Select, VIRTUAL_LIST_SIZE_WIDTH } from '#ui/components/Select';

import type { AvailableMarketsDatum, PredictionMarket } from '#types/global';
import { type TranslationPaths, useTranslationUtils } from '#i18n/utils';
import { useControlledState } from '#ui/hooks/useControlledState';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';

type StepperIdx = 0 | 1 | 2;

type StepData = { id: number | null; name: string };

type StepperState = {
  currentStep: StepperIdx;
  totalSteps: number;
  steps: Record<StepperIdx, StepData>;
  isLastStep: boolean;
  isFirstStep: boolean;
};

interface StepperActions {
  nextStep: (stepData?: StepData) => StepperState['steps'];
  setStep: (step: StepperIdx) => void;
  resetStepper: (steps?: StepperState['steps']) => void;
}

const INITIAL_STATE = {
  currentStep: 0,
  totalSteps: 3,
  steps: {},
  isLastStep: false,
  isFirstStep: true,
} as StepperState;

const usePredictionStepperStore = create<StepperState & StepperActions>((set, get) => ({
  ...INITIAL_STATE,
  nextStep: (stepData) => {
    set((state) => {
      const nextStep = Math.min(state.currentStep + 1, state.totalSteps - 1) as StepperIdx;
      return {
        currentStep: nextStep,
        isLastStep: nextStep >= state.totalSteps - 1,
        isFirstStep: false,
        steps: stepData ? { ...state.steps, [state.currentStep]: stepData } : state.steps,
      };
    });
    return get().steps;
  },
  setStep: (step) =>
    set((state) => ({
      currentStep: Math.min(Math.max(0, step), state.totalSteps - 1) as StepperIdx,
      isLastStep: step >= state.totalSteps - 1,
      isFirstStep: step <= 0,
    })),
  resetStepper: (steps) => set({ ...INITIAL_STATE, steps: steps ?? INITIAL_STATE.steps }),
}));

const STEP_HEADER: Record<StepperIdx, TranslationPaths> = {
  0: 'Dashboard.MarketPrice.Trend.stateModalTitle',
  1: 'Dashboard.MarketPrice.Ranking.district-label',
  2: 'Dashboard.MarketPrice.Ranking.market-label',
};

type OptionsStructure = {
  0: Array<string>;
  1: Record<string, Array<string>>;
  2: Record<string, Array<StepData>>;
};

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const ESTIMATED_LIST_SIZE = {
  height: deviceHeight,
  width: deviceWidth - VIRTUAL_LIST_SIZE_WIDTH,
};

const DEFAULT_LIST_PROPS = {
  scrollEnabled: false,
  showsVerticalScrollIndicator: false,
  ItemSeparatorComponent: Divider,
  estimatedItemSize: 40,
  estimatedListSize: ESTIMATED_LIST_SIZE,
} as FlashListProps<unknown>;

export default function PredictionSelect(props: {
  datums: AvailableMarketsDatum;
  isModalVisible: boolean;
  setIsModalVisible: (value: React.SetStateAction<boolean>) => void;
  onComplete: (market: PredictionMarket) => void;
}) {
  const { datums, isModalVisible, setIsModalVisible, onComplete } = props;

  const { t } = useTranslationUtils();
  const store = usePredictionStepperStore();

  const [_isModalVisible, _setIsModalVisible] = useControlledState<boolean>(
    isModalVisible,
    setIsModalVisible
  );

  const [search, setSearch] = React.useState<string>('');
  const [_selectedSteps, _setSelectedSteps] = React.useState<StepperState['steps'] | null>(null);

  const stepOptions = useMemo(() => {
    const optionsByStepIdx: OptionsStructure = {
      0: [],
      1: {},
      2: {},
    };

    const states = Object.keys(datums);
    optionsByStepIdx[0] = states.map(startCase);

    for (const state of states) {
      const districts = datums[state];
      optionsByStepIdx[1][state] = [];

      for (const [district, markets] of Object.entries(districts)) {
        optionsByStepIdx[1][state].push(startCase(district));
        optionsByStepIdx[2][district] = markets;
      }
    }

    return optionsByStepIdx;
  }, [datums]);

  const handleOpenChange = useCallback(
    (value: React.SetStateAction<boolean>) => {
      if (value) store.resetStepper();
      _setIsModalVisible(value);
    },
    [store, _setIsModalVisible]
  );

  const label = useMemo(
    () =>
      _selectedSteps
        ? Object.values(_selectedSteps)
            .map((step) => step.name)
            .join(' / ')
        : t('Dashboard.MarketPrice.Ranking.location-placeholder'),
    [_selectedSteps, t]
  );

  return (
    <React.Fragment>
      <View tw="pt-1 pb-2">
        <Select
          variant="lg"
          isOpen={_isModalVisible}
          onOpenChange={handleOpenChange}
          onDismiss={() => {
            if (_selectedSteps === null) return store.resetStepper();
            store.resetStepper(_selectedSteps);
          }}
        >
          <Select.Touchable label={label} minifyLabel />
          <Select.Dialog
            enableScroll
            header={t(STEP_HEADER[store.currentStep])}
            StickyHeaderElement={
              <View tw="px-6 py-3">
                <TextInput
                  tw="bg-white rounded-sm h-12 border border-gray-600"
                  label={t('Auth.SignUp.select.label')}
                  onChangeText={setSearch}
                  value={search}
                  left={<TextInput.Icon icon="magnify" />}
                />
              </View>
            }
          >
            <_StepConditional
              searchTerm={search}
              stepOptions={stepOptions}
              onStepChange={() => setSearch('')}
              onLastStep={(final) => {
                _setIsModalVisible(false);
                _setSelectedSteps(final);
                if (final[2].id !== null) {
                  onComplete({ id: final[2].id, name: final[2].name });
                }
              }}
            />
          </Select.Dialog>
        </Select>
      </View>
      <Divider tw="w-full bg-gray-600" />
    </React.Fragment>
  );
}

function _StepConditional(props: {
  searchTerm: string;
  stepOptions: OptionsStructure;
  onStepChange: () => void;
  onLastStep: (steps: StepperState['steps']) => void;
}) {
  const { searchTerm, stepOptions, onStepChange, onLastStep } = props;
  const store = usePredictionStepperStore();

  const handleItemPress = useCallback(
    (datum: StepData | string, isLastStep = false) => {
      return (event: GestureResponderEvent) => {
        event.stopPropagation();
        const updatedSteps = store.nextStep(
          typeof datum === 'string' ? { id: null, name: datum } : datum
        );
        onStepChange();
        if (isLastStep) onLastStep(updatedSteps);
      };
    },
    [store, onStepChange, onLastStep]
  );

  switch (store.currentStep) {
    case 0: {
      const derivedOptions = stepOptions[0];
      const filteredOptions = derivedOptions.filter((state) =>
        state.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return (
        <FlashList
          {...DEFAULT_LIST_PROPS}
          data={filteredOptions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <List.Item title={item} tw="px-2 py-2 m-0" onPress={handleItemPress(item)} />
          )}
        />
      );
    }
    case 1: {
      const derivedState = store.steps[0].name;
      const derivedOptions = stepOptions[1][camelCase(derivedState)];
      const filteredOptions = derivedOptions.filter((district) =>
        district.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return (
        <FlashList
          {...DEFAULT_LIST_PROPS}
          data={filteredOptions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <List.Item title={item} tw="px-2 py-2 m-0" onPress={handleItemPress(item)} />
          )}
        />
      );
    }
    case 2: {
      const derivedDistrict = store.steps[1].name;
      const derivedOptions = stepOptions[2][camelCase(derivedDistrict)];
      const filteredOptions = derivedOptions.filter((market) =>
        market.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return (
        <FlashList
          {...DEFAULT_LIST_PROPS}
          data={filteredOptions}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <List.Item title={item.name} tw="px-2 py-2 m-0" onPress={handleItemPress(item, true)} />
          )}
        />
      );
    }
    default:
      return null;
  }
}

export const DEFAULT_COUNTRY_DATUM = {
  ISO: 'NG',
  CURRENCY_CODE: '₦',
} as const;

export function useContextualCountryISO() {
  const companyCountry = useManagementStore((store) => store.company?.country);
  const farmerCountry = useDashboardStore((store) => store.farmerCountry);
  return useMemo(
    () =>
      countriesDict().getByValue(companyCountry || farmerCountry || '')?.ISO ||
      DEFAULT_COUNTRY_DATUM.ISO,
    [companyCountry, farmerCountry]
  );
}

export function CountryBasedContentSwitch(props: {
  standard: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const { standard, fallback } = props;
  const contextualCountry = useContextualCountryISO();
  return <React.Fragment>{contextualCountry === 'IN' ? fallback : standard}</React.Fragment>;
}
