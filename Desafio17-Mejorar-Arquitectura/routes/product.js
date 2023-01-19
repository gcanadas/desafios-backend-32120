import { Router } from 'express';
import passport from 'passport';
import logger from '../logger.js';
import routesController from '../controllers/routes.controller.js';


const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  routesController.loginUser(req, res);
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
  routesController.logoutUser(req,res);
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

router.get('/info', (req, res) => {
  routesController.routeInfo(req, res);
});

export default router;