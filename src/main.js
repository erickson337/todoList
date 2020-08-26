import Vue from 'vue'
import App from './App.vue'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import ToggleButton from 'vue-js-toggle-button'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.component('v-icon', Icon)

Vue.use(VueMaterial)
Vue.use(ToggleButton)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
