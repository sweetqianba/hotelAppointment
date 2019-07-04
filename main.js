import Vue from 'vue'
import App from './App'
import fly from './utils/fly';
// style
import "@/style/uni.css"
import '@/style/colorui.css'
import '@/style/icon.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
