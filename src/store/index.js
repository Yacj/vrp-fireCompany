import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{
      id:'',
      name:'',
      phone:'',
      deptId:''
    },
    LOADING:false
  },
  mutations: {
    setUser(state,LoginUser){
      state.userInfo = LoginUser
    },
    showLoading(state){
      state.LOADING = true
    },
    hideLoading(state){
      state.LOADING = false
    }
  },
  actions: {
    setUserAsync(context,LoginUser){
      context.commit("setUser",LoginUser);
    }
  },
  modules: {
  }
})
