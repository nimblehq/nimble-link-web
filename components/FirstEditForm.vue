<template>
  <div class="flex flex-col my-6">
    <div class="flex items-center">
      <SuccessIcon class="inline" />
      <span class="font-bold mx-2">Done!</span>
      You can also set a password and customize the link 👇
    </div>
    <hr class="mt-8" />
    <form class="flex flex-col" @submit.prevent="saveLink">
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

      <CustomButton
        v-clipboard:copy="shortLinkUrl(currentLink.alias)"
        class="self-end mt-8 btn-primary btn-lg w-48"
        type="sumit"
        @click="saveLink"
      >
        Save &amp; Copy
      </CustomButton>
    </form>
  </div>
</template>

<script>
import useLinks from '@/composables/useLinks'
import SuccessIcon from '~/assets/images/icons/success.svg?inline'

export default {
  components: { SuccessIcon },
  setup() {
    const { currentLink, shortLinkUrl, editLink } = useLinks()
    const saveLink = () => {
      editLink(currentLink.value)
    }
    return {
      shortLinkUrl,
      currentLink,
      saveLink,
    }
  },
}
</script>
