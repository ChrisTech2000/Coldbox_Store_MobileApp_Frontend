import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, IconButton, List, Switch } from 'react-native-paper';
import { Controller, type Control } from 'react-hook-form';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';

import type { SetupSchema } from './index';
import SellInMarketplaceModal from '../components/SellInMarketplaceModal';

// TODO → add text content to translations
export default function Sellable(props: { formControl: Control<SetupSchema, unknown> }) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <React.Fragment>
      <View tw="flex-col">
        <List.Item
          tw="p-0 m-0 mt-3"
          title={undefined}
          left={() => (
            <View tw="flex-row items-center space-x-2">
              <IconButton
                tw="p-0 m-0"
                icon="information-outline"
                size={20}
                iconColor={colors.gray[600]}
                containerColor={colors.white}
                onPress={(evt) => {
                  evt.stopPropagation();
                  setIsModalVisible(true);
                }}
              />
              <Text tw="text-base self-center">Sell in the Marketplace</Text>
            </View>
          )}
          right={() => (
            <Controller
              control={props.formControl}
              name="isSellableInMarketplace"
              render={({ field: { value, onChange } }) => (
                <Switch value={value} onValueChange={onChange} />
              )}
            />
          )}
        />
        <Divider tw="bg-gray-400 mt-2" />
      </View>

      <SellInMarketplaceModal visible={isModalVisible} onChangeVisible={setIsModalVisible} />
    </React.Fragment>
  );
}
