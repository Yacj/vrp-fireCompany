import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vant/index'
import './assets/fonts/iconfont.css'
import './assets/css/common.scss'

import '../src/utils/dialog'
import '../src/utils/wx'


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
