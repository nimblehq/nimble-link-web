<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="linksCount > 0" class="mt-24 h-full relative">
      <div class="fixed left-0 w-full h-full bg-gray-200 -z-10"></div>
      <h1 class="mt-8 font-bold text-xl">Recent links</h1>
      <div class="mt-6">
        <UserLinkList v-if="$auth.loggedIn" :recent="true" />
        <GuestLinkList v-else />
      </div>
    </div>
  </transition>
</template>

<script>
import useLinks from '@/composables/useLinks'

export default {
  setup() {
    const { linksCount } = useLinks()

    return { linksCount }
  },
}
</script>
