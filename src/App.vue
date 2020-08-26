<template>
  <div id="app">
    <nav class="navbar navbar navbar-dark bg-dark">
      <div class="row">
        <img src="./assets/images/to-do-list.svg" class="ml-1" alt="logo" width="20" height="20">
        <div id="header"><span style="vertical-align: bottom;">TodoList</span></div>
      </div>
    </nav>
    <div class="row p-3 ml-2 justify-content-between">
      <div class="col-8 shadow p-2 mb-5 bg-white rounded">
        <div class="card">
          <div class="col-12">
            <div class="float-right">
              <div>
                <md-switch v-model="toggle_key_active" @change="toggleEventListener" class="md-primary">{{ toggle_key_active ? 'Desabilitar' : 'Ativar'}} funções de teclado <v-icon :name="`${toggle_key_active ? 'keyboard' : 'key'}`" /></md-switch>
              </div>
            </div>
          </div>
          <div class="card-body overflow-auto">
            <CheckBox :data="data" id="checkbox" />
          </div>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 p-1">
        <div class="modal-helper p-1 col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="container">
            <div class="row">
              <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 border rounded bg-white shadow-border m-2" v-if="toggle_button">
                <div v-for="message in messages" :key="message">
                  <div class="float-left text-primary">
                    <small>
                      <b>{{message}}</b>
                    </small>
                  </div>
                  <br />
                </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div>
                  <button
                    type="button"
                    style="border-radius: 50%;"
                    @click="toggle_button = !toggle_button"
                    class="btn btn-primary m-2 float-right"
                  >
                    <v-icon :name="`${toggle_button ? 'times' : 'question'}`" />
                  </button>
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
import generateHashID from "./utils/hash_id";
import CheckBox from "./components/CheckBox.vue";
export default {
  name: "App",
  components: {
    CheckBox,
  },
  mounted() {
    const vm = this
    this.$root.$on("pointer_position", function (data) {
      vm.instance_data = data
      vm.saveStateData()
    })
  },
  created() {
    const vm = this
    window.addEventListener('keydown', vm.handlerEvent)
  },
  data() {
    return {
      data: this.$store.state.data,
      instance_data: {},
      toggle_button: false,
      toggle_key_active: true,
      messages: [
        "- Pressione a tecla enter para adicionar um item;",
        "- Pressione a tecla shift para adicionar sub listas;",
        "- Pressione a tecla delete para excluir um item selecionado;",
        "Obs: Clique em um item e pressione uma das teclas acima para excluir ou adicionar sub itens."
      ],
      keysboards: {
        // 8: () => this.deletePositionArray(),
        13: (array = [], hash_id) => {
          array.push({
            id: hash_id,
            value: false,
            label: "",
            sub_itens: [],
            root: array.length,
            show_sub_itens: true
          })
          this.$store.commit('saveData', this.data)
        },
        16: () => this.setValueArray(),
        46: () => this.deletePositionArray()
      }
    }
  },
  methods: {
    generateHashID,
    saveStateData () {
      this.$store.commit('saveData', this.data)
    },
    toggleEventListener () {
      if (this.toggle_key_active) {
        window.addEventListener('keydown', this.handlerEvent)
      } else {
        window.removeEventListener('keydown', this.handlerEvent)
      }
      this.saveStateData()
    },
    handlerEvent (e) {
      const { keyCode } = e
      const find_event = this.keysboards[keyCode]
      if (find_event) find_event(this.data, this.generateHashID())
    },
    deletePositionArray () {
      let find_data = (data, wanted) => {
        data.forEach((elem, index) => {
          if (elem.id === wanted) {
            data.splice(index, 1)
            return true;
          }
          find_data(elem.sub_itens, wanted)
        })
      }
      if (this.instance_data.id) {
        find_data(this.data, this.instance_data.id)
      } else {
        this.data.pop()
      }
      this.saveStateData()
    },
    setValueArray () {
      if (!this.data.length) return false

      const hash_id = this.generateHashID()
      if (Object.keys(this.instance_data).length) {
        this.instance_data.sub_itens.push({
          id: hash_id,
          value: false,
          label: "",
          sub_itens: [],
          show_sub_itens: true
        })
        this.saveStateData()
      } else {
        this.data[this.data.length - 1].sub_itens.push({
          id: hash_id,
          value: false,
          label: "",
          sub_itens: [],
          show_sub_itens: true
        })
        this.saveStateData()
      }
    }
  }
}
</script>

<style>
@import "./assets/styles/styles.css";
</style>
