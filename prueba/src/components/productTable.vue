<template>
  <div class="card">
    <!-- Filtro / búsqueda -->
    <div class="controls">
      <input v-model="search" @input="onSearch" placeholder="Buscar por título o categoría" class="input" />
      <div style="margin-left:auto;">
        <button class="btn" @click="$emit('create')">Nuevo producto</button>
      </div>
    </div>

    <!-- Loader mientras se cargan productos -->
    <div v-if="loading"><slot name="loader"></slot></div>

    <!-- Tabla -->
    <table v-else class="table">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Título</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Rating</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in filtered" :key="p.id">
          <td><img :src="p.thumbnail" alt="thumb" class="thumb"/></td>
          <td>{{ p.title }}</td>
          <td>{{ p.category }}</td>
          <td>${{ p.price }}</td>
          <td>{{ p.rating }}</td>
          <td><span :class="['badge', p.stock>0 ? 'in-stock' : 'out-stock']">{{ p.stock }}</span></td>
          <td>
            <button class="btn secondary" @click="$emit('view', p.id)">Ver</button>
            <button class="btn secondary" @click="$emit('edit', p.id)">Editar</button>
            <button class="btn" @click="$emit('delete', p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div class="controls pagination" style="justify-content:center; margin-top:12px;">
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

const onSearch = () => {
}
</script>

<style scoped>
.table { width:100%; border-collapse: collapse; margin-top:12px; }
.table td, .table th{ border:1px solid #ede9e9; padding:6px; text-align:center; font-size:14px; }
.thumb { width:60px; height:60px; object-fit:cover; border-radius:4px; }
.badge.in-stock { color: green; font-weight:500; }
.badge.out-stock { color:red; font-weight:500; }
.table td button { margin-right:6px; }
.controls { display:flex; gap:8px; margin-bottom:12px; align-items:center; }
.input { padding:6px 8px; border:1px solid #ccc; border-radius:4px; width:200px; }
.btn { background:#0b74de; color:white; border:0; padding:6px 10px; border-radius:6px; cursor:pointer; }
.btn.secondary { background:#f3f4f6; color:#111827; }
.pagination span { font-weight:500; }
</style>