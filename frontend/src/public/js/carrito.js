// ======================================
// TECHSTORE — Carrito Global
// ======================================

// Actualizar badge del navbar al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
  actualizarBadge();
});

function actualizarBadge() {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }
}

function agregarAlCarrito(producto) {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

  const existente = carrito.find(item => item._id === producto._id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      _id: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen || '',
      categoria: producto.categoria || 'General',
      cantidad: 1
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarBadge();
  mostrarToastGlobal(`"${producto.nombre}" agregado al carrito`);
}

function mostrarToastGlobal(mensaje) {
  // Crear container si no existe
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'ts-toast';
  toast.innerHTML = `<i class="bi bi-bag-check-fill" style="color: var(--ts-accent)"></i><span>${mensaje}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
