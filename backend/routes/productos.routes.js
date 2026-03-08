const express = require('express');
const router = express.Router();
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} = require('../controllers/productos.controller');

// GET /api/productos
router.get('/', getProductos);

// GET /api/productos/:id
router.get('/:id', getProductoById);

// POST /api/productos
router.post('/', createProducto);

// PUT /api/productos/:id
router.put('/:id', updateProducto);

// DELETE /api/productos/:id
router.delete('/:id', deleteProducto);

module.exports = router;
