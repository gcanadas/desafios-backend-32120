const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {engine} = require('express-handlebars')
const session = require('express-session');
const MongoStore = require('connect-mongo')
const cors = require('cors');
const passport = require ('passport');
const { Strategy } = require ('passport-local');
const bcrypt = require ('bcrypt');


const indexRouter = require('./routes/index');
const productTest = require('./routes/productTest')
const LocalStrategy = Strategy;

const app = express();
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// view engine setup
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new MongoStore({
    mongoUrl: 'mongodb+srv://coderbackend:50SBvEI9S2wCZHEs@cluster0.dlq60k1.mongodb.net/sessions?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 600,
  }),
  secret: '3WxCgjK#96L',
  resave: true,
  saveUninitialized: true,
}))

app.use('/', indexRouter);
app.use('/login', indexRouter);
app.use('/logout', indexRouter);
app.use('/productos-test', productTest);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
