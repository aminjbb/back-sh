<template>
  <section class="create-product flex-column d-flex h-100">
    <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>
    <v-card class="ma-5 br-12 pb-15 flex-grow-1">
      <template v-if="step === 1">
        <ManualOrderStepOne ref="step1"/>
      </template>
      <template v-if="step === 2">
        <ManualOrderStepTwo ref="step2"/>
      </template>




      <footer class="create-product__actions ">
        <v-row justify="space-between" class="px-8 pt-8">

          <div>
            <v-btn
                v-if="step > 1"
                rounded
                variant="outlined"
                width="115"
                @click="decreaseStep()"
            >
              <span class="t14300">
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
              <span class="t14300">
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
                  v-if="step < 2"
                  class="t14300"
              >
                تایید و ادامه
              </span>

              <span
                  v-else
                  class="t14300"
              >
                تایید و ثبت
              </span>
            </v-btn>
          </div>
        </v-row>
      </footer>
    </v-card>
  </section>
</template>

<script>

import Stepper from '@/components/Public/Stepper.vue'
import Orders from "@/composables/Orders";
import {AxiosCall} from '@/assets/js/axios_call.js'
import {openToast} from "@/assets/js/functions";
import ManualOrderStepOne from '@/components/Orders/CreateManualOrder/Steps/ManualOrderStepOne.vue'
import ManualOrderStepTwo from '@/components/Orders/CreateManualOrder/Steps/ManualOrderStepTwo.vue'
import NaturalSellerStep3 from '@/components/Seller/Add/NaturalSeller/Steps/NaturalSellerStep3.vue'
export default {

  components: {
    ManualOrderStepOne,
    ManualOrderStepTwo,
    NaturalSellerStep3,
    Stepper
  },

  data: () => ({
    step: 1,
    loading: false,
    steps:[
      'اطلاعات سفارش',
      'انتخاب محصول',
    ]

  }),
  setup() {
    const {

      manualOrderListGet,
      getManualOrderListGet,

    } = new Orders;

    return {

      manualOrderListGet,
      getManualOrderListGet,

    }
  },

  methods: {

    /**
     * increase step
     */
    increaseStep() {
      if (this.step === 1){
        this.step1Validation()
      }if (this.step === 2){
        this.step2Validation()
      }
    },
    step1Validation(){
      this.$refs.step1.$refs.createSeller1.validate()
      setTimeout(()=>{
        if (this.$refs.step1.form.orderId === null){
          openToast( this.$store,
              'شماره سفارش الزامی است',
              "error")
        }
        else if (this.$refs.step1.form.user === null){
          openToast( this.$store,
              'شماره تماس الزامی است',
              "error")
        }
        else if (this.$refs.step1.form.description === null){
          openToast( this.$store,
              'توضیحات  الزامی است',
              "error")
        }
        else if(this.$refs.step1.valid){
          this.$store.commit('set_manualOrderStep1' , this.$refs.step1.form)
          this.step ++
        }
      },200)
    },
    step2Validation(){
      this.$refs.step2.$refs.createSeller2.validate()
      setTimeout(()=>{
        if (this.$refs.step2.valid){
          this.$store.commit('set_manualOrderStep2' , this.$refs.step2.form)
          this.createSeller()
        }
      },200)
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

    /**
     * create sku
     */
    async createSeller() {
      const form1 = this.$store.getters['get_manualOrderStep1']
      const form2 = this.$store.getters['get_manualOrderStep2']
      const form3 = this.$store.getters['get_naturalSellerStep3']
      this.loading = true
      let formData =  new FormData()
      formData.append('full_name',form1.fullName)
      formData.append('type','genuine')
      formData.append('shopping_name',form1.shopName)
      formData.append('phone_number',form1.mobile)
      formData.append('email',form1.email)
      formData.append('identification_code',form1.nationalCode)
      formData.append('birth_certificate_code',form1.certificateNumber)
      form1.nationalCard.forEach((el , index)=>{
        formData.append(`identification_cart_files[${index}]`,el)
      })
      formData.append('birth_certificate_file_id',form1.certificate)
      formData.append('logo_image_id',form1.logo)
      formData.append('city_id',form2.city)
      formData.append('state_id',form2.province)
      formData.append('postal_code',form2.postalCode)
      formData.append('phone',form2.phoneNumber)
      formData.append('address',form2.address)
      formData.append('lat',form2.latLong.latitude)
      formData.append('long',form2.latLong.longitude)
      formData.append('account_number', form3.accountNumber)
      formData.append('sheba_number',form3.shebaNumber)
      formData.append('payment_type',form3.paymentType)
      formData.append('payment_period',form3.paymentPeriod)
      formData.append('contract_file_id',form3.contract)
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
     * get product`s skus
     * @param productId
     */
    async getSkuProduct(productId) {

      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `product/sku/group/crud/index?product_id=${productId}&per_page=10000`
      let data = await AxiosMethod.axios_get()
      if (data) {
        const skuObject = JSON.stringify(data.data.data)
        localStorage.setItem('skuObject', skuObject)
        this.step = 3
        this.$cookies.set('createProductStep', 3)
      } else {
      }
    },
    /**
     * create formData for manual order
     */
    shpsCreatingForm(){
      var formData = new FormData()
      this.$refs.skuForm3.shpsCreatingForm.forEach((manualOrderListGet , index)=>{
        formData.append(`shps_list[${index}][shps]` ,manualOrderListGet.id )
        formData.append(`shps_list[${index}][count]` ,manualOrderListGet.count )
      })
      formData.append(`user_id` , this.$refs.skuForm3.form.user )
      formData.append(`address_id` , this.manualOrderListGet.address_id )
      formData.append(`sending_method` , this.manualOrderListGet.sending_method )
      formData.append(`parent_id` , this.manualOrderListGet.id )
      formData.append(`description` , this.$refs.skuForm3.form.description )

      this.createManualOrder(formData)
    },


    async createManualOrder(formData) {
      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.toast_success = false
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'admin/order/crud/create'
      AxiosMethod.form = formData

      let data = await AxiosMethod.axios_post()
      if (data) {
        await  this.approvedSku()
        this.step = 1
      } else {
        this.loading = false
      }
    },

    /**
     * approve skus list
     */

    async approvedSku() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      this.$refs.skuForm3.skuesSelected.forEach((sku, index) => {
        formdata.append(`sku_ids[]`, sku)
      });
      formdata.append('status', 'approved')
      AxiosMethod.using_auth = true
      AxiosMethod.toast_success = false
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'product/sku/crud/switch/multi/status'
      AxiosMethod.form = formdata

      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.step = 1
        localStorage.removeItem('skuObject')
      } else {
        this.loading = false
      }
    }
  },

  computed: {

  },
  mounted() {

    this.getManualOrderListGet()

  },

  watch: {
    /**
     * cookie step
     */
    step(val) {
      this.$cookies.set('createProductStep', val)
    }
  }
}
</script>
