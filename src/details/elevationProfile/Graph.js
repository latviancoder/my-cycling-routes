import React, { memo } from 'react';

const Graph = memo(function({ pathArea, pathLine }) {
  return <>
    {/* We apply our slope gradient as a background */}
    <path d={pathLine} stroke="url(#slopeGradient)" strokeWidth="8" fill="none"/>
    <path d={pathArea} fill="#383838"/>
  </>;
});

export default Graph;