import startCase from 'lodash/startCase';
import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { DataTable, Dialog, Portal, Text } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { useToggle } from '#ui/hooks/useToggle';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import type { GetCoolingUnitSensorDataResponse } from '#types/api.responses';
import { ESensorType } from '#types/global';

type RowsDatums = Array<{ name: string; value: string }>;

export default function TableModal(props: {
  datums: GetCoolingUnitSensorDataResponse['sensorData'];
}) {
  const { datums } = props;

  const { t } = useTranslationUtils();
  const [isVisible, toggleVisibility] = useToggle(false);

  const rows = useMemo(() => {
    const contextualSensor = datums.at(0);
    if (typeof contextualSensor === 'undefined') return [];

    const { type: sensorType, dateSensorFirstLinked, username, sourceId } = contextualSensor;

    const commonFields = [
      {
        name: t('Dashboard.Management.AddCoolingUnit.fields.sensorType'),
        value:
          sensorType === ESensorType.VICTRON
            ? `${startCase(sensorType)} Energy`
            : startCase(sensorType),
      },
      {
        name: t('Dashboard.Management.AddCoolingUnit.fields.dateAdded'),
        value: dateSensorFirstLinked ? dateFmt(dateSensorFirstLinked) : '',
      },
      { name: t('Dashboard.Management.AddCoolingUnit.fields.ecozen.username'), value: username },
    ] satisfies RowsDatums;

    let specificFields: RowsDatums = [];

    switch (sensorType) {
      case 'ecozen':
      case 'victron':
        specificFields = [
          { name: t('Dashboard.Management.AddCoolingUnit.fields.machineId'), value: sourceId },
        ];
        break;

      case 'ubibot':
        specificFields = [
          { name: t('Dashboard.Management.AddCoolingUnit.fields.channelId'), value: sourceId },
        ];
        break;

      case 'figorr':
        specificFields = [
          { name: t('Dashboard.Management.AddCoolingUnit.fields.deviceTag'), value: sourceId },
        ];
        break;

      default:
        break;
    }

    return commonFields.concat(specificFields);
  }, [datums, t]);

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
                <DataTable.Title>{t('Dashboard.Management.Location.fields.name')}</DataTable.Title>
                <DataTable.Title>
                  {t('Dashboard.Management.AddCoolingUnit.fields.value')}
                </DataTable.Title>
              </DataTable.Header>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={rows}
                keyExtractor={(_, idx) => `data-table-row-#${idx}`}
                renderItem={({ item }) => (
                  <DataTable.Row>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>
                      <Text
                        numberOfLines={3}
                        style={{
                          flexWrap: 'wrap',
                          width: '90%',
                        }}
                      >
                        {item.value}
                      </Text>
                    </DataTable.Cell>
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
