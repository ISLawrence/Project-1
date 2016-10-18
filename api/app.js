// install dependencies
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')
var API = require('./api/index');
var Steam = require('steam-webapi');
var app = express();
config = require('./config');

// Set global Steam API Key
Steam.key = config.steamApiKey
Steam.ready(function(err) {
    if (err) return console.log(err);
    SteamInstance = new Steam();
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://fluent.dev:3400');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,sessionToken,ApplicationID');

    res.header('Access-Control-Allow-Credentials', 'true');
    if ('OPTIONS' == req.method) {
        return res.sendStatus(200);
    }
    next();
}


// Middleware for reading request body
app.use(allowCrossDomain);

// parse application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


///////////////////////
/// STEAM ENDPOINTS ///
///////////////////////

//Get user info
app.get('/steam/user/:name', function(req, res) {
  return API.Steam.getUserInfo(req, res)
})

//start the srever
app.listen(3001, function() {
    console.log("App serving on 3001");
});
