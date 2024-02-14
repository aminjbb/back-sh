<template>
<div class="text-right ">
    <v-dialog v-model="dialog" width="1060">
        <v-card class="">
            <v-row
                justify="space-between"
                align="center"
                class="pa-1">
                <v-col cols="2">
                    <v-btn @click="close()" variant="icon">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="7">
                </v-col>
            </v-row>
            <div class="text-center px-5">

                <v-card class="d-flex justify-center align-center px-10 ma-5 " height="82">

                    <div class="mx-10">

                        <span class="t14500">
                            تاریخ ارسال :
                        </span>
                        <span v-if="retailObject.sent_to_warehouse_at " class="t13400 text-gray500 modal__content__txt number-font d--ltr">
                            {{convertDateToJalai(retailObject.sent_to_warehouse_at ,  '-' , false) }}
                        </span>
                        <span v-else class="t13400 text-gray500">
                            ----
                        </span>
                    </div>
                    <div class="mx-10">
                        <span class="t14500">
                            شناسه محموله :
                        </span>
                        <span class="t13400 text-gray500 number-font ">
                            {{ retailObject.id }}
                        </span>
                    </div>
                    <div class="mx-10">
                        <span class="t14500">
                            نام فروشگاه :
                        </span>
                        <span class="t13400 text-gray500">
                            {{ retailObject.shopping_name }}
                        </span>
                    </div>

                </v-card>
                <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl" height="580">
                    <Table
                        class=""
                        :header="headerShps"
                        :items="retailObject.shps_list"
                        :loading="loading"
                        @updateList="updateList"
                        model="sku" />

                    <v-divider />
                    <div class="calculate-all d-flex justify-end align-center">
                        <div class="text-center c-table__header__item t12500 text-black" style="width:17.1111%;padding:15px 10px">
                            جمع:
                        </div>

                        <div class="text-center  c-table__header__item t12500 text-black" style="width:7.1111%;padding:15px 10px;margin-right: 300px;">
                            <template v-if="retailObject && retailObject.shps_list.buying_price >= 0">
                                {{retailObject.shps_list.buying_price}}
                            </template>
                            <template v-else>
                                -
                            </template>
                        </div>
                        <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding:15px 10px">
                            <template v-if="retailObject && retailObject.shps_list.customer_price >= 0">
                                {{retailObject.sum_buying_price }}
                            </template>
                            <template v-else>
                                -
                            </template>
                        </div>
                        <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding:15px 10px">
                            <template v-if="retailObject && retailObject.shps_count >= 0">
                                {{retailObject.sum_buying_price}}
                            </template>
                            <template v-else>
                                -
                            </template>
                        </div>
                        <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding:15px 10px">
                            <template v-if="retailObject && retailObject.shps_count >= 0">
                                {{retailObject.shps_count}}
                            </template>
                            <template v-else>
                                -
                            </template>
                        </div>
                        <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding:15px 10px">
                            <template v-if="retailObject && retailObject.shps_count >= 0">
                                {{retailObject.total_buying_price}}
                            </template>
                            <template v-else>
                                -
                            </template>
                        </div>
                        <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding:15px 10px">
                            <template v-if="retailObject && retailObject.shps_count >= 0">
                                {{retailObject.total_customer_price}}
                            </template>
                            <template v-else>
                                -
                            </template>
                        </div>
                        <div class="text-center c-table__header__item t12500 text-black " style="width:11.1111%;padding:15px 10px;  ">
                            <template v-if="retailObject && retailObject.shps_count >= 0">
                                {{retailObject.total_profit}}%
                            </template>
                            <template v-else>
                                -
                            </template>
                        </div>
                    </div>
                    <v-row class="justify-between my-2 mx-2">
                        <v-col cols="3" class="d-flex justify-start">
                            <btn
                                class="mt-3 mr-2"
                                @click="close()"
                                style="cursor: pointer;">
                                انصراف
                            </btn>
                        </v-col>
                        <v-col cols="3" class="d-flex justify-end">
                            <v-btn
                                @click="print()"
                                height="40"
                                rounded
                                variant="outlined"
                                prepend-icon="mdi-printer-outline"
                                class="px-5 mt-1">
                                پرینت محموله
                            </v-btn>
                        </v-col>

                    </v-row>
                </v-card>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

  
<script>
import ShipmentRequests from "@/composables/ShipmentRequests";
import Table from "@/components/ShipmentRequests/Table/ShipmentRequestDetailShipmentShps.vue";
import {
    convertDateToJalai
} from "@/assets/js/functions";
export default {
    setup() {
        const {
            retailShipments,
            dataTableLength,
            page,
            header,
            loading,
            headerShps
        } = ShipmentRequests();

        return {
            retailShipments,
            dataTableLength,
            page,
            header,
            loading,
            headerShps
        };
    },
    components: {
        Table,

    },
    data() {
        return {}
    },

    methods: {
        convertDateToJalai,

        close() {
            const form = {
                dialog: false,
                object: ''
            }
            this.$store.commit('set_modalRetailShipmentDetail', form)
        },

    },

    computed: {

        dialog() {
            return this.$store.getters['get_modalRetailShipmentDetail']
        },
        retailObject() {
            return this.$store.getters['get_modalRetailShipmentDetailObject']
        },

    }
}
</script>
  
  
<style>
  
  
  
  </style>
