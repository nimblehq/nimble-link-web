<template>
  <div class="w-screen h-screen">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  layout: '',
  setup(_, context) {
    context.root.$router.push('/')
  },
}
</script>

<style lang="postcss" scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner::before {
  @apply box-border absolute top-1/2 left-1/2 w-6 h-6 rounded-full border-2;

  content: '';
  border: 2px solid #ccc;
  border-top-color: #000;
  animation: spinner 0.6s linear infinite;
}
</style>
