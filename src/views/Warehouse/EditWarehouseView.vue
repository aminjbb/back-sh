
<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <EditWarehouse />-->
      <div class="create-product flex-column d-flex h-100vh">
        <v-card class="ma-5 br--12 pb-15 flex-grow-1" height="600">
          <WarehouseForm
              ref="WarehouseForm"
              :warehouse="warehouse"
              :workDays="workDays" />

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
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";
// const EditWarehouse = defineAsyncComponent(()=> import ('@/components/Warehouse/Edit/EditWarehouse.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  data() {
    return {
      loading: false,
      warehouse: null,
      workDays: []
    }
  },
  components: {
    WarehouseForm,
    Header,
    DashboardLayout,
  },
  methods: {
    async getWarehouse() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `warehouse/crud/get/${this.$route.params.warehouseId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.warehouse = data.data
      }
    },
    async getWarehouseWorkDay() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `warehouse/workdays/crud/index/${this.$route.params.warehouseId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.workDays = data.data.data
      }
    },
    validate() {
      this.$refs.WarehouseForm.$refs.addWarehouse.validate()
      setTimeout(() => {
        if (this.$refs.WarehouseForm.valid) this.editWarehouse()
      }, 200)
    },
    async editWarehouse() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `warehouse/crud/update/${this.$route.params.warehouseId}`
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
      formData.append('is_active', this.warehouse.is_active)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.createWorkDayWarehouse(data.data.id);
        openToast(this.$store,
            'ویرایش با موفقیت انجام شد.',
            "success")
      } else {
        this.loading = false
        openToast(this.$store,
            'ویرایش انبار با مشکل مواجه شد',
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
  mounted() {
    this.getWarehouse()
    this.getWarehouseWorkDay()
  }
}
</script>

