<template>
    <v-bottom-sheet v-model="operations" >

        عملیات
        <v-icon>mdi-Icon-Exit-Cancel</v-icon>
    </v-bottom-sheet>
</template>

<script>
export default {
    data(){
        return {
            operations: false
        }
    }

}
</script>

