<template>
  <div>
      sublet
      <div class="btn_div">
          <div @click="contactSeller" class="btn">联系卖家</div>
          <div @click="purchase" class="btn">购买</div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  onLoad: function (options) {
    console.log('options:',options)
    this.querys = options
  },
  methods: {
    purchase (item) {
      
    },
    contactSeller () {
      wx.navigateTo({
        url:`/pages/conversation/dialogue/main?receive_id=${this.querys.receive_id}&&name=${this.querys.name}&&avatar=${this.querys.avatar}`
      })
    }
  }
}
</script>

<style>

</style>