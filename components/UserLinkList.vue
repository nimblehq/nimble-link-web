<template>
  <div class="max-w-7xl mx-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="w-5/12 text-left text-xs font-medium leading-6">URL</th>
          <th class="w-1/12 text-right text-xs font-medium leading-6">
            PASSWORD
          </th>
          <th class="w-1/12 text-right text-xs font-medium leading-6">
            TOTAL CLICK
          </th>
          <th class="w-2/12 text-right text-xs font-medium leading-6">DATE</th>
          <th class="w-3/12 text-right text-xs font-medium leading-6">
            ACTION
          </th>
        </tr>
      </thead>
      <tbody v-if="recent">
        <UserLinkItem
          v-for="link in recentLinks"
          :key="link.id"
          v-bind="link"
        />
      </tbody>
      <tbody v-else>
        <UserLinkItem v-for="link in links" :key="link.id" v-bind="link" />
      </tbody>
    </table>

    <PasswordPopup />
    <Confirmation :confirm-callback-function="deleteLink" />
    <EditPopup />
  </div>
</template>

<script>
import { useFetch } from '@nuxtjs/composition-api'

import useLinks from '@/composables/useLinks'

export default {
  middleware: ['auth'],

  props: {
    recent: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const { links, fetchLinks, deleteLink, recentLinks } = useLinks()

    useFetch(fetchLinks)

    return {
      deleteLink,
      links,
      recentLinks,
    }
  },
}
</script>
