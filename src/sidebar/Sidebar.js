import React, { useState } from 'react';
import * as Styled from './styled';

export default function Sidebar({ routes, selectedRouteId, onChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  return <Styled.Container>
    <div style={{ position: 'relative' }}>
      <Styled.Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {!searchQuery && <Styled.Placeholder>
        <i className="fa fa-search"/>
      </Styled.Placeholder>}
    </div>

    {routes && routes
      .filter(route => route.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(route => {
        return <Styled.Route
          key={route.id}
          onClick={() => onChange(route.id)}
          selected={selectedRouteId === route.id}
        >
          <i className="fa fa-bicycle"/>
          {route.name}
        </Styled.Route>;
      })
    }
  </Styled.Container>;
}