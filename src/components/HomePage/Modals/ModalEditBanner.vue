<template>
  <div class="text-right">

    <v-dialog
        v-model="dialog"
        width="908"
    >
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14500">
                           ویرایش بنر
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5" >
          <BannerForm :bannerObject="bannerObject" status="edit" ref="BannerForm"/>
        </div>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10">
          <v-btn
              width="80"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <v-btn
              @click="dialog = false"
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1"
          >

            انصراف
          </v-btn>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BannerForm from '@/components/HomePage/Forms/BannerForm.vue'
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToGregorian} from "@/assets/js/functions";
export  default {
  components:{
    BannerForm
  },
  data(){
    return{
      dialog:false,
      bannerObject:null
    }
  },
  methods:{
    validate(){
      this.$refs.BannerForm.$refs.addBanner.validate()
      setTimeout(()=>{
        if (this.$refs.BannerForm.valid) this.createBanner()
      }, 200)
    },
    async createBanner(){

      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/home/section/banner/update/${this.bannerObject.id}`
      const splitStartDate = this.$refs.BannerForm.form.startDate.split(' ')
      const splitEndDate = this.$refs.BannerForm.form.endDate.split(' ')
      const startDate = convertDateToGregorian( splitStartDate[0], '-' , false)
      const endDate = convertDateToGregorian(splitEndDate[0] , '-' , false)

      formData.append('homepage_section_id' , this.$route.params.sectionId)
      formData.append('link', this.$refs.BannerForm.form.imageLink)
      formData.append(`image_alt`, this.$refs.BannerForm.form.imageAlt)
      formData.append('start_time' , `${startDate} ${splitStartDate[1]}:00`)
      formData.append('end_time' , `${endDate} ${splitStartDate[1]}:00`)
      formData.append('device', this.$refs.BannerForm.form.deviceType)
      formData.append('image_id', this.$refs.BannerForm.form.image)
      formData.append('priority', this.$refs.BannerForm.form.priority)
      AxiosMethod.form = formData
      formData.append('is_active', 0)
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.dialog = false
      }
      else{
        this.loading=false
      }
    },
    close(){
      const form = {
        dialog :false,
        object : ''
      }
      this.$store.commit('set_homePageBannerModal' , form)
    }
  },

}
</script>