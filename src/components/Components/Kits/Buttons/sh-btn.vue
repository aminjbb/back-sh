<template>
  <v-btn
      :color="color"
      :height="height"
      @click="handleClick"
      :rounded="rounded"
      :width="width"
  >
    <template v-if="hasIcon" v-slot:prepend>
      <v-icon>{{ prependIcon }}</v-icon>
    </template>
    {{ title }}

  </v-btn>
</template>
<script>
export default {
  name: "sh-btn",
  props: {
    title: {
      type: String,
      default: ''
    },
    color:{
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: ''
    },
    width:{
      type: Number,
      default: ''
    },
    prependIcon: {
      type: String,
      default: ''
    },
    rounded: {
      type: [Boolean, String],
      default: 'default'
    },
    hasIcon: {
      type: Boolean,
      default: false
    },
    to: {
      type: [String, Object],
      default: null
    }
  },
  methods: {
    handleClick() {
      if (this.to) {
        this.$router.push(this.to);
      }
      this.$emit('click');
    }
  }
}
</script>

<style scoped>

</style>