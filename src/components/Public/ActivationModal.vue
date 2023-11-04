<template>
  <div class="text-center">
      <v-dialog
          v-model="dialog"
          width="468"
      >
        <template v-slot:activator="{ props }">
          <v-switch
              inset
              color="success"
              v-model="is_active"
               />
        </template>
          <v-card>
              <v-row justify="center" align="center" class="pa-5">
                  <v-col cols="3">
                      <v-btn @click="dialog = false" variant="icon">
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                  </v-col>
                  <v-col cols="9">
                      <div class="text-left pl-15">
                          <span class="t14500">
                            غیرفعال کردن منو
                            </span>
                        </div>
                    </v-col>
                </v-row>
                <div class="mt-3 mb-8  px-5">
                    <v-divider />
                </div>

                <div class="text-center pa-5" >
                        <span class="t12500">
                           با غرفعال کردن این آیتم در منو، تمام زیرمجموعه‌های متصل نیز غیرفعال میشوند.
                        </span>
                </div>
              <div class="text-center px-5 mb-5" >
                        <span class="t12500">
                           آیا از انجام این کار اطمینان دارید؟
                        </span>
                </div>
                <div class="mt-3 mb-8  px-5">
                        <v-divider />
                </div>

                <div class="text-center pb-5">
                    <v-btn :loading="loading" color="primary500" @click="changeActive()" height="40" rounded class="px-5 mt-1 mr-15">
                        <span>
                            تایید
                        </span>
                    </v-btn>
                    <v-btn @click="close()"  variant="text" height="40" rounded class="px-5 mt-1 ml-15">
                        انصراف
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { closeConfirm } from "@/assets/js/functions";
import { AxiosCall } from '@/assets/js/axios_call.js'
export default {
  props:{
    active:false,
    id:null,
    url:null,
    index:null,
    changeValue:{ type:Function }
  },
  data(){
    return{
      loading:false,
      dialog :false,
      is_active:false,
      filter:false,
    }
  },
  watch:{
    active(val){
      this.is_active = val
    },
    is_active(val){
      if (this.filter){
        console.log(val ,'active')
        if (val){
          this.changeActive()
        }
        else {
          this.dialog = true
        }
      }

      this.changeValue(this.index , val)
    }
  },
  mounted() {
    this.is_active = this.active
    setTimeout(()=>{
      this.filter = true
    } , 100)
  },
  methods: {
    close(){
      this.changeValue(this.index , !this.is_active)
      this.dialog = false
    },
    async changeActive() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = this.url + this.id
      if (this.is_active) formdata.append('is_active', 1)
      else formdata.append('is_active', 0)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata

      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data){
        this.dialog = false
      }
    },
  }
}
</script>