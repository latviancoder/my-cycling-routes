import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';

const markerSVG = <svg xmlns='http://www.w3.org/2000/svg'>
  <circle cx="10" cy="10" r="6" stroke="white" strokeOpacity="1" strokeWidth="2" fill="#70A5C9" fillOpacity="1"/>
</svg>;

const markerString = ReactDOMServer.renderToString(markerSVG);

export const markerIcon = L.icon({
  iconUrl: encodeURI("data:image/svg+xml," + markerString).replace('#', '%23'),
  iconSize: 20
});