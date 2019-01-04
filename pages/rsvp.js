import React from 'react';
import Link from 'next/link';
import { FormValidation } from 'calidation';
import Page from '../components/page';
import FullPageBackground from '../components/full-page-background';
import { HeroHeading, Paragraph } from '../components/typography';
import PrimaryButton from '../components/primary-button';
import Box from '../components/box';
import InputGroup from '../components/input-group';
import Input from '../components/input';
import Dropdown from '../components/dropdown';
import TextArea from '../components/text-area';

const formConfig = {
  name: {
    isRequired: 'Du må fylle ut navnet ditt!',
  },
  canAttend: {
    isRequired: 'Du må si om du kommer eller ikke!',
  },
  notes: {},
};

class Rsvp extends React.Component {
  state = {
    rsvpRegistered: false,
  };

  onSubmit = async ({ fields, isValid }) => {
    if (!isValid) {
      return;
    }
    await fetch('/rsvp', {
      method: 'post',
      body: JSON.stringify(fields),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    this.setState({ rsvpRegistered: true });
  };

  render() {
    return (
      <Page title="Anne Kristine og Kristofer gifter seg">
        <FullPageBackground
          style={{ background: 'lightblue', textAlign: 'center' }}
        >
          <HeroHeading style={{ color: 'rebeccapurple' }}>RSVP!</HeroHeading>
          <Paragraph style={{ color: 'darkblue' }}>
            Vi håper du har mulighet til å komme i bryllupet vårt. Her kan du si
            ifra om du kan komme eller ikke!
          </Paragraph>
          {this.state.rsvpRegistered && (
            <div>
              <img
                src="https://media.giphy.com/media/s2qXK8wAvkHTO/giphy.gif"
                alt="great success"
                css="display: block; margin: 10px auto"
              />
            </div>
          )}
          {!this.state.rsvpRegistered && (
            <FormValidation onSubmit={this.onSubmit} config={formConfig}>
              {({ errors, submitted }) => (
                <>
                  <InputGroup
                    name="name"
                    label="Hva heter du / dere?"
                    error={submitted && errors.name}
                  >
                    <Input />
                  </InputGroup>
                  <InputGroup
                    label="Kan du komme?"
                    name="canAttend"
                    error={submitted && errors.canAttend}
                  >
                    <Dropdown defaultValue="">
                      <option value="" disabled>
                        VELG HER! 👇
                      </option>
                      <option value="yes">🎉 Ja, vi gleder oss</option>
                      <option value="kindof">🙀 Ja, men vi gruer oss </option>
                      <option value="no">😭 Nei, dessverre!</option>
                      <option value="never">💩 Nei, det gidder vi ikke!</option>
                    </Dropdown>
                  </InputGroup>
                  <InputGroup
                    label="Er det ellers noe vi burde vite om? (Allergier etc)"
                    name="notes"
                    error={submitted && errors.notes}
                  >
                    <TextArea />
                  </InputGroup>
                  <PrimaryButton>SEND INN SVARET DITT!</PrimaryButton>
                </>
              )}
            </FormValidation>
          )}
          <Box>
            <img
              src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
              alt="the office crewet som danser"
            />
            <br />
            <Link href="/gjestebok" passHref>
              <PrimaryButton>Skriv i gjesteboken vår 👉</PrimaryButton>
            </Link>
          </Box>
        </FullPageBackground>
      </Page>
    );
  }
}

export default Rsvp;
