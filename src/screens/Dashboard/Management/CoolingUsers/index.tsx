import type { NavigationProp } from '@react-navigation/native';
import cloneDeep from 'lodash/cloneDeep';
import React, { useMemo } from 'react';
import { FlatList, Linking, RefreshControl, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator, Divider, List, type ListItemProps } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { useToggle } from '#ui/hooks/useToggle';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { CoolingUsersOverlay } from '#screens/Dashboard/Tutorial/CoolingUsersOverlay';
import { EOperatorTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { AIR_PROD_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import type {
  ManagementRoutePaths,
  ManagementRouteProps,
  ManagementRoutes,
} from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import type { Farmer } from '#types/global';

import FormModal from './components/FormModal';
import Prompt from './components/Prompt';

function CoolingUsers(props: ManagementRouteProps<'CoolingUsers'>) {
  const user = useAuthStore(useShallow((store) => store.user));
  const company = useManagementStore(useShallow((store) => store.company));

  const [isDownloading, toggleDownloading] = useToggle(false);
  const { t } = useTranslationUtils();

  const { onLayout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.LIST_COOLING_USERS_STEP,
    OverlayComponent: CoolingUsersOverlay,
  });

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getOperatorFarmers',
    ColdtivateService.getOperatorFarmers,
    { operator: user?.id as number },
    {
      skip: !user?.id,
      defaultData: [],
    }
  );

  const datums = useMemo(
    () =>
      cloneDeep(data)?.sort((a, b) => {
        const nameA = a.user.firstName.toLowerCase();
        const nameB = b.user.firstName.toLowerCase();
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
        return 0;
      }) ?? [],
    [data]
  );

  const coolingUsersIds: Array<number> = useMemo(
    () => data?.map((coolingUser) => coolingUser.id) ?? [],
    [data]
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center" onLayout={onLayout}>
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 justify-start" onLayout={onLayout}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={datums}
        keyExtractor={(item) => `cooling-user-item-#${item.id}`}
        ListHeaderComponent={
          <View tw="m-4">
            <Button
              mode="contained"
              uppercase
              onPress={async (evt) => {
                evt.stopPropagation();
                if (!company) return;
                toggleDownloading();
                const url = [AIR_PROD_BASE_URL, 'company/', company.id, '/cusers'].join('');
                try {
                  await Linking.openURL(url);
                } catch (exception) {
                  console.error(exception);
                } finally {
                  toggleDownloading();
                }
              }}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <ActivityIndicator animating size="small" color="white" />
              ) : (
                t('Dashboard.Management.UsageAnalysis.downloadDataButton')
              )}
            </Button>
          </View>
        }
        renderItem={({ item }) => (
          <React.Fragment>
            <List.Item {..._propsFactory(item, props.navigation)} />
            <Divider />
          </React.Fragment>
        )}
        refreshControl={<RefreshControl refreshing={isValidating} onRefresh={refetch} />}
        nestedScrollEnabled
      />

      <Prompt navigation={props.navigation} />
      <FormModal navigation={props.navigation} coolingUsersIds={coolingUsersIds} />
    </View>
  );
}

function _propsFactory(
  datum: Farmer,
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>
) {
  const isUserWithoutPhone = datum.user.firstName === 'User without a phone';
  const props = {} as ListItemProps;
  props.title = [datum.user.firstName, datum.user.lastName].join(' ');
  if (datum.userCode) {
    props.right = (props) => <List.Icon {...props} icon="cellphone" />;
  }
  props.onPress = () => {
    navigation.navigate('EditCoolingUserStack', {
      screen: 'Root',
      params: {
        farmerId: datum.id,
        createdByOperator: !datum.userCode,
        isUserWithoutPhone,
      },
    });
  };
  return props;
}

export default withSafeArea(CoolingUsers, ['bottom'], true);
