<template>
  <div id="app">
    <header class="header">
      <h1 @click="goHome" class="logo">Prueba Vue - Productos</h1>

      <!-- Header siempre visible si hay token -->
      <div v-if="token" class="user-area">
        <span class="welcome">Hola, {{ user?.firstName || 'Usuario' }}</span>
        <button class="btn" @click="logout">Cerrar sesión</button>
      </div>
    </header>

    <main class="container">
      <router-view />
    </main>

    <footer class="footer">
      <small>Prueba técnica - Cristina Huisha</small>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Computeds reactivos: actualizan la vista inmediatamente
const user = computed(() => authStore.user)
const token = computed(() => authStore.token)

// Navegación y logout
const goHome = () => router.push(token.value ? '/productos' : '/login')
const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.header {
  display:flex; justify-content:space-between; align-items:center;
  padding:12px 20px; background:#0b74de; color:white;
}
.logo { cursor:pointer; margin:0; font-size:18px; }
.container { padding:20px; min-height:70vh; }
.footer { text-align:center; padding:12px; color:#666; background:#f5f5f5; }
.btn { background:#fff; color:#0b74de; border:0; padding:6px 10px; border-radius:6px; cursor:pointer; }
.user-area { display:flex; gap:10px; align-items:center; }
.welcome { font-size:14px; opacity:0.95; }
</style>
