<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal card">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:12px;">
        <button class="btn secondary" @click="$emit('cancel')">Cancelar</button>
        <button class="btn" @click="$emit('confirm')">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: 'Confirmar' },
  message: { type: String, default: '¿Estás seguro?' }
})
</script>

<style scoped>
.modal-backdrop {
  position:fixed; inset:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center;
}
.modal { width:90%; max-width:420px; }
.btn.secondary { background:#f3f4f6; color:#111827; }
</style>
