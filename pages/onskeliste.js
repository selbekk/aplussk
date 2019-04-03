import React from 'react';
import Page from '../components/page';
import Link from 'next/link';
import { Paragraph, SectionHeading, LinkText } from '../components/typography';
import PrimaryButton from '../components/primary-button';
import FullPageBackground from '../components/full-page-background';

export default function Onskeliste() {
  return (
    <Page title="Ønskeliste">
      <FullPageBackground
        backgroundImage="https://media.giphy.com/media/Cv7wrQjYcd6hO/giphy.gif"
        center
      >
        <img
          src="https://web.archive.org/web/20090829124129/http://geocities.com/robespierresim/marriage.gif"
          alt="To som kysser inne i et hjerte"
        />
        <SectionHeading css="color: hotpink">Ønskelister</SectionHeading>
        <Paragraph css="max-width: 400px; text-align: center">
          Lurer du på hva vi ønsker oss i bryllupspresang? Det er helt innafor å
          lure på. Vi har registrert to kjempelange gavelister hos Illums
          Bolighus og Christiania Glasmagasin, så dere har litt å velge mellom.
        </Paragraph>
        <Paragraph>
          Vi har satt opp gaver i alle prisklasser, så det burde være noe for
          alle og enhver.
        </Paragraph>
        <Paragraph spinning>Tusen takk!</Paragraph>
        <Link
          passHref
          href="https://www.illumsbolighus.no/giftlist?giftlist=e3eff9cf"
        >
          <PrimaryButton as="a">Listen på Illums Bolighus</PrimaryButton>
        </Link>
        <Link
          passHref
          href="https://www.cg.no/weddinglist/index/shared/weddinglist_id/11839/"
        >
          <PrimaryButton as="a">
            Listen på Christiania Glasmagasin
          </PrimaryButton>
        </Link>
        <Paragraph css="max-width: 600px; text-align: center">
          Om du heller skulle ønske å donere en pengesum til et veldedig formål,
          ønsker vi at du / dere velger å donere til{' '}
          <LinkText href="https://kirkensbymisjon.no/">
            Kirkens Bymisjon
          </LinkText>
          . Deres uttrettelige arbeid for de svakerestilte i samfunnet vårt er
          prisverdig, og noe vi alle burde støtte opp under.
        </Paragraph>
        <Paragraph>
          <LinkText href="/">Tilbake til forsiden</LinkText>
        </Paragraph>
        <img
          src="https://web.archive.org/web/20090803053804/http://hk.geocities.com/lochomicky/clipart/marriage_01.gif"
          alt="To som gifter seg"
        />
      </FullPageBackground>
    </Page>
  );
}
