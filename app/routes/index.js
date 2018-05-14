const {FACEBOOK_URL,SCHEDULE_URL,ORDER_URL} = require('../constants/routes'),
  facebookRoutes = require('./facebook'),
  scheduleRoutes = require('./schedule');
  orderRoutes = require('./order');
module.exports = (app) => {
  app.use(FACEBOOK_URL, facebookRoutes);
  app.use(SCHEDULE_URL, scheduleRoutes);
  app.use(ORDER_URL, orderRoutes);
}
