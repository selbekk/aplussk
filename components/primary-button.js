import styled from 'styled-components';

const PrimaryButton = styled.button`
  appearance: none;
  background-color: ${props => props.theme.primaryColor};
  border: 3px solid ${props => props.theme.primaryColor};
  border-radius: 0;
  color: ${props => props.theme.primaryOppositeColor};
  display: inline-block;
  padding: 20px;
  margin: 10px;
  text-decoration: none;
  font-size: 2em;
`;

export default PrimaryButton;
