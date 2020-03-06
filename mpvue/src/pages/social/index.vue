<template>
  <div class="social">
    <Me></Me>
    SOCIAL
  </div>
</template>

<script>
import Me from "../me/index";

  export default {
    data () {},
    components: { Me },
    mounted () {
      this.$store.commit("changeNowPart", "social")
    }
  }
</script>

<style scoped>
</style>
