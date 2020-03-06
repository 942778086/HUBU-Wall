<template>
  <div class="conversion">
    <Me></Me>
    twoHand
  </div>
</template>

<script>
import Me from "../me/index";
  export default {
    data() {},
    components: { Me },
    mounted () {
      this.$store.commit("changeNowPart", "conversion")
    }
  }
</script>

<style scoped>
</style>
