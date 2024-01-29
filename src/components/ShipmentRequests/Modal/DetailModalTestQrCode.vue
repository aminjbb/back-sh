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

                <v-col cols="7" />
            </v-row>

            <div class="text-center px-5">
                <v-card class="d-flex space-between align-center px-10 ma-5" height="82">
                    <div v-if="retailObject" class=" mx-10 ">
                        <span class="t14500">
                            <img :src="retailObject.barcode_image" alt="Barcode Image" />

                        </span>
                        <span class="t13400 ">
                            <p class="number-font">{{ retailObject.barcode }}</p>
                        </span>
                    </div>
                    <div class="mx-10">
                        <span class="t14500">
                            تاریخ تحویل :
                        </span>
                        <span v-if="retailObject.received_by_warehouse_at " class="t13400 text-gray500 number-font d--ltr ">
                            {{convertDateToJalai(retailObject.received_by_warehouse_at ,  '-' , false) }}
                        </span>
                        <span v-else class="t13400 text-gray500 d--ltr">
                            ----
                        </span>
                    </div>
                    <div class="mx-10">
                        <span class="t14500">
                            شناسه محموله
                        </span>
                        <span class="t13400 text-gray500">
                            {{ retailObject.id }}
                        </span>
                    </div>

                    <div class="mx-10">
                        <span class="t14500">
                            نام فروشگاه :
                        </span>
                        <span class="t13400 text-gray500">
                            {{retailObject.shopping_name }}
                        </span>
                    </div>
                </v-card>
                <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl" height="580">
                    <div class="table-scroll-container">
                        <Table
                            class="flex-grow-1"
                            :header="headerQrcode"
                            :items="retailObject.shps_list"
                            editUrl="/seller/edit/"

                            deletePath="seller/crud/update/activation/"
                            changeStatusUrl="seller/crud/update/contract/"
                            :updateSkuUrl="`page/home/section/slider/${$route.params.specialId}/sku/attach`"
                            :loading="loading"
                            @updateList="updateList"
                            updateUrl="seller/csv/mass-update"
                            model="sku" />
                    </div>

                    <v-row class="justify-between my-2 mx-2 ">

                        <v-col cols="3" class="d-flex justify-start mx-10">
                            <btn
                                class="mt-3 mr-2"
                                @click="close()"
                                style="cursor: pointer;">
                                انصراف
                            </btn>
                        </v-col>
                        <v-col cols="3" class="d-flex mx-10  justify-end">
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
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import ShipmentRequests from "@/composables/ShipmentRequests";
import Table from "@/components/ShipmentRequests/Table/MarketPlaceShipmentPrint.vue";
import {
    convertDateToJalai
} from "@/assets/js/functions";

export default {
    setup() {
        const {
            shipmentRequests,
            dataTableLength,
            page,
            header,
            loading,
            headerShps,
            headerQrcode,
          shipmentRequest,
        } = ShipmentRequests();

        return {
            shipmentRequests,
            dataTableLength,
            page,
            header,
            loading,
            headerShps,
            headerQrcode,
          shipmentRequest
        };
    },
    components: {
        Table,
        UploadFileSection

    },

    methods: {

      print() {

        // this.close()
        window.open(`${ import.meta.env.VITE_API_SITEURL}shipment-requests/${this.retailObject.id}/print`, '_blank');

      },
        convertDateToJalai,

        close() {
            const form = {
                dialog: false,
                object: ''
            }
            this.$store.commit('set_detailModalTestQrCode', form)
        },

        validate() {
            this.$refs.BlogForm.$refs.addForm.validate()
            setTimeout(() => {
                if (this.$refs.BlogForm.valid) this.createBlog()
            }, 200)
        },

        searchWarehouse(e) {
            const filter = {
                name: e
            }
            this.getWarehouseList(filter)
        },
    },

    computed: {
      baseUrl() {
        return 'https://api.shvz.ir/'
      },
        dialog() {
            return this.$store.getters['get_detailModalTestQrCode']
        },
        retailObject() {
            return this.$store.getters['get_detailModalTestQrCodeObject']
        },
        warehouseData() {
            try {
                return this.warehouseList.data
            } catch (e) {
                return []
            }
        }
    }
}
</script>
