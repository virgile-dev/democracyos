/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var regexps = require('lib/regexps');

var Schema = mongoose.Schema;

/**
 * Define `User` Schema
 */

var RulesSchema = new Schema({
  type: { type: String, enum: [ 'role' ], required: true, default: 'role' },
  value: { type: String, trim: true}
});


/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

RulesSchema.set('toObject', { getters: true });
RulesSchema.set('toJSON', { getters: true });

module.exports = function initialize(conn) {
  return conn.model('Rules', RulesSchema);
};
