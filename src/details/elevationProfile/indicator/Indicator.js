import React, { useRef } from 'react';
import { max } from 'd3';

import * as Styled from './styled';
import { useDetailsContext } from '../../Details';
import { getSlopeColor } from '../../../misc/helpers';

export default function Indicator({ parentWidth, ratioTop, ratioLeft }) {
  const boxRef = useRef();
  const [state] = useDetailsContext();

  const { distance, elevation, slope } = state.indicator;
  const maxDistance = max(state.selectedRoute.route, d => d.distance);

  // Calculate left offset in pixels
  let offset = distance * parentWidth / maxDistance;
  let minusOffset = 0;

  if (boxRef.current) {
    const boxWidth = boxRef.current.getBoundingClientRect().width;
    // If there is not enough place on the right side of indicator, move box to the left
    if (parentWidth - offset < boxWidth) {
      minusOffset = boxWidth;
    }
  }

  // 'translate' is more performant than 'left'
  // https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
  return <>
    <Styled.Line
      ratioTop={ratioTop}
      ratioLeft={ratioLeft}
      style={{ transform: `translatex(${offset}px)` }}
    />

    <Styled.Box
      ref={boxRef}
      ratioTop={ratioTop}
      ratioLeft={ratioLeft}
      style={{ transform: `translateX(${offset - (minusOffset ? minusOffset + 10 : -10)}px)` }}
    >
      {Math.round(distance)}km
      / {Math.round(elevation)}m
      / <span style={{ color: getSlopeColor(slope) }}>{Math.round(slope)}%</span>
    </Styled.Box>
  </>;
}