var prefix = '/:forum';

var startWith = require('mout/string/startsWith');
var log = require('debug')('democracyos:forum-router');

function createRouter(config) {
  var multiForum = config.multiForum;
  var subPath = '';
  return function forumRouter(route) {
    log(route);
    if (startWith(route,'/admin') || !multiForum) return route;
    log(subPath + prefix + ('/' === route ? '' : route));
    console.log(subPath + prefix + ('/' === route ? '' : route));
    return subPath + prefix + ('/' === route ? '' : route);
  };
}

module.exports = createRouter;
