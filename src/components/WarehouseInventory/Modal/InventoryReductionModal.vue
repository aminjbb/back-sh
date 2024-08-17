<template >
<div class="text-center">
    <v-dialog
        v-model="inventoryReductionModal.dialog"
        width="468"
        @input="dialogToggle">
        <v-card>
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16 w400 pa-6">
                    مدیریت موجودی
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

            <div class="pa-4">
                <div class="d--rtl py-1 px-1">
                    <div class="d-flex justify-star align-center">
                        <span class="modal__content__title">موجودی فعلی: </span>
                        <span v-if="data && data.site_stock" class="modal__content__txt number-font">{{data.site_stock}}</span>
                    </div>
                </div>
            </div>

            <div class="text-right pa-5">
                <span class="t12 w300 modal__label">
                   * تغییر موجودی
                </span>
                <v-text-field
                    class="w-100"
                    type="number"
                    density="compact"
                    variant="outlined"
                    single-line
                    v-model="stockModel"
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
                    @click="setStock()"
                    height="40"
                    rounded
                    class="px-5 mt-1 ml-3">
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
            stockModel: null,
            data: null,
        }
    },

    computed: {
        inventoryReductionModal() {
            try {
                return this.$store.getters['get_inventoryReductionModal']
            } catch (error) {
                return ''
            }
        }
    },

    methods: {
        close() {
            closeModal(this.$store, 'set_inventoryReductionModal')
        },

        async getShps() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/get/${this.inventoryReductionModal?.id}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.data = data.data;
            }
        },

        async setStock(type) {
            let reason = '';
            if (type == 'increase') {
                this.loadingIncrease = true
                reason = 'افزایش موجودی انبار'
            } else if (type == 'decrease') {
                this.loadingDecrease = true
                reason = 'کاهش موجودی انبار'
            }

            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/update/site_stock/${this.inventoryReductionModal?.id}`
            AxiosMethod.form = formdata
            formdata.append('change_type', type)
            formdata.append('stock_change', this.stockModel)
            formdata.append('reason', reason)

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loadingIncrease = false;
                this.loadingDecrease = false;
                this.close();
                openToast(
                    this.$store,
                    'مقدار مورد نظر ویرایش شد.',
                    "success"
                );
                this.updateList('true');
            } else {
                this.loadingIncrease = false;
                this.loadingDecrease = false;
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
    },

    created() {
        this.$watch(
            () => this.inventoryReductionModal.dialog,
            (dialogState) => {
                if (dialogState) {
                    this.getShps();
                }
            }
        );
    },
}
</script>
