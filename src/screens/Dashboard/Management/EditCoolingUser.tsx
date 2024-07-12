import React from 'react';
import { type GestureResponderEvent, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useToggle } from '#ui/hooks/useToggle';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { EApiGender, type Farmer } from '#types/global';
import type { TranslationLocales } from '#i18n/constants';
import { paperTheme } from '#ui/lib/theme';

import FormManager, { type FormValues } from './AddCoolingUser/components/FormManager';
import TextFields from './AddCoolingUser/modules/TextFields';
import GenderField from './AddCoolingUser/modules/GenderField';
import ContactField from './AddCoolingUser/modules/ContactField';
import LanguageField from './AddCoolingUser/modules/LanguageField';

function EditCoolingUser(props: ManagementRouteProps<'EditCoolingUser'>) {
  const { params } = props.route;

  const [isProcessing, toggleProcessing] = useToggle(false);
  const { t } = useTranslationUtils();

  const { data, isLoading } = useApiCall(
    'getFarmer',
    ColdtivateService.getFarmer,
    { userId: params?.userId as number },
    {
      skip: !params?.userId,
      defaultData: [],
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  const contextualFarmer = data?.at(0);

  async function onSubmit(values: FormValues): Promise<void> {
    console.log(values);
    // TODO
  }

  async function onDelete(evt: GestureResponderEvent): Promise<void> {
    evt?.stopPropagation();
    toggleProcessing();
    try {
      const nonEmptyCoolingUnits = await ColdtivateService.getCoolingUnitsByStatus({
        userId: params.userId,
        isFarmer: true,
        notEmpty: true,
      });
      if (nonEmptyCoolingUnits.length >= 1) {
        // TODO: show modal with message
        return;
      }
      // TODO: show confirmation modal
    } catch (exception) {
      console.error(exception);
    } finally {
      toggleProcessing();
    }
  }

  return (
    <React.Fragment>
      <FormManager onSubmit={onSubmit} initialValues={_buildInitialValues(contextualFarmer)}>
        {({ submitHandler, isSubmitting }) => (
          <KeyboardAwareScrollView
            contentContainerStyle="flex-1 justify-between pt-6 pb-8 mx-4"
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            <View tw="w-full">
              <TextFields
                disabledFields={!params.createdByOperator ? ['firstName', 'lastName'] : undefined}
              />
              <GenderField disabled={!params.createdByOperator} />
              <ContactField disabled />
              <LanguageField />
            </View>
            <View tw="mt-5 space-y-4">
              <Button
                tw="w-full"
                mode="contained"
                onPress={submitHandler}
                icon={isSubmitting ? undefined : 'check-circle-outline'}
                uppercase
              >
                {isSubmitting ? (
                  <_ButtonLoader />
                ) : (
                  t('Dashboard.Management.CompanyDetails.actions.save')
                )}
              </Button>
              <Button
                tw="w-full"
                mode="contained"
                onPress={onDelete}
                icon="trash-can-outline"
                buttonColor={paperTheme.colors.error}
                disabled={isSubmitting || isProcessing}
                uppercase
              >
                {isProcessing ? <_ButtonLoader /> : t('actions.delete')}
              </Button>
            </View>
          </KeyboardAwareScrollView>
        )}
      </FormManager>
    </React.Fragment>
  );
}

function _buildInitialValues(datum?: Farmer) {
  const values = {} as FormValues;
  values.parentName = datum?.parentName ?? '';
  values.firstName = datum?.user?.firstName ?? '';
  values.lastName = datum?.user?.lastName ?? '';
  values.gender = datum?.user?.gender ?? EApiGender.OTHER;
  values.phone = datum?.user?.phone ?? '';
  values.language = (datum?.user?.language as TranslationLocales) ?? LanguageStorage.read();
  return values;
}

const _ButtonLoader = () => <ActivityIndicator animating size="small" color="white" />;

export default withSafeArea(EditCoolingUser);
