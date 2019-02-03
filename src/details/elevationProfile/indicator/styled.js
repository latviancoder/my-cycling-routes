import styled from '@emotion/styled';

export const Line = styled.div`
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

export const Box = styled.div`
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