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
            <div class="mx-10 d--rtl">
              <div>
                <img width="200" height="58" :src="baseUrl + retailObject.barcode_image" alt="">
              </div>
              <div>
                {{ retailObject.barcode }}
              </div>

            </div>
            <div class="mx-10 d--rtl">
                        <span class="t14500">
                            تاریخ تحویل :
                        </span>
              <span v-if="retailObject.sent_to_warehouse_at " class="t13400 text-gray500 number-font"  style="font-size: 7px; direction: ltr">
                            {{ convertDateToJalai(retailObject.sent_to_warehouse_at, '-', false) }}
                        </span>
              <span v-else class="t13400 text-gray500">
                            ----
                        </span>
            </div>
            <div class="mx-10 d--rtl">
                        <span class="t14500">
                            شناسه محموله :
                        </span>
              <span class="t13400 text-gray500 number-font">
                            {{ retailObject.id }}
                        </span>
            </div>
            <div class="mx-10 d--rtl">
                        <span class="t12500">
                            تامین کننده :
                        </span>
              <span class="t13400 text-gray500">
                            {{ retailObject?.factor?.supplier?.shopping_name }}
                        </span>
            </div>
            <div class="mx-10 d--rtl">
                        <span class="t10500">
                            شناسه فاکتور :
                        </span>
              <span class="t13400 text-gray500">
                            {{ retailObject.factor_id}}
                        </span>
            </div>

          </v-card>
          <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl" height="580">
            <Table
                class="flex-grow-1"
                :header="headerShps"
                :items="retailObject.shps_list"
                editUrl="/seller/edit/"
                activePath="seller/crud/update/activation/"
                changeStatusUrl="seller/crud/update/contract/"
                updateUrl="seller/csv/mass-update"
                model="sku"/>

            <v-divider/>

          </v-card>
        </div>
        <v-row justify="space-between" class="pa-5">
          <v-btn
              height="40"
              rounded
              variant="outlined"
              @click="close()"
              class="px-8 mt-1">
            انصراف
          </v-btn>
          <v-btn
              @click="print()"
              height="40"
              rounded
              variant="outlined"
              class="px-8 mt-1">
                <span>
                  <v-icon>
                    mdi-printer-outline
                  </v-icon>
                </span>
            پرینت محموله
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import RetailShipment from "@/composables/RetailShipment";
import Table from "@/components/RetailShipment/Table/RetailShipmentDetailShipmentShps.vue";
import {
  convertDateToJalai
} from "../../../assets/js/functions";

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

  },

  data() {
    return {}
  },

  computed: {
    baseUrl() {
      return import.meta.env.VITE_API_BACKEND_URL
    },
    dialog() {
      return this.$store.getters['get_modalRetailShipmentDetail']
    },
    retailObject() {
      return this.$store.getters['get_modalRetailShipmentDetailObject']
    },
    warehouseData() {
      try {
        return this.warehouseList.data
      } catch (e) {
        return []
      }
    }
  },

  methods: {
    convertDateToJalai,

    print() {
      window.open(`${ import.meta.env.VITE_API_SITEURL}retail-shipment/${this.retailObject.id}/print`, '_blank');
    },

    close() {
      const form = {
        dialog: false,
        object: ''
      }
      this.$store.commit('set_modalRetailShipmentDetail', form)
    },


  },
}
</script>
