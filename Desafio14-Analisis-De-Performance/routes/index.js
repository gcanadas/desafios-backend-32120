const express = require('express');
const passport = require('passport');
const os = require('os');
const compression = require ('compression');
const logger = require ('../logger');


const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  try{
    if (!req.isAuthenticated()) {
      logger.info(`Ruta ${req.originalUrl} metodo GET`);
      res.render('login');
    } else {
      const { user } = req;
      res.render('index', { title: 'Desafío 11: Inicio de Sesión', userName: user.email });
    }
  } catch (error){
    next(error);
  }
});

router.post('/login', passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: '/errorLogin',
  }),
  (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo POST`);
    res.redirect('/');
  }
);

router.get('/errorLogin', (req, res) => {
  logger.info(`Ruta ${req.originalUrl} metodo GET`);
  res.render('errorLogin', { title: 'USER ERROR LOGIN', message: 'CREDENCIALES NO VALIDAS', href: '/'});
});

router.post('/logout', (req, res, next) => {
  const { userName } = req.body;
  req.logout((error) => {
    if (!error) {
      logger.info(`Ruta ${req.originalUrl} metodo POST`);
      res.render('logout', { email: userName });
    } else {
      res.send('Ocurrio un  error', error.message);
    }
  });
});

router.get('/register', (req, res, next) => {
  logger.info(`Ruta ${req.originalUrl} metodo GET`);
  res.render('register');
});

router.post('/register', passport.authenticate('sign-up', {
        successRedirect: '/',
        failureRedirect: '/errorRegister',
  }),
  (req, res) => {
    const { user } = req;
    logger.info(`Ruta ${req.originalUrl} metodo POST`);
    res.json({ message: `User ${user.email} was registered.` })
  }
);

router.get('/errorRegister', (req, res) => {
  logger.info(`Ruta ${req.originalUrl} metodo GET`);
  res.render('errorLogin', { title: 'USER ERROR REGISTER', message: 'USUARIO YA REGISTRADO', href: '/register'});
});

router.get('/info', compression(), (req, res, next) => {
  try {
    const info = {
      arguments: process.argv.slice(2),
      path: process.execPath,
      platformName: process.platform,
      processID: process.pid,
      nodeVersion: process.version,
      proyectFolder: process.cwd(),
      rss: process.memoryUsage().rss,
      cpus: os.cpus().length,
    };
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('./info', info);
  } catch (error) {
      next(error);
  }
});

module.exports = router;