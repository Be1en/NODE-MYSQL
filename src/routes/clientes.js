const express = require('express');
const ClienteController = require('../controllers/clientes_controller');

const router = express.Router();

router.get('/clientes', ClienteController.leer_clientes);
router.get('/crear_clientes', ClienteController.crear_clientes);
router.post('/crear_clientes', ClienteController.store);
router.post('/clientes/delete', ClienteController.destroy);
router.get('/clientes/editar/:id', ClienteController.edit);
router.post('/clientes/editar/:id', ClienteController.update);


module.exports = router;