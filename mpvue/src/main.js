import Vue from 'vue'
import App from './App'
import '../weui.css'
import Fly from 'flyio/dist/npm/wx'
import store from './vuex/store'

Vue.prototype.$store = store
const fly = new Fly()
fly.interceptors.request.use((request) => {
  request.baseURL = process.env.API_ROOT
})
Vue.prototype.$fly = fly
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
/*
new Vue({
    el: '#app',
})
*/
app.$mount()
