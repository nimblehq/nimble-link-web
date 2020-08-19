<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 v-if="links.length > 0" class="mb-4">Total {{ links.length }} links</h1>
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="text-left font-normal">URL</th>
          <th class="text-right font-normal">PASSWORD</th>
          <th class="text-right font-normal">TOTAL CLICK</th>
          <th class="text-right font-normal">DATE</th>
          <th class="text-right font-normal">ACTION</th>
        </tr>
      </thead>
      <tbody>
        <Link v-for="link in links" :key="link.id" v-bind="link" />
      </tbody>
    </table>

    <PasswordPopup />
  </div>
</template>

<script>
import { useFetch } from '@nuxtjs/composition-api'

import useLinks from '@/composables/useLinks'

export default {
  middleware: ['auth'],
  setup() {
    const { links, fetchLinks } = useLinks()

    useFetch(fetchLinks)

    return {
      links,
    }
  },
}
</script>
