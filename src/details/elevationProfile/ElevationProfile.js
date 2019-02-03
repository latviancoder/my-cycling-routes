import React, { useRef, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import {
  min,
  max,
  scaleLinear,
  axisBottom,
  select,
  axisLeft,
  line,
  curveCatmullRom,
  area,
  mouse,
  bisector,
  extent
} from 'd3';
import ElevationProfileIndicator from './ElevationProfileIndicator';
import { useDetailsContext } from '../Details';
import ElevationProfileGradient from './ElevationProfileGradient';
import ElevationProfileGraph from './ElevationProfileGraph';

const StyledAxis = styled.g`
  fill: #fff;
  line {
    stroke: #b5b5b5;
  }
  
  path {
    stroke: #b5b5b5;
  }
  
  text {
    fill: #b5b5b5;
  }  
`;

const StyledContainer = styled.div`
  flex: 0 0 100px;
  position: relative;
  cursor: crosshair;
`;

const svgWidth = 600;
const svgHeight = 160;

const margin = { top: 30, left: 50 };
const graphWidth = svgWidth - margin.left * 2;
const graphHeight = svgHeight - margin.top * 2;

const bisectDistance = bisector(d => d.distance).left;

export default function ElevationProfile() {
  const [state, dispatch] = useDetailsContext();

  const xAxis = useRef();
  const yAxis = useRef();
  const rectRef = useRef();

  const { route } = state.selectedRoute;

  const xScale = scaleLinear()
    .range([0, graphWidth])
    .domain(extent(route, d => d.distance));

  const yScale = scaleLinear()
    .range([graphHeight, 0])
    .domain([
      min(route, d => d.elevation - 10),
      max(route, d => d.elevation),
    ]);

  const elevationLine = useMemo(() => {
    return line()
      .curve(curveCatmullRom.alpha(1))
      .x(d => xScale(d.distance))
      .y(d => yScale(d.elevation));
  }, [route]);

  const elevationArea = useMemo(() => {
    return area()
      .curve(curveCatmullRom.alpha(1))
      .x(d => xScale(d.distance))
      .y0(graphHeight)
      .y1(d => yScale(d.elevation));
  }, [route]);

  const pathLine = useMemo(() => {
    if (elevationLine && route) {
      return elevationLine(route);
    }
  }, [elevationLine, route]);

  const pathArea = useMemo(() => {
    if (elevationArea && route) {
      return elevationArea(route);
    }
  }, [elevationArea, route]);

  useEffect(() => {
    if (xAxis.current) {
      select(xAxis.current).call(
        axisBottom(xScale)
          .ticks(4)
          .tickFormat(d => `${d}km`)
      );
    }

    if (yAxis.current) {
      select(yAxis.current).call(
        axisLeft(yScale)
          .ticks(4)
          .tickFormat(d => `${d}m`)
      );
    }
  }, []);

  useEffect(() => {
    if (rectRef.current) {
      select(rectRef.current)
        .on('mousemove', null)
        .on('mousemove', function() {
          const relativeX = mouse(this)[0];
          const distanceForThisX = xScale.invert(relativeX);

          // magic
          let i = bisectDistance(route, distanceForThisX, 1),
            p0 = route[i - 1],
            p1 = route[i],
            foundPoint = distanceForThisX - p0.distance > p1.distance - distanceForThisX ? p1 : p0;

          dispatch({
            type: 'SET_INDICATOR',
            payload: foundPoint
          });
        });
    }
  }, [route]);

  return <StyledContainer>
    {state.isIndicatorVisible && state.indicator && (
      <ElevationProfileIndicator
        parentWidth={rectRef.current.getBoundingClientRect().width}
        ratioTop={margin.top / svgHeight}
        ratioLeft={margin.left / svgWidth}
      />
    )}

    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      style={{ display: 'block' }}
    >
      <ElevationProfileGradient
        route={route}
        xScale={xScale}
      />

      <g transform={`translate(${margin.left} ${margin.top})`}>
        <ElevationProfileGraph
          pathLine={pathLine}
          pathArea={pathArea}
        />

        <StyledAxis ref={xAxis} transform={`translate(0 ${graphHeight})`}/>
        <StyledAxis ref={yAxis}/>

        <rect
          ref={rectRef}
          width={graphWidth}
          height={graphHeight}
          fill="transparent"
          onMouseEnter={() => dispatch({ type: 'SHOW_INDICATOR' })}
          onMouseLeave={() => dispatch({ type: 'HIDE_INDICATOR' })}
        />
      </g>
    </svg>
  </StyledContainer>;
}