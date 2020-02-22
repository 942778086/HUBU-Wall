<template>
  <div class="demand">
    DEMAND<br>
    {{ message }}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: ''
      }
    },
    methods: {
      testNetwork () {
        this.$fly.get('/')
          .then(res => {
            this.message = res.data
          })
      }
    },
    created () {
      this.testNetwork()
    },
    mounted () {
      this.$store.commit("changeNowPart", "demand")
    }
  }
</script>

<style scoped>
</style>
