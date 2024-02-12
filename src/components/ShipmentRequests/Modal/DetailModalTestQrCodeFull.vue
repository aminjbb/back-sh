<template>
<div class="text-right ">
    <v-dialog v-model="dialog" width="1060">
        <v-card class="">
            <v-row
                justify="space-between"
                align="center"
                class="pa-1 my-2">
                <v-col class="mx-10" cols="2">
                    <v-btn @click="close()" variant="icon">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="7" class="t16400 ">
                    پرینت برچسب
                </v-col>
            </v-row>
            <v-divider />
            <div class="text-center px-5">
                <v-card class="content">
                  <v-row justify="center">
                    <v-col cols="4" v-for="(barCode , index) in retailObject " :key="'bulk-label-print'+index">
                      <div class="d-flex justify-space-between px-15">
                        <span>{{barCode?.shps?.seller?.id}}</span>
                        <span>{{barCode?.shps?.seller?.shopping_name}}</span>
                      </div>
                      <div class="text-center">
                        <img width="190" height="80" :src="baseUrl + barCode.barcode_image">
                      </div>
                      <div class="text-center px-10">
                        {{barCode?.shps?.sku?.label }}
                      </div>
                      <div class="text-center">
                        <img width="133" height="69" :src="baseUrl + barCode.shps?.barcode_image">
                      </div>
                      <div class="text-center px-10">
                        {{barCode?.barcode }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row class="justify-between my-2 mx-2">

                    <v-col cols="3" class="d-flex mx-10 ">
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
                    <v-col cols="3" class="d-flex justify-end mx-10">
                        <btn
                            class="mt-3 mr-2"
                            @click="close()"
                            style="cursor: pointer;">
                            انصراف
                        </btn>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import RetailShipment from "@/composables/RetailShipment";
import Table from "@/components/RetailShipment/Table/RetailShipmentDetailShipmentShps.vue";
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
        } = RetailShipment();

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
        UploadFileSection

    },

    methods: {
        convertDateToJalai,

        close() {
            const form = {
                dialog: false,
                object: ''
            }
            this.$store.commit('set_detailModalTestQrCodeFull', form)
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
      baseUrl(){
        return "https://api.shvz.ir/";
      },
        dialog() {
            return this.$store.getters['get_detailModalTestQrCodeFull']
        },
        retailObject() {
            return this.$store.getters['get_detailModalTestQrCodeFullObject']
        },
    }
}
</script>
