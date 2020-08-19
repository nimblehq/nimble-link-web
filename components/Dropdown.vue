<template>
  <transition
    enter-active-class="transition ease-out duration-100"
    enter-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="isOpened"
      v-click-outside="toggleFunction"
      class="origin-top-right absolute right-0 mt-2 w-32 rounded shadow-lg border-black border-2 z-10"
    >
      <div
        class="py-1 rounded-md bg-white shadow-xs"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
        @click="toggleFunction"
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
    toggleFunction: {
      type: Function,
      required: true,
    },
  },
}
</script>
