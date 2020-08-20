<template>
  <div class="max-w-7xl mx-auto">
    <table class="w-full">
      <tbody>
        <GuestLinkItem v-for="link in links" :key="link.id" v-bind="link" />
      </tbody>
    </table>
  </div>
</template>

<script>
import useLinks from '@/composables/useLinks'

export default {
  middleware: ['auth'],
  setup() {
    const { links } = useLinks()

    return {
      links,
    }
  },
}
</script>
