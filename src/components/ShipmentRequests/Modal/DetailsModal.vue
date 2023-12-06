<template lang="">
    <div class="text-center">
        <v-dialog
            v-model="showDetailsModal.dialog"
            width="1060"
            @input="dialogToggle">
            <v-card>
                <header class="modal__header modal__header--factor">
                    <v-btn
                        class="modal__header__btn"
                        @click="close()"
                        variant="icon">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </header>
                <div class="pa-4">
                    <div class="modal__content d--rtl py-6 px-8 mb-2 mr-24">
                        <v-row>
                            <v-col
                                cols="6"
                                sm="3"
                                md="3"
                                lg="3">
                                <span class="modal__content__title"> نام فروشگاه: </span>
                                <span v-if="factorData && factorData.id" class="modal__content__txt number-font">
                                    {{factorData.factor.supplier.shopping_name}}
                                </span>
                            </v-col>
                            <v-col
                                cols="6"
                                sm="3"
                                md="3"
                                lg="3">
                                <span class="modal__content__title"> شناسه محموله: </span>
                                <span v-if="factorData && factorData.id " class="modal__content__txt number-font">
                                    {{factorData.id}}
                                </span>
                            </v-col>
                            <v-col
                                cols="6"
                                sm="3"
                                md="3"
                                lg="3">
                                <span class="modal__content__title">  تاریخ ارسال : </span>
                                <span v-if="factorData && factorData.id " class="modal__content__txt number-font">
                                    {{factorData.sent_to_warehouse_at}}
                                </span>
                            </v-col>
                            <v-col
                                cols="6"
                                sm="3"
                                md="3"
                                lg="3">
                                <!-- <span class="modal__content__title">تاریخ ساخت: </span>
                                <span v-if="factorData && factorData.created_at_fa" class="modal__content__txt number-font">
                                    {{factorData.created_at_fa}}
                                </span> -->
                            </v-col>
                            <!-- <v-col cols="12">
                                <span class="modal__content__title">آدرس تامین کننده: </span>
                                <span v-if="factorData && factorData.creator && factorData.creator.address" class="modal__content__txt number-font">
                                    {{factorData.creator.address}}
                                </span> -->
                            <!-- </v-col> -->
                        </v-row>
                    </div>
    
                    <div class="modal__content d--rtl">
                        <y-row class="c-table">
                            <header class="c-table__header d-flex justify-between">
                                <div class="text-center c-table__header__item t12500 text-black" style="width:7.1111%;padding: 20px 5px;">
                                    ردیف
                                </div>
                                
                                <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding: 20px 5px;">
                                    شناسه SHPS
                                </div>
                                <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding: 20px 5px;">
                                     نام کالا
                                </div>
                               
                                <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding: 20px 5px;">
                                    تعداد کالا
                                </div>
                                
                                <div class="text-center c-table__header__item t12500 text-black" style="width:12.1111%;padding: 20px 5px;">
                                    قیمت مصرف 
                                </div>
                                <div class="text-center c-table__header__item t12500 text-black" style="width:12.1111%;padding: 20px 5px;">
                                    قیمت مصرف کل
                                </div>
                            </header>
    
                            <div class="stretch-table">
                                <div v-if="factorSkuData && factorSkuData.data && factorSkuData.data.length" class="c-table__contents">
                                <div
                                    v-for="(item , index) in factorSkuData.data"
                                    :key="index"
                                    class="d-flex justify-between c-table__contents__row">
                                    <div class="c-table__contents__item justify-center" style="width:7.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{rowIndexTable(index)}}
                                        </span>
                                    </div>

                                    <div class="c-table__contents__item justify-start" style="width:17.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{item.factor.id}}
                                        </span>
                                    </div>
                                    <div class="c-table__contents__item justify-center" style="width:10.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div class="c-table__contents__item justify-center" style="width:10.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div class="c-table__contents__item justify-center" style="width:11.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div class="c-table__contents__item justify-center" style="width:10.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div class="c-table__contents__item justify-center" style="width:11.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div class="c-table__contents__item justify-center" style="width:12.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                    <div class="c-table__contents__item justify-center" style="width:11.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{sku.id}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </y-row>
    
                        <!-- <div class="calculate-all d-flex justify-between align-center">
                            <div class="text-center c-table__header__item t12500 text-black" style="width:7.1111%;padding:15px 10px">
                                جمع:
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black" style="width:17.1111%;padding:15px 10px"></div>
                            <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding:15px 10px"></div>
                            <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding:15px 10px">
                                -
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding:15px 10px">
                                -
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding:15px 10px">
                                -
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding:15px 10px">
                                -
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black" style="width:12.1111%;padding:15px 10px">
                                -
                            </div>
                            <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding:15px 10px">
                                -
                            </div>
                        </div> -->
    
                        <footer class="d--rtl d-flex justify-between align-center pa-3">
                            <v-btn
                                @click="print()"
                                height="40"
                                rounded
                                variant="outlined"
                                prepend-icon="mdi-printer-outline"
                                class="px-5 mt-1">
                                پرینت فاکتور
                            </v-btn>
                        </footer>
                    </div>
                </div>
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
                factorSkuData: null
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
            },
    
            async getFactorDetails() {
                const AxiosMethod = new AxiosCall()
                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                AxiosMethod.end_point = `cargo/crud/get/${this.showDetailsModal?.id}`
                
                let data = await AxiosMethod.axios_get()
                
                if (data) {
                    this.factorData = data.data;
                }
            },
    
            async getFactorSkuDetails() {
    try {
        console.log("Starting getFactorSkuDetails method");

        const AxiosMethod = new AxiosCall();
        AxiosMethod.using_auth = true;
        AxiosMethod.token = this.$cookies.get('adminToken');
        AxiosMethod.end_point = `cargo/crud/get/${this.showDetailsModal?.id}`;

        console.log(`Making API call to: ${AxiosMethod.end_point}`);
      
        if (data) {
            console.log("Response Data: ", data.data);
            this.factorSkuData = data.data;
        } else {
            console.log("No data received from the API");
        }
    } catch (error) {
        console.error("Error in getFactorSkuDetails: ", error);
    }
},
    
            /**
             * Get row index in table
             * @param {*} index
             */
            rowIndexTable(index) {
                let rowIndex = 0
                rowIndex = (1 + index)
                return rowIndex
            },
        },
    
        created() {
            this.$watch(
                () => this.showDetailsModal.dialog,
                (dialogState) => {
                    if (dialogState) {
                        this.getFactorDetails();
                        this.getFactorSkuDetails();
                    }
                }
            );
        },
    }
    </script>
    