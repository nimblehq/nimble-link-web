<template>
  <div>
    <Header />
  </div>
</template>

<script>
export default {
  setup(_, context) {
    context.root.$router.push('/')
  },
}
</script>
