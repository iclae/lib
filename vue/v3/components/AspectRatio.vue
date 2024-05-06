<template>
  <div class="aspect-ratio-comp" :style="{ width: width }">
    <div
      class="aspect-ratio-inner"
      :style="{ 'padding-bottom': `${ratio * 100}%` }"
    >
      <div class="aspect-ratio-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ratio: {
    type: Number,
    required: true,
  },
  width: {
    type: Number | String,
    default: '100%',
  },
})
</script>

<style scoped>
.aspect-ratio-inner {
  position: relative;
  width: 100%;
}
.aspect-ratio-container {
  position: absolute;
  inset: 0;
}
</style>
