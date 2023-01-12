import logger from "../logger";
import os from 'os';
import randomProducts from '../controllers/fakerController';
export async function loginUser(req, res) {
    try{
        if (!req.isAuthenticated()) {
            logger.info(`Ruta ${req.originalUrl} metodo GET`);
            res.render('login');
        } else {
            const { user } = req;
            res.render('index', { title: 'Desafío 16: Dividir en capas nuestro proyecto', userName: user.email });
        }
    } catch (error){
        logger.error(`Ruta ${req.originalUrl} - Metodo: ${req.method}`);
    }
}
  
export async function logoutUser(req, res) {
    const { userName } = req.body;
    req.logout((error) => {
        if (!error) {
            logger.info(`Ruta ${req.originalUrl} metodo POST`);
            res.render('logout', { email: userName });
        } else {
            logger.error(`Ruta ${req.originalUrl} - Metodo: ${req.method}`);
            res.send('Ocurrio un  error', error.message);
        }
    });
}
  
export async function routeInfo(req, res) {
    try {
        // console.log({
        //   arguments: process.argv.slice(2),
        //   path: process.execPath,
        //   platformName: process.platform,
        //   processID: process.pid,
        //   nodeVersion: process.version,
        //   proyectFolder: process.cwd(),
        //   rss: process.memoryUsage().rss,
        //   cpus: os.cpus().length,
        // });
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
        logger.error(`Ruta ${req.originalUrl} - Metodo: ${req.method}`);
    }
}

export async function routeRandom(req, res) {
    try {
        logger.info(`Ruta ${req.originalUrl} metodo GET`);
        const cont = req.query.cant || 100000000;
        let numeros = {};
        for (let i = 0; i < cont; i++) {
              let num = Math.floor((Math.random() * 1000) + 1); //Genera un número aleatorio entre 1 y 1000
              if (!numeros[num]) {
                    numeros[num] = 0;
              }
              numeros[num] = numeros[num] + 1;
        }
        logger.info(`Ruta ${req.originalUrl} metodo GET`);
        res.json(numeros);
    } catch (error) {
        logger.error(`${error.message}`)
    }
}

export async function productTest(res) {
    try {
        data = randomProducts();
        data = {title: "Mocks y Normalización", ...data};
        res.render('productos-test', data);
    } catch (error) {
        logger.error(`${error.message}`)
    }
}

export default {
    loginUser,
    logoutUser,
    routeInfo,
    routeRandom,
    productTest,
  }