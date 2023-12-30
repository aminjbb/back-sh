<template lang="">
    <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card
            class="ma-5 br-12"
            height="360"
            style="flex:0 0 360px">
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16400 pa-6">
                    ثبت کالای مفقودی یا ضایعات
                </span>
            </header>
            <v-divider color="grey" />
            <v-form
                ref="addWaste"
                v-model="valid"
                class="mb-6"
                style="padding:0 10%">
                <v-row
                    justify="center"
                    align="center"
                    class="px-15">
                    <v-col cols="12" md="6">
                        <div class="text-right my-3">
                            <span class="t12400 color-grey">
                                شناسه بسته <span class="text-red">*</span>
                            </span>
                        </div>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            single-line
                            v-model="form.package_id"
                            v-debounce:1s.unlock="getPackage" />
                    </v-col>
    
                    <v-col cols="12" md="6">
                        <div class="text-right my-3">
                            <span class="t12400 color-grey">
                                نوع بسته
                            </span>
                        </div>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            single-line
                            disabled
                            v-model="form.package_type" />
                    </v-col>
    
                    <v-col cols="12" md="6">
                        <div class="text-right mb-3">
                            <span class="t12400 color-grey">
                                نوع گزارش <span class="text-red">*</span>
                            </span>
                        </div>
                        <v-select
                            :rules="rule"
                            density="compact"
                            variant="outlined"
                            single-line
                            item-title="label"
                            item-value="value"
                            :items="reportTypeItems"
                            v-model="form.report_type" />
                    </v-col>
    
                    <v-col cols="12" md="6">
                        <div class="text-right mb-3">
                            <span class="t12400 color-grey">
                                نام کالا <span class="text-red">*</span>
                            </span>
                        </div>
    
                        <v-autocomplete
                            :items="sphssList"
                            density="compact"
                            variant="outlined"
                            item-title="label"
                            item-value="id"
                            single-line
                            v-debounce:1s.unlock="searchSku"
                            v-model="form.shps_s" />
                    </v-col>
                </v-row>
            </v-form>
            <v-divider color="grey" />
            <v-row justify="end" class="position__absolute bottom left">
                <v-btn
                    @click="$router.go(-1)"
                    variant="outlined"
                    height="40"
                    rounded
                    class="px-8 mt-1 ml-5">
                    انصراف
                </v-btn>
    
                <v-btn
                    :loading="loadingSubmit"
                    @click="addShps()"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                    تایید
                </v-btn>
            </v-row>
        </v-card>
    
        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="362">
            <Table
                class="flex-grow-1"
                :header="createHeader"
                :items="packageShpss.data"
                :loading="loading"
                @updateList="updateList"
                deletePath="report/crud/delete/"
                model="report" />
    
            <v-divider />
        </v-card>
    </div>
    </template>
    
    <script>
    import Table from '@/components/WasteAndLost/Table/CreateTable.vue'
    import WasteAndLost from "@/composables/WasteAndLost";
    
    import {
        AxiosCall
    } from '@/assets/js/axios_call.js'
    
    export default {
        data() {
            return {
                loading: false,
                loadingSubmit: false,
                reportTypeItems: [{
                        label: 'ضایعات',
                        value: 'wastage'
                    },
                    {
                        label: 'موفقودی',
                        value: 'lost'
                    }
                ],
                form: {
                    package_id: null,
                    package_type: null,
                    report_type: null,
                    shps_s: null,
                },
                shpssSearchList: [],
                packageType:null,
                packageShpss:[],
                packageId:null,
            }
        },
    
        computed: {
            sphssList() {
                try {
                    let sku = []
                    this.shpssSearchList.forEach(shpss => {
                        const form = {
                            name: shpss?.shps?.sku?.label ,
                            id: shpss.id
                        }
                        sku.push(form)
                    })
                    return sku
                } catch (e) {
                    return []
                }
            },
        },
    
        components: {
            Table,
        },
    
        setup(props) {
            const {
                getWasteAndLostList,
                itemList,
                createHeader,
                loading
            } = WasteAndLost();
            return {
                getWasteAndLostList,
                itemList,
                createHeader,
                loading
            };
        },
    
        methods: {
            /**
             * Submit form
             */
            async addShps() {
                this.loading = true
                var formdata = new FormData();
                const AxiosMethod = new AxiosCall()
                AxiosMethod.end_point = 'report/crud/create'
                AxiosMethod.form = formdata
                formdata.append('package_id', this.form.package_id)
                formdata.append('report_type', this.form.report_type)
                formdata.append(`shps_s`, this.form.shps_s)
    
                AxiosMethod.store = this.$store
                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                let data = await AxiosMethod.axios_post()
                if (data) {
                    this.loading = false;
    
                } else {
                    this.loading = false
                }
            },
    
            async searchSku(e) {
                const filter = {
                    q: e
                }
                const AxiosMethod = new AxiosCall()
                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                AxiosMethod.form = filter
                AxiosMethod.end_point = `package/shps/items/${this.packageId}`
                let data = await AxiosMethod.axios_get()
                if (data) {
                    this.shpssSearchList = data.data
                }
            },
    
            async getPackage(e){
                const array = e.split('-');
                this.packageId = array[1]
                const AxiosMethod = new AxiosCall()
                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                AxiosMethod.end_point = `package/crud/get/${this.packageId}`
                let data = await AxiosMethod.axios_get()
                if (data) {
                    this.form.package_type = data.data.type
    
                }
            },
    
            async getWasteShps(){
                const AxiosMethod = new AxiosCall()
                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                AxiosMethod.end_point = `report/crud/index/?id=${array[1]}`
                let data = await AxiosMethod.axios_get()
                if (data) {
                    this.packageShpss = data.data
    
                }
            }
        },
    
        mounted() {
            this.getWasteAndLostList();
        },
    }
    </script>
    