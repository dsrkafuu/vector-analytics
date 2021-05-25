const mongoose = require('mongoose');
const buildError = require('../utils/buildError');

// ensure models required
require('../models');

// connect database
const dbURL = process.env.NODE_DATABASE_URL;
if (!dbURL) {
  throw buildError(500, 'env `NODE_DATABASE_URL` not set');
}
mongoose.set('returnOriginal', false);
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((e) => {
    console.error(e.stack);
    throw buildError(500, 'mongoose connection failed');
  });
