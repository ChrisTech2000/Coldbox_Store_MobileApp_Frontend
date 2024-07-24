import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GetLocation, { type Location } from 'react-native-get-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { useShallow } from 'zustand/react/shallow';
import ms from 'ms';

import { withSafeArea } from '#ui/primitives/withSafeArea';

// import { useDashboardStore } from '#stores/dashboard';

function CoolingUnitsMaps() {
  const [coordinates, setCoordinates] = useState<Location | undefined>(undefined);

  // const [farmerId, farmerCoolingUnits] = useDashboardStore(
  //   useShallow((store) => [store.farmerId, store.coolingUnits])
  // );

  useFocusEffect(
    useCallback(() => {
      async function getCoordinates() {
        const result = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: ms('6 seconds'),
        });
        setCoordinates(result);
      }

      try {
        void getCoordinates();
      } catch (exception) {
        console.error(exception);
      }
    }, [])
  );

  return (
    <View tw="flex-1">
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates?.latitude ?? 0,
          longitude: coordinates?.longitude ?? 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        rotateEnabled={false}
        zoomEnabled={true}
        mapType="standard"
        provider={PROVIDER_GOOGLE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('screen').height / 1.618,
    width: '100%',
  },
});

export default withSafeArea(CoolingUnitsMaps);
