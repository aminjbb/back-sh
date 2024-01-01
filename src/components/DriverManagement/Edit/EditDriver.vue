<template>
    <div class="create-product flex-column d-flex vh-100">
      <v-card
          class="ma-5 br-12 pb-15 flex-grow-1"
          min-height="500"
      >
        <div class="text-center py-5">
            <span class="t14500">
                ویرایش اطلاعات راننده
            </span>
        </div>
        <v-divider></v-divider>
        <DriverManagementForm ref="DriverManagementForm" />
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
  </template>
  
  <script>
  import DriverManagementForm from "@/components/DriverManagement/DriverManagementForm.vue";
  import {AxiosCall} from "@/assets/js/axios_call";
  import DriverManagement from "@/composables/DriverManagement"
  
  export default {
    setup(){
      const {getDriver  } = new DriverManagement()
      return {getDriver  }
    },
    data() {
      return {
        loading: false,
      }
    },
    components: {DriverManagementForm},
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
      }
    },
    mounted() {
      this.getDriver()
    }
  }
  </script>