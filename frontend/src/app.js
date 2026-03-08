const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Configuración de Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ==============================
// RUTAS
// ==============================

app.get('/', (req, res) => {
  res.render('home', { title: 'Inicio' });
});

app.get('/productos', (req, res) => {
  res.render('productos', { title: 'Productos' });
});

app.get('/carrito', (req, res) => {
  res.render('carrito', { title: 'Carrito' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Iniciar sesión' });
});

app.get('/registro', (req, res) => {
  res.render('registro', { title: 'Registrarse' });
});

app.get('/success', (req, res) => {
  res.render('success', { title: 'Pedido confirmado' });
});

// POST login (placeholder)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login intento:', email);
  // Acá iría la lógica de autenticación
  res.redirect('/');
});

// POST registro (placeholder)
app.post('/registro', (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  console.log('Nuevo registro:', nombre, apellido, email);
  // Acá iría la lógica de registro
  res.redirect('/login');
});

module.exports = app;
