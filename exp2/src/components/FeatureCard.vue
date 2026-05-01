<template>
  <div :class="['col', wrapperClass]">
    <img :src="icon" width="48" height="48" />
    <div class="mt-2 mb-2">
      <h3>
        <b>{{ title }}</b>
      </h3>
    </div>
    <div>{{ description }}</div>
    <u class="mt-3 blue-text" @click="jumpReact">马上学习 &gt;</u>
  </div>
</template>

<script setup>
import useHomePage from '../js/homePageSetup.js'

const { jumpReact } = useHomePage()
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  wrapperClass: { type: String, default: '' },
})
</script>

<style scoped>
.blue-text {
  color: blue;
  cursor: pointer;
}
</style>
