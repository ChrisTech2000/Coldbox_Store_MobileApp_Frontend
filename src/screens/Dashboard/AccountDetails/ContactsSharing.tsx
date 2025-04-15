import React, { useCallback } from 'react';
import { Platform, View } from 'react-native';
import { ActivityIndicator, Divider, List, Switch } from 'react-native-paper';
import isNil from 'lodash/isNil';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import InAppNotifications from '#common/InAppNotifications';
import { useToggle } from '#ui/hooks/useToggle';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import RBAC from '#common/RBAC';
import reportCrash from '#ui/lib/reportCrash';
import { cn } from '#ui/lib/cn';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-3',
  ios: 'mx-3',
});

function ContactsSharing() {
  const { t } = useTranslationUtils();
  const [user, setUser] = useAuthStore((store) => [store.user, store.setUser]);
  const toast = InAppNotifications.useToast();

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getUser',
    ColdtivateService.getUser,
    user!.id,
    {
      skip: !user?.id,
      defaultData: null,
    }
  );

  const updatePreferences = useCallback(
    async (publicPhone: boolean | undefined, publicEmail: boolean | undefined) => {
      if (!user) return;

      const userDatum = await ColdtivateService.updateUser({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        gender: user.gender,
        language: user.language,
        isEmailPublic: !isNil(publicEmail) ? publicEmail : user.isEmailPublic,
        isPhonePublic: !isNil(publicPhone) ? publicPhone : user.isPhonePublic,
      });

      setUser({ ...userDatum, role: user?.role });
      toast.show(t('Dashboard.AccountDetails.toasts.success'), { type: 'md_success' });

      await refetch();
    },
    [user]
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView tw={cn('flex-1 py-3', HORIZONTAL_SPACING)} showsVerticalScrollIndicator={false}>
      <View tw="space-y-3">
        <_Field
          label={t('Dashboard.AccountDetails.ContactsSharing.publicPhone')}
          disabled={isValidating}
          value={data?.isPhonePublic || false}
          onChange={async (value) => {
            await updatePreferences(value, undefined);
          }}
        />
        <RBAC.ProtectedResource action="VIEW" subject="ContactsSharingEmail">
          <_Field
            label={t('Dashboard.AccountDetails.ContactsSharing.publicEmail')}
            disabled={isValidating}
            value={data?.isEmailPublic || false}
            onChange={async (value) => {
              await updatePreferences(undefined, value);
            }}
          />
        </RBAC.ProtectedResource>
      </View>
    </ScrollView>
  );
}

function _Field(props: {
  label: string;
  disabled: boolean;
  value: boolean;
  onChange: (value: boolean) => Promise<void>;
}) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [value, toggleValue] = useToggle(props.value);
  const [isProcessing, toggleIsProcessing] = useToggle(false);

  const onChangeHandler = useCallback(
    async (value: boolean) => {
      try {
        toggleIsProcessing();
        toggleValue();
        await props.onChange(value);
      } catch (exception) {
        reportCrash(exception as Error);
        toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
        toggleValue();
      } finally {
        toggleIsProcessing();
      }
    },
    [toggleIsProcessing, toggleValue, props.onChange]
  );

  return (
    <View>
      <List.Item
        tw="p-0 m-0 py-2"
        title={undefined}
        left={() => <Text tw="text-base self-center">{props.label}</Text>}
        right={() => (
          <Switch
            disabled={props.disabled || isProcessing}
            value={value}
            onValueChange={onChangeHandler}
          />
        )}
      />
      <Divider tw="bg-gray-400" />
    </View>
  );
}

export default withSafeArea(ContactsSharing, ['bottom'], true);
