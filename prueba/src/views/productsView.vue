<template>
  <div>
    <!-- Contenido principal -->
    <div style="padding:20px">
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
        <h2>Productos</h2>
        <div style="margin-left:auto;">
          <button class="btn" @click="goNew">Nuevo producto</button>
        </div>
      </div>

      <ProductTable
        :products="store.items"
        :loading="store.loading"
        :page="store.page"
        :totalPages="store.totalPages"
        @view="viewProduct"
        @edit="editProduct"
        @delete="confirmDelete"
        @create="goNew"
        @page="changePage"
      >
        <template #loader>
          <Loader />
        </template>
      </ProductTable>

      <ConfirmModal 
        :visible="showConfirm" 
        title="Eliminar producto" 
        message="¿Eliminar este producto?" 
        @cancel="showConfirm=false" 
        @confirm="deleteProductConfirmed" 
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ConfirmModal from '../components/confirmModal.vue'
import Loader from '../components/loader.vue'
import ProductTable from '../components/productTable.vue'
import { useProductsStore } from '../stores/products'

const store = useProductsStore()
const router = useRouter()
const showConfirm = ref(false)
const idToDelete = ref(null)

onMounted(() => store.fetchProducts(1))

const viewProduct = (id) => router.push(`/productos/${id}`)
const editProduct = (id) => router.push(`/productos/${id}/editar`)
const goNew = () => router.push('/productos/nuevo')
const changePage = (p) => store.fetchProducts(p)

const confirmDelete = (id) => { idToDelete.value = id; showConfirm.value = true }
const deleteProductConfirmed = async () => {
  try {
    await store.deleteProduct(idToDelete.value)
    showConfirm.value = false
    await store.fetchProducts(store.page)
    alert('Producto eliminado')
  } catch (err) {
    alert('Error al eliminar: ' + (err.message || ''))
  }
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
</style>
