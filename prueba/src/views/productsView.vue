<template>
  <div>
    <main class="container">
      <div style="padding:3px">
        <h2 style="margin-bottom:2px;">Productos</h2>

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
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmModal from '../components/confirmModal.vue'
import Loader from '../components/loader.vue'
import ProductTable from '../components/productTable.vue'
import { useAuthStore } from '../stores/auth'
import { useProductsStore } from '../stores/products'

const store = useProductsStore()
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const showConfirm = ref(false)
const idToDelete = ref(null)

// Computed para mostrar el header dinámico
const user = computed(() => auth.user)
console.log('token:', auth.token)
console.log('user:', auth.user)

// Cargar productos según la query 'page'
onMounted(() => {
  const page = parseInt(route.query.page) || 1
  store.fetchProducts(page)
})
const changePage = (p) => {
  store.changePage(p) 
}

// Funciones CRUD
const viewProduct = (id) => {
  router.push({ path: `/productos/${id}`, query: { page: store.page } })
}
const editProduct = (id) => router.push(`/productos/${id}/editar`)
const goNew = () => router.push('/productos/nuevo')

const confirmDelete = (id) => { idToDelete.value = id; showConfirm.value = true }

const deleteProductConfirmed = async () => {
 try {
   await store.deleteProduct(idToDelete.value)
    showConfirm.value = false
   //alert('Producto eliminado')
  } catch (err) {
    alert('Error al eliminar: ' + (err.message || ''))
  }
  }


// Header
const goHome = () => router.push('/productos')
const logout = () => {
  auth.logout()
  router.push('/login')
}

</script>

<style scoped>
.logo { cursor:pointer; margin:0; font-size:18px; }
.container { padding:20px; min-height:70vh; margin-top:12px; }
.btn { background:#fff; color:#0b74de; border:0; padding:6px 10px; border-radius:6px; cursor:pointer; }
.user-area { display:flex; gap:10px; align-items:center; }
.welcome { font-size:14px; opacity:0.95; }
</style>
