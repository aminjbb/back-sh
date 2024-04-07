<template>
<div class="text-center mb-5">
    <v-card @click="dialog=true" height="50" class="mx-2" variant="outlined" :color="cardColor(order.status)">
        <div class="d-flex align-center justify-center py-3 px-5">
            <span>
                شناسه:
            </span>
            <span class="number-font mr-1">
                {{order.id}}
            </span>
          </div>
    </v-card>
    <v-dialog v-model="dialog" width="468">
        <v-card>
            <v-row justify="center" align="center" class="pa-5">
                <v-col cols="3">
                    <v-btn @click="close()" variant="icon">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="9">
                    <div class="text-left pl-12">
                        <span class="t14500">
                            خالی کردن سورتینگ
                        </span>
                    </div>
                </v-col>
            </v-row>
            <div class="mt-3 mb-8  px-5">
                <v-divider />
            </div>

            <div class="text-center pa-5">
                <span class="t14500">
                    از خالی کردن سورتینگ مطمئن هستید؟
                </span>
            </div>
            <div class="mt-3 mb-8  px-5">
                <v-divider />
            </div>

            <div class="text-center pb-5">
                <v-btn :loading="loading" color="primary500" @click="rejectOrder()" height="40" rounded class="px-5 mt-1 mr-15">
                    <span>
                        تایید
                    </span>
                </v-btn>
                <v-btn @click="close()" variant="text" height="40" rounded class="px-5 mt-1 ml-15">
                    انصراف
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
export default {
    props: {
        order: null,
        getWarehouseOrders: {
            type: Function
        }

    },
    data() {
        return {
            loading: false,
            dialog: false
        }
    },

    methods: {
        cardColor(status) {
            if (status === 'completed') return 'success'
            else if (status === 'processing') return 'warning'
            else return ''
        },
        close() {
            this.dialog = false
        },

        async rejectOrder() {
            try {
                this.loading = true
                const AxiosMethod = new AxiosCall()
                AxiosMethod.end_point = `warehouse/order/sorting/reject/${this.order.id}`
                AxiosMethod.using_auth = true
                AxiosMethod.toast_error = true
                AxiosMethod.store = this.$store
                AxiosMethod.token = this.$cookies.get('adminToken')
                let data = await AxiosMethod.axios_get()
                if (data) {
                    this.loading = false
                    this.getWarehouseOrders()
                    this.close()
                } else {
                    this.loading = false
                }
            } catch (e) {
                this.loading = false
            }

        }
    }
}
</script>
