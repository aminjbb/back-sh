<template>
<!--    check div span label-->
    <v-checkbox
        v-model="value"
        :color="color"
        :value="value"
        :class="classList"
        :disabled="disabled"
        :ripple="ripple"
        hide-details="auto"
    >
        <template v-if="label" v-slot:label>
            <div>
                <span :class="labelClass"> {{ label }} </span>
            </div>
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
            default: ""
        },

        value: {
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
            default: false
        },

    },
}
</script>
