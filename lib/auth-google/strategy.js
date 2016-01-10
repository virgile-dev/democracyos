var config = require('lib/config');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('lib/models').User;
var utils = require('lib/utils');

var log = require('debug')('democracyos:auth-google')

/**
 * Register Google Strategy
 */

module.exports = function() {
  var callbackURL = utils.buildUrl(config, {
    pathname: '/auth/google/callback'
  });

  passport.use(
    new GoogleStrategy({
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: callbackURL,
      scope: ['email','profile']
    },
    function(accessToken, refreshToken, profile, done) {
      log(profile);
      User.findByProvider(profile, function (err, user) {
        if (err) return done(err);

        if (user) log(user) ;
        else log('no user') ;


        var email = profile.emails[0].value;
        if( config.auth.google.domainWhiteList.length ) {
          if( !~config.auth.google.domainWhiteList.indexOf(email.split('@')[1]) ) {
            log('user not in white list domains')
            return done(null, false, { message: 'Unauthorized domain : ' + email  });
          }
        }

        if (!user) return signup(profile, accessToken, done);

        if (user.email !== email) {
          user.set('email', email);
          user.set('profiles.google.email', email);
        }

        if (user.profiles.google.deauthorized) {
          user.set('profiles.google.deauthorized');
        }

        user.isModified() ? user.save(done) : done(null, user);
      });
    })
  );
}

/**
 * Google Registration
 *
 * @param {Object} profile PassportJS's profile
 * @param {Function} fn Callback accepting `err` and `user`
 * @api public
 */

function signup (profile, accessToken, fn) {
  var user = new User();

  user.firstName = profile._json.name.givenName;
  user.lastName = profile._json.name.familyName;
  user.profiles.google = profile._json;
  user.email = profile.emails[0].value;
  user.emailValidated = true;
  user.profilePictureUrl = profile._json.image.url ;

  user.save(function(err) {
    return fn(err, user);
  });
}
