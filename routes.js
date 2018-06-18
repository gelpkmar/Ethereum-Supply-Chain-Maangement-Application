const routes = require('next-routes')();

routes
  .add('/assets/new', '/assets/new')
  .add('/assets/:address', '/assets/show');

module.exports = routes;
