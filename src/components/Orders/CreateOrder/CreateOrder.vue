<template>
  <div class="create-product flex-column d-flex vh-100">
    <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="600">
      <CreateOrderForm ref="CreateOrderForm" />

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
import CreateOrderForm from "@/components/Orders/CreateOrder/CreateOrderForm.vue";
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
    CreateOrderForm
  },
  methods: {
    validate() {

      if (!this.$refs.CreateOrderForm.shpsList.length){
        openToast(this.$store , 'محصولی انتخاب نشده است' , 'error')
      }
      else if (!this.$refs.CreateOrderForm.user){
        openToast(this.$store , 'کاربر انتخاب نشده است' , 'error')
      }
      else if (!this.$refs.CreateOrderForm.address){
        openToast(this.$store , 'آدرس حتما باید انتخاب شود' , 'error')
      }
      else if (!this.$refs.CreateOrderForm.sendingMethod){
        openToast(this.$store , 'روش ارسال را انتخاب کنید' , 'error')
      }
      else{
        this.countChecking()
      }

    },

    async countChecking() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/order/crud/check/count'
      this.$refs.CreateOrderForm.shpsList.forEach((shps, index) => {
        formData.append(`shps_list[${index}][shps]`, shps?.shps?.id)
        formData.append(`shps_list[${index}][count]`, shps?.count)
      })
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.toast_error = true
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.createOrder()
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
        openToast(this.$store,
            'سفارش با موفقیت ایحاد شد.',
            "success")
      } else {
        this.loading = false
        openToast(this.$store,
            'ایحاد سفارش با مشکل مواجه شد',
            "error")
      }
    },

  },
  computed: {
    avatar() {
      return this.$store.getters['get_avatar']
    }
  },
}
</script>
