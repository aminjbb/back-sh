<template>
<!-- defaults
    inset = true
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
            <div>
                <span :class="labelClass" > {{ label }} </span>
            </div>
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
            default: ""
        },

        value: {
            type: String,
            default: ""
        },

        trueValue: {
            type: String,
            default: ""
        },

        falseValue: {
            type: String,
            default: ""
        },

        classList: {
            type: Array,
            default: []
        },

        labelClass: {
            type: String,
            default: ""
        },

        disabled: {
            type: Boolean,
            default: false
        },

        color:{
            type: String,
            default: ""
        },

        ripple:{
            type: Boolean,
            default: true
        },

        inset:{
            type: Boolean,
            default: true
        },
    },
}
</script>
