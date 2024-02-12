<template>
<div class="text-right ">

    <v-dialog v-model="dialog" width="1060">
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="pa-1 my-2">
          <v-col class="mx-10" cols="2">
            <v-btn @click="dialog =false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7" class="t16400 ">
            پرینت برچسب
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center px-5" >
          <v-card class="content">
            <div class="d-flex justify-space-between pa-5 d--rtl">

              <span>شناسه محموله : {{ retailObject?.id }}</span>
              <span v-if="retailObject?.seller">نام فروشگاه : {{ retailObject?.seller?.shopping_name  }}</span>
              <span >تاریخ تحویل : {{ convertDateToJalai(retailObject?.sent_to_warehouse_at , '-' , false)}} </span>
              <div class="text-center">
                <div>
                  <span><img :src="baseUrl + retailObject?.barcode_image"></span>
                </div>
                <div>
                <span>
                   <span>{{retailObject?.barcode}}</span>
                </span>
                </div>
              </div>
            </div>
          </v-card>
          <v-card min-height="500" class="d--rtl mt-2" >
            <Table
                class="flex-grow-1"
                editUrl="/categories/edit/"
                activePath="category/crud/update/activation/"
                deletePath="category/crud/delete/"
                :header="headerDetailShipment"
                :items="retailObject?.shps_list"
                :detail="retailObject"
                updateUrl="category/csv/mass-update"
                model="shipmentDetail"
            />

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
                  @click="dialog = false"
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
import Table from "@/components/ProcessingShipment/Table/DetailProcessingTable.vue";
import {
    convertDateToJalai
} from "@/assets/js/functions";
import ProcessingShipment from "@/composables/ProcessingShipment";

export default {
    setup() {
      const {headerDetailShipment} = new ProcessingShipment()
      return { headerDetailShipment }
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
