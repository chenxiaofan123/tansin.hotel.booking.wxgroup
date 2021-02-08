
import Vue from 'vue'
import Vuex from 'vuex'
import common from './module/commonMDL'//公共的
import getters from './gettersTodo'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    common
  },
  getters
})
