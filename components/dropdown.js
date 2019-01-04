import styled from 'styled-components';

const Dropdown = styled.select`
  background: white;
  border: 10px solid blue;
  border-radius: 0;
  color: rebeccapurple;
  padding: 10px;
  appearance: none;
  transition: all 1s ease;

  &:hover,
  &:focus {
    transform: rotate(360deg);
  }
`;

export default Dropdown;
