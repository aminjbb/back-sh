<template>
    <v-layout class="bg-gray">
        <v-main >

            <div class="pa-5" id="printableArea-cargo d--ltr">
                <v-card>
                    <div class="text-center ">
                        <v-card class=" " height="180">
                            <div class="d-flex justify-center align-center px-10 ma-5">
                                <div class="mx-10 d--rtl">
                                    <div>
                                        <img width="150" height="58" :src="baseUrl + retailObject?.barcode_image" alt="">
                                    </div>
                                    <div>
                                        {{ retailObject?.barcode }}
                                    </div>

                                </div>

                            </div>
                            <div class="d-flex justify-space-between align-center px-10 ma-5">
                                <div class="mx-10 d--rtl">
                        <span style="font-size: 7px">
                            شناسه محموله :
                        </span>
                                    <span style="font-size: 7px">
                            {{ retailObject?.id }}
                        </span>
                                </div>
                                <div class="mx-10 d--rtl">
                        <span style="font-size: 7px">
                            تامین کننده :
                        </span>
                                    <span style="font-size: 7px">
                             {{ retailObject?.factor?.supplier?.shopping_name }}
                        </span>
                                </div>
                                <div class="mx-10 d--rtl">
                        <span style="font-size: 7px">
                            شناسه فاکتور :
                        </span>
                                    <span style="font-size: 9px">
                            {{ retailObject?.factor_id }}
                        </span>
                                </div>
                                <div class="mx-10 d--rtl">
                        <span style="font-size: 7px">
                            تاریخ تحویل :
                        </span>
                                    <span v-if="retailObject?.sent_to_warehouse_at " style="font-size: 7px; direction: rtl">
              {{ convertDateToJalai(retailObject?.sent_to_warehouse_at, '-', false) }}
            </span>
                                    <span v-else style="font-size: 7px">
                            ----
                        </span>
                                </div>
                            </div>

                        </v-card>
                        <v-card class="ma-5 br--12 " min-height="580">
                            <Table
                                class="flex-grow-1"
                                :header="headerShps"
                                :items="retailObject?.shps_list"
                                editUrl="/seller/edit/"
                                activePath="seller/crud/update/activation/"
                                changeStatusUrl="seller/crud/update/contract/"
                                updateUrl="seller/csv/mass-update"
                                model="sku"/>

                            <v-divider/>

                        </v-card>
                    </div>
                </v-card>
            </div>

        </v-main>
    </v-layout>
</template>

<script>
import Table from "@/components/RetailShipment/Table/RetailShipmentDetailShipmentShps.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import RetailShipment from "@/composables/RetailShipment";
import {convertDateToJalai} from "../../../assets/js/functions";

export default {
    setup() {
        const {
            headerShps
        } = RetailShipment();

        return {
            headerShps
        };
    },

    components: {Table},

    data() {
        return {
            retailObject: null
        }
    },

    mounted() {
        this.retailShipmentDetail()
    },

    methods: {
        convertDateToJalai,

        async retailShipmentDetail(item) {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `shipment/consignment/crud/get/${this.$route.params.shipmentId}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.retailObject = data.data
                setTimeout(() => {
                    var myElement = document.getElementById('printableArea-cargo');
                    window.onafterprint = function() {window.close()};
                    window.print(myElement);
                }, 2000)
            }

        },
    },

    computed: {
        baseUrl() {
            return import.meta.env.VITE_API_BACKEND_URL
        },
    }
}
</script>