// ./routes/index.js
const soundtracks = require('./soundtrack');

module.exports = (app) => {
  app.use('/soundtrack', soundtracks);
};