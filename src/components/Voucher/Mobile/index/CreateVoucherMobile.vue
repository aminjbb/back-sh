<template>
    <v-bottom-sheet v-model="create" >
        <v-card class="rounded-t-lg px-3 ">

            <div class="d-flex justify-space-between t16500 py-6">
                <v-icon   @click="create = false"  class="bg-grey-lighten-3 rounded-circle" color="grey-darken-1">
                    mdi-close
                </v-icon>
                <span class="ms-auto">ساخت کد تخفیف</span>
            </div>


            <v-row no-gutters class="position-fixed">
                <v-col class="me-2">
                    <v-btn
                        @click=""
                        variant="outlined"
                        color="primary500 "
                        class="px-3 t14500"
                        rounded
                        block
                    >
                        تایید
                    </v-btn>
                </v-col>

                <v-col class="ms-2">
                    <v-btn
                        @click="create = false"
                        color="primary500"
                        class="px-3 t14500"
                        rounded
                        block
                    >
                        انصراف
                    </v-btn>
                </v-col>
            </v-row>


        </v-card>
    </v-bottom-sheet>
</template>

<script>
export default {
    data(){
        return {
            create: false
        }
    }

}
</script>

