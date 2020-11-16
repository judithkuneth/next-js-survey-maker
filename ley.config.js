const extractHerokuDatabaseEnvVars = require('./extractHerokuDatabaseEnvVars');

extractHerokuDatabaseEnvVars();

const options = {};

if (process.env.NODE_ENV === 'production') {
  options.ssl = { rejectUnauthorized: false };
}

module.exports = options;
