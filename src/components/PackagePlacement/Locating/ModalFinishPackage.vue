<template>
  <div class="text-right ">
    <v-btn
        @click="placedPackage(0)"
        color="primary500"
        height="40"
        width="348"
        variant="flat"
        rounded
        class="px-8 mt-2">
      بستن بسته
    </v-btn>
    <v-dialog v-model="dialog" fullscreen>
      <v-card class="">
      <div class="d-flex justify-start">
        <v-btn @click="dialog = false" variant="icon">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
        <v-divider/>
        <v-row justify="center" class="my-10">
          <v-col cols="12" class="px-15">
            <div class="text-center t12 w500">
              {{detail?.message}}
            </div>
          </v-col>
          <v-col cols="12" class="px-15">
            <v-card class="mt-2" v-for="(shps , index) in detail?.data">
              <div class="d-flex justify-center">
                <img :src="shps?.sku?.image_url" width="150" height="150" alt="">
              </div>
              <div class="text-center px-10 my-3">
              <span class="text-gray600">
               {{shps?.sku?.label }}
              </span>
              </div>

              <div class="text-center px-10 my-3">
              <span class="text-error">
                {{ shps?.count_for_placing }} عدد
              </span>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-col cols="12">
            <div class="pa-4 d-flex justify-center">
              <v-btn
                  @click="placedPackage(1)"
                  color="primary500"
                  height="40"
                  rounded
                  variant="flat"
                  class="px-10 ma-1 "
              >
                تایید
              </v-btn>
              <v-btn
                  @click="dialog = false"
                  height="40"
                  rounded
                  variant="outlined"
                  class="px-8 mt-1"
              >
                انصراف
              </v-btn>

            </div>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

export default {
  props:{
    package:null,
    getAssignPackageList:{
      type:Function
    },
  },
  data(){
    return {
      valid:true,
      rule: [v => !!v || 'این فیلد الزامی است'],
      dialog:false,
      form:{
        capacity:null
      },
      detail:null
    }
  },

  methods: {

    async placedPackage(accept){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `package/locate/${this.package}?accept=${accept}`
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.detail = data
        if (accept === 0) this.dialog = true
        else {
          this.dialog = false
          this.getAssignPackageList()
          openToast(this.$store, data?.message , 'success')
        }
      }
    },

  },

  mounted() {
    this.form.capacity = this.capacity
  }
}
</script>
