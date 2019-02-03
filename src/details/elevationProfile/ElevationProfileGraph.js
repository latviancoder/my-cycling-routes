import React, { memo } from 'react';

const ElevationProfileGraph = memo(function({ pathArea, pathLine }) {
  return <>
    <path d={pathLine} stroke="url(#grad1)" strokeWidth="8" fill="none"/>
    <path d={pathArea} fill="#383838"/>
  </>;
});

export default ElevationProfileGraph;