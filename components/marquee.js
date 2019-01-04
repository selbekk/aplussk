import styled, { keyframes } from 'styled-components';

const ltr = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`;

const Marquee = styled.div`
  animation: 6s infinite linear ${props => (props.reverse ? 'reverse' : '')}
    ${ltr};
`;

export default Marquee;
