<template>
  <div>
    <div v-for="value in data" :key="value.id">
      <v-icon style="cursor: pointer;" v-if="value.root >= 0 && value.sub_itens.length" :name="`${value.show_sub_itens ? 'caret-up' : 'caret-down'}`" @click="value.show_sub_itens = !value.show_sub_itens"/>
      <div class="col-12">
        <md-field>
          <div style="padding: 5px"><input type="checkbox" :id="value.id" v-model="value.value" aria-label="Checkbox for following text input" @change="changeValuesSub(value)"></div>
          <md-input md-dense v-model="value.label" @click="setPointerArray(value)" :style="`${value.value ? 'text-decoration: line-through;' : ''}`" aria-label="Text input with checkbox" :readonly="value.value"></md-input>
        </md-field>
      </div>
      <div class="ml-5" v-if="value.sub_itens.length && value.show_sub_itens">
        <CheckBox :data="value.sub_itens" />
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'CheckBox',
  components: {
    CheckBox: () => import('./CheckBox.vue')
  },
  props: {
    data: Array
  },
  data: function () {
    return {
      data_props: {},
      collapse_itens: []
    }
  },
  methods: {
    setPointerArray (data) {
      this.$root.$emit('pointer_position', data)
    },
    changeValuesSub (data) {
      this.setPointerArray(data)
      let change = (data, value) => {
        data.forEach(elem => {
          elem.value = value
          change(elem.sub_itens, value)
        })
        if (data.sub_itens) change(data.sub_itens, value)
      }
      change(data.sub_itens, data.value)
    }
  }
}
</script>

<style scoped>
</style>
