<template>
  <Transition name="toast">
    <div v-if="visible" :class="['toast-notification', 'show', { error: type === 'error' }]">
      {{ message }}
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: String,
    type: {
      type: String,
      default: 'success'
    }
  },
  data() {
    return {
      visible: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.visible = false
      setTimeout(() => {
        this.$emit('close')
      }, 300)
    }, 3000)
  }
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  transform: translateX(400px);
  opacity: 0;
}
.toast-leave-to {
  transform: translateX(400px);
  opacity: 0;
}
</style>
