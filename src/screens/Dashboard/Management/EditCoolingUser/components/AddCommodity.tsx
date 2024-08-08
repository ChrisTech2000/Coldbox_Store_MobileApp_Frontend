import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';

import { useManagementStore } from '#stores/management';
import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import type { GetAllCropsResponse } from '#types/api.responses';

import { FarmersSurveyModal } from '#screens/Dashboard/Main/components/FarmerSurveyModal';

type Props = {
  farmerSurveysLength: number;
  crops: Array<GetAllCropsResponse>;
};

export default function AddCommodity(props: Props) {
  const { farmerSurveysLength, crops } = props;

  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

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
          companyCurrency={company?.currency}
          cropSelectionAvailable={{
            title: t('Dashboard.History.survey.baseSurvey.newCommodity', {
              index: farmerSurveysLength + 1,
            }),
            crops,
          }}
          isModalVisible={isVisible}
          onDismiss={toggleVisibility}
          onSubmit={(values) => console.log(values)}
        />
      ) : null}
    </React.Fragment>
  );
}
