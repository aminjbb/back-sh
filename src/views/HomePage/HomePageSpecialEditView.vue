<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <EditHomePageSpecialSale />-->
      <div class="create-product flex-column d-flex h-100vh">
        <v-card
            class="ma-5 br--12 pb-15 flex-grow-1"
            min-height="500"
        >
          <div class="text-center py-5">
          <span class="t14 w500">
             اضافه کردن اسلایدر جایگاه 2
          </span>
          </div>
          <v-divider></v-divider>
          <SpecialSaleForm
              :specialSale="homePageSingleSlider"
              ref="SpecialSaleForm"
          />
          <footer class="create-warehouse__actions">
            <v-row
                justify="end"
                class="pl-10 pt-5"
            >
              <v-btn
                  :loading="loading"
                  @click="validate()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1"
              >

                تایید
              </v-btn>


            </v-row>
          </footer>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const EditHomePageSpecialSale = defineAsyncComponent(()=> import ('@/components/HomePage/Add/EditHomePageSpecialSale.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import SpecialSaleForm from "@/components/HomePage/Forms/SpecialSaleForm.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToGregorian} from "@/assets/js/functions";
import Home from '@/composables/Home'

export default {
  setup(){
    const { getHomePageSingleSlider , homePageSingleSlider } = new Home()
    return { getHomePageSingleSlider , homePageSingleSlider }
  },
  data() {
    return {
      loading: false,
    }
  },
  components: {
    SpecialSaleForm,
    DashboardLayout,
    Header
  },

  methods:{
    validate(){
      this.$refs.SpecialSaleForm.$refs.addForm.validate()
      setTimeout(()=>{
        if (this.$refs.SpecialSaleForm.valid) this.createSlider()
      } , 200)
    },

    async createSlider(){
      try {
        this.loading=true
        const splitStartDate = this.$refs.SpecialSaleForm.form.startDate.split(' ')
        const splitEndDate = this.$refs.SpecialSaleForm.form.endDate.split(' ')
        const startDate = convertDateToGregorian( splitStartDate[0], '-' , false)
        const endDate = convertDateToGregorian(splitEndDate[0] , '-' , false)
        let formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `page/home/section/slider/update/${this.$route.params.specialId}`
        formData.append('homepage_section_id' , this.$route.params.sectionId)
        formData.append('label' , this.$refs.SpecialSaleForm.form.title)
        formData.append('link' , this.$refs.SpecialSaleForm.form.link)
        formData.append('image_id' , this.$refs.SpecialSaleForm.form.image)
        formData.append('background_hex_code' , this.$refs.SpecialSaleForm.form.colorCode)
        formData.append('start_time' , `${startDate} ${splitStartDate[1]}:00`)
        formData.append('end_time' , `${endDate} ${splitEndDate[1]}:00`)
        AxiosMethod.form = formData
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth =true
        AxiosMethod.token =this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading=false
          this.$router.push(`/home-page/${this.$route.params.sectionId}/special-sales/index`)
        }
        else{
          this.loading=false
        }
      }
      catch (e) {
        this.loading=false
      }
    }
  },
  mounted() {
    this.getHomePageSingleSlider()
  }
}
</script>


