/**
 * Module dependencies.
 */

import bus from 'bus';
import config from '../config/config.js';
import page from 'page';
import request from '../request/request.js';

page('/logout', (ctx, next) => {
  bus.emit('logout');
  setTimeout(redirect, 0);

  function redirect () {
    console.log('redirect ' + config.signinUrl);;
    if (config.signinUrl) return window.location = config.signinUrl;
    page('/signin');
  }
});
