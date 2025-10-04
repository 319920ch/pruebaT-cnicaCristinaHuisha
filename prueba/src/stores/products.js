import { defineStore } from 'pinia'
import { apiFetch } from '../services/api'
import { useAuthStore } from './auth'

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
    loading: false,
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    lastPage: 1
  }),

  actions: {
    async fetchProducts(page = 1) {
      const auth = useAuthStore()
      const token = auth.token
      this.page = page
      this.lastPage = page
      this.loading = true

      try {
        const res = await apiFetch(
          `/products?limit=${this.limit}&skip=${(page - 1) * this.limit}`,
          { token }
        )
        this.items = res.products || []
        this.total = res.total || 0
        this.totalPages = Math.ceil(this.total / this.limit)
      } catch (err) {
        console.error('Error al cargar productos:', err)
        this.items = []
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id) {
      const auth = useAuthStore()
      const token = auth.token
      try {
        const res = await apiFetch(`/products/${id}`, { token })
        return res
      } catch (err) {
        console.error('Error al cargar producto:', err)
        throw err
      }
    },

    changePage(p) {
      this.page = p
      this.lastPage = p
      this.fetchProducts(p)
    },

    async deleteProduct(id) {
      const auth = useAuthStore()
      const token = auth.token

      try {
        await apiFetch(`/products/${id}`, {
          method: 'DELETE',
          token
        })
        // opcional: recargar productos después de eliminar
        await this.fetchProducts(this.page)
      } catch (err) {
        console.error('Error al eliminar producto:', err)
        throw err
      }
    }
  }
})
