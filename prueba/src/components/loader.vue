<template>
  <div class="loader" v-if="show">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({ show: { type: Boolean, default: true } })
</script>

<style scoped>
.loader { display:flex; justify-content:center; align-items:center; padding:12px; }
.spinner {
  width:36px; height:36px; border:4px solid rgba(11,116,222,0.15); border-top-color:#0b74de;
  border-radius:50%; animation:spin 1s linear infinite;
}
@keyframes spin { to { transform:rotate(360deg); } }
</style>
