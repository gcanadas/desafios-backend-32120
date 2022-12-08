const express = requiere ('express');
const fork = requiere ('child_process');

const router = express.Router();
router.get('/random/', async (req, res, next) => {
      try {
            let cont = req.query.cant || 100000000;
            const computo = fork('./controllers/calculo.js', [cont]);
            computo.on('message', (data) => {
                  computo.send('hola');
                  res.json(data);
            });
      } catch (error) {
            next(error);
      }
});
export default router;
