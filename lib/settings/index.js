/**
 * Module dependencies.
 */

var express = require('express');
var config = require('lib/config');

/**
 * Exports Application
 */

var app = module.exports = express();

function redirect(req, res) {
  var path = req.params.path || '';
  var url = config.settingsUrl + (path ? '/' + path : '');
  res.redirect(url);
}

if (config.settingsUrl) {
  app.get('/settings', redirect);
  app.get('/settings/:path', redirect);
}

app.get('/settings', require('lib/layout'));
app.get('/settings/profile', require('lib/layout'));
app.get('/settings/password', require('lib/layout'));
app.get('/settings/notifications', require('lib/layout'));
app.get('/settings/forums', require('lib/layout'));


/*
 * Load the S3 information from the environment variables.
 */
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;
/*
 * Respond to GET requests to /sign_s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and the
 * anticipated URL of the image.
 */
app.get('/settings/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    var s3 = new aws.S3(); 
    var s3_params = { 
        Bucket: S3_BUCKET, 
        Key: req.query.file_name, 
        Expires: 60, 
        ContentType: req.query.file_type, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        if(err){ 
            console.log(err); 
        }
        else{ 
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name 
            };
            res.write(JSON.stringify(return_data));
            res.end();
        } 
    });
});


