<template>
  <div class="px-2 py-2 h-100">
    <v-form
        v-model="valid"
        ref="legalSeller3"
        class="create-product__info-form scroller"
    >
      <v-row
          justify="center"
          align="center"
      >

        <v-col cols="12" md="6">
          <div class="text-right my-5">
                      <span class="t14 w500">
                          استان
                      </span>
          </div>
          <v-select
              :items="provinceList"
              density="compact"
              variant="outlined"
              single-line
              :rules="rule"
              v-model="form.province"
              @update:modelValue="getCities()"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-right my-5">
                      <span class="t14 w500">
                          شهر
                      </span>
          </div>
          <v-select
              :items="cityList"
              density="compact"
              variant="outlined"
              single-line
              :rules="rule"
              v-model="form.city"

          />
        </v-col>
        <v-col cols="12">
          <div class="page">
            <NeshanMap
                ref="myMap"
                mapKey="web.b7948d6910464e19ac797f017491bb4b"
                serviceKey="service.766910339dfa43af93c0dbadc0f3023a"
                :center="form.latLong"
                :poi="false"
                :traffic="false"
                :hide-search-container="true"
                :markers-icon-callback="markersIconCallback"
                :zoom="15"
            />
          </div>
        </v-col>
        <v-col cols="12">
          <div class="text-right my-5">
                      <span class="t14 w500">
                         آدرس
                      </span>
          </div>
          <v-text-field
              placeholder="آدرس انبار را وارد نمایید"
              single-line
              clearable
              density="compact"
              variant="outlined"
              v-model="form.address"
              :rules="rule"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-right my-5">
                      <span class="t14 w500 text-gray600">
                          کد پستی
                      </span>
          </div>
          <v-text-field
              placeholder="کد پستی انبار را وارد نمایید"
              single-line
              clearable
              density="compact"
              variant="outlined"
              :rules="postalCodeRule"
              v-model="form.postalCode"
          />

        </v-col>



      </v-row>

    </v-form>
  </div>
</template>

<script>
import NeshanMap from "@neshan-maps-platform/vue3-openlayers";
import {AxiosCall} from "@/assets/js/axios_call";
export default {
  components:{
    NeshanMap,
  },


  data: () => ({
    provinces:[],
    cities:[],
    labels: {
      name: 'نام و نام خانوادگی',
      shopName: 'نام فروشگاه',
      logo: 'لوگو یا تصویر فروشگاه',
      mobile: 'تلفن همراه',
      email: 'ایمیل',
      nationalCode: 'کد ملی',
      certificateNumber: 'شماره شناسنامه',
      nationalCard: 'تصویر پشت و رو کارت ملی',
      certificate: 'تصویر صفحه اول شناسنامه',
      width: 'عرض',
      length: 'طول',
      weight: 'وزن',
      volume: 'حجم',
      product: 'محصول',
      skuGroup: 'گروه بندی'
    },
    form:{
      city:null,
      province:null,
      address:null,
      postalCode:null,
      latLong:{ latitude: 35.745669792668494, longitude: 51.35438114404677 },
    },
    valid:true,
    rule: [v => !!v || 'این فیلد الزامی است'],
    postalCodeRule: [
      (v) => !!v || "این فیلد الزامی است",
      (v) => /^[0-9]{10}$/.test(v) || "کد پستی معتبر وارد کنید",
    ],


  }),

  methods:{
    markersIconCallback(point) {
      setTimeout(()=>{
        this.form.latLong.latitude =this.$refs.myMap.state.reverseResult.mapCoords[1]
        this.form.latLong.longitude =this.$refs.myMap.state.reverseResult.mapCoords[0]
        this.form.address = this.$refs.myMap.state.reverseResult.formatted_address
      }, 1000)
      return {
        src: "https://img.icons8.com/fluency/344/find-clinic.png",
        iconScale: 0.09

      }


    },
    async getProvince(){
      const form = {
        per_page:10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/state/crud/index`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.provinces = data.data.data
      }
    },
    async getCities(){
      this.cities =[]
      this.form.city = null
      const form = {
        per_page:10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/state/crud/get/${this.form.province}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.cities = data.data.cities
      }
    },
    setForm(){

      this.form = {
        province:this.seller.state_id,
        city:this.seller.city_id,
        address:this.seller.address,
        postalCode:this.seller.postal_code,
        phoneNumber :this.seller.phone,
        latLong:{ latitude: this.seller.lat , longitude: this.seller.long },
      }
      this.getCities()
    }
  },

  computed:{
    cityList(){
      try {
        let cityList = []
        this.cities.forEach(city => {
          const form = {
            title:city.label,
            value : city.id
          }
          cityList.push(form)
        })
        return cityList
      }
      catch (e){
        return  []
      }
    },
    provinceList(){
      try {
        let provinceList = []
        this.provinces.forEach(province => {
          const form = {
            title:province.label,
            value : province.id
          }
          provinceList.push(form)
        })
        return provinceList
      }
      catch (e){
        return  []
      }
    },
  },


  mounted() {
    this.getProvince()
    if (this.$store.getters['get_legalSellerStep3']){
      this.form = this.$store.getters['get_legalSellerStep3']
    }
    else{
      this.setForm()
    }
  },

  props:{
    seller:{}
  },

}
</script>

<style>
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>
