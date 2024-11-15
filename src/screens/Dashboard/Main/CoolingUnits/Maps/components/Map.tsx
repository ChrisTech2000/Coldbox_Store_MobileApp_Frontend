import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Mapbox, {
  MapView,
  Camera,
  PointAnnotation,
  UserLocation,
  type MapState,
} from '@rnmapbox/maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text } from '#ui/components/Text';

import { MAPBOX_ACCESS_TOKEN } from '#constants/environment';
import { paperTheme } from '#ui/lib/theme';

import { useMapCluster, type MarkerDatum } from '../utils';
import { PIN_COLORS } from '../constants';

const DEFAULT_STATE = {} as MapState;
const MIN_ZOOM = 4;

const _MapContext = createContext<MapState>(DEFAULT_STATE);

function _Root(
  props: PropsWithChildren<{
    coordinates: [number, number];
    style?: StyleProp<ViewStyle>;
  }>
) {
  const { style, coordinates, children } = props;

  const [state, setState] = useState<MapState>(DEFAULT_STATE);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN as string).then((value) => {
      if (!value) return;
      setIsReady(true);
    });
  }, []);

  if (!isReady) return null;

  return (
    <MapView
      style={style}
      styleURL="mapbox://styles/mapbox/streets-v12"
      rotateEnabled={false}
      scaleBarEnabled={false}
      onMapIdle={setState}
      zoomEnabled
    >
      <Camera centerCoordinate={coordinates} maxZoomLevel={16} minZoomLevel={MIN_ZOOM} />
      <UserLocation />
      <_MapContext.Provider value={state}>{children}</_MapContext.Provider>
    </MapView>
  );
}

function _Markers(props: {
  markers: Array<MarkerDatum>;
  onSelect?: (markerDatumIndex: number) => void;
}) {
  const { markers, onSelect } = props;

  const state = useContext(_MapContext);

  const bounds = state?.properties?.bounds ?? { ne: [], sw: [] };
  const zoom = state?.properties?.zoom ?? MIN_ZOOM;

  const clusters = useMapCluster(markers, { bounds, zoom });

  return (
    <React.Fragment>
      {clusters.map((node, nodeIdx) => {
        const { coordinates } = node.geometry;
        const { cluster, point_count, cluster_id, indexPos } = node.properties;

        const hasBeenUsedByFarmer =
          typeof indexPos === 'number' ? markers[indexPos].hasBeenUsedByFarmer : false;
        const color = hasBeenUsedByFarmer ? PIN_COLORS.USED : PIN_COLORS.PUBLIC;

        if (cluster) {
          const attrId = `cluster-node-${cluster_id}`;
          return (
            <PointAnnotation key={attrId} id={attrId} coordinate={coordinates}>
              <View
                tw="h-7 w-7 rounded-full items-center justify-center"
                style={{ backgroundColor: paperTheme.colors.primary }}
              >
                <Text style={{ color: 'white' }}>{point_count}</Text>
              </View>
            </PointAnnotation>
          );
        }

        const attrId = `cluster-node-#${nodeIdx}`;
        return (
          <PointAnnotation
            key={attrId}
            id={attrId}
            coordinate={coordinates}
            onSelected={() => {
              if (typeof indexPos !== 'number') return;
              onSelect?.(indexPos);
            }}
          >
            <Icon name="map-marker" size={40} color={color} />
          </PointAnnotation>
        );
      })}
    </React.Fragment>
  );
}

export { _Root as Root, _Markers as Markers };
