var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })

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

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        console.log('file'+file);
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        console.log('filessss'+file);
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

router.post('/upload', function(req, res) {
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    })
   
});


module.exports = router;