'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

var User = require('../models/user');

const INSTA_TOKEN = process.env.INSTA_TOKEN;

router.get('/profile', User.authMiddleware, function(req, res) {
  res.send(req.user);
});

router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('appCookie', token).send(user);
    }
  });
});

router.post('/register', function(req, res) {
  User.register(req.body, function(err, user) {
    var token = user.generateToken();
     if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('appCookie', token).send(user);
    }
  });
});

router.delete('/authenticate', function(req, res) {
  res.clearCookie('appCookie').send();
});

router.post('/locations', User.authMiddleware, function(req, res) {
  User.addLocation(req, req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  })
})

router.delete('/locations/:address', User.authMiddleware, function(req, res) {
  User.removeLocation(req, req.params.address, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  })
})
   
router.get('/instagram', function(req, res) {
  request.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=INSTA_TOKEN', function(err, resp, body) {
    if(err) res.send(err);
    res.send(body);
  });
}); 

module.exports = router;
