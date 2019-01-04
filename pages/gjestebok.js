import React from 'react';
import fetch from 'isomorphic-fetch';
import Page from '../components/page';
import FullPageBackground from '../components/full-page-background';
import {
  HeroHeading,
  SectionHeading,
  Paragraph,
} from '../components/typography';
import TextArea from '../components/text-area';
import { FormValidation } from 'calidation';
import InputGroup from '../components/input-group';
import Input from '../components/input';
import PrimaryButton from '../components/primary-button';
import RandomDivider from '../components/random-divider';
import GuestbookEntries from '../components/guestbook-entries';

const formConfig = {
  name: {
    isRequired: 'Du må si hvem du er! 💥',
  },
  message: {
    isRequired: 'Du må si noe da! Hils eller whatever 🙃',
  },
};

class Gjestebok extends React.Component {
  state = {
    saved: false,
  };
  onSubmit = async ({ fields, isValid }) => {
    if (!isValid) {
      return;
    }
    await fetch('/guestbook', {
      method: 'post',
      body: JSON.stringify(fields),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    this.setState({ saved: true });
  };
  render() {
    return (
      <Page title="Anne Kristine og Kristofer gifter seg">
        <FullPageBackground backgroundImage="https://media.giphy.com/media/TxVVB6PfWMjE4/giphy.gif">
          <HeroHeading>VELKOMMEN TIL GJESTE&shy;BOKEN vår</HeroHeading>
          <Paragraph>
            Vi er så glade for at du vil legge igjen en hilsen før bryllupet.
            Skriv en koselig, teit, morsom eller snasen hilsen, så har vi (og
            andre) noe å le av mens vi stresser med alle forberedelsene!
          </Paragraph>
          {!this.state.saved && (
            <FormValidation onSubmit={this.onSubmit} config={formConfig}>
              {({ errors, submitted }) => (
                <>
                  <InputGroup
                    name="name"
                    label="Hva heter du?"
                    error={submitted && errors.name}
                  >
                    <Input placeholder="Kong Harald 👑" />
                  </InputGroup>
                  <InputGroup
                    name="message"
                    label="Hva vil du si?"
                    error={submitted && errors.message}
                  >
                    <TextArea placeholder="Yo, jeg kommer seff, bro!" />
                  </InputGroup>
                  <PrimaryButton>Skriv i gjesteboken 📝</PrimaryButton>
                </>
              )}
            </FormValidation>
          )}
          <RandomDivider />
          {this.props.entries.length > 0 && (
            <>
              <SectionHeading>Gjestebok 📕</SectionHeading>
              <GuestbookEntries>
                {this.props.entries.map(entry => (
                  <li key={entry.name}>
                    <strong>{entry.name}:</strong>
                    <br />
                    {entry.message}
                  </li>
                ))}
              </GuestbookEntries>
            </>
          )}
        </FullPageBackground>
      </Page>
    );
  }
}

Gjestebok.getInitialProps = async ({ req }) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const response = await fetch(baseUrl + '/guestbook');
  const entries = await response.json();
  return {
    entries,
  };
};

export default Gjestebok;
