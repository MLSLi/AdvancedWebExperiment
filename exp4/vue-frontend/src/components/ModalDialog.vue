<template>
  <div
    class="modal fade"
    :class="{ show: show }"
    :style="{ display: show ? 'block' : 'none' }"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body" style="min-height: 300px">
          <slot />
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal-backdrop fade"
    :class="{ show: show }"
    v-if="show"
    @click="$emit('close')"
  ></div>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
})
defineEmits(['close'])
</script>

<style scoped>
.modal-dialog {
  max-width: 500px;
}
.modal-content {
  border-radius: 0.5rem;
}
</style>
