var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');


router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/details/:id',function(req,res){
  User.find({username: req.params.id} ,function (err, user){
    if (err)
      res.send(err);
    console.log('userList'+user);
    res.status(200).json(JSON.stringify(user)); // return user info
  });
});

router.post('/update',function(req,res){
  console.log('user',req.body);
  User.find({username: req.body.username} ,function (err, user){
    console.log('user',user);
    if(err){
      req.send(err);
    }
    else{
      User.update({username: req.body.username},req.body,function(err,user){
        res.status(200).json(JSON.stringify(user));
      });
    }
  });
});

router.post('/upload', function(req,res){
  console.log("helloo"+req.body.data);
});
module.exports = router;