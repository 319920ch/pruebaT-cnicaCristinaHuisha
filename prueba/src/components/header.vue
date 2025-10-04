<template>
  <header class="header">
    <h1 @click="goHome" class="logo">Prueba Vue - Productos</h1>
    <div v-if="authStore.token" class="user-area">
      <span class="welcome">Hola, {{ authStore.user?.firstName || 'Usuario' }}</span>
      <button class="btn" @click="logout">Cerrar sesión</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const goHome = () => router.push(authStore.token ? '/productos' : '/login')
const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:12px 20px;
  background:#0b74de;
  color:white;
}
.logo { cursor:pointer; margin:0; font-size:18px; }
.user-area { display:flex; gap:10px; align-items:center; }
.welcome { font-size:14px; opacity:0.95; }
.btn { background:#fff; color:#0b74de; border:0; padding:6px 10px; border-radius:6px; cursor:pointer; }
</style>
