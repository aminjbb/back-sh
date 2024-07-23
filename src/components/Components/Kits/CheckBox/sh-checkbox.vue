<template>
<!--    defaults:
        ripple = true
-->
    <v-checkbox
        v-model="value"
        :value="value"
        :class="classList"
        :disabled="disabled"
        :color="color"
        :ripple="ripple"
        hide-details="auto"
    >
        <template v-if="label" v-slot:label>
            <span :class="labelClass"> {{ label }} </span>
        </template>
    </v-checkbox>
</template>

<script>
export default {
    name: "sh-checkbox",
    data () {
      return {
          value:null
        }
    },
    props: {
        label: {
            type: String,
            default: undefined
        },

        value: {
            type: String,
            default: undefined
        },


        classList: {
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

        color:{
            type: String,
            default: undefined
        },

        ripple:{
            type: Boolean,
            default: false
        },

    },
}
</script>
