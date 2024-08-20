<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <CerateLegalSeller />-->
      <section class="create-product flex-column d-flex h-100">
        <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>
        <v-card class="ma-5 br--12 pb-15 flex-grow-1">
          <template v-if="step === 1">
            <LegalSellerStep1 ref="step1"/>
          </template>
          <template v-if="step === 2">
            <LegalSellerStep2 ref="step2"/>
          </template>
          <template v-if="step === 3">
            <LegalSellerStep3 ref="step3"/>
          </template>
          <template v-if="step === 4">
            <LegalSellerStep4 ref="step4"/>
          </template>

          <footer class="create-product__actions ">
            <v-row justify='space-between' class="px-8 pt-8">
              <div>
                <v-btn
                    v-if="step > 1"
                    rounded
                    variant="outlined"
                    width="115"
                    @click="decreaseStep()"
                >
              <span class="t14 w300">
                  مرحله قبلی
              </span>
                </v-btn>
                <v-btn
                    v-else
                    rounded
                    variant="outlined"
                    width="115"
                    @click="$router.go(-1)"
                >
              <span class="t14 w300">
                 بازگشت
              </span>
                </v-btn>
              </div>
              <div>

                <v-btn
                    :loading="loading"
                    rounded
                    color="primary400"
                    variant="elevated"
                    width="115"
                    @click="increaseStep()"
                >
              <span
                  v-if="step < 4"
                  class="t14 w300"
              >
               تایید و ادامه
              </span>

                  <span
                      v-else
                      class="t14 w300"
                  >
                تایید و ثبت
              </span>
                </v-btn>
              </div>
            </v-row>
          </footer>
        </v-card>
      </section>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const CerateLegalSeller = defineAsyncComponent(()=> import ('@/components/Seller/Add/LegalSeller/CerateLegalSeller.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Stepper from '@/components/Public/Stepper.vue'
import {AxiosCall} from '@/assets/js/axios_call.js'
import {convertDateToGregorian, openToast} from "@/assets/js/functions";
import LegalSellerStep1 from '@/components/Seller/Add/LegalSeller/Steps/LegalSellerStep1.vue'
import LegalSellerStep2 from '@/components/Seller/Add/LegalSeller/Steps/LegalSellerStep2.vue'
import LegalSellerStep3 from '@/components/Seller/Add/LegalSeller/Steps/LegalSellerStep3.vue'
import LegalSellerStep4 from '@/components/Seller/Add/LegalSeller/Steps/LegalSellerStep4.vue'

export default {

  components: {
    LegalSellerStep1,
    LegalSellerStep2,
    LegalSellerStep3,
    LegalSellerStep4,
    Stepper,
    DashboardLayout,
    Header
  },

  data: () => ({
    step: 1,
    loading: false,
    steps:[
      'اطلاعات فروشنده حقوقی',
      'اطلاعات شرکت',
      'آدرس',
      'اطلاعات پرداخت'
    ]

  }),

  methods: {

    /**
     * increase step
     */
    increaseStep() {
      if (this.step === 1){
        this.step1Validation()
      }if (this.step === 2){
        this.step2Validation()
      }if (this.step === 3){
        this.step3Validation()
      }if (this.step === 4){
        this.step4Validation()
      }
    },
    step1Validation(){
      this.$refs.step1.$refs.legalSeller1.validate()
      setTimeout(()=>{

        if (this.$refs.step1.form.nationalCard.length <1){
          openToast( this.$store,
              'عکس کارت ملی الزامی است',
              "error")
        }
        else if (this.$refs.step1.form.certificate === null){
          openToast( this.$store,
              'عکس شناسنامه الزامی است',
              "error")
        }
        else if (this.$refs.step1.valid){
          this.$store.commit('set_legalSellerStep1' , this.$refs.step1.form)
          this.step ++
        }
      },200)
    },
    step2Validation(){
      this.$refs.step2.$refs.legalSeller2.validate()
      setTimeout(()=>{
        if (this.$refs.step2.form.logo === null){
          openToast( this.$store,
              'لوگو فروشگاه الزامی است',
              "error")
        }
        else if (this.$refs.step2.valid){
          this.$store.commit('set_legalSellerStep2' , this.$refs.step2.form)
          this.step ++
        }
      },200)
    },
    step3Validation(){
      this.$refs.step3.$refs.legalSeller3.validate()
      setTimeout(()=>{
        if (this.$refs.step3.valid){
          this.$store.commit('set_legalSellerStep3' , this.$refs.step3.form)
          this.step ++
        }
      },200)
    },
    step4Validation(){
      this.$refs.step4.$refs.legalSeller4.validate()
      setTimeout(()=>{
        if (this.$refs.step4.form.contract === null){
          openToast( this.$store,
              'فایل قرارداد الزامی است',
              "error")
        }

        else if (this.$refs.step4.valid){
          this.$store.commit('set_legalSellerStep4' , this.$refs.step4.form)
          this.createSeller()
        }
      },200)
    },
    async createSeller() {
      const form1 = this.$store.getters['get_legalSellerStep1']
      const form2 = this.$store.getters['get_legalSellerStep2']
      const form3 = this.$store.getters['get_legalSellerStep3']
      const form4 = this.$store.getters['get_legalSellerStep4']

      const brithDate = convertDateToGregorian(form1.birthDate , '/' , false)
      const validityDate = convertDateToGregorian(form2.validityDate , '/' , false)
      this.loading = true
      let formData =  new FormData()
      formData.append('full_name',form1.fullName)
      formData.append('type','legal')
      formData.append('birth_date' , brithDate)
      formData.append('phone_number',form1.mobile)
      formData.append('email',form1.email)
      formData.append('identification_code',form1.nationalCode)
      formData.append('birth_certificate_code',form1.certificateNumber)
      form1.nationalCard.forEach((el , index)=>{
        formData.append(`identification_cart_files[${index}]`,el)
      })
      formData.append('birth_certificate_file_id',form1.certificate)
      formData.append('company_name',form2.shopName)
      formData.append('shopping_name',form2.shopName)
      formData.append('company_type',form2.shopType)
      formData.append('economic_code',form2.economicCode)
      formData.append('company_registration_number',form2.registrationNumber)
      formData.append('company_national_id',form2.nationalID)
      formData.append('newspaper_image_id',form2.officialNewspaper)
      formData.append('tax_code',form2.taxCode)
      formData.append('phone',form2.phone)
      formData.append('tax_code_expire_date',validityDate)
      formData.append('signatory',form2.signatory)
      formData.append('logo_image_id',form2.logo)

      formData.append('city_id',form3.city)
      formData.append('state_id',form3.province)
      formData.append('postal_code',form3.postalCode)
      formData.append('address',form3.address)
      formData.append('lat',form3.latLong.latitude)
      formData.append('long',form3.latLong.longitude)

      formData.append('account_number', form4.accountNumber)
      formData.append('sheba_number',form4.shebaNumber)
      formData.append('payment_type',form4.paymentType)
      formData.append('payment_period',form4.paymentPeriod)
      formData.append('contract_file_id',form4.contract)
      formData.append('contract_status','associate')
      formData.append('is_active',1)


      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'seller/crud/create'
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/seller/index')
      } else {
        this.loading = false
      }
    },
    /**
     * decrease step
     */
    decreaseStep() {
      if (this.step > 1) --this.step

    },

    /**
     *  change step from stepper button
     * @param{*} step
     */
    changeStep(step) {
      this.step = step
    },

  },

}

</script>
