<template>
  <div class="mt-16">
    <h1 v-show="linksCount > 0" class="font-bold text-large leading-9">
      Total {{ linksCount }} links
    </h1>
    <UserLinkList class="mt-4" />
  </div>
</template>

<script>
import useLinks from '@/composables/useLinks'

export default {
  middleware: ['auth'],

  setup() {
    const { linksCount } = useLinks()

    return { linksCount }
  },
}
</script>
