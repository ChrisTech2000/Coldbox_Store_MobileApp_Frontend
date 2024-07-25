import React, { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Mapbox, {
  MapView,
  Camera,
  PointAnnotation,
  UserLocation,
  type MapState,
} from '@rnmapbox/maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useSupercluster from 'use-supercluster';

import { Text } from '#ui/components/Text';

import { paperTheme } from '#ui/lib/theme';

import { type MarkerDatum } from '../utils';

Mapbox.setAccessToken(
  'pk.***REMOVED***.***REMOVED***'
);

const MIN_ZOOM = 4;

const _MapContext = createContext<MapState>({} as MapState);

function _Root(
  props: PropsWithChildren<{
    coords: [number, number];
    style?: StyleProp<ViewStyle>;
  }>
) {
  const { style, coords, children } = props;

  const [state, setState] = useState<MapState>({} as MapState);

  return (
    <MapView
      style={style}
      styleURL="mapbox://styles/mapbox/streets-v12"
      rotateEnabled={false}
      scaleBarEnabled={false}
      onMapIdle={setState}
      zoomEnabled
    >
      <Camera centerCoordinate={coords} maxZoomLevel={16} minZoomLevel={MIN_ZOOM} />
      <UserLocation />
      <_MapContext.Provider value={state}>{children}</_MapContext.Provider>
    </MapView>
  );
}

type ClusterNode = {
  geometry: {
    coordinates: Array<number>;
    type: string;
  };
  id: number;
  properties: {
    cluster: boolean;
    cluster_id: number;
    point_count: number;
    point_count_abbreviated: number;
    id?: number;
  };
  type: string;
};

function _Markers(props: { markers: Array<MarkerDatum> }) {
  const { markers } = props;

  const state = useContext(_MapContext);

  const bounds = state?.properties?.bounds ?? { ne: [], sw: [] };
  const zoom = state?.properties?.zoom ?? MIN_ZOOM;

  const { clusters } = useSupercluster({
    points: useMemo(
      () =>
        markers.map((marker, markerIdx) => ({
          type: 'Feature',
          properties: {
            cluster: false,
            category: 'markers',
            id: markerIdx + 1,
          },
          geometry: {
            type: 'Point',
            coordinates: [marker.longitude, marker.latitude],
          },
        })),
      [markers]
    ),
    bounds: [bounds.sw, bounds.ne].flat() as [number, number, number, number],
    zoom: zoom,
    options: { radius: 20, maxZoom: 25 },
  });

  return (
    <React.Fragment>
      {clusters.map((node: ClusterNode, nodeIdx) => {
        const { coordinates } = node.geometry;
        const { cluster, point_count, cluster_id, id: markerId } = node.properties;

        const hasBeenUsedByFarmer =
          typeof markerId === 'number' ? markers[markerId - 1].hasBeenUsedByFarmer : false;
        const color = hasBeenUsedByFarmer ? '#0000F0' : '#FB7D00';
        const renderId = `cluster-node-${cluster_id}-#${nodeIdx}`;

        if (cluster) {
          return (
            <PointAnnotation key={renderId} id={renderId} coordinate={coordinates}>
              <View
                tw="h-7 w-7 rounded-full items-center justify-center"
                style={{ backgroundColor: paperTheme.colors.primary }}
              >
                <Text style={{ color: 'white' }}>{point_count}</Text>
              </View>
            </PointAnnotation>
          );
        }

        return (
          <PointAnnotation key={renderId} id={renderId} coordinate={coordinates}>
            <Icon name="map-marker" size={40} color={color} />
          </PointAnnotation>
        );
      })}
    </React.Fragment>
  );
}

export { _Root as Root, _Markers as Markers };
