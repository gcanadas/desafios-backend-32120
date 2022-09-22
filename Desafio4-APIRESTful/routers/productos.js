const express = require('express');
const { Router } = express;

const router = Router(Router);

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
}

const productos = [
{
    title: 'PlayStation 3',
    price: 60000,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg',
    id: 1
  },
  {
    title: 'PlayStation 4',
    price: 130000,
    thumbnail: 'https://th.bing.com/th/id/OIP.HXa-kFjqTztbJMpplOafPwHaHa?pid=ImgDet&rs=1',
    id: 2
  },
  {
    title: 'PlayStation 5',
    price: 250000,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/PlayStation_5_and_DualSense_with_transparent_background.png/1200px-PlayStation_5_and_DualSense_with_transparent_background.png',
    id: 3
  },
  {
    title: 'Xbox 360',
    price: 50000,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Xbox-360-Consoles-Infobox.png',
    id: 4
  },
]

let nextID = 5

router.get('/productos', (req, res) => {
  res.status(STATUS_CODE.OK).json(productos);
})

router.get('/productos/:id', (req, res) => {
  const idProducto = parseInt(req.params.id);
  const producto = productos.filter((producto) => producto.id === idProducto);
  if (producto.length === 0) {
    console.log('Id de producto no encontrado');
    res.status(STATUS_CODE.NOT_FOUND).json({ error: "producto no encontrado" });
  }else {
    res.status(STATUS_CODE.OK).json(producto);
  }
})

router.post('/productos', (req, res) => {
  let data = req.body;
  data = {...data, id: nextID};
  nextID++;
  productos.push(data);
  res.status(STATUS_CODE.CREATED).json(data);
})

router.put('/productos/:id', (req, res) => {
  const idProducto = parseInt(req.params.id);
  let productoIndex = productos.findIndex((producto) => producto.id === idProducto)
  if(productoIndex === -1) {
    console.log('Id de producto no encontrado');
    res.status(STATUS_CODE.NOT_FOUND).end();
    return
  }
  productos[productoIndex].title = req.body.title || productos[productoIndex].title;
  productos[productoIndex].price = req.body.price || productos[productoIndex].price;
  productos[productoIndex].thumbnail = req.body.thumbnail || productos[productoIndex].thumbnail;
  res.status(STATUS_CODE.CREATED).end()
})

router.delete('/productos/:id', (req, res) => {
  const idProducto = parseInt(req.params.id);
  console.log(idProducto)
  let productoIndex = productos.findIndex((producto) => producto.id === idProducto)
  if(productoIndex === -1) {
    console.log('Id de producto no encontrado');
    res.status(STATUS_CODE.NOT_FOUND).end();
    return
  }
  productos.splice(productoIndex, 1);
  res.status(STATUS_CODE.OK).end()
})


module.exports = router