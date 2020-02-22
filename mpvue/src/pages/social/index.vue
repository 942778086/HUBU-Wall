<template>
  <div class="social">
    SOCIAL
  </div>
</template>

<script>
  export default {
    data () {},
    mounted () {
      this.$store.commit("changeNowPart", "social")
    }
  }
</script>

<style scoped>
</style>
