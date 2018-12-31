import styled from 'styled-components';

const Dropdown = styled.select`
  background: white;
  border: 10px solid lime;
  border-radius: 0;
  color: rebeccapurple;
  padding: 10px;
  appearance: none;
  transform: rotate(5deg);
  transition: all 0.5s ease-in;

  &:hover,
  &:focus {
    transform: rotate(-5deg);
  }
`;

export default Dropdown;
