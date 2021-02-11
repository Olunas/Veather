import Vue from 'vue'
import Vuex from 'vuex'
import city from './weather/weather.js'
import history from './history/histroy.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    city,
    history
  }
})
