import styled from 'styled-components';

const FullPageBackground = styled.div`
  background: ${props => props.backgroundColor}
    url(${props => props.backgroundImage}) top left;
  min-height: 100vh;
  padding: 20px;
  width: 100vw;
`;
export default FullPageBackground;
