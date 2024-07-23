<template>
<!--    defaults:
            single-line = true
            variant = outlined
            density = compact
-->
    <v-select
        v-model="value"
        :single-line="singleLine"
        :variant="variant"
        :density="density"

        :class="classList"
        :rules="rules"
        :items="items"
        :item-title="itemTitle"
        :item-value="itemValue"

        :hint="hint"
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
        hide-details="auto"

        :multiple="multiple"
        :chips="chips"
        :closable-chips="closableChips"
        :hide-selected="hideSelected"


        :suffix="suffix"
        :prefix="prefix"
    >
        <template v-if="label" v-slot:label>
            <span :class="labelClass" > {{ label }} </span>
        </template>
    </v-select>
</template>

<script>
export default {
    name: "sh-select",
    data () {
        return {
            value:null
        }
    },
    props:{
        label: {
            type: String,
            default: undefined
        },
        singleLine:{
            type: Boolean,
            default: true
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
            type: Array,
            default: []
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
            default: undefined
        },
        itemValue:{
            type: String,
            default: undefined
        },

        hint:{
            type: String,
            default:  undefined
        },
        placeholder:{
            type: String,
            default: undefined
        },
        persistentPlaceholder:{
            type: Boolean,
            default: false
        },
        noDataText:{
            type: String,
            default: undefined
        },
        color:{
            type: String,
            default: undefined
        },
        rounded:{
            type: String,
            default: undefined
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

        suffix:{
            type: String,
            default: undefined
        },
        prefix:{
            type: String,
            default: undefined
        },
    }
}
</script>
