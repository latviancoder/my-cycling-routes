import React, { useState, lazy, Suspense } from 'react';
import { Global } from '@emotion/core';
import Spinner from 'react-md-spinner';

import Sidebar from './sidebar/Sidebar';
import { getRoutes } from './misc/fakeAPI';
import { useFetcher } from './misc/helpers';
import * as Styled from './styled';

const Details = lazy(() => import('./details/Details'));

function App() {
  const [routes, isFetching] = useFetcher(
    getRoutes,
    []
  );

  const [selectedRouteId, setSelectedRouteId] = useState();

  return <>
    <Global styles={Styled.globalStyles}/>
    {isFetching && <Spinner/>}

    {!isFetching && routes && (
      <Styled.Container>

        <Sidebar
          routes={routes}
          selectedRouteId={selectedRouteId}
          onChange={setSelectedRouteId}
        />

        <Suspense fallback={<Spinner/>}>
          <Details id={selectedRouteId}/>
        </Suspense>

      </Styled.Container>
    )}
  </>;
}

export default App;
