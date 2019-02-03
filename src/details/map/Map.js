import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import sphereKnn from 'sphere-knn';

import { useDetailsContext } from '../Details';
import { markerIcon } from './markerIcon';

export default function Map() {
  const [state, dispatch] = useDetailsContext();

  const mapRef = useRef();
  const routeRef = useRef();
  const positionMarkerRef = useRef();

  // Initialize map and marker on initial mount
  useEffect(() => {
    mapRef.current = L.map('map', {
      zoomControl: false,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      ]
    }).setView([51.505, -0.09], 2);

    // Dummy current position marker, will be moved later
    positionMarkerRef.current = L.marker(
      [0, 0],
      { interactive: false, icon: markerIcon }
    ).addTo(mapRef.current);
  }, []);

  // When route changes
  useEffect(() => {
    if (state.selectedRoute) {
      const { route } = state.selectedRoute;
      const routeLookup = sphereKnn(route);

      const latlngs = [
        route.map(e => [e.lat, e.lon])
      ];

      // Draw two polylines
      routeRef.current = [
        L.polyline(latlngs, {
          color: '#fff',
          weight: 9
        }).addTo(mapRef.current),
        L.polyline(latlngs, {
          color: '#70A5C9',
          weight: 4,
          interactive: false
        }).addTo(mapRef.current)
      ];

      // Move map to route bounds with 3km padding
      mapRef.current.fitBounds(routeRef.current[0].getBounds(), { padding: [3, 3] });

      // Show marker/indicator when moving cursor over route
      mapRef.current
        // Unsubscribe to prevent memory leaks
        .off('mousemove')
        .off('mouseout')
        .on('mouseout', () => dispatch({ type: 'HIDE_INDICATOR' }))
        // Instead of subscribing to polyline we subscribe to the whole map and try to determine the nearest route point
        .on('mousemove', (e) => {
          const foundPoint = routeLookup(e.latlng.lat, e.latlng.lng, 1, 500);
          if (foundPoint.length) {
            dispatch({ type: 'SHOW_INDICATOR' });
            dispatch({ type: 'SET_INDICATOR', payload: foundPoint[0] });
          } else {
            dispatch({ type: 'HIDE_INDICATOR' });
          }
        });

      mapRef.current.invalidateSize();
    }
    // Remove current route from map when opening different route or unmounting
    return () => {
      if (routeRef.current) {
        routeRef.current[0].remove();
        routeRef.current[1].remove();
      }
    };
  }, [state.selectedRoute]);

  // Move marker to new position on map
  useEffect(() => {
    if (state.indicator) {
      positionMarkerRef.current.setLatLng([state.indicator.lat, state.indicator.lon]);
    }
  }, [state.indicator]);

  // Hide or show marker depending on the interaction
  useEffect(() => {
    positionMarkerRef.current.setOpacity(state.isIndicatorVisible ? 1 : 0);
  }, [state.isIndicatorVisible]);

  return <div style={{ flex: 1 }}>
    <div id="map" style={{ height: '100%' }}/>
  </div>;
}