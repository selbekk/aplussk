const express = require('express');
const helmet = require('helmet');
const next = require('next');
const compression = require('compression');
const bodyParser = require('body-parser');

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
