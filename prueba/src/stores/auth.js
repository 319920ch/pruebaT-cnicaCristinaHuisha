import { defineStore } from 'pinia'
import { apiFetch } from '../services/api'

export const useAuthStore = defineStore('auth', {
  id: 'auth',
  state: () => ({
    token: null,
    user: null,
    loading: false,
    error: null
  }),
  persist: true, 
  actions: {
    async login(username, password) {
      this.loading = true
      this.error = null
      try {
        const data = await apiFetch('/auth/login', {
          method: 'POST',
          body: { username, password }
        })
         this.token = data.accessToken
        this.user = { firstName: data.firstName || username, ...data }
      } catch (err) {
        this.error = 'Usuario y/o contraseña incorrectos. Revise los datos ingresados'
        throw err
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.token = null
      this.user = null
    }
  }
})

