<template>
<!--    defaults:
        single-line = true
        variant = outlined
        density = compact
-->
    <v-autocomplete
        v-model="value"
        :single-line="singleLine"
        :variant="variant"
        :density="density"

        :class="classList"
        :rules="rules"
        :items="items"
        :item-title="itemTitle"
        :item-value="itemValue"

        :placeholder="placeholder"
        :persistent-placeholder="persistentPlaceholder"
        :no-data-text="noDataText"
        :color="color"
        :rounded="rounded"
        :min-width="minWidth"

        :loading="loading"
        :disabled="disabled"
        :autofocus="autofocus"
        :clearable="clearable"
        :return-object="returnObject"
        :v-debounce="debounce"
        :ripple="ripple"
        hide-details="auto"

        :multiple="multiple"
        :chips="chips"
        :closable-chips="closableChips"
        :hide-selected="hideSelected"

        :prepend-inner-icon="prependInnerIcon"
        :suffix="suffix"
        :prefix="prefix"
    >
        <template v-if="label" v-slot:label>
            <div>
                <span :class="labelClass" > {{ label }} </span>
            </div>
        </template>
    </v-autocomplete>
</template>

<script>
export default {
    name: "sh-autocomplete",
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
        singleLine:{
            type: Boolean,
            default: false
        },
        variant:{
            type: String,
            default: "outlined"
        },
        density:{
            type: String,
            default: "compact"
        },


        classList: {
            type: Array,
            default: []
        },
        labelClass: {
            type: String,
            default: ""
        },
        rules:{
            type: Array,
            default: []
        },
        items:{
            type: Array,
            default: []
        },
        itemTitle:{
            type: String,
            default: ""
        },
        itemValue:{
            type: String,
            default: ""
            },


        placeholder:{
            type: String,
            default: ""
        },
        persistentPlaceholder:{
            type: Boolean,
            default: false
        },
        noDataText:{
            type: String,
            default: ""
        },
        color:{
            type: String,
            default: ""
        },
        rounded:{
            type: String,
            default: ""
        },
        minWidth:{
            type: Number,
            default: null
        },


        loading:{
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        autofocus:{
            type: Boolean,
            default: false
        },
        clearable:{
            type: Boolean,
            default: false
        },
        returnObject:{
            type: Boolean,
            default: false
        },
        debounce:{
            type: String,
            default: ""
        },
        ripple:{
            type: Boolean,
            default: true
        },


        multiple:{
            type: Boolean,
            default: false
        },
        chips:{
            type: Boolean,
            default: false
        },
        closableChips:{
            type: Boolean,
            default: false
        },
        hideSelected:{
            type: Boolean,
            default: false
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
}
</script>

<style scoped>

</style>