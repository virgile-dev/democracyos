/**
 * Module dependencies.
 */

import request from '../request/request.js';
import render from '../render/render.js';
import Stateful from '../stateful/stateful.js';
import config from '../config/config.js';
import filter from 'mout/array/filter' ;
import pluck from 'mout/array/pluck' ;
import contains from 'mout/array/contains' ;
import matches from 'mout/object/matches' ;
import debug from 'debug';

let log = debug('democracyos:rules');

export default class Rules extends Stateful {
  constructor() {
    super();
    // instance bindings
    this.middleware = this.middleware.bind(this);

    this.state('initializing');

    this.fetch();
  }

  /**
   * Fetch `rules` from source
   *
   * @param {String} src
   * @api public
   */

  fetch() {
    log('request in process');
    this.state('loading');

    request
    .get('/api/rules/all')
    .end(onresponse.bind(this));

    function onresponse(err, res) {
      if (err || !res.ok) {
        let message = 'Unable to load rules. Please try reloading the page. Thanks!';
        return this.error(message);
      };

      this.set(res.body);
    }
  }

  /**
   * Set items to `v`
   *
   * @param {Array} v
   * @return {Rules} Instance of `Rules`
   * @api public
   */

  set(v) {
    this.items = v;

    if ( contains(config.rules,'role') ) {
      this.roles = filter(v,{ type: 'role' }) ;
      log('Loaded roles %s', pluck(this.roles,'name'));
    }
    if ( contains(config.rules,'location') ) {
      this.locations = filter(v,{ type: 'location' }) ;
      log('Loaded locations %s', pluck(this.locations,'name'));
    }
    if ( contains(config.rules,'activity') ) {
      this.activities = filter(v,{ type: 'activity' }) ;
      log('Loaded activities %s', pluck(this.activities,'name'));
    }

    this.state('loaded');
    return this;
  }

  /**
   * Get current `items`
   *
   * @return {Array} Current `items`
   * @api public
   */

  get() {
    return this.items;
  }

  /**
   * Middleware for `page.js` like
   * routers
   *
   * @param {Object} ctx
   * @param {Function} next
   * @api public
   */

  middleware(ctx, next) {
    ctx.rules = this.items;
    for (var i = 0; i < this.items.length; i++) {
      this.setLabel(this.items[i],ctx);
    }

    if ( contains(config.rules,'role') )
      ctx.roles = this.roles;
    if ( contains(config.rules,'location') )
      ctx.locations = this.locations;
    if ( contains(config.rules,'activity') )
      ctx.activities = this.activities;

    this.ready(next);
  }

  /**
   * Handle errors
   *
   * @param {String} error
   * @return {Rules} Instance of `Rules`
   * @api public
   */

  error(message) {
    // TODO: We should use `Error`s instead of
    // `Strings` to handle errors...
    // Ref: http://www.devthought.com/2011/12/22/a-string-is-not-an-error/
    this.state('error', message);
    log('error found: %s', message);

    // Unregister all `ready` listeners
    this.off('ready');
    return this;
  }

  setLabel(rule,ctx){
    let locale = ctx.user ? ( ctx.user.locale || config.locale ) : config.locale ;
    rule.label = rule.value.label[locale] || rule.value.label.default ;
  }

}
