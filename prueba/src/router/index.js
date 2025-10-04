import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ProductFormView from '../views/ProductFormView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductsNewView from '../views/ProductNewView.vue'

// Definición de rutas
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/productos', component: ProductsView, meta: { requiresAuth: true } },
  { path: '/productos/nuevo', component: ProductsNewView, meta: { requiresAuth: true } },
  { path: '/productos/:id', component: ProductDetailView, meta: { requiresAuth: true } },
  { path: '/productos/:id/editar', component: ProductFormView, meta: { requiresAuth: true } }
]

// Crear router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global para rutas protegidas
router.beforeEach((to, from, next) => {
  // Leer token directamente de localStorage para evitar problemas de inicialización
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')   // Si no hay token, redirige a login
  } else {
    next()           // Si hay token o ruta no requiere auth, permite navegar
  }
})

export default router
