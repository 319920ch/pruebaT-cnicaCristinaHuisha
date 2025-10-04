<template>
  <div class="card">
    <div class="controls">
      <input v-model="search" @input="onSearch" placeholder="Buscar por título o categoría" class="input" />
      <div style="margin-left:auto;">
        <button class="btn" @click="$emit('create')">Nuevo producto</button>
      </div>
    </div>

    <div v-if="loading"><slot name="loader"></slot></div>

    <table v-else class="table">
      <thead>
        <tr>
          <th>Imagen</th><th>Título</th><th>Categoría</th><th>Precio</th><th>Rating</th><th>Stock</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in filtered" :key="p.id">
          <td><img :src="p.thumbnail" alt="thumb" /></td>
          <td>{{ p.title }}</td>
          <td>{{ p.category }}</td>
          <td>${{ p.price }}</td>
          <td>{{ p.rating }}</td>
          <td><span :class="['badge', p.stock>0 ? '' : '']">{{ p.stock }}</span></td>
          <td>
            <button class="btn secondary" @click="$emit('view', p.id)">Ver</button>
            <button class="btn secondary" @click="$emit('edit', p.id)">Editar</button>
            <button class="btn" @click="$emit('delete', p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="controls" style="justify-content:center; margin-top:12px;">
      <button class="btn secondary" :disabled="page<=1" @click="$emit('page', page-1)">Anterior</button>
      <span style="padding:8px 12px;">Página {{ page }} / {{ totalPages }}</span>
      <button class="btn secondary" :disabled="page>=totalPages" @click="$emit('page', page+1)">Siguiente</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  products: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  page: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 }
})
const emit = defineEmits(['view','edit','delete','create','page'])
const search = ref('')
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return props.products
  return props.products.filter(p => (p.title + ' ' + p.category).toLowerCase().includes(q))
})
const onSearch = () => { /* debounce opcional */ }
</script>

<style scoped>
.table td button { margin-right:6px; }
</style>
