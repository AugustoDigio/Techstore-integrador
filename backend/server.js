const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');


const productosRouter = require('./routes/productos.routes');
const carritoRouter = require('./routes/carrito.routes');

const app = express();
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'src/views/layouts'),
  partialsDir: path.join(__dirname, 'src/views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'src/public')));

app.use(morgan('dev'));

connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);


app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente 🚀' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor', detalle: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/', (req, res) => res.render('home', { title: 'Inicio' }));
app.get('/productos', (req, res) => res.render('productos', { title: 'Productos' }));
app.get('/carrito', (req, res) => res.render('carrito', { title: 'Carrito' }));
app.get('/login', (req, res) => res.render('login', { title: 'Iniciar sesión' }));
app.get('/registro', (req, res) => res.render('registro', { title: 'Registrarse' }));
app.get('/success', (req, res) => res.render('success', { title: 'Pedido confirmado' }));

module.exports = app;
