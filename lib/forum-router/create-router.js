var prefix = '/:forum';

var startWith = require('mout/string/startsWith');

function createRouter(config) {
  var multiForum = config.multiForum;
  return function forumRouter(route) {
    if (startWith(route,'/admin') || !multiForum) return route;
    return prefix + ('/' === route ? '' : route);
  };
}

module.exports = createRouter;
