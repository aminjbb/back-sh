<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <EditUser />-->
      <div class="h-100 d-flex flex-column align-stretch">
        <v-card class="ma-5 br--12 pb-15 flex-grow-1" height="600">
          <header class="modal__header d-flex justify-center align-center pt-2">
            <span class="t16 w400 pa-4">
                ویرایش اطلاعات مشتری
            </span>
          </header>

          <div class="mt-2 mb-2">
            <v-divider class="grey"/>
          </div>

          <OrderUserForm
              style="padding: 20px 10%"
              ref="OrderUserForm"
              type="edit"
              :orderDetail="orderDetail" />

          <v-row justify="end" class="position__absolute bottom left px-3">
            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 ml-5">
              انصراف
            </v-btn>

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
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const EditUser = defineAsyncComponent(()=> import ('@/components/Orders/EditUser/EditUser.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import OrderUserForm from '@/components/Orders/OrderUserForm.vue'
import { AxiosCall } from '@/assets/js/axios_call.js'

export default {
  components: {
    OrderUserForm,
    DashboardLayout,
    Header
  },

  data() {
    return {
      loading: false,
      orderDetail:null,
    }
  },

  methods: {
    /**
     * validate form
     */
    validate() {
      this.$refs.OrderUserForm.$refs.editUser.validate()
      if (this.$refs.OrderUserForm.valid) {
        this.submitForm()
      }
    },

    /**
     * Submit from
     */
    async submitForm() {
      this.loading = true
      var formdata = new FormData();

      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/order/receiver-data/' + this.$route.params.orderId
      AxiosMethod.form = formdata
      formdata.append('receiver_name', this.$refs.OrderUserForm.form.user_name)
      formdata.append('receive_state_id', this.$refs.OrderUserForm.form.province)
      formdata.append(`receive_city_id`, this.$refs.OrderUserForm.form.city)
      formdata.append('receiver_phone', this.$refs.OrderUserForm.form.phone)
      formdata.append('receiver_mobile', this.$refs.OrderUserForm.form.mobile)
      formdata.append('receiver_postal_code', this.$refs.OrderUserForm.form.postal_code)
      formdata.append('receiver_address', this.$refs.OrderUserForm.form.address)

      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/orders/index')
      } else {
        this.loading = false
      }
    },

    /**
     * Get order 'General' details by order_id
     */
    async getGeneralDetails() {
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');
      AxiosMethod.end_point = `admin/order/crud/get/${this.$route.params.orderId}`;
      AxiosMethod.store = this.$store;
      let data = await AxiosMethod.axios_get();
      if (data) {
        this.orderDetail = data.data
      }
    },
  },

  mounted() {
    this.getGeneralDetails()
  }
}
</script>
