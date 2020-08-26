import Vue from 'vue'
import App from './App.vue'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import VueMaterial from 'vue-material'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.component('v-icon', Icon)

Vue.use(VueMaterial)
Vue.use(Vuex)

Vue.config.productionTip = false

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    saveData (state, payload) {
      state.data = payload
    }
  },
  plugins: [vuexLocal.plugin]
})

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
