import {
  Camera,
  CircleLayer,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Position } from '../../../../lib/typescript/src/types/Position';
import { geometry } from '@turf/helpers';

const styles = {
  mapView: { flex: 1 },
  circleLayer: {
    circleRadiusTransition: { duration: 5000, delay: 0 },
    circleColor: '#ff0000',
  },
};

const ExcessiveCallbacksBug = () => {
  const [position, setPosition] = useState<Position>([-74.00597, 40.71427]);

  useEffect(() => {
    setInterval(() => {
      move();
    }, 50)
  }, [])

  const move = useCallback(() => {
    setPosition(prev => [prev[0] + 0.0001, prev[1] + 0.0001])
  }, [])

  const point = useMemo(() => {
    return geometry('Point', position)
  }, [position])

  const circleLayerStyle = {
    ...styles.circleLayer,
    ...{ circleRadius: 10 },
  };

  return (
    <>
      <MapView style={styles.mapView}>
        <Camera defaultSettings={{ centerCoordinate: position }} centerCoordinate={position} zoomLevel={14} />
        <ShapeSource id={'shape-source-id-0'} shape={point}>
          <CircleLayer id={'circle-layer'} style={circleLayerStyle} />
          <SymbolLayer
            id="symbol-id"
            style={{
              iconImage: ['get', 'icon'],
            }}
          />
        </ShapeSource>
      </MapView>
    </>
  );
};

export default ExcessiveCallbacksBug;
