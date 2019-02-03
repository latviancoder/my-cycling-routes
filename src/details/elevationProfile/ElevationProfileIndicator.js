import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { max } from 'd3';

import { useDetailsContext } from '../Details';
import { getSlopeColor } from '../../helpers';

const StyledLine = styled.div`
  position: absolute;
  width: 1px;
  background: lightskyblue;
  pointer-events: none;
  left: ${props => props.ratioLeft * 100}%;
  right: ${props => props.ratioLeft * 100}%;
  top: ${props => props.ratioTop * 100}%;
  bottom: ${props => props.ratioTop * 100}%;
  z-index: 2;
`;

const StyledBox = styled.div`
  position: absolute;
  top: ${props => props.ratioTop * 100}%;
  left: ${props => props.ratioLeft * 100}%;
  font-size: 13px;
  padding: 5px;
  background: #fff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .25);
  pointer-events: none;
  z-index: 1;
  width: 150px;
`;

export default function ElevationProfileIndicator({ parentWidth, ratioTop, ratioLeft }) {
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
    <StyledLine
      ratioTop={ratioTop}
      ratioLeft={ratioLeft}
      style={{ transform: `translatex(${offset}px)` }}
    />

    <StyledBox
      ref={boxRef}
      ratioTop={ratioTop}
      ratioLeft={ratioLeft}
      style={{ transform: `translateX(${offset - (minusOffset ? minusOffset + 10 : -10)}px)` }}
    >
      {Math.round(distance)}km
      / {Math.round(elevation)}m
      / <span style={{ color: getSlopeColor(slope) }}>{Math.round(slope)}%</span>
    </StyledBox>
  </>;
}