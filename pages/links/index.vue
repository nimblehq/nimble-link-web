<template>
  <div>
    <ul>
      <li v-for="link in links" :key="link.id">
        <div>{{ link.original_url }}</div>
      </li>
    </ul>
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
