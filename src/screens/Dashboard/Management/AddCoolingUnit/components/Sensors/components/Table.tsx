import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { DataTable, Dialog, Portal } from 'react-native-paper';

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

    const { type: sensorType, dateSensorFirstLinked, username, sourceId } = contextualSensor;

    const commonFields = [
      { name: 'Sensor Type', value: sensorType.charAt(0).toUpperCase() + sensorType.slice(1) },
      { name: 'Date Added', value: dateSensorFirstLinked ? dateFmt(dateSensorFirstLinked) : '' },
      { name: 'Username', value: username },
    ] satisfies RowsDatums;

    let specificFields: RowsDatums = [];

    switch (sensorType) {
      case 'ecozen':
      case 'victron':
        specificFields = [{ name: 'Machine ID', value: sourceId }];
        break;

      case 'ubibot':
        specificFields = [{ name: 'Channel ID', value: sourceId }];
        break;

      case 'figorr':
        specificFields = [
          { name: 'Device Tag', value: sourceId },
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
        <Dialog
          visible={isVisible}
          onDismiss={toggleVisibility}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Content>
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleVisibility}>{t('actions.close')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
}
