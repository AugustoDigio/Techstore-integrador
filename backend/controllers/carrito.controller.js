const Carrito = require('../models/Carrito');

// POST /api/carrito — Recibir y guardar el pedido del frontend
const recibirCarrito = async (req, res) => {
  try {
    const { items, total, cliente } = req.body;

    // Validar que venga con items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío o tiene un formato incorrecto' });
    }

    // Mostrar en consola del servidor (requisito del proyecto)
    console.log('\n====================================');
    console.log('🛒 NUEVO PEDIDO RECIBIDO:');
    console.log('====================================');
    console.log('Items:', JSON.stringify(items, null, 2));
    console.log('Total: $', total);
    if (cliente) console.log('Cliente:', cliente);
    console.log('====================================\n');

    // Guardar el pedido en la base de datos
    const nuevoPedido = new Carrito({ items, total, cliente });
    const pedidoGuardado = await nuevoPedido.save();

    res.status(201).json({
      message: 'Pedido recibido y guardado correctamente',
      pedido: pedidoGuardado,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el carrito', detalle: error.message });
  }
};

// GET /api/carrito — Obtener todos los pedidos (útil para admin)
const getPedidos = async (req, res) => {
  try {
    const pedidos = await Carrito.find().sort({ createdAt: -1 });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos', detalle: error.message });
  }
};

// ==========================================
// MERCADO PAGO — Crear preferencia de pago
// ==========================================
const crearPreferencia = async (req, res) => {
  try {
    const { MercadoPagoConfig, Preference } = require('mercadopago');

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const { items, carritoId } = req.body;

    // Formatear items para Mercado Pago
    const mpItems = items.map((item) => ({
      id: item.productoId || item._id || String(Math.random()),
      title: item.nombre,
      unit_price: Number(item.precio),
      quantity: Number(item.cantidad),
      currency_id: 'ARS',
    }));

    const preferenceData = {
      items: mpItems,
      back_urls: {
        success: `${process.env.FRONTEND_URL}/success.html`,
        failure: `${process.env.FRONTEND_URL}/cancel.html`,
        pending: `${process.env.FRONTEND_URL}/pending.html`,
      },
      auto_return: 'approved',
      external_reference: carritoId || '',
    };

    const preference = new Preference(client);
    const result = await preference.create({ body: preferenceData });

    // Si hay carritoId, actualizamos el pedido con el preferenceId
    if (carritoId) {
      await Carrito.findByIdAndUpdate(carritoId, { mpPreferenceId: result.id });
    }

    res.status(200).json({
      id: result.id,
      init_point: result.init_point, // URL para redirigir al usuario
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear preferencia de Mercado Pago', detalle: error.message });
  }
};

module.exports = {
  recibirCarrito,
  getPedidos,
  crearPreferencia,
};
