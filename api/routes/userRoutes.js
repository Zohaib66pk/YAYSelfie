'use strict';
module.exports = function (app) {

  var user = require('../controllers/userController');

  app.route('/user')
    .post(user.create_user)
  
  app.route('/forget_password/:email')
    .get(user.send_email);

  app.route('/user/:user_id')
    .get(user.get_user)
    .put(user.update_user);
    
  app.route('/login')
    .post(user.login);
  };