<template>
  <div class="container">
    <h2>Crear Producto</h2>

    <form @submit.prevent="submitForm" class="product-form">

      <div class="form-group">
        <label>Título</label>
        <input type="text" v-model="form.title" required />
      </div>

      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="form.description" required></textarea>
      </div>

      <div class="form-group">
        <label>Precio</label>
        <input type="number" v-model.number="form.price" step="0.01" min="0" required />
      </div>

      <div class="form-group">
        <label>Categoría</label>
        <input type="text" v-model="form.category" required />
      </div>

      <div class="form-group">
        <label>Stock</label>
        <input type="number" v-model.number="form.stock" min="0" required />
      </div>

      <div class="form-group">
        <label>Imagen (URL)</label>
        <input type="text" v-model="form.thumbnail" placeholder="https://example.com/imagen.jpg" />
      </div>

      <div v-if="form.thumbnail" class="preview">
        <p>Previsualización:</p>
        <img :src="form.thumbnail" alt="preview" />
      </div>

      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? 'Creando...' : 'Crear Producto' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'

const store = useProductsStore()
const router = useRouter()

const form = ref({
  title: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  thumbnail: ''
})

const loading = ref(false)

const submitForm = async () => {
  if (!form.value.title || !form.value.description) return

  loading.value = true
   console.log('Datos enviados al crear producto:', { ...form.value })

  try {
    await store.createProduct({ ...form.value })
    alert('Producto creado con éxito!')
    router.push('/productos?page=1') // volver al listado
  } catch (err) {
    alert('Error creando producto: ' + (err.message || ''))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container { max-width: 500px; margin: 20px auto; }
.form-group { margin-bottom: 12px; display:flex; flex-direction:column; }
input, textarea { padding:6px 8px; border-radius:4px; border:1px solid #ccc; }
textarea { resize:vertical; }
.preview img { max-width:100%; margin-top:8px; border-radius:6px; }
.btn { background:#0b74de; color:white; padding:6px 10px; border-radius:6px; border:0; cursor:pointer; }
</style>
