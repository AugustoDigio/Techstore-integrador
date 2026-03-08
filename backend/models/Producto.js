const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
      default: '',
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    imagen: {
      type: String,
      default: '',
    },
    categoria: {
      type: String,
      trim: true,
      default: 'General',
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    disponible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // crea automáticamente createdAt y updatedAt
  }
);

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
