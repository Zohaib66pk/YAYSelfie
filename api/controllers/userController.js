'use strict';
var mongoose = require('mongoose'),
User = mongoose.model("Users");

var response = {status:'', data:{}};

exports.create_user = function (req, res) {
  var new_user = new User(req.body);
  new_user.save( function(err, user) {
   
    if(err){ res.send(err) }
    
    res.json(user) 
  
  });
}


exports.update_user = function (req, res) {
  User.findByIdAndUpdate(req.params.user_id, function (err, user) {
    
    if(err) { res.send() }
    
    res.json(user)
  });
}

exports.get_user = function (req, res) {
  User.findOne({_id:req.params.user_id}, function (err, user) {
    
    if(err) { res.send({status: 0, message: err.message}) }
  
    res.json({status: 1, data:user})
  
  });
}


exports.login = function (req, res) {

  User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
    
    if(err) { res.send(err) }
  
    res.json(user)
  
  });
}


