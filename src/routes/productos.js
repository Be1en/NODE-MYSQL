const express = require('express');
const ProductoController = require('../controllers/productos_controller');

const router = express.Router();

router.get('/productos', ProductoController.leer_productos);
router.get('/crear_productos', ProductoController.crear_productos);
router.post('/crear_productos', ProductoController.store);
router.post('/productos/delete',  ProductoController.destroy);
router.get('/productos/editar/:id',  ProductoController.edit);
router.post('/productos/editar/:id',  ProductoController.update);

module.exports = router;