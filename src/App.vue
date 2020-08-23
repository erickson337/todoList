<template>
  <div id="app">
    <nav class="navbar navbar navbar-dark bg-dark">
      <div id="header"> TodoList </div>
    </nav>
    <div class="row p-3 ml-3">
      <div class="col-sm-8 shadow p-2 mb-5 bg-white rounded">
        <div class="card">
          <div class="card-body overflow-auto">
            <CheckBox :data="data" id="checkbox"/>
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
      13: (array = [], hash_id) => array.push({ id: hash_id, value: false, label: '', sub_itens: [], root: array.length }),
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
      instance_data: {}
    }
  },
  methods: {
    generateHashID,
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
        this.instance_data.sub_itens.push({ id: hash_id, value: false, label: '', sub_itens: [] })
      else
        this.data[this.data.length - 1].sub_itens.push({ id: hash_id, value: false, label: '', sub_itens: [] })
    }
  }
}
</script>

<style>
@import './assets/styles/styles.css';
</style>
