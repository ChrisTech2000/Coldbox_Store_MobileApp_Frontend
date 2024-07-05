import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Divider, RadioButton, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useToggle } from '#ui/hooks/useToggle';
import { useManagementStore } from '#stores/management';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import { EApiGender } from '#types/global';

function EditOperator(props: ManagementRouteProps<'EditOperator'>) {
  const { userId } = props.route.params;

  const [isModalVisible, toggleModalVisibility] = useToggle();
  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();

  const { data: operator, isLoading: isLoadingOperator } = useApiCall(
    'getOperatorByUserId',
    ColdtivateService.getOperatorByUserId,
    userId,
    {
      skip: !userId,
      defaultData: [],
    }
  );

  const { data: coolingUnits, isLoading: isLoadingCoolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {
      company: company?.id as number,
    },
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const contextualOperator = operator.at(0);

  const coolingUnitsOptions = useMemo(
    () =>
      coolingUnits?.map((coolingUnit) => ({
        id: coolingUnit.id,
        name: coolingUnit.name,
      })) ?? [],
    [coolingUnits]
  );

  console.log(coolingUnitsOptions);

  if (isLoadingOperator || isLoadingCoolingUnits) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle="h-full pt-5 space-y-6" showsVerticalScrollIndicator={false}>
      <View tw="mx-4 space-y-6">
        <TextInput
          tw="w-full bg-transparent"
          label="First Name"
          mode="outlined"
          value={contextualOperator?.user.firstName}
          disabled
          dense
        />
        <TextInput
          tw="w-full bg-transparent"
          label="Last Name"
          mode="outlined"
          value={contextualOperator?.user.lastName}
          disabled
          dense
        />

        <View>
          <View tw="px-5">
            <Select
              variant="md"
              label={t('Dashboard.Management.Operators.text.gender')}
              currentValue={t([
                'Dashboard.Management.Operators.text',
                contextualOperator?.user.gender,
              ])}
              minifyLabel
              isModalOpen={isModalVisible}
              onClick={toggleModalVisibility}
              content={{
                header: 'Gender',
                options: (
                  <RadioButton.Group
                    value={t([
                      'Dashboard.Management.Operators.text',
                      contextualOperator?.user.gender,
                    ])}
                    onValueChange={() => undefined}
                  >
                    {Object.values(EApiGender).map((value, optionIdx) => (
                      <RadioButtonItem
                        key={`gender-option-${value}-#${optionIdx}`}
                        label={t(['Dashboard.Management.Operators.text', value])}
                        value={value}
                        tw="flex flex-row-reverse ml-[-10]"
                      />
                    ))}
                  </RadioButton.Group>
                ),
                footer: (
                  <View tw="flex flex-row items-center justify-end">
                    <Button mode="text" uppercase onPress={toggleModalVisibility}>
                      {t('Auth.SignUp.select.cancel')}
                    </Button>
                    <Button mode="text" uppercase onPress={toggleModalVisibility}>
                      {t('Auth.SignUp.select.ok')}
                    </Button>
                  </View>
                ),
              }}
            />
          </View>
          <Divider />
        </View>

        <TextInput
          tw="w-full bg-transparent"
          label="Phone Number"
          mode="outlined"
          value={contextualOperator?.user.phone}
          disabled
          dense
        />
      </View>
    </ScrollView>
  );
}

export default withSafeArea(EditOperator);
