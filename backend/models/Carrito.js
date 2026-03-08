const mongoose = require('mongoose');


const itemCarritoSchema = new mongoose.Schema(
  {
    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
    },
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    imagen: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const carritoSchema = new mongoose.Schema(
  {
    items: {
      type: [itemCarritoSchema],
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    estado: {
      type: String,
      enum: ['pendiente', 'pagado', 'cancelado'],
      default: 'pendiente',
    },
   
    cliente: {
      nombre: { type: String, default: '' },
      email: { type: String, default: '' },
    },
  
    mpPreferenceId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;
