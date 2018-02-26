// ./routes/index.js
const soundtracks = require('./soundtrack');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.setHeader('Charset', 'utf-8');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
  });
  app.use('/api/soundtrack', soundtracks);
};