const express = require('express');
const passport = require('passport');

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

// router.post('/login', function(req,res,next) {
//   try{
//     const user = req.body.user;
//     console.log(req.body.user)
//     req.session.user = user;
//     res.redirect('/');
//   } catch(error) {
//     next(error);
//   }
// })

// router.get('/logout', function(req,res,next) {
//   const user = req.session.user;
//   req.session.destroy((error) => {
//     if (!error) {
//       res.render('logout', { name: user });
//     } else {
//       res.send('Ocurrio un error', error.message);
//     }
//   });
// })

// router.get('/login', function(req, res, next) {
//   res.render('login');
// })

module.exports = router;