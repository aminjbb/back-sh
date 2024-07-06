<template>
<!--    single-line : remove label after focus
        persistent-placeholder: show placeholder while unfocused-->
    <v-text-field
        v-model="value"
        :class="classList"
        :disabled="disabled"
        :type="type"
        :rules="rules"
        :variant="variant"
        :single-line="singleLine"
        :density="density"
        :clearable="clearable"
        :autofocus="autofocus"
        :min-width="minWidth"
        hide-details="auto"
        :placeholder="placeholder"

        :persistent-placeholder="persistentPlaceholder"
        :hint="hint"
        :counter="counter"
        :loading="loading"

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
            <div>
                <span :class="labelClass" > {{ label }} </span>
            </div>
        </template>
    </v-text-field>
</template>

<script>
export default {
    name: "sh-textfield",
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

        placeholder:{
            type: String,
            default: ""
        },

        hint:{
            type: String,
            default: ""
        },


        type:{
            type: String,
            default: ""
        },

        variant:{
            type: String,
            default: "outlined"
        },

        density:{
            type: String,
            default: "compact"
        },

        minWidth:{
            type: Number,
            default: null
        },


        autofocus:{
            type: Boolean,
            default: false
        },



        rules:{
            type: Array,
            default: []
        },

        clearable:{
            type: Boolean,
            default: false
        },

        persistentPlaceholder:{
            type: Boolean,
            default: false
        },

        singleLine:{
            type: Boolean,
            default: false
        },

        counter:{
            type: [Boolean, String],
            default: null
        },

        loading:{
            type: Boolean,
            default: false
        },

        /*icons*/
        appendIcon:{
            type: String,
            default: ""
        },
        prependIcon:{
            type: String,
            default: ""
        },

        appendInnerIcon:{
            type: String,
            default: ""
        },
        prependInnerIcon:{
            type: String,
            default: ""
        },

        suffix:{
            type: String,
            default: ""
        },
        prefix:{
            type: String,
            default: ""
        },
    },

    methods:{
        onClick(){
            this.$emit('onClick');
        }
    }

}
</script>
