import styled from 'styled-components';

const Input = styled.input`
  background: white;
  border: 3px solid ${props => props.theme.primaryColor};
  border-radius: 0;
  padding: 5px 10px;
`;

export default Input;
