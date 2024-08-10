<template>
<!-- defaults
    inset = true
    ripple = true
    hide-details="auto"


    Example
        classList: ['bg-red', 'ms-10'],
-->
    <v-switch
        v-model="value"
        :inset="inset"
        :value="value"
        :true-value="trueValue"
        :false-value="falseValue"
        :color="color"
        :class="classList"
        :disabled="disabled"
        :ripple="ripple"
        hide-details="auto"
    >
        <template v-if="label" v-slot:label>
            <span :class="labelClass" > {{ label }} </span>
        </template>
    </v-switch>
</template>

<script>
export default {
    name: "sh-switch",
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

        trueValue: {
            type: String,
            default: undefined
        },

        falseValue: {
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

        color: {
            type: String,
            default: undefined
        },

        ripple: {
            type: Boolean,
            default: true
        },

        inset: {
            type: Boolean,
            default: true
        },
    }
}
</script>