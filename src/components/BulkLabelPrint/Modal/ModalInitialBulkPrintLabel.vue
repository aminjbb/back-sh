<template>
  <div class="text-right ">
    <v-btn
        @click="getDetail()"
        height="40"
        rounded
        variant="outlined"
        class="px-8 mt-1">
        <span>
          <v-icon>
            mdi-printer-outline
          </v-icon>
        </span>
      پرینت
    </v-btn>
    <v-dialog v-model="dialog" width="1060">
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="pa-1 my-2">
          <v-col class="mx-10" cols="2">
            <v-btn @click=close() variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7" class="t16 w400 ">
            پرینت برچسب
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center px-5">
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
                  @click=close()
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
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  props: {
    shipmentId: null,
    packageId: null,
    shpsId: null,
    placerId: null,
    placementId: null,
  },
  data() {
    return {}
  },

  methods: {
    print() {
      window.open(`${import.meta.env.VITE_API_SITEURL}processing-shipment/${this.shipmentId}/${this.shpsId}/${this.packageId}/${this.placerId}/${this.placementId}/initial-barcode-print`, '_blank');

    },
    close() {
      const form = {
        dialog: false,
        object: ''
      }
      this.$store.commit('set_bulkPrintLabel', form)
    },
    async getDetail() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/print-initial/barcode/${this.shipmentId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.detail = data.data
        this.dialog = true
      }
    },

  },

  computed: {

    detail() {
      return this.$store.getters['get_bulkPrintLabelObject']
    },
    dialog() {
      return this.$store.getters['get_bulkPrintLabel']
    },

    basUrl() {


      return import.meta.env.VITE_API_BACKEND_URL
    },

  }
}
</script>
  