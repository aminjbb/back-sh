<template>
  <div class="text-right ">
    <div
        @click="validateOpenModal()"
        class="check__barcode-box d-flex justify-center align-center pointer " :class="barcode? 'bg-success' : 'bg-error'">
      <v-icon v-if="barcode" size="15">mdi-check</v-icon>
      <v-icon v-else size="15">mdi-plus</v-icon>
    </div>
    <v-dialog v-model="dialog" width="600">
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="pa-1 my-2">
          <v-col class="mx-10" cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7" class="t16400 ">
           اسکن بارکد کالا
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center px-5" >
          <v-form ref="addBarcode" v-model="valid">
            <v-row justify="center" class="pa-5">
              <v-col cols="8">
                <v-text-field :rules="rule" variant="outlined" v-model="newBarcode" :autofocus="true"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-row class="justify-between my-2 mx-2">

            <v-col cols="3" class="d-flex mx-10 ">
              <v-btn
                  @click="validate()"
                  :loading="loading"
                  height="40"
                  rounded
                  variant="flat"
                  color="primary500"
                  class="px-5 mt-1">
                تایید
              </v-btn>
            </v-col>
            <v-col cols="3" class="d-flex mx-10 ">
              <v-btn
                  @click="close()"
                  height="40"
                  rounded
                  variant="outlined"
                  class="px-5 mt-1">
                انصراف
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

export default {
  props:{
    barcode:null,
    skuId:null,
    getShipmentShpslist:{
      type:Function
    }
  },
  data(){
    return {
      dialog:false,
      rule:[(v) => !!v || 'این فیلد الزامی است'],
      newBarcode:null,
      loading:false
    }
  },


  methods: {
    print() {
      // this.close()
      window.open(`${ import.meta.env.VITE_API_SITEURL}processing-shipment/${this.shipmentId}/barcode-print`, '_blank');

    },
    close() {
      this.dialog = false
      this.$refs.addBarcode.reset()
    },
    validateOpenModal(){
      if (this.barcode === null) this.dialog = true
    },
   async validate(){
     await this.$refs.addBarcode.validate()
      if (this.valid) this.assignBarcodeToSku()
    },

    async assignBarcodeToSku(){
      try {
        this.loading = true
        const formData = new FormData()
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        formData.append('barcode' , this.newBarcode)
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.store = this.$store
        AxiosMethod.form = formData
        AxiosMethod.toast_error = true
        AxiosMethod.end_point = `product/sku/crud/attach/barcode/${this.skuId}`
        let data = await AxiosMethod.axios_post()
        if (data) {
          openToast(this.$store , 'بارکد با موقیت به کالا متصل شد' , 'success')
          this.getShipmentShpslist()
          this.close()
        }
        else {
          this.loading = false
        }
      }
      catch (e) {
        this.loading = false
      }
    },
  },

  computed: {
    basUrl(){
      return import.meta.env.VITE_API_BACKEND_URL
    },
  }
}
</script>
