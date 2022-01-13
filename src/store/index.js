import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'
import tagsView from './modules/tagsView'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_if_show : true,
    srcoll_boolean:false,
  },
  mutations: {
    SET_SHOW: (state, is_if_show) => {
      console.log('33333333333')
      state.is_if_show = is_if_show;
      console.log(state.is_if_show)
    },
    SET_Srcoll: (state, value) => {
      state.srcoll_boolean = value;
    }
  },
  actions: {
  },
  modules: {
    permission,
    user,
    tagsView
  },
  // 定义全局getters 方便访问user 模块的roles
  getters: { //派生状态 就和vue的computed差不多 store.getters.personInfo()
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes
  }
})
