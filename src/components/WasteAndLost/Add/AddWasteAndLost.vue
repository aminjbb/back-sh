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
                        v-model="form.id" />
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

                    <v-select
                        :rules="rule"
                        density="compact"
                        variant="outlined"
                        single-line
                        item-title="label"
                        item-value="value"
                        :items="skuList"
                        v-model="form.label" />

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
            :items="mocketData"
            :loading="loading"
            @updateList="updateList"
            deletePath="waste-and-lost/crud/delete/"
            model="waste-and-lost" />

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
            loadingSubmit:false,
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
                id: null,
                package_type: null,
                report_type: null,
                label: null,
            },
            skuList:[],
            mocketData: [{
                    "id": 9999,
                    "type": "پالت",
                    "shipment_type": "انبارش مارکت",
                    "seller_name": 'پخش رخسار',
                    "supplier": null,
                    "license": "123456",
                    "shps_label": "کانسیلر میبلین مدل Instant AgeRewind کد 120 ظرفیت 6 میلی لیت",
                    "report_type": "ضایعات",
                    "created_at_fa": "1402/06/12"
                },
                {
                    "id": 9999,
                    "type": "پالت",
                    "shipment_type": "انبارش مارکت",
                    "seller_name": 'پخش رخسار',
                    "supplier": null,
                    "license": "123456",
                    "shps_label": "کانسیلر میبلین مدل Instant AgeRewind کد 120 ظرفیت 6 میلی لیت",
                    "report_type": "ضایعات",
                    "created_at_fa": "1402/06/12"
                },
                {
                    "id": 9999,
                    "type": "پالت",
                    "shipment_type": "انبارش مارکت",
                    "seller_name": 'پخش رخسار',
                    "supplier": null,
                    "license": "123456",
                    "shps_label": "کانسیلر میبلین مدل Instant AgeRewind کد 120 ظرفیت 6 میلی لیت",
                    "report_type": "ضایعات",
                    "created_at_fa": "1402/06/12"
                },
                {
                    "id": 9999,
                    "type": "پالت",
                    "shipment_type": "انبارش مارکت",
                    "seller_name": 'پخش رخسار',
                    "supplier": null,
                    "license": "123456",
                    "shps_label": "کانسیلر میبلین مدل Instant AgeRewind کد 120 ظرفیت 6 میلی لیت",
                    "report_type": "ضایعات",
                    "created_at_fa": "1402/06/12"
                },
                {
                    "id": 9999,
                    "type": "پالت",
                    "shipment_type": "انبارش مارکت",
                    "seller_name": 'پخش رخسار',
                    "supplier": null,
                    "license": "123456",
                    "shps_label": "کانسیلر میبلین مدل Instant AgeRewind کد 120 ظرفیت 6 میلی لیت",
                    "report_type": "ضایعات",
                    "created_at_fa": "1402/06/12"
                }
            ],
        }
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
        async submitForm() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'brand/crud/create'
            AxiosMethod.form = formdata
            formdata.append('name', this.form.name)
            formdata.append('label', this.form.label)
            formdata.append(`image_id`, this.form.image_id)
            formdata.append('priority', this.form.priority)

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.$router.push('/waste-and-lost/index')

            } else {
                this.loading = false
            }
        }
    },

    mounted() {
        this.getWasteAndLostList();
    },
}
</script>
