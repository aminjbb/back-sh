<template>
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
                <div>
                    <span :class="labelClass" > {{ radio.label }} </span>
                </div>
            </template>
        </v-radio>
    </v-radio-group>
</template>

<script>
export default {
    name: "sh-radiobtn",
    data () {
        return {
            value:null
        }
    },
    props: {
        radioList: {
            type: Array,
            default: []
        },

        value: {
            type: String,
            default: ""
        },


        classListGroup: {
            type: Array,
            default: []
        },

        classListRadio: {
            type: String,
            default: ""
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
    },
}
</script>

<style scoped>

</style>