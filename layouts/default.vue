<template>
  <div class="h-screen flex flex-col mx-12 md:mx-20 lg:mx-24 xl:mx-40">
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
