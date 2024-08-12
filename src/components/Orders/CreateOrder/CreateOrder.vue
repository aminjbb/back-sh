<template>
  <div class="create-product flex-column d-flex vh-100">
    <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>

    <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="600">
      <template v-if="step === 1">
        <CreateManualOrderStep1
            ref="formStep1"
            @selectedUser="selectedUser"
            @description="description"
            @selectedSendingMethod="sendingMethod"
            @selectedAddress="getAddress"/>
      </template>

      <template v-if="step === 2">
        <CreateManualOrderStep2 @shpsListUpdated="handlerShpsListUpdated"/>
      </template>

      <footer class="create-product__actions ">
        <v-row justify="space-between" class="px-8 pt-8">
          <div>
            <v-btn
                v-if="step > 1"
                rounded
                variant="outlined"
                width="115"
                @click="decreaseStep()">
              <span class="t14 w300">
                  بازگشت
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
                @click="increaseStep()">
              <span
                  v-if="step < 3"
                  class="t14 w300">
                تایید و ادامه
              </span>

              <span
                  v-else
                  class="t14 w300">
                تایید و ثبت
              </span>
            </v-btn>
          </div>
        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import CreateOrderForm from "@/components/Orders/CreateOrder/CreateOrderForm.vue";
import CreateManualOrderStep1 from "@/components/ManualOrder/CreateManualOrder/CreateManualOrderStep1.vue"
import CreateManualOrderStep2 from "@/components/ManualOrder/CreateManualOrder/CreateManualOrderStep2.vue"
import { AxiosCall } from "@/assets/js/axios_call";
import { openToast } from "@/assets/js/functions";
import Stepper from "@/components/Public/Stepper.vue";
export default {
  data() {
    return {
      loading: false,
      steps:[
        'اطلاعات سفارش',
        'انتخاب محصول'
      ],
      step: 1,
      isSelectedUserEmit: false,
      isDescriptionEmit:false,
      isSendingMethodEmit:false,
      isGetAddressEmit: false,
      updatedShpsList: [],
      useId:null,
      addressId:null,
      sendMethod: null,
      descriptionData: null,
      formStep1 : null
    }
  },

  components: {
    Stepper,
    CreateOrderForm,
    CreateManualOrderStep1,
    CreateManualOrderStep2
  },

  methods: {
    changeStep(step) {
      this.step = step
    },

    decreaseStep() {
      if (this.step > 1) {
        --this.step
        setTimeout(()=>{
          this.$refs.formStep1.user = this.useId
          this.$refs.formStep1.address = this.addressId
          this.$refs.formStep1.description = this.descriptionData
          this.$refs.formStep1.sendingMethod = this.sendMethod
          this.$refs.formStep1.searchUser(this.useId.phone_number)
          this.$refs.formStep1.getSendingMethods(this.addressId)
        },1000)

      }
    },
    increaseStep() {
      if (this.step === 1){
        this.step1Validation()
      }if (this.step === 2){
        this.step2Validation()
      }
    },

    step1Validation(){
      if(this.isGetAddressEmit && this.sendingMethodEmit && this.isDescriptionEmit && this.isSelectedUserEmit) {
        this.step++
      }
      else {
        if(this.isSelectedUserEmit===false) {
          openToast( this.$store,'کاربر انتخاب نشده است' , 'error')
        }
        else if (this.isGetAddressEmit===false) {
          openToast( this.$store, 'آدرس انتخاب نشده است' , 'error')
        }
        else if (this.isDescriptionEmit===false ) {
          openToast( this.$store,'توضیحات لازم است' , 'error')
        }
        else if (this.sendingMethodEmit===false) {
          openToast( this.$store,'روش ارسال انتخاب نشده است' , 'error')
        }
      }
    },
    step2Validation(){
      if (this.updatedShpsList.length >0) {
        const zeroCountShpsList = this.updatedShpsList.find(shps => shps.count == 0)
        if (zeroCountShpsList){
          openToast( this.$store,'محصولی با تعداد صفر نمیتوانید وارد کنید' , 'error')
        }
        else {
          this.createOrder()
        }
      }
    },

    selectedUser(user){
      this.useId= user
      if(user && user !== null && user !== ''){
        this.isSelectedUserEmit = true
      }
      else {
        this.isSelectedUserEmit = false
      }
    },
    description(desc){
      this.descriptionData = desc
      if(desc && desc !== null && desc !== ''){
        this.isDescriptionEmit = true
      }
      else {
        this.isDescriptionEmit = false
      }
    },
    sendingMethod(val){
      this.sendMethod = val
      if(val && val !== null && val !== ''){
        this.sendingMethodEmit = true
      }
      else {
        this.sendingMethodEmit = false
      }
    },
    getAddress(address){
      this.addressId = address
      if(address && address !== null && address !== ''){
        this.isGetAddressEmit = true
      }
      else {
        this.isGetAddressEmit = false
      }
    },

    handlerShpsListUpdated(updatedShpsList){
      this.updatedShpsList = updatedShpsList
      this.$emit('updateShpsListToParent', updatedShpsList)
    },

    async createOrder() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/order/crud/create'
      this.updatedShpsList.forEach((shps,index)=>{
          formData.append(`shps_list[${index}][shps]`, shps?.id)
          formData.append(`shps_list[${index}][count]`, shps?.count)
      })
      formData.append('user_id', this.useId.id)
      formData.append('address_id', this.addressId)
      formData.append('sending_method', this.sendMethod)
      formData.append('description', this.descriptionData)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        openToast(this.$store,
            'سفارش با موفقیت ایجاد شد.',
            "success")
        this.$router.push('/orders/manual-order-list')

      } else {
        this.loading = false
      }
    }
  }
}
</script>
