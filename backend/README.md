# Proyecto Integrador II — Backend

API REST con Node.js, Express y MongoDB Atlas siguiendo arquitectura MVC.

---

## 📁 Estructura del proyecto

```
backend/
├── config/
│   └── db.js                  # Conexión a MongoDB Atlas
├── controllers/
│   ├── productos.controller.js # Lógica CRUD de productos
│   └── carrito.controller.js   # Lógica del carrito y Mercado Pago
├── models/
│   ├── Producto.js             # Esquema Mongoose de Producto
│   └── Carrito.js              # Esquema Mongoose de Carrito/Pedido
├── routes/
│   ├── productos.routes.js     # Rutas /api/productos
│   └── carrito.routes.js       # Rutas /api/carrito
├── .env.example                # Variables de entorno de ejemplo
├── .gitignore
├── package.json
└── server.js                   # Punto de entrada del servidor
```

---

## 🚀 Instalación y uso

### 1. Clonar e instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```
Luego editá el archivo `.env` con tus datos reales.

### 3. Configurar MongoDB Atlas (paso a paso)

1. Entrá a [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) y creá una cuenta gratuita
2. Creá un nuevo **Cluster** (elegí M0 Free Tier)
3. En **Database Access** → Add New User → creá usuario y contraseña
4. En **Network Access** → Add IP Address → seleccioná "Allow Access from Anywhere" (0.0.0.0/0)
5. En tu cluster → **Connect** → **Compass** o **Drivers** → copiá el connection string
6. Pegalo en tu `.env` reemplazando usuario, contraseña y nombre de base de datos

```env
MONGO_URI=mongodb+srv://tuUsuario:tuContraseña@cluster0.xxxxx.mongodb.net/proyectoIntegrador?retryWrites=true&w=majority
```

### 4. Correr el servidor
```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

---

## 📡 Endpoints disponibles

### Productos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener producto por ID |
| POST | `/api/productos` | Crear nuevo producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |

### Carrito
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/carrito` | Enviar pedido desde el frontend |
| GET | `/api/carrito` | Ver todos los pedidos |
| POST | `/api/carrito/crear-preferencia` | Crear preferencia de Mercado Pago |

---

## 💳 Integración Mercado Pago (Opcional)

1. Creá cuenta en [https://www.mercadopago.com.ar/developers](https://www.mercadopago.com.ar/developers)
2. En el panel de desarrolladores → **Mis aplicaciones** → Creá una app
3. Copiá el **Access Token** de prueba y el **Public Key**
4. Pegálos en tu `.env`

### Flujo de pago:
1. El frontend envía el carrito a `POST /api/carrito` → recibe el `carritoId`
2. Luego hace `POST /api/carrito/crear-preferencia` con los items y el `carritoId`
3. El backend devuelve `init_point` (URL de Mercado Pago)
4. El frontend redirige al usuario a esa URL
5. Al completar el pago, Mercado Pago redirige a `success.html` o `cancel.html`

---

## 🌐 Deploy en Glitch

1. Entrá a [https://glitch.com](https://glitch.com) y creá una cuenta
2. New Project → **Import from GitHub**
3. Una vez importado, en Glitch abrí el archivo `.env` (está oculto) y pegá tus variables
4. El proyecto se desplegará automáticamente en una URL pública tipo `https://tu-proyecto.glitch.me`

---

## 📦 Body de ejemplo — Crear Producto (POST /api/productos)

```json
{
  "nombre": "Hamburguesa Clásica",
  "descripcion": "Carne, lechuga, tomate y queso",
  "precio": 2500,
  "imagen": "https://url-de-tu-imagen.com/burger.jpg",
  "categoria": "Hamburguesas",
  "stock": 50
}
```

## 📦 Body de ejemplo — Enviar Carrito (POST /api/carrito)

```json
{
  "items": [
    {
      "nombre": "Hamburguesa Clásica",
      "precio": 2500,
      "cantidad": 2,
      "imagen": "https://url-imagen.com/burger.jpg"
    }
  ],
  "total": 5000,
  "cliente": {
    "nombre": "Juan Pérez",
    "email": "juan@email.com"
  }
}
```
