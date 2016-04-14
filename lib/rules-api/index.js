/**
 * Module dependencies.
 */

var express = require('express');
var api = require('lib/db-api');
var config = require('lib/config');
var utils = require('lib/utils');
var accepts = require('lib/accepts');
var staff = utils.staff;
var pluck = utils.pluck;
var log = require('debug')('democracyos:rules-api');

if (!config.rules) return;

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

app.get('/rules/all', staff, function (req, res) {
  log('Request /rules/all');

  api.rules.all(function(err, rules) {
    if (err) return _handleError(err, req, res);

    log('Serving rules %j', pluck(rules, 'id'));

    res.json(rules);
  });
});

app.get('/rules/roles', function (req, res) {
  log('Request /rules/roles');

  api.rules.search({type: 'role'}, function(err, rules) {
    if (err) return _handleError(err, req, res);

    log('Serving rules %j', rules);

    res.json(rules);
  });
});

app.get('/rules/:id', staff, function (req, res) {
  var id = req.params.id;
  log('Request /rules/%s', id);

  api.rules.get(id, function(err, rules) {
    if (err) return _handleError(err, req, res);

    log('Serving rules %j', rules);

    res.json(rules);
  });
});

app.post('/rules/create', staff, function (req, res) {
  log('Request /rules/create %j', req.body);

  api.rules.create(req.body, function (err, rules) {
    if (err) return next(err);

    log('Serving rules %s', pluck(rules, 'id'));
    res.json(rules);
  });
});

app.post('/rules/:id', staff, function (req, res) {
  log('Request /rules/:id %j', req.params.id, req.body);

  api.rules.update(req.params.id, req.body, function (err, rules) {
    if (err) return _handleError(err, req, res);

    log('Serving rules %s', rules);
    res.json(rules.toJSON());
  });
});

app.delete('/rules/:id', staff, function (req, res) {
  var id = req.params.id;
  log('Request /rules/%s', id);

  api.rules.remove(id, function(err) {
    if (err) return _handleError(err, req, res);

    log('Rules %j deleted successfully', id);

    res.status(200).send();
  });
});

function _handleError (err, req, res) {
  log("Error found: %s", err);
  var error = err;
  if (err.errors && err.errors.text) error = err.errors.text;
  if (error.type) error = error.type;

  res.json(400, { error: error });
}
