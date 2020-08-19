<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 v-if="links.length > 0" class="mb-4 font-bold text-large leading-9">
      Total {{ links.length }} links
    </h1>
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="text-left text-xs font-medium leading-6">URL</th>
          <th class="text-right text-xs font-medium leading-6">PASSWORD</th>
          <th class="text-right text-xs font-medium leading-6">TOTAL CLICK</th>
          <th class="text-right text-xs font-medium leading-6">DATE</th>
          <th class="text-right text-xs font-medium leading-6">ACTION</th>
        </tr>
      </thead>
      <tbody>
        <LinkItem v-for="link in links" :key="link.id" v-bind="link" />
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
