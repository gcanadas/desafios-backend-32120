const express = require('express');
const passport = require('passport');
const os = require('os');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  try{
    if (!req.isAuthenticated()) {
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
        res.redirect('/');
  }
);

router.get('/errorLogin', (req, res) => {
  res.render('errorLogin', { title: 'USER ERROR LOGIN', message: 'CREDENCIALES NO VALIDAS', href: '/'});
});

router.post('/logout', (req, res, next) => {
  const { userName } = req.body;
  req.logout((error) => {
    if (!error) {
      res.render('logout', { email: userName });
    } else {
      res.send('Ocurrio un  error', error.message);
    }
  });
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', passport.authenticate('sign-up', {
        successRedirect: '/',
        failureRedirect: '/errorRegister',
  }),
  (req, res) => {
    const { user } = req;
    res.json({ message: `User ${user.email} was registered.` })
  }
);

router.get('/errorRegister', (req, res) => {
  res.render('errorLogin', { title: 'USER ERROR REGISTER', message: 'USUARIO YA REGISTRADO', href: '/register'});
});

router.get('/info', (req, res, next) => {
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
    res.render('./info', info);
  } catch (error) {
      next(error);
  }
});

module.exports = router;