<template>
  <div class="text-right">

    <v-card style="width: 100%" height="157" @click="dialog = true" class="d-flex justify-center">
      <img v-if="image" :style="`max-width: ${maxWidth}`" height="157" :src="image" alt="">
      <img v-else style="width: 100%" height="157" src="@/assets/img/noPhoto.png" alt="">
    </v-card>
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
                           افزودن بنر
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5" >
          <AddAdsForm :banner="banner" :device="device" ref="AddAdsForm"/>
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
import AddAdsForm from '@/components/HomePage/Forms/AddAdsForm.vue'
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToGregorian} from "@/assets/js/functions";
export  default {
  props:{
    device:'',
    banner:null,
    maxWidth:null
  },
  components:{
    AddAdsForm
  },
  data(){
    return{
      dialog:false,
      image:''
    }
  },
  methods:{
    validate(){
      this.$refs.AddAdsForm.$refs.addBanner.validate()
      setTimeout(()=>{
        if (this.$refs.AddAdsForm.valid) this.createBanner()
      }, 200)
    },
    async createBanner(){
      console.log(this.banner)
      this.loading=true
      let formData = new FormData();
      let endPoint = null
      if (this.banner) endPoint = `page/home/section/banner/update/${this.banner.id}`
       else endPoint = `page/home/section/banner/create/`
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = endPoint

      formData.append('homepage_section_id' , this.$route.params.sectionId)
      formData.append('link', this.$refs.AddAdsForm.form.link)
      formData.append(`image_alt`, this.$refs.AddAdsForm.form.imageAlt)
      formData.append('device', this.device)
      formData.append('image_id', this.$refs.AddAdsForm.form.image)
      AxiosMethod.form = formData
      formData.append('is_active', 0)
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.image = this.$refs.AddAdsForm.form.imageUrl
        this.dialog = false
      }
      else{
        this.loading=false
      }
    }
  },
  watch:{
    banner(val){
      this.image = this.banner.image?.image_url
    }
  },
  mounted() {
    if (this.banner)  this.image = this.banner.image?.image_url
  }

}
</script>