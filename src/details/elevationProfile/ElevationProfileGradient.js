import React, { memo } from 'react';
import { getSlopeColor } from '../../helpers';

const ElevationProfileGradient = memo(
  function({ route, xScale }) {
    return <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        {route.map((point, index) => {
          const slopeColor = getSlopeColor(point.slope);
          
          return <stop
            key={index}
            offset={`${xScale(point.distance) * 100 / 500}%`}
            style={{ stopColor: slopeColor, stopOpacity: 1 }}
          />;
        })}
      </linearGradient>
    </defs>;
  },
  function(prevProps, nextProps) {
    return (prevProps.route.length === nextProps.route.length);
  }
);

export default ElevationProfileGradient;