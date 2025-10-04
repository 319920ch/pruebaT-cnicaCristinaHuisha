<template>
  <div>
    <!-- Botón Volver a la última página de productos -->
    <button class="btn secondary" @click="goHome">Ir al inicio</button>

    <div v-if="store.loading"><Loader /></div>

    <div v-else-if="product" class="grid" style="margin-top:12px;">
      <div class="card">
        <img :src="product.thumbnail" alt="main" style="width:100%; height:320px; object-fit:cover; border-radius:8px" />
        <div style="display:flex; gap:8px; margin-top:8px; flex-wrap:wrap;">
          <img 
            v-for="(img, i) in product.images" 
            :key="i" 
            :src="img" 
            @click="setMain(img)" 
            style="width:72px; height:72px; object-fit:cover; cursor:pointer; border-radius:6px;" 
          />
        </div>
      </div>

      <div class="card">
        <h2>{{ product.title }}</h2>
        <p style="color:#6b7280;">{{ product.category }}</p>
        <p style="margin-top:8px;">{{ product.description }}</p>
        <p style="margin-top:12px;"><strong>Precio:</strong> ${{ product.price }}</p>
        <p><strong>Rating:</strong> {{ product.rating }}</p>
        <p><strong>Stock:</strong> <span class="badge">{{ product.stock }}</span></p>
        <div style="display:flex; gap:8px; margin-top:12px;">
          <button class="btn" @click="goEdit">Editar</button>
          <button class="btn secondary" @click="goBack">Volver</button>
        </div>
      </div>
    </div>

    <div v-else class="card">Producto no encontrado.</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Loader from '../components/loader.vue'
import { useProductsStore } from '../stores/products'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()
const product = ref(null)

const load = async () => {
  try {
    const id = route.params.id
    const data = await store.fetchProductById(id)
    product.value = data
  } catch (err) {
    alert('Error cargando producto')
  }
}

onMounted(load)

const setMain = (img) => {
  product.value.thumbnail = img
}

const goEdit = () => router.push(`/productos/${route.params.id}/editar`)


const goBack = () => {
  const page = route.query.page || 1
  router.push(`/productos?page=${page}`)
}


// Ir al inicio (página 1)
const goHome = () => {
  router.push(`/productos?page=1`)
}
</script>

<style scoped>
.btn {
  background:#0b74de;
  color:white;
  border:0;
  padding:6px 10px;
  border-radius:6px;
  cursor:pointer;
}
.btn.secondary {
  background:#dce3f0;
  color:#0b74de;
}
.grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.card {
  flex: 1 1 300px;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0,0,0,0.1);
}
.badge {
  background:#0b74de; 
  color:white; 
  padding:2px 6px; 
  border-radius:4px;
}
</style>
