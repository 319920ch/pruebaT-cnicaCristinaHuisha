<template>
  <div>
    <button class="btn secondary" @click="$router.back()">Volver</button>
    <div style="margin-top:12px;">
      <ProductForm :modelValue="product" :isEdit="isEdit" @submit="handleSubmit" @cancel="$router.back()" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductForm from '../components/productForm.vue'
import { useProductsStore } from '../stores/products'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()
const product = ref(null)
const isEdit = ref(false)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    isEdit.value = true
    try {
      const data = await store.fetchProductById(id)
      product.value = data
    } catch (err) {
      alert('Error al cargar producto para editar')
    }
  } else {
    isEdit.value = false
    product.value = null
  }
})

const handleSubmit = async (payload) => {
  try {
    if (isEdit.value) {
      await store.updateProduct(route.params.id, payload)
      alert('Producto actualizado')
      router.push(`/productos/${route.params.id}`)
    } else {
      const created = await store.createProduct(payload)
      alert('Producto creado: ID ' + (created.id || ''))
      router.push('/productos')
    }
    await store.fetchProducts(store.page)
  } catch (err) {
    alert('Error guardando producto: ' + (err.message || ''))
  }
}
</script>
