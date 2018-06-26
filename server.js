var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
User = require('./api/models/userModel'),
bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yayselfie');

app.use(bodyParser.urlencoded ({
  extended: true
}))

app.use(bodyParser.json())


var routes = require('./api/routes/userRoutes');
routes(app);


app.listen(port);

console.log("Server is running on", port);