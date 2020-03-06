<template>
  <div class="demand">
    <Me></Me>DEMAND
    <br />
    {{ message }}
  </div>
</template>

<script>
import Me from "../me/index";
export default {
  data() {
    return {
      message: ""
    };
  },
  components: { Me },
  methods: {
    testNetwork() {
      this.$fly.get("/").then(res => {
        this.message = res.data;
      });
    }
  },
  created() {
    this.testNetwork();
  },
  mounted() {
    this.$store.commit("changeNowPart", "demand");
  }
};
</script>

<style scoped>
</style>
