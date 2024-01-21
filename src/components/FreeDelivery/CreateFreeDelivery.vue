<template>
    <div class="create-product flex-column d-flex vh-100">
      <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="600">
        <CreateVoucherFrom ref="CreateVoucherFrom" />
  
        <footer class="create-warehouse__actions">
          <v-row justify="end" class="pl-10 pt-5">
            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
              تایید
            </v-btn>
  
          </v-row>
        </footer>
      </v-card>
    </div>
  </template>
  
  <script>
  import CreateVoucherFrom from "@/components/FreeDelivery/Add/CreateFreeDelivery.vue";
  import {
    AxiosCall
  } from "@/assets/js/axios_call";
  import {
    convertDateToGregorian,
    openToast
  } from "@/assets/js/functions";
  
  export default {
    data() {
      return {
        loading: false,
      }
    },
    components: {
      CreateVoucherFrom
    },
    methods: {
      validate() {
        this.$refs.CreateVoucherFrom.$refs.addVoucher.validate()
        setTimeout(()=>{
          let isFileNull = false
          this.$refs.CreateVoucherFrom.voucherForm.voucherCondition.forEach((condition, index) => {
            switch (condition.data) {
              case null:
                isFileNull = true
                openToast(this.$store,`پر کردن اطلاعات ${condition.title} الزامی است` , 'error')
                break;
              default:
                isFileNull = false
                break;
            }
  
          })
          if (this.$refs.CreateVoucherFrom.valid && !isFileNull) this.createVoucher()
  
        }, 200)
  
  
      },
      async createVoucher() {
        this.loading = true
        let formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'voucher/crud/create'
        formData.append('name', this.$refs.CreateVoucherFrom.voucherForm.title)
        formData.append('code', this.$refs.CreateVoucherFrom.voucherForm.code)
        formData.append('discount_type', this.$refs.CreateVoucherFrom.voucherForm.voucherAmountType)
        formData.append('discount', this.$refs.CreateVoucherFrom.voucherForm.voucherAmount)
        formData.append('is_active', this.$refs.CreateVoucherFrom.voucherForm.voucherActive)
        formData.append('sending_price', this.$refs.CreateVoucherFrom.voucherForm.sending)
        formData.append('voucher_type', this.$refs.CreateVoucherFrom.voucherForm.voucherType)
        if (this.$refs.CreateVoucherFrom.voucherForm.voucherType === 'group')  formData.append('count', this.$refs.CreateVoucherFrom.voucherForm.voucherCount)
        this.$refs.CreateVoucherFrom.voucherForm.voucherCondition.forEach((condition, index) => {
          if (condition.value === 'start-and-end-time'){
            const startDateSplit = condition.data[0].split(' ')
            const endDateSplit = condition.data[1].split(' ')
            formData.append('start_time', convertDateToGregorian(startDateSplit[0] , '/' , false) + ' ' + startDateSplit[1]+':00')
            formData.append('end_time', convertDateToGregorian(endDateSplit[0] , '/' , false) +  ' ' + endDateSplit[1]+':00')
          }
          else {
            formData.append(condition.value, condition.data)
          }
        })
        AxiosMethod.form = formData
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading = false
          openToast(this.$store,
              'کد تخفیف موفقیت ایجاد شد.',
              "success")
        } else {
          this.loading = false
          openToast(this.$store,
              'ایجاد کد تخفیف مشکل مواجه شد',
              "error")
        }
      },
  
    },
  
  }
  </script>
  