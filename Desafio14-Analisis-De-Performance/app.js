const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {engine} = require('express-handlebars')
const { initSocket } = require("../sockets");
const session = require('express-session');
const MongoStore = require('connect-mongo')
const cors = require('cors');
const passport = require ('passport');
const {Strategy} = require('passport-local');
const bcrypt = require('bcrypt');
const UserModel = require('./models/users');
const http = require('http');
const minimist = require ('minimist');
const cluster = require ('cluster');
const os = require ('os');


const logger = require ('./logger');
const indexRouter = require('./routes/index');
const productTest = require('./routes/productTest')
const randomRouter = require('./routes/random')
const LocalStrategy = Strategy;

const app = express();

const opts = {
  default: {
    port: 8080,
    mode: 'fork',
  },
  alias: {
    p: 'puerto',
    m: 'mode',
  },
};

const { port: PORT, mode } = minimist(process.argv.slice(2), opts);

if (mode === 'cluster' && cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
        console.log(
              `worker ${worker.process.pid} | code ${code} | signal ${signal}`
        );
        console.log('Starting a new worker...');
        cluster.fork();
  });
} else {

  // view engine setup
  app.engine('.hbs', engine({extname: '.hbs'}))
  app.set('view engine', '.hbs')
  app.set('views', path.join(__dirname, 'views'))
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'hbs');

  passport.use('sign-in', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    UserModel.findOne({ email })
      .then((user) => {
        if (!user) {
          console.log(`User with ${email} not found.`);
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          console.log('Invalid Password');
          return done(null, false);
        }
        done(null, user);
      })
      .catch((error) => {
        console.log('Error in sign-in', error.message);
        done(error, false);
      });
  }));

  passport.use('sign-up', new LocalStrategy({ 
    usernameField: 'email', 
    passReqToCallback: true, 
  }, (req, email, password, done) => {
    UserModel.findOne({ email })
      .then((user) => {
        if (user) {
          console.log(`User ${email} already exists.`);
          return done(null, false);
        } else {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync( req.body.password, salt );
          req.body.password = hash;

          return UserModel.create(req.body);
        }
      })
      .then((newUser) => {
        console.log(`User ${newUser.email} registration succesful.`);
        done(null, newUser);
      })
      .catch((error) => {
        console.log('Error in sign-up', error.message);
        return done(error);
      });
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((_id, done) => {
    UserModel.findOne({ _id })
      .then(user => done(null, user))
      .catch(done)
  })

  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(session({
    secret: '3WxCgjK#96L',
    cookie: { httpOnly: false, secure: false, maxAge: 600000 },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  }))

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', indexRouter);
  app.use('/login', indexRouter);
  app.use('/logout', indexRouter);
  app.use('/productos-test', productTest);
  app.use('/api', randomRouter);

  //var port = normalizePort(process.env.NODE_PORT || '3000');
  app.set('port', PORT);

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app);
  initSocket(server);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(PORT);
  server.on('error', onError);

  /**
   * Normalize a port into a number, string, or false.
   */

  // function normalizePort(val) {
  //   var port = parseInt(val, 10);

  //   if (isNaN(port)) {
  //     // named pipe
  //     return val;
  //   }

  //   if (port >= 0) {
  //     // port number
  //     return port;
  //   }

  //   return false;
  // }

  /**
   * Event listener for HTTP server "error" event.
   */

  // Ruta para loggear rutas invalidas
  app.get('*', function (req, res) { 
    logger.warn(`Ruta ${req.path} metodo GET`)
    res.status(404).send(`${req.path} not found`);
  })

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

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
}