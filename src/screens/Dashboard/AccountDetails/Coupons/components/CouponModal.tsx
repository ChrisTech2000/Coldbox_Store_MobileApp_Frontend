import React, { type RefObject } from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import { Controller, useForm } from 'react-hook-form';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { Input } from '#ui/components/Input';
import { Sup } from '#ui/components/SuperscriptText';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';

type FormValues<T = string> = {
  code: string;
  percentage: T;
};

// TODO → add text content to translations
export default function CouponModal(props: {
  modalRef: RefObject<Modalize>;
  datum?: FormValues<number>;
  onSubmit?: (values: FormValues<number>) => void;
}) {
  const { modalRef, datum } = props;

  const { t, zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: {
      code: datum?.code ?? '',
      percentage: datum?.percentage.toString() ?? '',
    },
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) =>
      z.object({
        code: z.string(),
        percentage: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0)),
      })
    ),
  });

  function onSubmit(values: FormValues<number>) {
    props.onSubmit?.(values);
  }

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        adjustToContentHeight
        withHandle={false}
      >
        <View tw="w-full items-center justify-center h-10">
          <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
        </View>

        <KeyboardAwareScrollView tw="pb-7 pt-4" showsVerticalScrollIndicator={false}>
          <View tw="px-4 space-y-5">
            <View>
              <Text tw="text-base mb-1.5">Coupon code</Text>
              <Controller
                control={form.control}
                name="code"
                render={({ field: { value, onChange } }) => (
                  <Input
                    tw="bg-white border rounded-sm"
                    placeholder="E.g. 20OFF"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View>
              <View tw="flex-row space-x-1 mb-1.5">
                <Text tw="text-base">Coupon percentage</Text>
                <Sup>(%)</Sup>
              </View>
              <Controller
                control={form.control}
                name="percentage"
                render={({ field: { value, onChange } }) => (
                  <Input
                    tw="bg-white border rounded-sm"
                    keyboardType="numeric"
                    placeholder="E.g. 20"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

        <View tw="flex flex-row w-full justify-evenly py-5 border-t border-solid border-zinc-300">
          <Button
            mode="outlined"
            tw="w-2/5"
            uppercase
            onPress={(evt) => {
              evt.stopPropagation();
              modalRef.current?.close();
              form.reset();
            }}
          >
            {t('actions.cancel')}
          </Button>
          <Button
            mode="contained"
            tw="w-2/5"
            uppercase
            // eslint-disable-next-line
            onPress={form.handleSubmit(onSubmit as any)}
            disabled={form.formState.isSubmitting}
          >
            {t('actions.save-changes')}
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
}
