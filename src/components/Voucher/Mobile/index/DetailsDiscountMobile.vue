<template>
    <v-bottom-sheet v-model="details" >
        <v-card >
            اطلاعات کد تخفیف
            <v-icon>mdi-Icon-Exit-Cancel</v-icon>
        </v-card>
    </v-bottom-sheet>
</template>

<script>
export default {
    data(){
        return {
            details: false
        }
    }

}
</script>

