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
  }),
  actions: {
    async fetchProducts(page = 1) {
      const auth = useAuthStore()
      this.page = page
      this.loading = true
      try {
        const res = await apiFetch(`/products?limit=${this.limit}&skip=${(page-1)*this.limit}`, {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        })
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

    async deleteProduct(id) {
      const auth = useAuthStore()
      try {
        await apiFetch(`/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        })
      } catch (err) {
        throw err
      }
    }
  }
})
