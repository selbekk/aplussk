import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  background: hotpink;
  color: white;
  display: inline-block;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 16px;
`;

const Wrapper = styled.div`
  margin-bottom: 1em;
`;

const Error = styled.span`
  background-color: red;
  color: white;
  display: block;
  padding: 2px;
  margin: 5px 0;
`;

const InputGroup = props => (
  <Wrapper>
    <Label htmlFor={props.name}>{props.label}</Label>
    <br />
    {React.Children.map(props.children, child =>
      React.cloneElement(child, { name: props.name }),
    )}
    {props.error && <Error>❗️ {props.error}</Error>}
  </Wrapper>
);
export default InputGroup;
