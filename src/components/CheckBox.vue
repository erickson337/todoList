<template>
  <div>
    <div class="ml-4" v-for="value in data" :key="value.id">
      <div class="input-group mb-3 col-12">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="checkbox" :id="value.id" v-model="value.value" aria-label="Checkbox for following text input">
          </div>
        </div>
        <input type="text" v-model="value.label" @click="setPointerArray(value)" class="form-control" :style="`${value.value ? 'text-decoration: line-through;' : ''}`" aria-label="Text input with checkbox" :readonly="value.value">
      </div>
      <div v-if="value.sub_itens.length">
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
      data_props: {}
    }
  },
  methods: {
    setPointerArray (data) {
      this.$root.$emit('pointer_position', data)
    }
  }
}
</script>

<style scoped>
  .align_sub_itens {
    padding: 1px;
    margin-left: 4vw;
  }
</style>
