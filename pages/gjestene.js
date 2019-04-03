import React from 'react';
import fetch from 'isomorphic-fetch';
import Page from '../components/page';
import { HeroHeading, Paragraph } from '../components/typography';
import TableExplorer from '../components/table-explorer';

const Gjestene = props => {
  return (
    <Page title="Gjestene">
      <HeroHeading>Bli bedre kjent med de andre gjestene</HeroHeading>
      <Paragraph>
        Det beste med bryllup er å bli bedre kjent med resten av gjestene. Her
        har du muligheten til å bli bedre kjent på 1-2-3!
      </Paragraph>
      <TableExplorer guests={props.guests} />
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
