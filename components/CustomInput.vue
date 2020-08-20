<template>
  <input
    :id="id"
    class="form-input"
    :class="{ 'form-input-saved': saved }"
    type="text"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    saved: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="postcss">
.form-input {
  @apply h-12 px-4 py-3 appearance-none outline-none border-3 border-black rounded-md;

  &::placeholder {
    @apply text-black-600;
  }

  &-saved {
    @apply text-blue;
  }

  &:active,
  &:focus {
    @apply border-blue;
  }

  &:disabled {
    @apply bg-white-70 border-gray text-black-300 cursor-not-allowed;
  }

  &-xl {
    @apply h-14 px-5 py-4;
  }
}
</style>
