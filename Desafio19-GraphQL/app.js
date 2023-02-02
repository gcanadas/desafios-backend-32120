import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import minimist from 'minimist';
import { graphqlHTTP } from 'express-graphql';

import logger from './logger.js';
import indexRouter from './routes/index.js';
import schema from './graphql/schema.js';
import { getProducts, getProductById, createProduct, updateProduct, deleteProductById } from './graphql/resolve.js'

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

app.use(cors());
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProductById
  },
  graphiql: true,
}))

app.use('/', indexRouter);

app.set('port', PORT);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

server.listen(PORT, () => logger.info(`Server running in http://localhost:${PORT}/ from process ${process.pid}`));
server.on("error", (error) => logger.error(`Error en servidor ${error}`));

// Ruta para loggear rutas invalidas
app.get('*', function (req, res) { 
  logger.warn(`Solicitud de Ruta inexistente - Ruta: ${req.originalUrl} - Metodo: ${req.method}`)
  res.status(404).send(`${req.originalUrl} not found`);
})

export default app