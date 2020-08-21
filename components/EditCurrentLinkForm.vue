<template>
  <form class="flex flex-col" @submit.prevent="saveCopyLink">
    <label class="mt-8 font-bold">Customize back-half</label>
    <CustomInput
      v-model="currentLink.alias"
      class="w-full mt-2"
      :error="error"
      @keydown.space.prevent
    />
    <label class="mt-6 font-bold">Link password (Optional)</label>
    <CustomInput
      v-model="currentLink.password"
      type="password"
      placeholder="Password"
      class="w-full mt-2"
      :error="error"
    />

    <p v-show="error" class="mt-3 text-red-600">
      <AlertIcon class="inline" />
      Something went wrong, please try again
    </p>
    <CustomButton
      class="self-end mt-8 btn-primary btn-lg w-48"
      type="submit"
      :disabled="currentLinkAliasLength === 0"
    >
      Save &amp; Copy
    </CustomButton>
  </form>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

import useLinks from '@/composables/useLinks'
import useCopy from '@/composables/useCopy'

import AlertIcon from '~/assets/images/icons/alert.svg?inline'
export default {
  components: {
    AlertIcon,
  },
  setup(_props, { emit }) {
    const { currentLink, editLink, setCurrentLink, error } = useLinks()
    const { setCopied } = useCopy()

    const currentLinkAliasLength = computed(() => {
      return currentLink.value.alias.length
    })

    const saveCopyLink = () => {
      editLink(currentLink.value).then((data) => {
        if (!error.value) {
          setCopied(currentLink.value.originalUrl)
          setCurrentLink({})
          emit('on-saved')
        }
      })
    }
    return {
      error,
      currentLink,
      saveCopyLink,
      setCopied,
      currentLinkAliasLength,
    }
  },
}
</script>
