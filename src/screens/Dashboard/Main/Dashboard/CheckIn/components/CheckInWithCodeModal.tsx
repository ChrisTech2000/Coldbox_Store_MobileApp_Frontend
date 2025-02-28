import isArray from 'lodash/isArray';
import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { CustomError } from '#services/utils/ErrorUtil';
import { useCheckInStore } from '#stores/checkIn';
import { CheckOut } from '#types/api.responses';
import type { Crop } from '#types/global';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import reportCrash from '#ui/lib/reportCrash';
import { RNModal } from '#ui/primitives/RNModal';

type CheckInWithCodeModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

type Schema = {
  code: string;
  plannedDays: number;
};

type GroupedProduce = { [produceId: number]: CheckOut };

export function CheckInWithCodeModal({ isModalOpen, closeModal }: CheckInWithCodeModalProps) {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const { addProduce, coolingUnit, setCheckOutCode } = useCheckInStore();

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver((z, t) =>
      z.object({
        plannedDays: z.string().optional(),
        code: z
          .string()
          .min(1, { message: t('Dashboard.CrateManagement.CheckIn.WithCode.codeErrorMessage') })
          .default(''),
      })
    ),
  });

  const plannedDays = watch('plannedDays');

  const onChangeText = useCallback(
    (newVal: string, onChange: (...event: unknown[]) => void, field: keyof Schema) => {
      onChange(newVal);
      clearErrors(field);
    },
    []
  );

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (values) => {
      if (!coolingUnit) return;

      try {
        const result = await ColdtivateService.getCheckOut(values);

        if (!isArray(result) && result.message) {
          toast.show(result.message, {
            type: 'md_danger',
          });
          return;
        }
        if (isArray(result)) {
          const grouped = Object.values(
            result.reduce((acc, item) => {
              if (!acc[item.produce]) {
                acc[item.produce] = [];
              }
              acc[item.produce].push(item);
              return acc;
            }, {} as GroupedProduce)
          );

          for (const group of grouped) {
            addProduce({
              crop: {
                id: undefined,
                name: group[0].name,
                image: group[0].cropImage,
              } as unknown as Crop,
              additionalInfo: '',
              crates: group.map((crate) => ({
                checkOut: null,
                weight: crate.initialWeight,
                tag: '',
                coolingUnitId: coolingUnit.id,
                plannedDays: plannedDays ? Number(plannedDays) : undefined,
              })),
              price: undefined,
              initialGrade: null,
              harvestDate: undefined,
              hasPicture: false,
            });
          }

          setCheckOutCode(values.code);
        }
      } catch (error) {
        if (error instanceof CustomError && error.originalError.response?.status >= 500) {
          toast.show(t('navigation.error.serverErrorMessage'), {
            type: 'md_danger',
          });
        } else {
          toast.show(t('Dashboard.CrateManagement.CheckIn.WithCode.failedMessage'), {
            type: 'md_danger',
          });
        }
        reportCrash(error as Error);
      }
    },
    [coolingUnit, plannedDays]
  );

  return (
    <Portal>
      <RNModal visible={isModalOpen} onDismiss={closeModal}>
        <View tw="w-full bg-white rounded-3xl w-11/12 max-w-11/12 h-auto p-6 self-center space-y-2">
          <Text variant="TitleMedium">
            {t('Dashboard.CrateManagement.CheckIn.WithCode.modalTitle')}
          </Text>

          <Text variant="TextMedium">
            {t('Dashboard.CrateManagement.CheckIn.WithCode.modalDescription')}
          </Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                tw={cn('bg-white border rounded-sm my-2', errors.code && 'border-red-300')}
                keyboardType="default"
                onChangeText={(newVal) => onChangeText(newVal, onChange, 'code')}
                value={value?.toString() ?? ''}
                label={t('Dashboard.CrateManagement.CheckIn.WithCode.codeLabel')}
              />
            )}
            name="code"
          />
          {errors.code ? (
            <Text tw="text-xs text-red-600 mt-[2] pl-3 w-[95%]">
              {errors.code.message?.toString()}
            </Text>
          ) : null}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                tw="bg-white border rounded-sm my-2"
                keyboardType="number-pad"
                onChangeText={(newVal) => onChangeText(newVal, onChange, 'plannedDays')}
                value={value?.toString() ?? ''}
                label={t('Dashboard.CrateManagement.CheckIn.Setup.plannedDaysLabel')}
              />
            )}
            name="plannedDays"
          />

          <Button
            tw="border-2 border-green-primary"
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            icon="check-circle-outline"
            contentStyle="flex flex-row-reverse items-center"
          >
            {t('actions.confirm')}
          </Button>

          <Button
            tw="border-2 border-red-400"
            mode="outlined"
            onPress={(evt) => {
              evt?.stopPropagation();
              closeModal?.();
              reset();
            }}
            icon="close-circle-outline"
            contentStyle="flex flex-row-reverse items-center"
            labelStyle="text-red-400"
          >
            {t('actions.cancel')}
          </Button>
        </View>
      </RNModal>
    </Portal>
  );
}
