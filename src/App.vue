<template>
  <div id="app">
    <!-- <div id="header"> TodoList </div> -->
    <nav class="navbar navbar navbar-dark bg-dark">
      <div id="header"> TodoList </div>
    </nav>
    <!-- <div class="container">
      <CheckBox :data="data" id="checkbox"/>
    </div> -->
    <div class="row p-3 ml-3">
      <div class="col-sm-8 shadow p-2 mb-5 bg-white rounded">
        <div class="card">
          <div class="card-body overflow-auto">
            <CheckBox :data="data" id="checkbox"/>
          </div>
        </div>
      </div>
      <!-- <div class="col-sm-6">
      </div> -->
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
      8: (array = []) => array.pop(),
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
      // if (Object.keys(this.instance_data).length)
      //   // delete this.instance_data
      // else
      this.data.pop()
    },
    setValueArray () {
      if (!this.data.length)
        return false
      
      if (Object.keys(this.instance_data).length)
        this.instance_data.sub_itens.push({ id: this.generateHashID(), value: false, label: '', sub_itens: [], root: this.instance_data.length })
      else
        this.data[this.data.length - 1].sub_itens.push({ id: this.generateHashID(), value: false, label: '', sub_itens: [], root: this.data.length })
    }
  }
}
</script>

<style>
@import './assets/styles/styles.css';
</style>
