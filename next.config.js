// Load env variables automatically (from next secrets or env)
require('dotenv').config();

const withPWA = require('next-pwa');

const getSecret = (key) => {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`ERROR: ${key} is not set.`);
  }

  return process.env[key];
};

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching: [
      {
        urlPattern: '/',
        handler: 'NetworkFirst',
        options: {
          cacheName: 'html-cache',
        },
      },
      {
        urlPattern: '/[^3]/login//',
        handler: 'NetworkFirst',
        options: {
          cacheName: 'html-cache',
        },
      },
      {
        urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  serverRuntimeConfig: {
    BASE_URL: getSecret('BASE_URL'),
  },
  publicRuntimeConfig: {
    BASE_URL: getSecret('BASE_URL'),
    API_KEY: getSecret('API_KEY'),
    AUTH_DOMAIN: getSecret('AUTH_DOMAIN'),
    DATABASE_URL: getSecret('DATABASE_URL'),
    PROJECT_ID: getSecret('PROJECT_ID'),
    STORAGE_BUCKET: getSecret('STORAGE_BUCKET'),
    MESSAGING_SENDER_ID: getSecret('MESSAGING_SENDER_ID'),
    APP_ID: getSecret('APP_ID'),
  },
});

// module.exports = {
//   serverRuntimeConfig: {
//     BASE_URL: getSecret('BASE_URL'),
//   },
//   publicRuntimeConfig: {
//     BASE_URL: getSecret('BASE_URL'),
//     API_KEY: getSecret('API_KEY'),
//     AUTH_DOMAIN: getSecret('AUTH_DOMAIN'),
//     DATABASE_URL: getSecret('DATABASE_URL'),
//     PROJECT_ID: getSecret('PROJECT_ID'),
//     STORAGE_BUCKET: getSecret('STORAGE_BUCKET'),
//     MESSAGING_SENDER_ID: getSecret('MESSAGING_SENDER_ID'),
//     APP_ID: getSecret('APP_ID'),
//   },
// };