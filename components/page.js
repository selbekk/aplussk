import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Head from './head';
import GlobalStyles from './global-styles';
import { sillyTheme } from '../constants/themes';
import FancyCursor from '../components/fancy-cursor';

const FontColorWrapper = styled.div`
  color: ${props => props.fontColor || 'white'};
`;

const Page = props => (
  <ThemeProvider theme={sillyTheme}>
    <div>
      <GlobalStyles />
      <Head
        title={props.title}
        description={props.description}
        image={props.image}
      />
      <FancyCursor />
      <FontColorWrapper fontColor={props.fontColor}>
        {props.children}
      </FontColorWrapper>
    </div>
  </ThemeProvider>
);

export default Page;
