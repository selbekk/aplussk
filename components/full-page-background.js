import styled from 'styled-components';

const FullPageBackground = styled.div`
  background: ${props => props.backgroundColor}
    url(${props => props.backgroundImage}) center center;
  min-height: 100vh;
  padding: 20px;
  width: 100vw;
  ${props =>
    props.center &&
    `
    display: flex; align-items: center; justify-content: center; flex-direction: column;
  `}
`;
FullPageBackground.defaultProps = {
  backgroundColor: '',
  backgroundImage: '',
  center: false,
};
export default FullPageBackground;
