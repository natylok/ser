const {FACEBOOK_URL,SCHEDULE_URL} = require('../constants/routes'),
  facebookRoutes = require('./facebook'),
  scheduleRoutes = require('./schedule');
module.exports = (app) => {
  app.use(FACEBOOK_URL, facebookRoutes);
  app.use(SCHEDULE_URL, scheduleRoutes);
}
