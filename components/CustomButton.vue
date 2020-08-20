<template>
  <button class="btn" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style lang="postcss">
.btn {
  @apply h-8 px-4 py-1 text-base font-medium leading-6 text-center rounded border-2 border-solid border-blue;

  &:focus {
    @apply outline-none shadow-outline;
  }

  &-primary {
    @apply bg-blue text-white;

    &:hover {
      @apply bg-blue-600 border-blue-600;
    }

    &:active {
      @apply bg-blue-700 border-blue-700;
    }

    &:disabled {
      @apply bg-gray text-gray-100 border-gray cursor-not-allowed;
    }
  }

  &-secondary {
    @apply bg-white text-blue border-blue;

    &:hover {
      @apply text-blue-600 border-blue-600;
    }

    &:active {
      @apply text-blue-700 border-blue-700;
    }

    &:disabled {
      @apply text-black-300 border-gray cursor-not-allowed;
    }

    &-lg {
      @apply text-gray-100;
    }
  }

  &-lg {
    @apply h-12 w-48 py-3 rounded-md;
  }

  &-xl {
    @apply h-14 w-48 py-3 rounded-md;
  }
}
</style>
