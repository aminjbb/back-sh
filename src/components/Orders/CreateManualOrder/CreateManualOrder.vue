<template>
  <section class="create-product flex-column d-flex h-100">
    <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>
    <v-card class="ma-5 br-12 pb-15 flex-grow-1">
      <template v-if="step === 1">
        <ManualOrderStepOne ref="step1"/>
      </template>
      <template v-if="step === 2">
        <NaturalSellerStep2 ref="step2"/>
      </template>
      <template v-if="step === 3">
        <NaturalSellerStep3 ref="step3"/>
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
                  v-if="step < 3"
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

import {AxiosCall} from '@/assets/js/axios_call.js'
import {openToast} from "@/assets/js/functions";
import ManualOrderStepOne from '@/components/Orders/CreateManualOrder/Steps/ManualOrderStepOne.vue'
import NaturalSellerStep2 from '@/components/Seller/Add/NaturalSeller/Steps/NaturalSellerStep2.vue'
import NaturalSellerStep3 from '@/components/Seller/Add/NaturalSeller/Steps/NaturalSellerStep3.vue'
export default {

  components: {
    ManualOrderStepOne,
    NaturalSellerStep2,
    NaturalSellerStep3,
    Stepper
  },

  data: () => ({
    step: 1,
    loading: false,
    steps:[
      'اطلاعات سفارش',
      'انتخاب محصول',
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
      }
    },
    step1Validation(){
      this.$refs.step1.$refs.createSeller1.validate()
      setTimeout(()=>{
        if (this.$refs.step1.form.logo === null){
          openToast( this.$store,
              'لوگو فروشگاه الزامی است',
              "error")
        }
        else if (this.$refs.step1.form.nationalCard.length <1){
          openToast( this.$store,
              'عکس کارت ملی الزامی است',
              "error")
        }
        else if (this.$refs.step1.form.certificate === null){
          openToast( this.$store,
              'عکس شناسنامه الزامی است',
              "error")
        }
        else if(this.$refs.step1.valid){
          this.$store.commit('set_naturalSellerStep1' , this.$refs.step1.form)
          this.step ++
        }
      },200)
    },
    step2Validation(){
      this.$refs.step2.$refs.createSeller2.validate()
      setTimeout(()=>{
        if (this.$refs.step2.valid){
          this.$store.commit('set_naturalSellerStep2' , this.$refs.step2.form)
          this.step ++
        }
      },200)
    },
    step3Validation(){
      this.$refs.step3.$refs.createSeller3.validate()
      setTimeout(()=>{
        if (this.$refs.step3.form.contract === null){
          openToast( this.$store,
              'فایل قرارداد الزامی است',
              "error")
        }
        else if (this.$refs.step3.valid){
          this.$store.commit('set_naturalSellerStep3' , this.$refs.step3.form)
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
      const form1 = this.$store.getters['get_naturalSellerStep1']
      const form2 = this.$store.getters['get_naturalSellerStep2']
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
     * create formData for sku group labels
     */
    skuGroupsLabels(){
      var formData = new FormData()
      this.$refs.skuForm3.skuGroupsLabels.forEach((skuGroup , index)=>{
        formData.append(`sku_groups[${index}][id]` ,skuGroup.id )
        formData.append(`sku_groups[${index}][label]` ,skuGroup.value )
      })
      this.updateSkuGroupLabels(formData)
    },

    /**
     * update sku group labels
     */
    async updateSkuGroupLabels(formData) {
      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.toast_success = false
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'product/sku/group/crud/update/multi'
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
    /**
     * create brand list for select
     */
    brandList() {
      try {
        const brands = []
        this.allBrands.data.forEach(element => {
          const form = {
            title: element.label,
            value: element.id
          }
          brands.push(form)
        });
        return brands
      } catch (error) {
        return []
      }
    },

    /**
     * create color list for select
     */
    colorList() {
      try {
        const colors = []
        this.allColors.data.forEach(element => {
          const form = {
            label: element.label,
            name: element.id,
            value: element.value,
            group: element.group
          }
          colors.push(form)
        });

        return colors
      } catch (error) {
        return []
      }
    },

    /**
     * create operator list for select
     */
    operatorList() {
      try {
        const operator = []
        const nullForm = {
          label: 'هیچکدام',
          name: 'none',
        }
        operator.push(nullForm)
        this.operator.data.forEach(element => {
          const form = {
            label: element.phrase,
            name: element.id,
          }
          operator.push(form)
        });
        return operator
      } catch (error) {
        return []
      }
    },

    /**
     * create volume list for select
     */
    volumeList() {
      try {
        const volume = []
        this.volume.data.forEach(element => {
          const form = {
            label: element.label,
            value: element.id
          }
          volume.push(form)
        });
        return volume
      } catch (error) {
        return []
      }
    }
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
