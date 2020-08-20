<template>
  <div class="h-full flex flex-col">
    <LinkCreateForm class="flex-initial" />
    <FirstEditForm v-if="canEdit" />
    <RecentLink v-else class="flex-auto" />
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import useLinks from '@/composables/useLinks'

export default {
  setup() {
    const { currentLink } = useLinks()
    const { $auth } = useContext()
    const canEdit = computed(() => $auth.loggedIn && currentLink.value.canEdit)
    return {
      canEdit,
    }
  },
}
</script>
