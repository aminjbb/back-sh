<template>
    <v-select
        v-model="value"
        inline
    >
        <template v-if="label" v-slot:label>
            <div>
                <span :class="labelClass" > {{ label }} </span>
            </div>
        </template>
    </v-select>
</template>

<script>
export default {
    name: "sh-select",
}
</script>

<style scoped>

</style>