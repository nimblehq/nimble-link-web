<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="linksCount > 0" class="mt-24">
      <div class="relative -left-50 w-screen bg-gray-200 h-full">
        <div class="flex flex-col mx-10 md:mx-20 lg:mx-24 xl:mx-40">
          <div class="mt-8">
            <h2 class="font-bold text-xl leading-8 inline float-left">
              Recent links
            </h2>
            <nuxt-link
              v-if="$auth.loggedIn"
              to="/links"
              class="text-blue text-right inline float-right leading-relaxed"
            >
              View all ({{ linksCount }} links)
            </nuxt-link>
          </div>
          <div class="mt-6">
            <UserLinkList v-if="$auth.loggedIn" :recent="true" />
            <GuestLinkList v-else />
          </div>
        </div>
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
