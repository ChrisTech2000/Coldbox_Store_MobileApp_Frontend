import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import { Controller, useForm } from 'react-hook-form';
import ms from 'ms';

import { Text } from '#ui/components/Text';
import { Sup } from '#ui/components/SuperscriptText';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import * as BottomSheet from '#ui/components/BottomSheet';
import type { BottomSheetBaseProps } from '#ui/components/BottomSheet';

import { useTranslationUtils } from '#i18n/utils';
import InAppNotifications from '#common/InAppNotifications';
import reportCrash from '#ui/lib/reportCrash';

type FormValues<T = string> = {
  code: string;
  percentage: T;
};

type Props = {
  datum?: FormValues<number>;
  onSubmit?: (values: FormValues<number>) => Promise<void>;
} & BottomSheetBaseProps;

const TOAST_HARCODED_ID = '@CouponModal-submit-handler-exception-toast-#ID';

export default forwardRef<Modalize, Props>(function CouponModal(props, ref) {
  const { datum, close: closeModal } = props;

  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const form = useForm<FormValues>({
    defaultValues: {
      code: datum?.code ?? '',
      percentage: datum?.percentage.toString() ?? '',
    },
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z, t) =>
      z.object({
        code: z
          .string()
          .regex(/^[a-z0-9]{1,25}$/i, t('Dashboard.Management.Coupons.messages.codeField')),
        percentage: z.preprocess(
          (v) => {
            const int = Number(v);
            if (!Number.isInteger(int)) return 0;
            return int;
          },
          z.number().refine((val) => val > 0 && val < 100)
        ),
      })
    ),
  });

  function _resetValues() {
    form.reset({
      code: datum?.code ?? '',
      percentage: datum?.percentage.toString() ?? '',
    });
  }

  async function onSubmit(values: FormValues<number>): Promise<void> {
    try {
      await props.onSubmit?.(values);
      _resetValues();
    } catch (exception) {
      reportCrash(exception as Error);
      if (toast.isOpen(TOAST_HARCODED_ID)) return;
      toast.show(t('navigation.error.serverErrorMessage'), {
        type: 'md_danger',
        style: { marginBottom: 56 },
        duration: ms('4 seconds'),
        id: TOAST_HARCODED_ID,
      });
    }
  }

  return (
    <BottomSheet.Root ref={ref} onClose={_resetValues}>
      <BottomSheet.Content tw="space-y-5">
        <View>
          <Text tw="text-base mb-1.5">{t('Dashboard.Management.Coupons.code')}</Text>
          <Controller
            control={form.control}
            name="code"
            render={({ field: { value, onChange } }) => (
              <Input
                tw="bg-white border rounded-sm"
                placeholder="E.g. 20OFF"
                value={value}
                onChangeText={onChange}
                error={form.formState.errors.code}
                disabled={form.formState.isSubmitting}
              />
            )}
          />
        </View>
        <View>
          <View tw="flex-row space-x-1 mb-1.5">
            <Text tw="text-base">{t('Dashboard.Management.Coupons.percentage')}</Text>
            <Sup>(%)</Sup>
          </View>
          <Controller
            control={form.control}
            name="percentage"
            render={({ field: { value, onChange } }) => (
              <TextInput
                tw="bg-white border rounded-sm"
                keyboardType="numeric"
                placeholder="E.g. 20"
                value={value}
                onChangeText={onChange}
                error={!!form.formState.errors.percentage}
                disabled={form.formState.isSubmitting}
              />
            )}
          />
        </View>
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button
          tw="w-2/5"
          mode="outlined"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            closeModal();
            _resetValues();
          }}
          disabled={form.formState.isSubmitting}
        >
          {t('actions.cancel')}
        </Button>
        <Button
          tw="w-2/5"
          mode="contained"
          uppercase
          // eslint-disable-next-line
          onPress={form.handleSubmit(onSubmit as any)}
          disabled={form.formState.isSubmitting}
        >
          {t('actions.save-changes')}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet.Root>
  );
});
