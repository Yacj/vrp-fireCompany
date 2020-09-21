import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vant/index'
import './assets/fonts/iconfont.css'
import './assets/css/common.scss'

import '../src/utils/dialog'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
