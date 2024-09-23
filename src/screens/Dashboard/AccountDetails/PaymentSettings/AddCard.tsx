import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, View } from 'react-native';
import { Divider, RadioButton, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { ScrollView } from '#ui/components/ScrollView';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { PaymentSettingsRouteProps } from '#navigation/Dashboard/AccountDetails/PaymentSettingsStack';

interface FormData {
  cardName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  securityCode: string;
  predefined: boolean;
}

function AddCard(props: PaymentSettingsRouteProps<'AddCard'>) {
  const { t } = useTranslationUtils();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isMonthModalOpen, setIsMonthModalOpen] = useState<boolean>(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState<boolean>(false);

  const onSubmit = useCallback((data: FormData) => {
    console.log('Form Data: ', data);
  }, []);

  return (
    <ScrollView tw="flex-1 p-3 h-full" showsVerticalScrollIndicator={false}>
      <View>
        <Text tw="text-base font-bold text-green-primary">
          {t('Dashboard.AccountDetails.PaymentSettings.AddCreditCard.title')}
        </Text>

        <Controller
          control={control}
          name="cardName"
          rules={{
            required: t(
              'Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.cardNameError'
            ),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              tw="w-full bg-transparent mt-2"
              placeholder={t(
                'Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.cardNamePlaceholder'
              )}
              label={t('Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.cardName')}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="flat"
              dense
              error={!!errors.cardName}
            />
          )}
        />
        {errors.cardName && <Text tw="text-red-600 mt-2">{errors.cardName.message}</Text>}

        <Controller
          control={control}
          name="cardNumber"
          rules={{
            required: t(
              'Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.cardNumberError'
            ),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              tw="w-full bg-transparent mt-2"
              placeholder={t(
                'Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.cardNumberPlaceholder'
              )}
              label={t('Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.cardNumber')}
              keyboardType="numeric"
              mode="flat"
              dense
              error={!!errors.cardNumber}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.cardNumber && <Text tw="text-red-600 mt-2">{errors.cardNumber.message}</Text>}

        <Text tw="text-base text-gray-700 mt-3 mb-1 ml-4">
          {t('Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.expiryDate')}
        </Text>
        <View tw="w-full flex flex-row mx-4 mt-1">
          <Controller
            control={control}
            name="expiryMonth"
            defaultValue={dateFmt(new Date().toISOString(), 'MM')}
            render={({ field: { onChange, value } }) => (
              <View tw="mr-6">
                <Select
                  variant="md"
                  label={value}
                  isModalOpen={isYearModalOpen}
                  onClick={() => setIsYearModalOpen(!isYearModalOpen)}
                  content={{
                    options: (
                      <RadioButton.Group
                        value={value ?? ''}
                        onValueChange={(value) => {
                          onChange(value);
                          setIsYearModalOpen(false);
                        }}
                      >
                        <FlatList
                          showsHorizontalScrollIndicator={false}
                          data={Array.from({ length: 12 }, (_, i) =>
                            (i + 1).toString().padStart(2, '0')
                          )}
                          keyExtractor={(item, idx) => `rb-${item}-${idx}`}
                          renderItem={({ item }) => (
                            <RadioButtonItem
                              label={item}
                              value={item}
                              tw="flex flex-row-reverse ml-[-10]"
                            />
                          )}
                          nestedScrollEnabled
                        />
                      </RadioButton.Group>
                    ),
                  }}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="expiryYear"
            defaultValue={dateFmt(new Date().toISOString(), 'yyyy')}
            render={({ field: { onChange, value } }) => (
              <View>
                <Select
                  variant="md"
                  label={value}
                  isModalOpen={isMonthModalOpen}
                  onClick={() => setIsMonthModalOpen(!isMonthModalOpen)}
                  content={{
                    options: (
                      <RadioButton.Group
                        value={value ?? ''}
                        onValueChange={(value) => {
                          onChange(value);
                          setIsMonthModalOpen(false);
                        }}
                      >
                        <FlatList
                          showsHorizontalScrollIndicator={false}
                          data={Array.from({ length: 11 }, (_, index) =>
                            (new Date().getFullYear() + index).toString()
                          )}
                          keyExtractor={(item, idx) => `rb-${item}-${idx}`}
                          renderItem={({ item }) => (
                            <RadioButtonItem
                              label={item}
                              value={item}
                              tw="flex flex-row-reverse ml-[-10]"
                            />
                          )}
                          nestedScrollEnabled
                        />
                      </RadioButton.Group>
                    ),
                  }}
                />
              </View>
            )}
          />
        </View>
        <Divider tw="bg-gray-800 mt-1" />

        <Controller
          control={control}
          name="securityCode"
          rules={{
            required: t(
              'Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.cardNumberError'
            ),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={t(
                'Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.securityCodePlaceholder'
              )}
              label={t('Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.securityCode')}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="flat"
              dense
              secureTextEntry={true}
              error={!!errors.securityCode}
              tw="w-full bg-transparent mt-1"
            />
          )}
        />
        {errors.securityCode && <Text tw="text-red-600 mt-2">{errors.securityCode.message}</Text>}

        <View tw="flex flex-row items-center my-6">
          <Controller
            control={control}
            name="predefined"
            render={({ field: { onChange, value } }) => (
              <View tw="flex flex-row items-center max-w-[85%] mx-4 my-2 space-x-2">
                <View tw="border border-green-primary rounded-md scale-75">
                  <Checkbox
                    onPress={() => onChange(!value)}
                    status={value ? 'checked' : 'unchecked'}
                  />
                </View>
                <Text>
                  {t(
                    'Dashboard.AccountDetails.PaymentSettings.AddCreditCard.form.predefinedMethod'
                  )}
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      <View tw="flex flex-row w-full space-x-2 justify-center">
        <Button
          onPress={() => props.navigation.goBack()}
          tw="border-green-primary w-[40%]"
          mode="outlined"
        >
          {t('actions.cancel')}
        </Button>
        <Button tw="w-[40%]" mode="contained" onPress={handleSubmit(onSubmit)}>
          {t('actions.save')}
        </Button>
      </View>
    </ScrollView>
  );
}

export default withSafeArea(AddCard);
