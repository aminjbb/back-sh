
<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <CreateWarehouse />-->
      <div class="create-product flex-column d-flex vh-100">
        <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="600">
          <WarehouseForm ref="WarehouseForm" />

          <footer class="create-warehouse__actions">
            <v-row justify="end" class="pl-10 pt-5">
              <v-btn
                  :loading="loading"
                  @click="validate()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                تایید انبار
              </v-btn>
            </v-row>
          </footer>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
import WarehouseForm from "@/components/Warehouse/WarehouseForm.vue";
import {openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
// const CreateWarehouse = defineAsyncComponent(()=> import ('@/components/Warehouse/Add/CreateWarehouse.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  data() {
    return {
      loading: false,
    }
  },
  components: {
    WarehouseForm,
    Header,
    DashboardLayout,
  },
  methods: {
    validate() {

      const activeDay = this.$refs.WarehouseForm.days.filter(el => el.active)
      const timeCondination = activeDay.find(el => el.endTime < el.startTime)
      if (timeCondination){
        openToast(this.$store , 'ساعت پایان نباید قبل ساعت شروع باشد' , 'error')
      }
      else{
        this.$refs.WarehouseForm.$refs.addWarehouse.validate()
        setTimeout(() => {
          if (this.$refs.WarehouseForm.valid)this.createWarehouse()
        }, 200)
      }

    },

    async createWarehouse() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'warehouse/crud/create'
      formData.append('name', this.$refs.WarehouseForm.form.name)
      this.$refs.WarehouseForm.form.type.forEach((type, index) => {
        formData.append(`types[${index}]`, type)
      })
      formData.append('market_storage_count', this.$refs.WarehouseForm.form.marketCapacity)
      formData.append('retail_storage_count', this.$refs.WarehouseForm.form.RetailCapacity)
      formData.append('address', this.$refs.WarehouseForm.form.address)
      formData.append('postal_code', this.$refs.WarehouseForm.form.postalCode)
      formData.append('phone_number', this.$refs.WarehouseForm.form.phoneNumber)
      formData.append('lat', this.$refs.WarehouseForm.form.latLong.latitude)
      formData.append('long', this.$refs.WarehouseForm.form.latLong.longitude)
      formData.append('is_active', 0)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {

        this.createWorkDayWarehouse(data.data.id)
        openToast(this.$store,
            'انبار با موفقیت ایجاد شد.',
            "success")
      } else {
        this.loading = false
        openToast(this.$store,
            'ایجاد انبار با مشکل مواجه شد',
            "error")
      }
    },

    async createWorkDayWarehouse(id) {

      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `warehouse/workdays/crud/update/${id}`
      const activeDay = this.$refs.WarehouseForm.days.filter(el => el.active)
      activeDay.forEach((day, index) => {
        formData.append(`workdays[${index}][day]`, day.value)
        formData.append(`workdays[${index}][start_time]`, day.startTime+':00')
        formData.append(`workdays[${index}][end_time]`, day.endTime+':00')
      })

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/warehouse/index')
      } else {
        this.loading = false
      }
    }
  },
  computed: {
    avatar() {
      return this.$store.getters['get_avatar']
    }
  },
}
</script>

