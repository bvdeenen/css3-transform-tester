/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'transform',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
	ENV.contentSecurityPolicy = {
	  'default-src': "'none'",
	  'script-src': "'self' 'unsafe-eval' https://cdn.mxpnl.com", // Allow scripts from https://cdn.mxpnl.com
	  'font-src': "'self' http://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
	  'connect-src': "'self' http://localhost:5984 http://localhost:8080 ws://localhost:9000",// Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
	  'img-src': "'self' data: ",
	  'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
	  'media-src': "'self'",
      'report-uri': "http://localhost:4200"
	};
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
