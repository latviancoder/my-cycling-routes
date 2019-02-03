import React from 'react';
import styled from '@emotion/styled';
import { useDetailsContext } from '../Details';
import { secondsToHm } from '../../helpers';

const StyledContainer = styled.div`
  flex: 0 0 50px;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px #ddd solid;
  padding-left: 20px;
`;

const StyledItem = styled.div`
  margin-right: 15px;
  display: flex;
  align-items: center;
  .fa {
    font-size: 14px;
    color: #b5b5b5;
    margin-right: 5px;
  }
`;

export default function Header() {
  const [state] = useDetailsContext();

  const { totalDistance, totalPositiveElevation, totalNegativeElevation, totalTime } = state.selectedRoute;

  return <StyledContainer>
    <StyledItem>
      <i className="fa fa-clock-o"/>
      {secondsToHm(totalTime)}
    </StyledItem>
    <StyledItem>
      <i className="fa fa-arrows-h"/>
      {Math.round(totalDistance)}km
    </StyledItem>
    <StyledItem>
      <i className="fa fa-arrow-up"/>
      {Math.round(totalPositiveElevation)}m
    </StyledItem>
    <StyledItem>
      <i className="fa fa-arrow-down"/>
      {Math.round(totalNegativeElevation)}m
    </StyledItem>
  </StyledContainer>;
}