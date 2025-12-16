import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Divider, Menu } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import type { CoolingUnit } from '#types/global';
import type { GetDeliveryContactsResponse } from '#types/api.responses';

type Contact = GetDeliveryContactsResponse[number];

type ContactCardProps = {
  contact: Contact;
  coolingUnits: CoolingUnit[];
  isProcessing: boolean;
  onToggleStatus: () => void;
  onEdit: () => void;
  onDelete: () => void;
  unassignedLabel: string;
  translations: {
    companyName: string;
    contactName: string;
    phoneNumber: string;
    rooms: string;
    show: string;
    hide: string;
    edit: string;
    delete: string;
  };
};

const MAX_PREVIEW = 2;

export default function ContactCard({
  contact,
  coolingUnits,
  isProcessing,
  onToggleStatus,
  onEdit,
  onDelete,
  unassignedLabel,
  translations,
}: ContactCardProps) {
  const [roomMenuVisible, setRoomMenuVisible] = useState<boolean>(false);
  const anchorRef = useRef<View>(null);

  const roomNames = useMemo(() => {
    const ids =
      contact.coolingUnitId == null
        ? []
        : Array.isArray(contact.coolingUnitId)
          ? contact.coolingUnitId
          : [contact.coolingUnitId];
    return ids.map((id) => coolingUnits.find((u) => u.id === id)?.name).filter(Boolean) as string[];
  }, [contact.coolingUnitId, coolingUnits]);

  const remaining = Math.max(roomNames.length - MAX_PREVIEW, 0);
  const preview =
    roomNames.length > MAX_PREVIEW
      ? `${roomNames.slice(0, MAX_PREVIEW).join(', ')}, ...`
      : roomNames.join(', ');

  const isInactive = !contact.isActive;

  const anchor = (
    <View ref={anchorRef}>
      <TouchableOpacity
        onPress={() => roomNames.length && setRoomMenuVisible(true)}
        disabled={roomNames.length <= 2}
      >
        <View tw="flex flex-row items-center justify-between pt-3 space-x-3">
          <Text tw="text-sm text-zinc-900 flex-shrink-0">{translations.rooms}</Text>
          <View tw="flex-1 flex-row items-center space-x-2 justify-end max-w-[260px]">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              tw={cn(
                'text-sm font-medium text-gray-500 text-right flex-1',
                isInactive && 'text-gray-400'
              )}
            >
              {roomNames.length ? preview : unassignedLabel}
            </Text>
            {remaining > 0 ? (
              <Text tw="text-sm text-blue-600 font-semibold">{`${remaining} more`}</Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View tw="w-full px-5 py-4 space-y-3 border border-solid border-zinc-300 rounded-2xl my-2">
      <View tw={cn('space-y-3', isInactive && 'opacity-50')}>
        <View tw="flex flex-row items-center justify-between">
          <Text tw="text-sm text-zinc-900">{translations.companyName}</Text>
          <Text tw={cn('text-sm font-medium text-gray-500', isInactive && 'text-gray-400')}>
            {contact.deliveryCompanyName}
          </Text>
        </View>

        <Divider tw="bg-zinc-300" />

        <View tw="flex flex-row items-center justify-between">
          <Text tw="text-sm text-zinc-900">{translations.contactName}</Text>
          <Text tw={cn('text-sm font-medium text-gray-500', isInactive && 'text-gray-400')}>
            {contact.contactName}
          </Text>
        </View>

        <Divider tw="bg-zinc-300" />

        <View tw="flex flex-row items-center justify-between">
          <Text tw="text-sm text-zinc-900">{translations.phoneNumber}</Text>
          <Text tw={cn('text-sm font-medium text-gray-500', isInactive && 'text-gray-400')}>
            {contact.phone}
          </Text>
        </View>

        <Divider tw="bg-zinc-300" />

        <Menu
          visible={roomMenuVisible}
          onDismiss={() => setRoomMenuVisible(false)}
          anchor={anchor}
          anchorPosition="bottom"
          contentStyle={{
            paddingVertical: 10,
            marginStart: Dimensions.get('window').width / 2,
            backgroundColor: '#111827',
            borderRadius: 10,
          }}
        >
          {roomNames.map((name) => (
            <Menu.Item
              key={name}
              title={`\u2022 ${name}`}
              titleStyle={{ color: 'white' }}
              style={{ backgroundColor: '#111827' }}
            />
          ))}
        </Menu>
      </View>

      <View tw="flex flex-row justify-end space-x-2 pt-2">
        <Button
          labelStyle="text-sm leading-[16px] tracking-[-0.2px] text-blue-500"
          mode="text"
          onPress={onToggleStatus}
          uppercase
          icon={isInactive ? 'eye-outline' : 'eye-off-outline'}
          contentStyle="flex flex-row-reverse items-center"
          disabled={isProcessing}
        >
          {isInactive ? translations.show : translations.hide}
        </Button>

        <Button
          labelStyle="text-sm leading-[16px] tracking-[-0.2px] text-teal-600"
          mode="text"
          onPress={onEdit}
          uppercase
          icon="pencil-outline"
          contentStyle="flex flex-row-reverse items-center"
        >
          {translations.edit}
        </Button>

        <Button
          labelStyle="text-sm leading-[16px] tracking-[-0.2px] text-red-700"
          mode="text"
          onPress={onDelete}
          uppercase
          icon="trash-can-outline"
          contentStyle="flex flex-row-reverse items-center"
          disabled={isProcessing}
        >
          {translations.delete}
        </Button>
      </View>
    </View>
  );
}
