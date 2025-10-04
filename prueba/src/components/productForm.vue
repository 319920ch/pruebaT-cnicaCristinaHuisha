<template>
  <div class="card">
    <h3>{{ isEdit ? 'Editar producto' : 'Crear producto' }}</h3>
    <form @submit.prevent="handleSubmit">
      <div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
        <input v-model="form.title" class="input" placeholder="Título" />
        <input v-model="form.category" class="input" placeholder="Categoría" />
        <textarea v-model="form.description" class="input" rows="4" placeholder="Descripción"></textarea>
        <input v-model.number="form.price" type="number" step="0.01" min="0" class="input" placeholder="Precio" />
        <input v-model.number="form.stock" type="number" class="input" placeholder="Stock" />
        <div style="display:flex; gap:8px; justify-content:flex-end;">
          <button class="btn secondary" type="button" @click="$emit('cancel')">Cancelar</button>
          <button class="btn" :disabled="submitting">{{ submitting ? 'Guardando...' : 'Guardar' }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  isEdit: { type: Boolean, default: false }
})
const emit = defineEmits(['submit','cancel'])
const submitting = ref(false)

const form = ref({
  title: '', description: '', price: 0, category: '', stock: 0
})

watch(() => props.modelValue, (v) => {
  if (v) form.value = { title: v.title || '', description: v.description || '', price: v.price||0, category: v.category||'', stock: v.stock||0 }
}, { immediate: true })

const handleSubmit = async () => {
  submitting.value = true
  try {
    await emit('submit', { ...form.value })
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
textarea.input { resize:vertical; }
</style>
