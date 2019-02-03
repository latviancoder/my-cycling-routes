import styled from '@emotion/styled';

export const Placeholder = styled.div`
  position: absolute;
  top: 8px;
  left: 10px;
  color: #D1CFD1;
  margin: auto;
  font-size: 28px;
`;

export const Container = styled.div`
  flex: 0 0 280px;
`;

export const Route = styled.div`
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  font-weight: bold;
  background: ${props => props.selected && '#f4f4f4'};
  &:hover {
    background: #f4f4f4;
  }
  .fa {
    font-size: 25px;
    margin-right: 10px;
  }
`;

export const Input = styled.input`
  width: 100%;
  display: block;
  height: 50px;
  padding: 5px 10px;
  border: 0;
  border-bottom: 1px #ddd solid;
  outline: none;
  position: relative;
  font-size: 15px;
`;

