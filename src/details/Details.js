import React, { createContext, useReducer, useContext, useEffect } from 'react';

import { getRoute } from '../misc/fakeAPI';
import { convertGpxToJson, useFetcher } from '../misc/helpers';
import Map from './map/Map';
import ElevationProfile from './elevationProfile/ElevationProfile';
import Header from './header/Header';
import * as Styled from './styled';

const DetailsContext = createContext(null);

export function useDetailsContext() {
  return useContext(DetailsContext);
}

const initialState = {
  isIndicatorVisible: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROUTE':
      return {
        ...state,
        selectedRoute: convertGpxToJson(action.payload)
      };
    case 'SET_INDICATOR':
      return {
        ...state,
        indicator: action.payload
      };
    case 'SHOW_INDICATOR':
      return {
        ...state,
        isIndicatorVisible: true
      };
    case 'HIDE_INDICATOR':
      return {
        ...state,
        isIndicatorVisible: false
      };
    default:
      return state;
  }
}

export default function Details({ id }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [routeGpx] = useFetcher(
    () => getRoute(id),
    [id]
  );

  useEffect(() => {
    if (routeGpx) {
      dispatch({ type: 'SET_ROUTE', payload: routeGpx })
    }
  }, [routeGpx]);

  return <DetailsContext.Provider value={[state, dispatch]}>
    <Styled.Container>
      <Styled.Shadow/>
      {state.selectedRoute && <Header/>}
      <Map/>
      {state.selectedRoute && <ElevationProfile/>}
    </Styled.Container>
  </DetailsContext.Provider>;
}