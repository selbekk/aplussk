import React from 'react';
import { ThemeProvider } from 'styled-components';
import Head from './head';
import GlobalStyles from './global-styles';
import { sillyTheme } from '../constants/themes';
import FancyCursor from '../components/fancy-cursor';

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
      {props.children}
    </div>
  </ThemeProvider>
);

export default Page;
