<template>
  <form class="flex flex-col" @submit.prevent="saveCopyLink">
    <label class="mt-8 font-bold">Customize back-half</label>
    <CustomInput
      v-model="currentLink.alias"
      class="w-full mt-2"
      @keydown.space.prevent
    />
    <label class="mt-6 font-bold">Link password (Optional)</label>
    <CustomInput
      v-model="currentLink.password"
      type="password"
      placeholder="Password"
      class="w-full mt-2"
    />

    <CustomButton class="self-end mt-8 btn-primary btn-lg w-48" type="submit">
      Save &amp; Copy
    </CustomButton>
  </form>
</template>

<script>
import useLinks from '@/composables/useLinks'
import useCopy from '@/composables/useCopy'

export default {
  setup(_props, { emit }) {
    const { currentLink, editLink, setCurrentLink } = useLinks()
    const { setCopied } = useCopy()
    const saveCopyLink = () => {
      editLink(currentLink.value).then((data) => {
        setCopied(currentLink.value.originalUrl)
        setCurrentLink({})
        emit('on-saved')
      })
    }
    return {
      currentLink,
      saveCopyLink,
      setCopied,
    }
  },
}
</script>
