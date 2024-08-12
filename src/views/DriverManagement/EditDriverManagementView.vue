

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
<!--      <EditDriver/>-->
      <div class="create-product flex-column d-flex h-100vh">
        <v-card
            class="ma-5 br--12 pb-15 flex-grow-1"
            min-height="500"
        >
          <div class="text-center py-5">
            <span class="t14 w500">
                ویرایش اطلاعات راننده
            </span>
          </div>
          <v-divider></v-divider>
          <DriverManagementForm

              :driver="driver"

              ref="DriverManagementForm" />
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

                تایید
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
import DriverManagementForm from "@/components/DriverManagement/DriverManagementForm.vue";
import DriverManagement from "@/composables/DriverManagement";
import {AxiosCall} from "@/assets/js/axios_call";
// const EditDriver = defineAsyncComponent(()=> import ('@/components/DriverManagement/Edit/EditDriver.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  setup(){
    const {getDriver, driver } = new DriverManagement()
    return {getDriver, driver }
  },
  data() {
    return {
      loading: false,

    }
  },
  components: {
    DriverManagementForm,
    Header,
    DashboardLayout
  },
  methods:{
    validate(){
      this.$refs.DriverManagementForm.$refs.addDriver.validate()
      setTimeout(()=>{
        if (this.$refs.DriverManagementForm.valid) this.createMenu()
      } , 200)
    },

    async createMenu(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `driver/crud/update/${this.$route.params.driverId}`
      formData.append('full_name' , this.$refs.DriverManagementForm.form.full_name)
      formData.append('phone_number' , this.$refs.DriverManagementForm.form.phone_number)
      formData.append('identification_code' , this.$refs.DriverManagementForm.form.identification_code)

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$router.push('/driver-management/index')

      }
      else{
        this.loading=false
      }
    },
  },
  mounted() {
    this.getDriver().then(() => {
    });

  }
}
</script>
 