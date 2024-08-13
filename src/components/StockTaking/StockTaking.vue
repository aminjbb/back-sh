<template>
  <v-card class="h-100">
  <div class="d-flex justify-space-between align-center">
    <div class="pa-3 d-flex">
      <HandheldDrawer/>
      <span class="t20 w400">
         انبارگردانی
        </span>
    </div>
    <div class="pa-3">
      <v-icon size="30">
        mdi-chevron-left
      </v-icon>
    </div>
  </div>
  <div class="h-100 d-flex align-center justify-center">
    <div>
      <div class="d-flex justify-center px-10 ma-5">
        <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
      </div>
      <div class="d-flex justify-center ">
        <v-icon color="black" size="30">
          mdi-barcode-scan
        </v-icon>
      </div>

      <div class=" mt-8 d-flex justify-center px-10 text-center">
          <span class="text-black t20 w400">
          شناسه کالا را اسکن کنید.
          </span>
      </div>
      <div class=" mt-3 d-flex justify-center px-10 text-center">
        <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="stockTaking" v-model="barcode" variant="outlined" :autofocus="true"/>
        <v-text-field v-else @keyup.enter="stockTaking()" v-model="barcode" variant="outlined" :autofocus="true"/>
      </div>

      <div class="mt-10 mx-5">
        <v-btn color="primary500"
               :loading="loading"
               height="40"
               block=""
               rounded>
          تایید
        </v-btn>
      </div>
    </div>
  </div>
  </v-card>

</template>
<script>
import {AxiosCall} from "@/assets/js/axios_call";
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
import {openToast} from "@/assets/js/functions";

export default {
setup(){

},
  data() {
    return {
      autoSend: 'automate',
      barcode:null,
      lastBarcode :null,
      loading:false
    }
  },

  methods: {
    async stockTaking() {
      try {
        if (this.lastBarcode !== this.barcode){
          this.lastBarcode = this.barcode
          this.loading = true
          const formData = new FormData()
          formData.append('barcode', this.barcode)
          const AxiosMethod = new AxiosCall()
          AxiosMethod.using_auth = true
          AxiosMethod.toast_error = true
          AxiosMethod.store = this.$store
          AxiosMethod.token = this.$cookies.get('adminToken')
          AxiosMethod.end_point = 'warehouse/crud/shpss'
          AxiosMethod.form = formData
          let data = await AxiosMethod.axios_post()
          if (data) {
            openToast(this.$store , 'عملیات موفقیت آمیز بود' , 'success')
            this.barcode = null
            this.loading = false
          }
          else {
            this.loading = false
            this.barcode = null
          }
        }

      } catch (e) {
        this.loading = false
        this.barcode = ''
      }
    },
  },

  components: {
    HandheldDrawer,
  }
}
</script>

<style>
.scan_box {
  height: calc(100% - 390px);

}
</style>