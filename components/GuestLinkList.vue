<template>
  <div class="max-w-7xl mx-auto">
    <table class="w-full">
      <tbody>
        <GuestLinkItem
          v-for="link in recentLinks"
          :key="link.id"
          v-bind="link"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import useLinks from '@/composables/useLinks'

export default {
  middleware: ['auth'],
  setup() {
    const { recentLinks } = useLinks()

    return {
      recentLinks,
    }
  },
}
</script>
