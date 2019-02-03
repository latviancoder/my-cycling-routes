import styled from '@emotion/styled';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  border-left: 1px #ddd solid;
`;

export const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: -10px;
  bottom: 0;
  width: 10px;
  background: red;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
`;