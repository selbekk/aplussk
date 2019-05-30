import React from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import Page from '../components/page';
import { Paragraph } from '../components/typography';
import TableExplorer from '../components/table-explorer';
import FullPageBackground from '../components/full-page-background';

const FancyHeading = styled.h1`
  font-family: Satisfy, cursive;
  color: inherit;
`;

const CenteredContent = styled.section`
  text-align: center;
  margin: 0 auto;
  max-width: 1000px;
`;

const Gjestene = props => {
  return (
    <Page
      title="Gjestene"
      fontColor="black"
      head={
        <link
          href="https://fonts.googleapis.com/css?family=Satisfy&display=swap"
          rel="stylesheet"
        />
      }
    >
      <FullPageBackground backgroundColor="orange">
        <CenteredContent>
          <img
            src="https://media.giphy.com/media/3KC2jD2QcBOSc/giphy.gif"
            alt="To Minions som skåler og sier It's time to party!"
            style={{ maxWidth: '100%' }}
          />
          <FancyHeading>Gjester og bordplassering</FancyHeading>
          <Paragraph>
            Det beste med bryllup er å bli kjent med resten av gjestene. <br />
            Her har du muligheten til å bli bedre kjent med de du skal sitte på
            bord med!
          </Paragraph>
          <TableExplorer guests={props.guests} />
        </CenteredContent>
      </FullPageBackground>
    </Page>
  );
};

Gjestene.getInitialProps = async ({ req }) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const response = await fetch(`${baseUrl}/guests`);
  const guests = (await response.json()) || [];
  return {
    guests,
  };
};

export default Gjestene;
