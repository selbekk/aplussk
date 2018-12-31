import styled from 'styled-components';

export const HeroHeading = styled.h1`
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.headingFont};
  font-size: 48px;
  margin: 0 0 24px;
`;

export const Paragraph = styled.p`
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.bodyFont};
  font-size: 18px;
  margin: 0 0 1em;
`;

export const SectionHeading = styled.h2`
  color: ${props => props.theme.secondaryTextColor};
  font-family: ${props => props.theme.bodyFont};
  font-size: 32px;
  margin: 0;
`;

export const LinkText = styled.a`
  color: ${props => props.theme.textColor};
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
