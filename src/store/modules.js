import Vue from 'vue'
import Vuex from 'vuex'
import imgData from './imgData.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    imgData
  }
})
