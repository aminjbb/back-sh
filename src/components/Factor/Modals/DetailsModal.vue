<template lang="">
<div class="text-center">
    <v-dialog
        v-model="showDetailsModal.dialog"
        width="908"
        @input="dialogToggle">
        <v-card>
            <div class="pa-4">
                <div v-if="factorData !== null" class="modal__content modal__content--cols d--rtl py-3 px-4 d-flex justify-star align-center">
                    <v-row>
                        <v-col cols="6" sm="3">
                            <span class="modal__content__title">شناسه فاکتور: </span>
                            <span v-if="factorData.id" class="modal__content__txt number-font">
                                {{factorData.id}}
                            </span>
                        </v-col>
                        <v-col cols="6" sm="3">
                            <span class="modal__content__title">تامین کننده: </span>
                            <span v-if="factorData.supplier && factorData.supplier.full_name" class="modal__content__txt number-font">
                                {{factorData.supplier.full_name}}
                            </span>
                        </v-col>
                        <v-col cols="6" sm="3">
                            <span class="modal__content__title">شماره فاکتور تامین کننده: </span>
                            <span v-if="factorData.factor_number" class="modal__content__txt number-font">
                                {{factorData.factor_number}}
                            </span>
                        </v-col>
                        <v-col cols="6" sm="3">
                            <span class="modal__content__title">تاریخ ساخت: </span>
                            <span v-if="factorData.created_at_fa" class="modal__content__txt number-font">
                                {{factorData.created_at_fa}}
                            </span>
                        </v-col>
                        <v-col cols="12">
                            <span class="modal__content__title">آدرس تامین کننده: </span>
                            <span v-if="factorData.creator && factorData.creator.address" class="modal__content__txt number-font">
                                {{factorData.creator.address}}
                            </span>
                        </v-col>
                    </v-row>
                    <y-row class="c-table">
                        <header class="c-table__header d-flex justify-between">
                            <div class="text-center c-table__header__item t12500 text-black">
                                ردیف
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black">
                                نام کالا
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black">
                                شناسه shps
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black">
                                قیمت خرید
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black">
                                قیمت مصرف
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black">
                                تعداد کالا
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black">
                                قیمت خرید کل
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black">
                                قیمت مصرف کل
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black">
                                درصد سود
                            </div>
                        </header>

                        <div class="stretch-table">
                            <div v-if="factorData.skus && factorData.skus.length > 0" class="c-table__contents">
                                <div
                                    v-for="(sku , index) in factorData.skus"
                                    :key="index"
                                    class="d-flex justify-between c-table__contents__row">
                                    <div
                                        class="c-table__contents__item justify-center">
                                        <span class="t14300 text-gray500 py-5 number-font">
                                            {{rowIndexTable(index)}}
                                        </span>
                                    </div>
                                    <div
                                        class="c-table__contents__item justify-center">
                                        <span class="t14300 text-gray500 py-5 number-font">
                                            {{sku.label}}
                                        </span>
                                    </div>
                                    <div
                                        class="c-table__contents__item justify-center">
                                        <span class="t14300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div
                                        class="c-table__contents__item justify-center">
                                        <span class="t14300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div
                                        class="c-table__contents__item justify-center">
                                        <span class="t14300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div
                                        class="c-table__contents__item justify-center">
                                        <span class="t14300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div
                                        class="c-table__contents__item justify-center">
                                        <span class="t14300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div
                                        class="c-table__contents__item justify-center">
                                        <span class="t14300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div
                                        class="c-table__contents__item justify-center">
                                        <span class="t14300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </y-row>
                </div>
            </div>

            <div class="mt-5 px-5">
                <v-divider />
            </div>

            <footer class="d--rtl d-flex justify-between align-center pa-4 pt-3">
                <v-btn
                    @click="print()"
                    variant="text"
                    height="40"
                    rounded
                    class="px-5 mt-1">
                    پرینت فاکتور
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
export default {
    data() {
        return {
            loading: false,
            rule: [v => !!v || 'این فیلد الزامی است'],
            factorData: null,
        }
    },

    computed: {
        showDetailsModal() {
            try {
                return this.$store.getters['get_showDetailsModal']
            } catch (error) {
                return ''
            }
        },
    },

    methods: {
        close() {
            closeModal(this.$store, 'set_showDetailsModal');
            this.calculatedData = null;

            this.createdAtModel = null;
            this.endedAtModel = null;
            this.discountModel = null;
            this.discountTypeModel = null;
        },

        async getFactorDetails() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `factor/crud/get/${this.showDetailsModal?.id}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.factorData = data.data;
            }
        },
    },

    created() {
        this.$watch(
            () => this.showDetailsModal.dialog,
            (dialogState) => {
                if (dialogState) {
                    this.getFactorDetails();
                }
            }
        );
    },
}
</script>
