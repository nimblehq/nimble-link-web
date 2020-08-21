<template>
  <div class="mt-24 flex flex-col items-center">
    <LogoIcon class="h-10" />
    <h1 class="mt-5 font-bold text-xl leading-8">
      Shortener, Custom Links & Link Management
    </h1>
    <form class="w-full flex mt-10" @submit.prevent="createLink">
      <div class="w-4/5">
        <CustomInput
          v-model="currentLink.originalUrl"
          autofocus
          placeholder="Paste a long URL"
          class="w-full"
          :error="error"
          :saved="saved"
        >
        </CustomInput>
      </div>
      <div class="w-1/5 ml-2">
        <CustomButton
          v-if="saved"
          v-clipboard:copy="shortLinkUrl(currentLink.alias)"
          v-clipboard:success="setCopied"
          class="btn-secondary btn-lg w-full"
        >
          {{ copied ? 'Copied' : 'Copy' }}
        </CustomButton>
        <CustomButton
          v-else
          class="btn-primary btn-lg w-full"
          :disabled="error"
          @click="createLink"
        >
          Shorten
        </CustomButton>
      </div>
    </form>
    <div v-if="error" class="mt-3 w-full">
      <AlertIcon class="inline" />
      The link you have entered is invalid, please try again
    </div>
  </div>
</template>

<script>
import useCopy from '@/composables/useCopy'
import useLinks from '~/composables/useLinks'
import AlertIcon from '~/assets/images/icons/alert.svg?inline'
import LogoIcon from '~/assets/images/icons/logo.svg?inline'

export default {
  components: { LogoIcon, AlertIcon },

  setup() {
    const { createLink, currentLink, saved, shortLinkUrl, error } = useLinks()
    const { copied, setCopied } = useCopy()

    return {
      copied,
      setCopied,
      saved,
      createLink,
      currentLink,
      shortLinkUrl,
      error,
    }
  },
}
</script>
