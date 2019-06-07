import Vue from 'vue'
import App from './App'
import fly from './utils/fly';
import store from './store'
// style
import "@/style/uni.css"
import '@/style/colorui.css'
import '@/style/icon.css'

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
