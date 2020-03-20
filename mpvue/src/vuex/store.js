import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nowPart: '',
    userInfo: '',
    openId: '',
    loginFlag: true
  },
  mutations: {
    changeNowPart (state, part) {
      state.nowPart = part
    }
  }
})

export default store
