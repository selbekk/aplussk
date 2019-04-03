import styled, { css, keyframes } from 'styled-components';

const spinning = keyframes`
from {
  transform: none;
}
to {
  transform: rotateY(360deg) rotateX(360deg);
}
`;

export const HeroHeading = styled.h1`
  color: inherit;
  font-family: ${props => props.theme.headingFont};
  font-size: 48px;
  margin: 0 0 24px;
`;

export const Paragraph = styled.p`
  color: inherit;
  font-family: ${props => props.theme.bodyFont};
  font-size: 18px;
  margin: 0 0 1em;
  line-height: 1.337;
  ${props =>
    props.spinning &&
    css`
      animation: ${spinning} 2s linear infinite;
    `}
`;

export const SectionHeading = styled.h2`
  color: ${props => props.theme.secondaryTextColor};
  font-family: ${props => props.theme.bodyFont};
  font-size: 32px;
  margin: 0;
`;

export const LinkText = styled.a`
  color: inherit;
  &::after {
    content: '👉';
    display: inline-block;
    margin-left: 5px;
    transition: all 0.5s ease-out;
  }
  &:hover {
    &::after {
      transform: rotate(-360deg) scale(1.5);
    }
  }
`;
