import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

Vue.config.productionTip = false

//通过axios请求后台数据 并把axios放在vue原型上
import axios from 'axios'
Vue.prototype.axios = axios

//设置一个过滤器过滤图片尺寸
Vue.filter('setWH',(url,arg) => {
	return url.replace(/w\.h/,arg)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
