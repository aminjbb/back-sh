<template>
  <!--    defaults:
              ripple = true
              inline = true
  -->
  <v-radio-group
      v-model="value"
      :class="classListGroup"
      inline
      hide-details="auto"
  >
    <v-radio v-for=" (radio , index) in radioList" :key="index"
             :value="radio.value"
             :class="classListRadio"
             :color="color"
             :disabled="disabled"
             :ripple="ripple"
    >
      <template v-if="radio.label" v-slot:label>
        <span :class="labelClass"> {{ radio.label }} </span>
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: "sh-radiobtn",
  data() {
    return {
      value: null
    }
  },
  props: {
    radioList: {
      type: Array,
      default: []
    },

    value: {
      type: String,
      default: undefined
    },


    classListGroup: {
      type: Array,
      default: []
    },

    classListRadio: {
      type: Array,
      default: []
    },

    labelClass: {
      type: Array,
      default: []
    },

    disabled: {
      type: Boolean,
      default: false
    },

    color: {
      type: String,
      default: undefined
    },

    ripple: {
      type: Boolean,
      default: true
    },
  },

  methods: {
    changeValue() {
      this.$emit('changeValue', this.value)
    }
  }
}
</script>

<style>
</style>