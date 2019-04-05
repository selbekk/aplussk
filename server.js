const express = require('express');
const helmet = require('helmet');
const next = require('next');
const compression = require('compression');
const bodyParser = require('body-parser');
const shuffleArray = require('shuffle-array');

require('dotenv').config();
const Airtable = require('airtable');
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appOMWfAc1X2wEovw',
);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const runTheTrap = async () => {
  try {
    await app.prepare();
    const server = express();

    // parse the request body
    server.use(bodyParser.json());

    // enable helmet to set security headers
    server.use(helmet());

    // gzip it!
    server.use(compression());

    // Pass static assets
    server.use('/static', express.static('static'));

    // Handle RSVP requests
    server.post('/rsvp', async (req, res) => {
      try {
        const result = await airtable('Guest replies').create({
          Name: req.body.name,
          'Can Attend': req.body.canAttend,
          Notes: req.body.notes,
        });
        return res.sendStatus(201);
      } catch (e) {
        console.error(
          'Tried to create an RSVP record, but failed. Data passed was',
          req.body,
        );
        return res.sendStatus(500);
      }
    });

    // Handle guestbook entries
    server.post('/guestbook', async (req, res) => {
      try {
        await airtable('Guestbook').create({
          Name: req.body.name,
          Message: req.body.message,
        });
        return res.sendStatus(201);
      } catch (e) {
        console.error(
          'Tried to create a guestbook record, but failed. Data passed was',
          req.body,
        );
        return res.sendStatus(500);
      }
    });

    // Retrieve guest list
    server.get('/guests', async (req, res) => {
      try {
        airtable('Guests')
          .select({
            sort: [{ field: 'Name', direction: 'asc' }],
          })
          .firstPage((err, entries) => {
            if (err) {
              return res.status(500).json(err);
            }
            return res.json(
              entries
                .filter(entry => !!entry.get('Name'))
                .map(entry => {
                  const facts = [
                    entry.get('True Fact'),
                    entry.get('Another True Fact'),
                    entry.get('False Fact'),
                  ];
                  shuffleArray(facts);
                  return {
                    name: entry.get('Name'),
                    table: entry.get('Table'),
                    facts,
                    imageSrc:
                      entry.get('Image URL') ||
                      'https://media.giphy.com/media/K3Sbp8fOgKye4/giphy.gif',
                  };
                }),
            );
          });
      } catch (err) {
        console.error('Tried to fetch the guests, but something went wrong');
        return res.status(500).json(err);
      }
    });

    // Retrieve guestbook entries
    server.get('/guestbook', async (req, res) => {
      try {
        airtable('Guestbook')
          .select()
          .firstPage((err, entries) => {
            if (err) {
              return res.status(500).json(err);
            }
            return res.json(
              entries.reverse().map(entry => ({
                id: entry.id,
                name: entry.get('Name'),
                message: entry.get('Message'),
              })),
            );
          });
      } catch (e) {
        console.error('Tried to fetch the guestbook, but something went wrong');
        return res.json([]);
      }
    });

    // Handle all basic routes
    server.get('*', (...args) => handle(...args));

    // Start the server itself!
    server.listen(3000, err => {
      if (err) {
        throw err;
      }
      console.log('Listening on http://localhost:3000');
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
runTheTrap();
