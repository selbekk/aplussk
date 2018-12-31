import styled from 'styled-components';

const PrimaryButton = styled.button`
  appearance: none;
  background-color: transparent;
  border: 3px solid ${props => props.theme.primaryColor};
  border-radius: 0;
  color: ${props => props.theme.primaryOppositeColor};
  padding: 20px;
`;

export default PrimaryButton;
