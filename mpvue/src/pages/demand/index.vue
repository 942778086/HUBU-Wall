<template>
  <div class="demand">
    <Me></Me>
    <LeadLogin></LeadLogin>
  </div>
</template>

<script>
import Me from "../me/index";
import LeadLogin from "../../components/leadLogin/index"

export default {
  data() {
    return {
    };
  },
  components: { Me, LeadLogin },
  methods: {
  },
  mounted() {
  }
};
</script>

<style scoped>
</style>
