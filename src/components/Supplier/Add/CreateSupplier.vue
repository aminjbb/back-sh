<template>
  <div class="create-product flex-column d-flex vh-100">
    <v-card
        class="ma-5 br-12 pb-15 flex-grow-1"
        min-height="600"
    >

      <SupplierForm
          ref="SupplierForm"
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

            تایید تامین‌کننده
          </v-btn>


        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import SupplierForm from "@/components/Supplier/SupplierForm.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToGregorian, openToast} from "@/assets/js/functions";

export default {
  data() {
    return {
      loading: false,
    }
  },
  components: {SupplierForm},
  methods:{
    validate(){
      this.$refs.SupplierForm.$refs.addForm.validate()
      setTimeout(()=>{
        if (this.$refs.SupplierForm.valid) this.createSupplier()
      } , 200)
    },

    async createSupplier(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'supplier/crud/create'
      formData.append('full_name' , this.$refs.SupplierForm.form.fullName)
      formData.append('shopping_name', this.$refs.SupplierForm.form.shopName)
      formData.append('type', this.$refs.SupplierForm.form.type)
      formData.append('email', this.$refs.SupplierForm.form.email)
      formData.append('state_id', this.$refs.SupplierForm.form.province)
      formData.append('city_id', this.$refs.SupplierForm.form.city)
      formData.append('phone_number', this.$refs.SupplierForm.form.mobileNumber)
      formData.append('phone', this.$refs.SupplierForm.form.phoneNumber)
      formData.append('account_number', this.$refs.SupplierForm.form.accountNumber)
      formData.append('sheba_number', this.$refs.SupplierForm.form.shebaNumber)
      formData.append('payment_type', this.$refs.SupplierForm.form.paymentType)
      formData.append('payment_period', this.$refs.SupplierForm.form.paymentPeriod)
      formData.append('contract_status', 'associate')
      formData.append('is_active', 1)

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$router.push('/supplier/index')

      }
      else{
        this.loading=false
      }
    }
  },
  computed:{
    avatar(){
      return this.$store.getters['get_avatar']
    }
  },
}
</script>