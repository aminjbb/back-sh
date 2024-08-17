<template>
  <date-picker
      :range="haseRange"
      clearable
      class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
      format="jYYYY-jMM-jDD"
      display-format="jYYYY-jMM-jDD"
      :v-model="value"
      :variant="variant"
      :placeholder="placeholder"
      :custom-input="customInput"
  />
</template>

<script>
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";

export default {
  name: "sh-datepicker",
  components: {datePicker: VuePersianDatetimePicker},
  props: {
    placeholder : {
      type: String,
      default: null
    },

    variant:{
      type: String,
      default: "outlined"
    },

    customInput:{
      type: String,
      default: null
    },
    haseRange:{
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      value: null
    }
  },

  methods:{
    changeValue(){
      this.$emit('changeValue' , this.value)
    }
  }
}
</script>

<style scoped>

</style>