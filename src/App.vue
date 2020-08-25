<template>
  <div id="app">
    <nav class="navbar navbar navbar-dark bg-dark">
      <div id="header"> TodoList </div>
    </nav>
    <div class="row p-3 ml-3 justify-content-between">
      <div class="col-8 shadow p-2 mb-5 bg-white rounded">
        <div class="card">
          <div class="card-body overflow-auto">
            <CheckBox :data="data" id="checkbox"/>
          </div>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 p-1">
        <div class="modal-helper p-1 col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="container">
            <div class="row">
              <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 border rounded bg-white shadow-border m-2" v-if="toggle_button">
                <div v-for="message in messages" :key="message">
                  <div class="float-left text-primary"><small><b>{{message}}</b></small></div><br>
                </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div>
                  <button type="button" style="border-radius: 50%;" @click="toggle_button = !toggle_button" class="btn btn-primary m-2 float-right"><v-icon :name="`${toggle_button ? 'times' : 'question'}`"/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import generateHashID from './utils/hash_id'
import CheckBox from './components/CheckBox.vue'
export default {
  name: 'App',
  components: {
    CheckBox
  },
  mounted() {
    const vm = this
    this.$root.$on('pointer_position', function (data) {
      vm.instance_data = data
    })
  },
  created () {
    const vm = this
    const keysboards = {
      8: () => vm.deletePositionArray(),
      13: (array = [], hash_id) => array.push({ id: hash_id, value: false, label: '', sub_itens: [], root: array.length, show_sub_itens: true }),
      16: () => vm.setValueArray(),
      46: () => vm.deletePositionArray()
    }
    document.addEventListener('keydown', function(e) {
      const { keyCode } = e
      const find_event = keysboards[keyCode]
      if (find_event) find_event(vm.data, vm.generateHashID())
    })
  },
  data () {
    return {
      data: [],
      instance_data: {},
      toggle_button: false,
      messages: [
        '- Press enter key for add item;',
        '- Press shift key for add sub item;',
        '- Press delete key for remove item or sub item;',
        '* For delete and add sub item specific, click in a item or sub item.'
      ]
    }
  },
  methods: {
    generateHashID,
    teste () {
      console.count('aqui')
    },
    deletePositionArray () {
      let find_data = (data, wanted) => {
        data.forEach((elem, index) => {
          if (elem.id === wanted) {
            data.splice(index, 1)
            return true
          }
          find_data(elem.sub_itens, wanted)
        })
      }
      if (this.instance_data.id) {
        find_data(this.data, this.instance_data.id)
      } else {
        this.data.pop()
      }
    },
    setValueArray () {
      if (!this.data.length)
        return false
      
      const hash_id = this.generateHashID()
      if (Object.keys(this.instance_data).length)
        this.instance_data.sub_itens.push({ id: hash_id, value: false, label: '', sub_itens: [], show_sub_itens: true })
      else
        this.data[this.data.length - 1].sub_itens.push({ id: hash_id, value: false, label: '', sub_itens: [], show_sub_itens: true })
    }
  }
}
</script>

<style>
@import './assets/styles/styles.css';
</style>
