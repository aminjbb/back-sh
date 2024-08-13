<template>
  <!--    defaults:
              single-line = true
              variant = outlined
              density = compact
              persistent-placeholder: show placeholder while unfocused
  -->

  <v-text-field
      v-model="value"
      :single-line="singleLine"
      :variant="variant"
      :density="density"

      :class="classList"
      :rules="rules"
      :type="type"
      :name="name"
      :color="color"
      :counter="counter"
      :min-width="minWidth"

      :hint="hint"
      :placeholder="placeholder"
      :persistent-placeholder="persistentPlaceholder"
      :disabled="disabled"
      :clearable="clearable"
      :autofocus="autofocus"
      :loading="loading"
      hide-details="auto"

      :append-icon="appendIcon"
      :prepend-icon="prependIcon"
      :append-inner-icon="appendInnerIcon"
      :prepend-inner-icon="prependInnerIcon"
      :suffix="suffix"
      :prefix="prefix"
      @click:append="onClick"
      @click:prepend="onClick"
      @click:appendInner="onClick"
      @click:prependInner="onClick"
      @update:modelValue="onClick"
      center-affix
  >
    <template v-if="label" v-slot:label>
      <span :class="labelClass"> {{ label }} </span>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "sh-textfield",
  data() {
    return {
      value: null
    }
  },

  props: {
    label: {
      type: String,
      default: ""
    },
    singleLine: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: "outlined"
    },
    density: {
      type: String,
      default: "compact"
    },

    classList: {
      type: Array,
      default: []
    },
    labelClass: {
      type: Array,
      default: []
    },
    rules: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: undefined
    },
    counter: {
      type: [Boolean, String],
      default: null
    },
    minWidth: {
      type: Number,
      default: null
    },

    hint: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    persistentPlaceholder: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },

    /*icons*/
    appendIcon: {
      type: String,
      default: undefined
    },
    prependIcon: {
      type: String,
      default: undefined
    },
    appendInnerIcon: {
      type: String,
      default: undefined
    },
    prependInnerIcon: {
      type: String,
      default: undefined
    },

    suffix: {
      type: String,
      default: undefined
    },
    prefix: {
      type: String,
      default: undefined
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    },

    changeValue() {
      this.$emit('changeValue', this.value)
    }
  }

}
</script>
