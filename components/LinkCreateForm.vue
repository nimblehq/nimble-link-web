<template>
  <div class="mt-24 mx-auto flex flex-col items-center">
    <LogoIcon class="h-10" />
    <h1 class="mt-5 font-bold text-xl leading-8">
      Shortener, Custom Links & Link Management
    </h1>
    <div>
      <CustomButton class="btn-primary">
        Shorten
      </CustomButton>

      <CustomButton class="btn-primary btn-lg">
        Shorten
      </CustomButton>

      <CustomButton class="btn-secondary">
        Shorten
      </CustomButton>

      <CustomButton class="btn-secondary btn-lg">
        Shorten
      </CustomButton>
    </div>
  </div>
</template>

<script>
import LogoIcon from '~/assets/images/icons/logo.svg?inline'

export default {
  components: { LogoIcon },
}
</script>
