<template>
  <div class="row mt-3">
    <div class="col"><span v-if="required" class="red-text">* </span>{{ label }}</div>
    <div class="col">
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="input-round"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: String, default: '' },
  required: { type: Boolean, default: true },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.red-text {
  color: red;
}
.input-round {
  border-radius: 5px;
  border: 2px solid #9f9f9f;
}
</style>
