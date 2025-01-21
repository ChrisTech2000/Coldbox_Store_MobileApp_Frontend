import React, { useCallback, useMemo } from 'react';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import type { GetAllCropsResponse } from '#types/api.responses';
import reportCrash from '#ui/lib/reportCrash';

import type { CommoditySurveyPatcher } from '../CoolingUsersSurvey';
import {
  FarmersSurveyModal,
  type FarmerSurveySchemaType,
} from '#screens/Dashboard/Main/components/FarmerSurveyModal';

type Props = {
  companyCurrency: string;
  farmerSurveysLength: number;
  crops: Array<GetAllCropsResponse>;
  commodityPatcher: ReturnType<CommoditySurveyPatcher>;
};

export default function AddCommodity(props: Props) {
  const { companyCurrency, farmerSurveysLength, crops, commodityPatcher } = props;

  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

  const cropSelectionAvailable = useMemo(
    () => ({
      title: t('Dashboard.History.survey.baseSurvey.newCommodity', {
        index: farmerSurveysLength + 1,
      }),
      crops,
    }),
    [farmerSurveysLength, crops.length]
  );

  const onSubmit = useCallback(
    async (values: FarmerSurveySchemaType) => {
      const contextualCropId = values.crop?.id;
      if (!contextualCropId) return; // safe guard
      try {
        const result = await commodityPatcher(contextualCropId)(values);
        if (result) toggleVisibility();
      } catch (exception) {
        reportCrash(exception as Error);
      }
    },
    [commodityPatcher, toggleVisibility]
  );

  return (
    <React.Fragment>
      <Button
        mode="outlined"
        icon="plus-circle-outline"
        contentStyle="flex flex-row-reverse"
        uppercase
        tw="border-green-primary"
        onPress={(evt) => {
          evt.stopPropagation();
          toggleVisibility();
        }}
      >
        {t('Dashboard.History.survey.baseSurvey.addCommodityButton')}
      </Button>

      {isVisible ? (
        <FarmersSurveyModal
          isModalVisible={isVisible}
          companyCurrency={companyCurrency}
          cropSelectionAvailable={cropSelectionAvailable}
          onDismiss={toggleVisibility}
          onSubmit={onSubmit}
        />
      ) : null}
    </React.Fragment>
  );
}
