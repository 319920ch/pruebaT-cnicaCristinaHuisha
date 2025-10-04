<template>
  <div>
    <button class="btn secondary" @click="$router.back()">Volver</button>
    <div v-if="store.loading"><Loader /></div>

    <div v-else-if="product" class="grid" style="margin-top:12px;">
      <div class="card">
        <img :src="product.thumbnail" alt="main" style="width:100%; height:320px; object-fit:cover; border-radius:8px" />
        <div style="display:flex; gap:8px; margin-top:8px; flex-wrap:wrap;">
          <img v-for="(img, i) in product.images" :key="i" :src="img" @click="setMain(img)" style="width:72px; height:72px; object-fit:cover; cursor:pointer; border-radius:6px;" />
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
          <button class="btn secondary" @click="$router.push('/productos')">Ir a lista</button>
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
</script>
