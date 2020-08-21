<template>
  <div class="flex flex-col my-6">
    <div class="flex items-center">
      <SuccessIcon class="inline" />
      <span class="font-bold mx-2">Done!</span>
      You can also set a password and customize the link 👇
    </div>
    <hr class="mt-8" />
    <EditCurrentLinkForm />
  </div>
</template>

<script>
import SuccessIcon from '~/assets/images/icons/success.svg?inline'

export default {
  components: { SuccessIcon },
}
</script>
