'use strict';
var mongoose = require('mongoose'),
User = mongoose.model("Users");

var randomToken = require('random-token');
var nodemailer = require('nodemailer');


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

  User.findOne({email: req.body.email, password: req.body.password }, function (err, user) {
    
    if(err) { res.send(err) }
  
    res.json(user)
  
  });
}

exports.send_email = function (req, res) {

  var _token = randomToken(16);

  User.findOneAndUpdate({email: req.params.email}, {token: _token}, function(err, user) {
      

    if(err) { res.send({status: 0, message: err.message}) }
    else {


      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'zohaib66pk@gmail.com',
          pass: 'sunday929'
        }
      });
      
      var mailOptions = {
        from: 'zohaib66pk@gmail.com',
        to: 'zohaib66pk@gmail.com',
        subject: 'YAYSelfie! Reset Password',
        text: 'Hi, \n \t Plase use this token to change your password: ' + _token
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.json({status: 1, data:user})
    
    }

  });
}

