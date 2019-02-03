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

  let offset = distance * parentWidth / maxDistance;
  let minusOffset = 0;

  if (boxRef.current) {
    const boxWidth = boxRef.current.getBoundingClientRect().width;
    if (parentWidth - offset < boxWidth) {
      minusOffset = boxWidth;
    }
  }

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