import styled, { keyframes } from 'styled-components';

const ltr = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`;

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Text = styled.div`
  animation: 6s infinite linear ${props => (props.reverse ? 'reverse' : '')}
    ${ltr};
`;

const Marquee = props => (
  <Container>
    <Text {...props} />
  </Container>
);

export default Marquee;
