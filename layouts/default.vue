<template>
  <div class="h-screen flex flex-col mx-8 md:mx-16 lg:mx-20 xl:mx-32">
    <div class="flex-initial"><Header /></div>
    <div class="flex-1 h-full"><Nuxt /></div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: 'Nimble Link',
    }
  },
}
</script>
