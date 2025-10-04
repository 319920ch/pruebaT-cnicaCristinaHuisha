import { defineStore } from 'pinia'
import { apiFetch } from '../services/api'
import { useAuthStore } from './auth'

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
    total: 0,
    limit: 10,
    page: 1,
    loading: false,
    error: null,
    current: null
  }),
  actions: {
    async fetchProducts(page = 1) {
      this.loading = true
      this.error = null
      try {
        this.page = page
        const skip = (page - 1) * this.limit
        const auth = useAuthStore()
        const token = auth.token
        const data = await apiFetch(`/products?limit=${this.limit}&skip=${skip}`, { token })
        this.items = data.products || []
        this.total = data.total || 0
      } catch (err) {
        this.error = err.message || 'Error cargando productos'
      } finally {
        this.loading = false
      }
    },
    async fetchProductById(id) {
      this.loading = true
      this.error = null
      try {
        const auth = useAuthStore()
        const data = await apiFetch(`/products/${id}`, { token: auth.token })
        this.current = data
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    async createProduct(payload) {
      this.loading = true
      try {
        const auth = useAuthStore()
        const data = await apiFetch('/products/add', { method: 'POST', body: payload, token: auth.token })
        return data
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    },
    async updateProduct(id, payload) {
      this.loading = true
      try {
        const auth = useAuthStore()
        const data = await apiFetch(`/products/${id}`, { method: 'PUT', body: payload, token: auth.token })
        return data
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    },
    async deleteProduct(id) {
      this.loading = true
      try {
        const auth = useAuthStore()
        const data = await apiFetch(`/products/${id}`, { method: 'DELETE', token: auth.token })
        return data
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    }
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.total / state.limit) || 1
    }
  }
})
