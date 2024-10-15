import isArray from 'lodash/isArray';
import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useCheckInStore } from '#stores/checkIn';
import { CheckOut } from '#types/api.responses';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import InAppNotifications from '#common/InAppNotifications';
import type { Crop } from '#types/global';

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
  } = useForm<Schema>({
    resolver: zodResolver((z, t) =>
      z.object({
        plannedDays: z.number().optional(),
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
      let value: string | number = newVal;

      if (field === 'plannedDays') {
        value = Number(newVal);
        if (isNaN(value)) return;
      }

      onChange(value);
      clearErrors(field);
    },
    []
  );

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (values) => {
      if (!coolingUnit) return;

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
              weight: crate.weight,
              tag: '',
              coolingUnitId: coolingUnit.id,
              plannedDays: plannedDays ?? crate.plannedDays ?? undefined,
            })),
            price: undefined,
            initialGrade: null,
            harvestDate: undefined,
            hasPicture: false,
          });
        }

        setCheckOutCode(values.code);
      }
    },
    [coolingUnit, plannedDays]
  );

  return (
    <Portal>
      <Modal visible={isModalOpen} onDismiss={closeModal}>
        <View tw="bg-white rounded-3xl w-[90%] h-auto self-center space-y-2 items-center mx-8 py-1">
          <Text variant="TitleMedium" tw="mb-1 mt-2 text-center w-2/3">
            {t('Dashboard.CrateManagement.CheckIn.WithCode.modalTitle')}
          </Text>

          <Text variant="TextMedium" tw="text-base mb-1 mt-2 text-center mx-4">
            {t('Dashboard.CrateManagement.CheckIn.WithCode.modalDescription')}
          </Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                tw={cn('bg-white border rounded-sm w-[90%] my-2', errors.code && 'border-red-300')}
                keyboardType="default"
                onChangeText={(newVal) => onChangeText(newVal, onChange, 'code')}
                value={value?.toString() ?? ''}
                label={t('Dashboard.CrateManagement.CheckIn.WithCode.codeLabel')}
              />
            )}
            name="code"
          />
          {errors.code && (
            <Text tw="text-xs text-red-600 mt-[2] pl-3 w-[95%]">
              {errors.code.message?.toString()}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                tw="bg-white border rounded-sm w-[90%] my-2"
                keyboardType="number-pad"
                onChangeText={(newVal) => onChangeText(newVal, onChange, 'plannedDays')}
                value={value?.toString() ?? ''}
                label={t('Dashboard.CrateManagement.CheckIn.Setup.plannedDaysLabel')}
              />
            )}
            name="plannedDays"
          />

          <Button
            tw="w-[90%] border-2 border-green-primary my-2"
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            icon="check-circle-outline"
            contentStyle="flex flex-row-reverse items-center"
          >
            {t('actions.confirm')}
          </Button>

          <Button
            tw="w-[90%] border-2 border-red-400 my-2"
            mode="outlined"
            onPress={closeModal}
            icon="close-circle-outline"
            contentStyle="flex flex-row-reverse items-center"
            labelStyle="text-red-400"
          >
            {t('actions.cancel')}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
