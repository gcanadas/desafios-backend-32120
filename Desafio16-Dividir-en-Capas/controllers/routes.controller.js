import productServices from '../services/product.services.js';

export async function loginUser(req, res) {
  await productServices.loginUser(req, res);
}

export async function logoutUser(req, res) {
  await productServices.logoutUser(req, res);
}

export async function routeInfo(req, res) {
  await productServices.routeInfo(req, res);
}

export async function routeRandom(req, res) {
  await productServices.routeRandom(req, res);
}

export async function productTest(res) {
  await productServices.productTest(req, res);
}

export default {
  loginUser,
  logoutUser,
  routeInfo,
  routeRandom,
  productTest,
}