<template>
  <slot v-if="showSlot" :userPermissions="permissions"></slot>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/modules/useAuth'

const authStore = useAuthStore()

const props = defineProps({
  permission: {
    type: [Array, String],
  },
})

const showSlot = computed(() => {
  if (!props.permission) {
    return true
  }
  if (!authStore.permissions) {
    return false
  }

  if (Array.isArray(props.permission)) {
    return props.permission.every(p => authStore.permissions.includes(p))
  } else {
    return authStore.permissions.includes(props.permission)
  }
})
</script>