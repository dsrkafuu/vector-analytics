/*! aofuji-analytics | DSRKafuU (https://dsrkafuu.su) | Copyright (c) MIT License */

require('../utils/env')();
const production = process.env.NODE_ENV === 'production';

const app = require('../src/api');
const serverless = require('serverless-http');

// normal
if (!process.env.SERVERLESS) {
  // static server in production
  if (production) {
    const { static: serveStatic } = require('express');
    const history = require('connect-history-api-fallback');
    app.use(history());
    app.use(serveStatic('dist'));
  }
  // port listening
  const port = production ? process.env.SERVER_PORT || 3000 : 3022;
  app.listen(port, () => {
    console.log(`[aofuji]${production ? '' : 'dev api'} listening at http://localhost:${port}`);
  });
}

// serverless
// vercel
module.exports = app;
// aws lambda (netlify etc.)
module.exports.handler = serverless(app);
