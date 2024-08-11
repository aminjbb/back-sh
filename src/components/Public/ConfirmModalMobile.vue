<template>
    <v-bottom-sheet v-model="deleteModal">
        <v-card class="rounded-t-lg px-6 ">

            <div class="d-flex justify-space-between t16500 pt-6 px-2">
                <v-icon   @click="deleteModal = false"  class="bg-grey-lighten-3 rounded-circle" color="grey-darken-1">
                    mdi-close
                </v-icon>
                <span> {{title}} </span>
            </div>


            <div class="text-right py-15 px-2 t14 w500" >
                    {{text}}
            </div>

            <v-row no-gutters class="pb-5 ">
                <v-col class="me-2">
                    <v-btn
                        @click="deleteModal = false"
                        color="primary500 "
                        class="px-3 t14 w500"
                        rounded
                        block

                    >
                        انصراف
                    </v-btn>
                </v-col>

                <v-col class="ms-2">
                    <v-btn
                        @click="deleteItem()"
                        :loading="loading"
                        variant="outlined"
                        color="primary500"
                        class="px-3 t14 w500"
                        rounded
                        block
                    >
                        حذف
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-bottom-sheet>
</template>
<script>
import { AxiosCall } from '@/assets/js/axios_call.js'
export default {
    data(){
        return{
            loading:false,
            deleteModal: false
        }
    },
    props:{
        title: String,
        text: String,
        endPoint : String,
    },

    methods: {
        async deleteItem() {
            this.loading= true
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = this.endPoint
            AxiosMethod.using_auth = true
            AxiosMethod.toast_error = true
            AxiosMethod.store = this.$store
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_delete()
            if (data) {
                this.loading = false
                this.deleteModal = false
                this.$emit('updateVoucherList')
            }
            else{
                this.loading = false
                this.deleteModal = false
            }
        }
    }
}
</script>