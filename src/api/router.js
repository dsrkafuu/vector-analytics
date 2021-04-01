const { Router } = require('express');
const router = Router();

// utils
require('./utils/mongoose');
const buildError = require('./utils/buildError');

// middlewares
const authCheck = require('./middlewares/authCheck');
const cacheControl = require('./middlewares/cacheControl');

// routes
router.use('/collect', cacheControl({ allowCache: false }), require('./routes/collect'));
router.use('/login', cacheControl({ allowCache: false }), require('./routes/login'));
router.use(
  '/common',
  authCheck({ checkShare: true }),
  cacheControl({ allowCache: false }),
  require('./routes/common')
);

router.use(
  '/admin/website',
  authCheck({ checkShare: false }),
  cacheControl({ allowCache: false }),
  require('./routes/admin/website')
);
router.use(
  '/admin/account',
  authCheck({ checkShare: false }),
  cacheControl({ allowCache: false }),
  require('./routes/admin/account')
);
router.use(
  '/admin/share',
  authCheck({ checkShare: false }),
  cacheControl({ allowCache: false }),
  require('./routes/admin/share')
);
router.use(
  '/admin/debug',
  authCheck({ checkShare: false }),
  cacheControl({ allowCache: false }),
  require('./routes/admin/debug')
);

router.use(
  '/metrics/dashboard',
  authCheck({ checkShare: true }),
  cacheControl({ allowCache: true }),
  require('./routes/metrics/dashboard')
);
router.use(
  '/metrics/realtime',
  authCheck({ checkShare: false }),
  cacheControl({ allowCache: true }),
  require('./routes/metrics/realtime')
);

// fallback
router.use('/*', async () => {
  throw buildError(404, 'route not found');
});

module.exports = router;
