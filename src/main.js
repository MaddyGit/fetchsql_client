import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'
import router from './router'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
