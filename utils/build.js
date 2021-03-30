require('./env')();
const fs = require('fs');
const path = require('path');

// timer
const startTime = Date.now();

// create empty `dist` folder for vercel-build
const dist = path.resolve(__dirname, '../dist');
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}
const meta = path.resolve(dist, './metadata');
fs.writeFileSync(meta, `[AOFUJI] BUILD DATE ${new Date().toJSON()}`);

// builders
const buildGeoLite = require('./build-geolite');
const buildTracker = require('./build-tracker');

Promise.all([buildGeoLite(), buildTracker()])
  .then(() => {
    console.log(`[aofuji] api build finished in ${Date.now() - startTime}ms`);
  })
  .catch((e) => {
    console.error('[aofuji]', e);
  });
