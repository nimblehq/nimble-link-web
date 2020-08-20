<template>
  <div class="mt-24 flex flex-col items-center">
    <LogoIcon class="h-10" />
    <h1 class="mt-5 font-bold text-xl leading-8">
      Shortener, Custom Links & Link Management
    </h1>
    <div class="w-full flex mt-10">
      <div class="w-4/5">
        <CustomInput
          v-model="currentLink.originalUrl"
          placeholder="Paste a long URL"
          class="w-full"
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
          @click="createLink"
        >
          Shorten
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
import useCopy from '@/composables/useCopy'
import useLinks from '~/composables/useLinks'

import LogoIcon from '~/assets/images/icons/logo.svg?inline'

export default {
  components: { LogoIcon },

  setup() {
    const { createLink, currentLink, saved, shortLinkUrl } = useLinks()
    const { copied, setCopied } = useCopy()

    return {
      copied,
      setCopied,
      saved,
      createLink,
      currentLink,
      shortLinkUrl,
    }
  },
}
</script>
