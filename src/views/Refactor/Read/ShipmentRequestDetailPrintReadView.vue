<template>
    <v-layout class="bg-gray">
        <v-main >

            <div v-if="retailObject" class="pa-5" id="printableArea-cargo d--ltr" >

                <v-card class="d-flex justify-center align-center px-10 ma-5 " height="82">
                    <div class="mx-10">
                        <span class="t14500">
                            تاریخ ارسال :
                        </span>
                        <span v-if="retailObject.sent_to_warehouse_at " class="t13400 text-gray500 number-font d--ltr">
                            {{ convertDateToJalai(retailObject.sent_to_warehouse_at, '-', false) }}
                        </span>
                        <span v-else class="t13400 text-gray500">
                            ----
                        </span>
                    </div>
                    <div class="mx-10">
                        <span class="t10 w500 ">
                            شناسه محموله :
                        </span>
                        <span class="t13400 text-gray500 number-font">
                            {{ retailObject.id }}
                        </span>
                    </div>
                    <div class="mx-10" v-if="retailObject.supplier">
                        <span class="t10 w500">
                            نام فروشگاه:
                        </span>
                        <span class="t10 w500 text-gray500">
                            {{ retailObject?.supplier?.shopping_name }}
                        </span>
                    </div>
                    <div class="mx-10" v-else>
                        <span class="t10 w500">
                            نام تامین کننده :
                        </span>
                        <span class="t10 w400 text-gray500">
                            {{ retailObject?.factor?.supplier?.shopping_name }}
                        </span>
                    </div>
                </v-card>

                <v-card class="ma-5" min-height="82" v-if="retailObject?.rejection_reason">
                    <div class="my-2">دلیل رد</div>
                    <v-divider class="mb-3"/>
                    <div class="pa-5 text-right">
                        {{ retailObject?.rejection_reason }}
                    </div>
                </v-card>

                <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl ">
                    <div>
                        <Table
                            class="flex-grow-1  "
                            :header="headerShps"
                            :items="retailObject.shps_list"
                            editUrl="/seller/edit/"
                            activePath="seller/crud/update/activation/"
                            deletePath="seller/crud/update/activation/"
                            changeStatusUrl="seller/crud/update/contract/"
                            :updateSkuUrl="`page/home/section/slider/${$route.params.specialId}/sku/attach`"
                            :loading="loading"
                            @updateList="updateList"
                            model="sku"/>
                    </div>
                    <v-divider />
                    <v-row justify="center" align="center" class="px-8 py-5">
                        <v-col cols="2">
                            <v-row justify="center">
                                <span>جمع:</span>
                            </v-row>
                        </v-col>

                        <v-col cols="4" class="text-center number-font">
                            <v-row justify="center">
                                <template v-if="retailObject && retailObject.shps_list.buying_price >= 0">
                                    {{splitChar(retailObject.buying_price)}}
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </v-row>
                        </v-col>

                        <v-col cols="1" class="text-center number-font">
                            <v-row justify="center">
                                <template v-if="retailObject && retailObject.shps_list.customer_price >= 0">
                                    {{splitChar(retailObject.shps_list.customer_price) }}
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </v-row>

                        </v-col>

                        <v-col cols="1" class="text-center number-font">
                            <v-row justify="center">
                                <template v-if="retailObject && retailObject.shps_list.sum_customer_price ">
                                    {{splitChar(retailObject.shps_list.sum_customer_price)}}
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </v-row>
                        </v-col>

                        <v-col cols="1" class="text-center number-font">
                            <v-row justify="center">
                                <template v-if="retailObject && retailObject.shps_count >= 0">
                                    {{retailObject.shps_count}}
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </v-row>
                        </v-col>

                        <v-col cols="1" class="text-center number-font">
                            <v-row justify="center">
                                <template v-if="retailObject && retailObject.shps_count >= 0">
                                    {{splitChar(retailObject.total_buying_price)}}
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </v-row>

                        </v-col>

                        <v-col cols="1" class="text-center number-font">
                            <v-row justify="center">
                                <template v-if="retailObject && retailObject.shps_count >= 0">
                                    {{splitChar(retailObject.total_customer_price)}}
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </v-row>
                        </v-col>

                        <v-col cols="1" class="text-center number-font">
                            <v-row justify="center" align="center">
                                <template v-if="retailObject && retailObject.shps_count >= 0">
                                    {{retailObject.total_profit}}%
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </div>

        </v-main>
    </v-layout>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import ShipmentRequests from "@/composables/ShipmentRequests";
import Table from "@/components/ShipmentRequests/Table/ShipmentRequestDetailShipmentShps.vue";
import {convertDateToJalai, splitChar } from "@/assets/js/functions";

export default {
    setup() {
        const {

            headerShps,

        } = ShipmentRequests();

        return {

            headerShps,

        };
    },
    components: {
        Table,
        UploadFileSection

    },
    mounted() {
        this.retailShipmentDetail()
    },
    data() {
        return {
            retailObject:null
        }
    },

    methods: {
        splitChar,



        convertDateToJalai,
        async retailShipmentDetail(item) {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `shipment/detail/${this.$route.params.shipmentRequestDetailId}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.retailObject =data.data
                setTimeout(()=>{
                    let myElement = document.getElementById('printableArea-cargo');
                    // window.onafterprint = function() {window.close()};
                    window.print(myElement);
                } , 2000)
            }

        },




    },

    computed: {



    }
}
</script>