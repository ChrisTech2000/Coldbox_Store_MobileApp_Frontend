import React from 'react';
import { View } from 'react-native';
import { Divider, List, Switch } from 'react-native-paper';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

// TODO -> data bind screen with the backend

function ContactsSharing() {
  return (
    <ScrollView tw="flex-1 p-3" showsVerticalScrollIndicator={false}>
      <View tw="space-y-3">
        <View>
          <List.Item
            tw="p-0 m-0 py-2"
            title={undefined}
            left={() => <Text tw="text-base self-center">Make phone number public</Text>}
            right={() => <Switch value={false} onValueChange={() => undefined} />}
          />
          <Divider tw="bg-gray-400" />
        </View>
        <View>
          <List.Item
            tw="p-0 m-0 py-2"
            title={undefined}
            left={() => <Text tw="text-base self-center">Make e-mail public</Text>}
            right={() => <Switch value={false} onValueChange={() => undefined} />}
          />
          <Divider tw="bg-gray-400" />
        </View>
      </View>
    </ScrollView>
  );
}

export default withSafeArea(ContactsSharing);
