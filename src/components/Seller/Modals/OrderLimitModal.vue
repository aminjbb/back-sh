<template>
<div class="text-center">
    <v-dialog v-model="orderLimitModal.dialog" width="468">
        <v-card>
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16 w400 pa-6">
                    محدودیت سفارش
                </span>

                <v-btn
                    class="modal__header__btn"
                    @click="close()"
                    variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>
            <div class="mb-5 px-5">
                <v-divider />
            </div>

            <div class="text-right pa-5">
                <span class="t12 w300 modal__label">
                    حداکثر تعداد در هر سبد
                </span>
                <v-text-field
                    class="w-100"
                    type="number"
                    density="compact"
                    variant="outlined"
                    single-line
                    v-model="orderLimitModel"
                    :rules="rule" />
            </div>

            <div class="mt-5 px-5">
                <v-divider />
            </div>

            <footer class="d--rtl d-flex justify-between align-center pa-4 pt-3">
                <v-btn
                    @click="close()"
                    variant="text"
                    height="40"
                    rounded
                    class="px-5 mt-1">
                    انصراف
                </v-btn>

                <v-btn
                    :loading="loading"
                    color="primary500"
                    @click="setLimit()"
                    height="40"
                    rounded
                    class="px-5 mt-1">
                    <span>
                        تایید
                    </span>
                </v-btn>
            </footer>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    closeModal
} from "@/assets/js/functions_seller";
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import {
    openToast
} from "@/assets/js/functions";
export default {
    data() {
        return {
            loading: false,
            rule: [v => !!v || 'این فیلد الزامی است'],
            orderLimitModel: null,
        }
    },

    computed: {
        orderLimitModal() {
            try {
                return this.$store.getters['get_orderLimitModal']
            } catch (error) {
                return ''
            }
        }
    },

    methods: {
        close() {
            closeModal(this.$store, 'set_orderLimitModal');
            this.orderLimitModel= null;
        },

        async setLimit() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/update/order_limit/${this.orderLimitModal?.id}`
            AxiosMethod.form = formdata
            formdata.append('order_limit', this.orderLimitModel)

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false;
                this.close();
                openToast(
                    this.$store,
                    'مقدار مورد نظر ویرایش شد.',
                    "success"
                );
                this.updateList('true');
            } else {
                this.loading = false;
                openToast(
                    this.$store,
                    'ویرایش با مشکل مواجه شد',
                    "error"
                );
            }
        },

        /**
         * Update list
         * @param {*} status 
         */
         updateList(status) {
            this.$emit('updateList', status);
        },
    }
}
</script>
