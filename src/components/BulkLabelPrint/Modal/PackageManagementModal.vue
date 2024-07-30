<template>
  <div class="text-right ">
    <v-dialog v-model="dialog" width="600">
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
            مدیریت
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center px-5" >
        <v-form ref="packageManagement" v-model="valid">
          <v-row justify="center" class="pa-10">
            <v-col cols="11">
              <div class="text-right">
                <span class="text-error">*</span>
                <span>
                    تعداد
                  </span>
              </div>
              <div>
                <v-text-field type="number" :rules="rule" v-model="count" variant="outlined"/>
              </div>
            </v-col>
            <v-col cols="11">
              <div class="text-right">
                <span class="text-error">*</span>
                <span>
                    شناسه بسته
                  </span>

              </div>
              <div>
                <v-text-field :rules="rule" v-model="requestedPackageId" :autofocus="true" variant="outlined"/>
              </div>
            </v-col>
          </v-row>
        </v-form>
          <v-row class="justify-between my-2 mx-2">

            <v-col cols="3" class="d-flex mx-10 ">
              <v-btn
                  :loading="loading"
                  @click="validate()"
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
    shipmentId:null,
    packageId:null,
    shpsId:null,
    getShpsList:{
      type:Function
    },
  },
  data(){
    return {
      rule:[(v) => !!v || 'این فیلد الزامی است'],
      count:null,
      requestedPackageId:null,
      loading :false,
      valid:true
    }
  },


  methods: {
    print(id) {
      // this.close()
      window.open(`${ import.meta.env.VITE_API_SITEURL}processing-shipment/${this.shipmentId}/${this.shpsId}/${id}/barcode-print`, '_blank');

    },
    close() {
      this.$refs.packageManagement.reset()
        this.$store.commit('set_packageManagementModal' , false)
    },
    async validate(){
      await this.$refs.packageManagement.validate()
      if (this.valid) this.createSubPackage()
    },
    async createSubPackage(){
      try {
        const packageIdSplit = this.requestedPackageId.split('-')
        let packageId = ''
        if (packageIdSplit[1]){
          packageId = packageIdSplit[1]
        }
        else{
          packageId =  this.requestedPackageId
        }
        this.loading = true
        const formData = new FormData()
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        formData.append('shps' , this.shpsId)
        formData.append('count' , this.count)
        formData.append('package_id' , this.packageId)
        formData.append('requested_package_id' ,packageId )
        formData.append('shipment_id' , this.shipmentId)
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.store = this.$store
        AxiosMethod.form = formData
        AxiosMethod.toast_error = true
        AxiosMethod.end_point = `package/shps/transfer/`
        let data = await AxiosMethod.axios_post()
        if (data) {
          openToast(this.$store , 'بسته با موفقیت ساخته شد' , 'success')
          this.getShpsList(this.packageId , this.$store)
          this.close()
          this.loading= false
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
    dialog(){
      return this.$store.getters['get_packageManagementModal']
    }

  }
}
</script>
