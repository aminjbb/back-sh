<template lang="">
    <div class="text-center">
        <v-dialog
            v-model="confirmModalState.confirmModal"
            width="468"
        >
            <v-card>
                <v-row justify="center" align="center" class="pa-5">
                    <v-col cols="3">
                        <v-btn @click="close()" variant="icon">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="9">
                        <div class="text-left pl-15">
                            <span class="t14500">
                            {{confirmModalState.confirmModalTitle}}
                            </span>
                        </div>
                    </v-col>
                </v-row>
                <div class="mt-3 mb-8  px-5">
                    <v-divider />
                </div>

                <div class="text-center pa-5" >
                        <span class="t14500">
                            {{confirmModalState.confirmModalText}}
                        </span>
                </div>
                <div class="mt-3 mb-8  px-5">
                        <v-divider />
                </div>

                <div class="text-center pb-5"> 
                    <v-btn :loading="loading" color="primary500" @click="deleteItem()" height="40" rounded class="px-5 mt-1 mr-15">
                        <span>
                            حذف 
                        </span> 
                    </v-btn>
                    <v-btn @click="close()"  variant="text" height="40" rounded class="px-5 mt-1 ml-15">
                        انصراف
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { closeConfirm } from "@/assets/js/functions";
import { AxiosCall } from '@/assets/js/axios_call.js'
export default {
    data(){
        return{
            loading:false
        }
    },

    computed: {
        confirmModalState() {
            try {
                return this.$store.getters['get_confirmForm']
            } catch (error) {
                return ''
            }
        }
    },

    methods: {
        close() {
            closeConfirm(this.$store)
        },
        
        async deleteItem() {
            localStorage.setItem('deleteObject' , 'doing')
            this.loading= true
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = this.confirmModalState.confirmModalEndpoint
            AxiosMethod.using_auth = true
            AxiosMethod.toast_error = true
            AxiosMethod.store = this.$store
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_delete()
            if (data) {
                localStorage.setItem('deleteObject' , 'done')
                this.loading = false
                this.close()
            }
            else{
              localStorage.setItem('deleteObject' , 'error')
                this.loading = false
                this.close()
            }

        }
    }
}
</script>