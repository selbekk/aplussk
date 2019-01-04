import React from 'react';
import Link from 'next/link';
import Page from '../components/page';
import FullPageBackground from '../components/full-page-background';
import {
  HeroHeading,
  SectionHeading,
  Paragraph,
  LinkText,
} from '../components/typography';
import PrimaryButton from '../components/primary-button';
import RandomDivider from '../components/random-divider';
import Box from '../components/box';
import Marquee from '../components/marquee';

const Home = () => (
  <Page title="Anne Kristine og Kristofer gifter seg">
    <FullPageBackground backgroundImage="https://media.giphy.com/media/TxVVB6PfWMjE4/giphy.gif">
      <HeroHeading>
        <Marquee>
          Velkommen til Anne Kristine og Kristofer sin bryllupsside
        </Marquee>
      </HeroHeading>
      <Paragraph>
        Hei! Tusen takk for at du tok turen innom hjemmesiden vår! Vi skal gifte
        oss, og dette er siden du finner alt du trenger på!
      </Paragraph>
      <Link passHref href="/rsvp">
        <PrimaryButton as="a">RSVP</PrimaryButton>
      </Link>
      <RandomDivider />
      <Box>
        <SectionHeading>Hva trenger jeg å vite</SectionHeading>
        <Paragraph>
          <strong>
            Bryllupet er i{' '}
            <LinkText href="http://bit.ly/fagerborg-kirke">
              Fagerborg kirke
            </LinkText>
          </strong>
          , og starter kl 14.30.
        </Paragraph>
        <Paragraph>
          <strong>
            Festen er på{' '}
            <LinkText href="http://bit.ly/månefisk1">Månefisken</LinkText>
          </strong>
          , og starter kl. 17.00.
        </Paragraph>
        <Paragraph>Mer informasjon kommer snart</Paragraph>
        <img
          src="https://media.giphy.com/media/jRo58r119OsF2/giphy.gif"
          alt="En romkatt"
        />
      </Box>
    </FullPageBackground>
  </Page>
);

export default Home;
