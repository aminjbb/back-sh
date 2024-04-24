<template>
  <div class="create-product flex-column d-flex vh-100">
    <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>

    <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="600">
      <template v-if="step === 1">
        <CreateManualOrderStep1
            @selectedUser="selectedUser"
            @description="description"
            @selectedSendingMethod="sendingMethod"
            @selectedAddress="getAddress"/>
      </template>

      <template v-if="step === 2">
        <CreateManualOrderStep2 />
      </template>

      <footer class="create-warehouse__actions">
        <v-row justify="space-between" class="px-10 pt-10">
          <v-btn
              variant="outlined"
              :loading="loading"
              @click="validate()"
              height="40"
              rounded
              class="px-8 mt-1">
          </v-btn>
          <v-btn
              variant="elevated"
              :loading="loading"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            <span v-if="step===1">تایید و ادامه</span>
            <span v-else>تایید</span>
          </v-btn>
        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import CreateOrderForm from "@/components/Orders/CreateOrder/CreateOrderForm.vue";
import CreateManualOrderStep1 from "@/components/ManualOrder/CreateManualOrder/CreateManualOrderStep1.vue"
import CreateManualOrderStep2 from "@/components/ManualOrder/CreateManualOrder/CreateManualOrderStep2.vue"
import {
  AxiosCall
} from "@/assets/js/axios_call";
import {
  convertDateToGregorian,
  openToast
} from "@/assets/js/functions";
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
      selectedUserEmit: false,
      descriptionEmit:false,
      sendingMethodEmit:false,
      getAddressEmit: false,
    }
  },

  components: {
    Stepper,
    CreateOrderForm,
    CreateManualOrderStep1,
    CreateManualOrderStep2
  },

  methods: {
    selectedUser(user){
      if(user && user !== null && user !== ''){
        this.selectedUserEmit = true
      }
      else {
        this.selectedUserEmit = false
      }
    },
    description(desc){
      if(desc && desc !== null && desc !== ''){
        this.descriptionEmit = true
      }
      else {
        this.descriptionEmit = false
      }
    },
    sendingMethod(val){
      if(val && val !== null && val !== ''){
        this.sendingMethodEmit = true
      }
      else {
        this.sendingMethodEmit = false
      }
    },
    getAddress(address){
      if(address && address !== null && address !== ''){
        this.getAddressEmit = true
      }
      else {
        this.getAddressEmit = false
      }
    },

    validate() {
      if(this.getAddressEmit && this.sendingMethodEmit && this.descriptionEmit && this.selectedUserEmit) {
        this.step++
      }
      else {
        if(this.selectedUserEmit===false) {
          openToast( this.$store,'کاربر انتخاب نشده است' , 'error')
        }
        else if (this.descriptionEmit===false ) {
          openToast( this.$store,'توضیحات لازم است' , 'error')
        }
       else if (this.sendingMethodEmit===false) {
          openToast( this.$store,'روش ارسال انتخاب نشده است' , 'error')
        }
         else if (this.getAddressEmit===false) {
          openToast( this.$store, 'آدرس انتخاب نشده است' , 'error')
        }
      }
    },

    async createOrder() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/order/crud/create'
      this.$refs.CreateOrderForm.shpsList.forEach((shps, index) => {
        formData.append(`shps_list[${index}][shps]`, shps?.shps?.id)
        formData.append(`shps_list[${index}][count]`, shps?.count)
      })
      formData.append('user_id', this.$refs.CreateOrderForm.user.id)
      formData.append('address_id', this.$refs.CreateOrderForm.address)
      formData.append('sending_method', this.$refs.CreateOrderForm.sendingMethod)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        openToast(this.$store,
            'سفارش با موفقیت ایجاد شد.',
            "success")
      } else {
        this.loading = false
        openToast(this.$store,
            'ایجاد سفارش با مشکل مواجه شد',
            "error")
      }
    },

    changeStep(step) {
      this.step = step
    },

  },
}
</script>
