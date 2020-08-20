<template>
  <div class="h-screen w-screen flex flex-col">
    <header
      class="flex-initial h-12 md:h-14 lg:h-18 bg-black flex items-center justify-center"
    >
      <LogoIcon class="h2 md:h-3" />
    </header>
    <div class="flex-1 h-full mx-16 md:mx-48 lg:mx-auto lg:max-w-xl">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import LogoIcon from '~/assets/images/icons/logo-white.svg?inline'

export default {
  components: { LogoIcon },
  head() {
    return {
      title: 'Nimble Link',
    }
  },
}
</script>
