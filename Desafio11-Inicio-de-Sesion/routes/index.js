var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try{
    if(req.session.user){
      const user = req.session.user;
      res.render('index', { title: 'Desafío 10: Log-in por Formulario', userName: user });
    } else {
      res.redirect('/login');
    }
  } catch(error){
    next(error);
  }
});

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login', function(req,res,next) {
  try{
    const user = req.body.user;
    console.log(req.body.user)
    req.session.user = user;
    res.redirect('/');
  } catch(error) {
    next(error);
  }
})

router.get('/logout', function(req,res,next) {
  const user = req.session.user;
  req.session.destroy((error) => {
    if (!error) {
      res.render('logout', { name: user });
    } else {
      res.send('Ocurrio un error', error.message);
    }
  });
})


module.exports = router;