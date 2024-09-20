import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { DataTable, Modal, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';

import type { GetCoolingUnitResponse } from '#types/api.responses';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';

type RowsDatums = Array<{ name: string; value: string }>;

export default function TableModal(props: { datums: GetCoolingUnitResponse['sensorList'] }) {
  const { datums } = props;

  const { t } = useTranslationUtils();
  const [isVisible, toggleVisibility] = useToggle(false);

  const rows = useMemo(() => {
    const contextualSensor = datums.at(0);
    if (typeof contextualSensor === 'undefined') return [];

    const {
      type: sensorType,
      dateSensorFirstLinked,
      username,
      machineId,
      channelId,
      field,
    } = contextualSensor;

    const commonFields = [
      { name: 'Sensor Type', value: sensorType.charAt(0).toUpperCase() + sensorType.slice(1) },
      { name: 'Date Added', value: dateFmt(dateSensorFirstLinked) },
      { name: 'Username', value: username },
    ] satisfies RowsDatums;

    let specificFields: RowsDatums = [];

    switch (sensorType) {
      case 'ecozen':
        specificFields = [{ name: 'Machine ID', value: machineId }];
        break;

      case 'ubibot':
        specificFields = [
          { name: 'Channel ID', value: channelId },
          { name: 'Field', value: field ?? '' },
        ];
        break;

      case 'lora':
      case 'mote':
        specificFields = [
          { name: 'Device Tag', value: machineId },
          { name: 'IMEI', value: username },
        ];
        break;

      default:
        break;
    }

    return commonFields.concat(specificFields);
  }, [datums]);

  return (
    <React.Fragment>
      <Button mode="contained" icon="eye-outline" onPress={toggleVisibility}>
        {t('Dashboard.Management.EditCoolingUnit.buttons.viewExisting')}
      </Button>

      <Portal>
        <Modal visible={isVisible} onDismiss={toggleVisibility}>
          <View tw="w-full bg-white rounded-3xl w-11/12 max-w-11/12 h-auto self-center">
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Value</DataTable.Title>
              </DataTable.Header>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={rows}
                keyExtractor={(_, idx) => `data-table-row-#${idx}`}
                renderItem={({ item }) => (
                  <DataTable.Row>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.value}</DataTable.Cell>
                  </DataTable.Row>
                )}
                nestedScrollEnabled
              />
            </DataTable>

            <View tw="self-end px-6 py-2">
              <Button mode="text" onPress={toggleVisibility}>
                {t('actions.close')}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </React.Fragment>
  );
}
