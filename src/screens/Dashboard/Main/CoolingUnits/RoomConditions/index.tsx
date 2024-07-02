import React, { useState } from 'react';
import { Divider, Text } from 'react-native-paper';

import { ScrollView } from '#ui/components/ScrollView';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import SelectCoolingUnit, { type CoolingUnitMockedEntry } from '../../components/SelectCoolingUnit';

const MOCKED_COOLING_UNITS = [
  { name: 'CU098765' },
  { name: 'CU38496' },
  { name: 'unit_1' },
  { name: 'unit_2' },
] satisfies Array<CoolingUnitMockedEntry>;

function CoolingUnitsRoomConditions() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <ScrollView
      contentContainerStyle="mt-5 items-center pb-10"
      showsVerticalScrollIndicator={false}
    >
      <SelectCoolingUnit
        datums={MOCKED_COOLING_UNITS}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />

      <Divider tw="w-full bg-gray-700 my-4" />

      <Text tw="self-start mt-5 mb-4 ml-4" variant="titleLarge">
        Cooling units occupancy and temperature will appear here when you do at least one check-in
        in any room.
      </Text>
    </ScrollView>
  );
}

export default withSafeArea(CoolingUnitsRoomConditions);
