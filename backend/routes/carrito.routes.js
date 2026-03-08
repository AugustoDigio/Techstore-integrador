const express = require('express');
const router = express.Router();
const {
  recibirCarrito,
  getPedidos,
  crearPreferencia,
} = require('../controllers/carrito.controller');

// POST /api/carrito — Recibir pedido desde el frontend
router.post('/', recibirCarrito);

// GET /api/carrito — Ver todos los pedidos
router.get('/', getPedidos);

// POST /api/carrito/crear-preferencia — Mercado Pago
router.post('/crear-preferencia', crearPreferencia);

module.exports = router;
