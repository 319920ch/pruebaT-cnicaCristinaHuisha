<template>
  <div class="card" style="max-width:420px; margin:24px auto;">
    <h2>Iniciar sesión</h2>

    <form @submit.prevent="submit" style="margin-top:12px; color:#374151; font-size:13px;">
      <div style="display:flex; flex-direction:column; gap:8px;">
        <input v-model="username" class="input" placeholder="Usuario" />
        <input v-model="password" type="password" class="input" placeholder="Contraseña" />
        <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:8px;">
          <button class="btn" :disabled="loading">{{ loading ? 'Ingresando...' : 'Entrar' }}</button>
        </div>
      </div>
    </form>

    <!-- Mensaje de error -->
    <p v-if="error" class="error-msg">{{ error }}</p>

    <!-- Loading -->
    <Loader :show="loading">
      <p class="loader-msg">Estamos comprobando tus datos...</p>
    </Loader>

    <!-- Modal bienvenida -->
    <div v-if="showWelcome" class="modal-backdrop">
      <div class="modal card">
        <h3>¡Hola, {{ authStore.user.firstName }}!</h3>
        <p class="redirect-msg">Serás redirigido a Productos en breve...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Loader from '../components/loader.vue'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const showWelcome = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(username.value, password.value)

    // Mostrar  bienvenida
    showWelcome.value = true

    // Redirigir a Productos  2 segundos
    setTimeout(() => {
      showWelcome.value = false
      router.push('/productos')
    }, 2000)
    
  } catch (err) {
    error.value = authStore.error || 'Credenciales inválidas'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.btn {
  background:#0b74de;
  color:white;
  border:0;
  padding:6px 10px;
  border-radius:6px;
  cursor:pointer;
}
.btn:disabled {
  opacity:0.6;
  cursor:not-allowed;
}
.error-msg {
  color:#b91c1c;
  margin-top:8px;
}
.loader-msg {
  margin:8px 0;
  text-align:center;
  font-size:14px;
  color:#0b74de;
}
.modal-backdrop {
  position: fixed;
  inset:0;
  background: rgba(0,0,0,0.4);
  display:flex;
  align-items:center;
  justify-content:center;
}
.modal {
  width:90%;
  max-width:420px;
  padding:26px;
  text-align:center;
  font-size:20px;
  border-radius:8px;
}
.redirect-msg {
  color: #0b74de;
  font-weight: 500;
  font-size: 16px;
}
</style>