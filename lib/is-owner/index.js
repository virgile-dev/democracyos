/**
 * Module Dependencies
 */

var api = require('lib/db-api');
var config = require('lib/config');
var utils = require('lib/utils');
var log = require('debug')('democracyos:is-owner');

function isOwner(req, res, next) {
  return utils.staff;
}

var hasAccess = config.multiForum ? isOwner : utils.staff;

module.exports = isOwner;

module.exports.hasAccess = hasAccess;
