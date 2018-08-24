process.env.NODE_ENV = 'dev';

let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  Congres = require('./api/models/congresModel'),
  jsonwebtoken = require("jsonwebtoken"),
  cors=require('cors'),
  bodyParser = require('body-parser'),
  config = require('config');

//db connection 
mongoose.connect(config.DBHost);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())




app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'MedConf', function (err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

let routes = require('./api/routes/quizRoutes'); //importing route
routes(app); //register the route

app.listen(3000);