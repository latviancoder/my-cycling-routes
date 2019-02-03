import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: "Lato", sans-serif;
    min-height: 100vh;
    padding: 50px;
    background: linear-gradient(to bottom, #DDE5EC 0% , #70A5C9 100% );
  }
`;

export const Container = styled.div`
  box-shadow: 0 0 30px rgba(0, 0, 0, .15);
  display: flex;
  align-items: stretch;
  background: #fff;
  max-width: 900px;
  min-height: calc(100vh - 100px);
  margin: 0 auto;
`;