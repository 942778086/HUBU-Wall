<template>
  <div class="conversion">
    twoHand
  </div>
</template>

<script>
  export default {
    data() {},
    mounted () {
      this.$store.commit("changeNowPart", "conversion")
    }
  }
</script>

<style scoped>
</style>
