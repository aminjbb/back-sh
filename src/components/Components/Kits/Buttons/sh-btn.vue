<template>
<!--
    block : take full width
    flat : remove shadow
    rounded = pill
-->
  <v-btn
      :icon="icon"
      :class="classList"
      :variant="variant"
      :color="color"
      :rounded="rounded"
      :size="size"
      :width="width"
      :height="height"
      :disabled="disabled"
      :loading="loading"
      :block="block"
      :flat="flat"
      @click="handleClick"
  >
        <template v-if="prependIcon" v-slot:prepend>
          <v-icon :class="classListIcon">
              {{ prependIcon }}
          </v-icon>
        </template>

    {{ title }}

        <template v-if="appendIcon" v-slot:append>
          <v-icon :class="classListIcon">
              {{ appendIcon }}
          </v-icon>
        </template>

  </v-btn>
</template>
<script>
export default {
  name: "sh-btn",
  props: {

    title: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    classList: {
      type: Array,
      default: []
    },
    classListIcon: {
          type: Array,
          default: []
      },

    variant:{
          type: String,
          default: undefined
      },

    color:{
      type: String,
      default: undefined
    },

    rounded: {
      type: [Boolean, String],
      default: 'pill'
    },
    size:{
      type: String,
      default: undefined
    },
    width:{
      type: Number,
      default: undefined
    },

    height: {
      type: Number,
      default: undefined
    },

    disabled: {
      type: Boolean,
      default: false
    },

    loading:{
      type: Boolean,
      default: false
    },

    prependIcon: {
      type: String,
      default: undefined
    },
    appendIcon: {
      type: String,
      default: undefined
      },
    flat: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    to: {
      type: [String, Object],
      default: null
    },
  },

  methods: {
    handleClick() {
      if (this.to) {
        this.$router.push(this.to);
      }
         this.$emit('onClick');
    }
  }
}
</script>