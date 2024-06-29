<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="vh-100">
        <v-card
            class="ma-5 br-12 pa-10 position__relative"
            min-height="600"
        >
          <AdminForm
              ref="AdminForm"
          />

          <v-row
              justify="end"
              class="position__absolute bottom left"
          >
            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1"
            >
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              افزودن
            </v-btn>

            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 mr-5"
            >
              <template v-slot:prepend>
                <v-icon>mdi-cancel</v-icon>
              </template>
              انصراف
            </v-btn>
          </v-row>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script >
import {defineAsyncComponent} from 'vue'
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

const AdminForm = defineAsyncComponent(()=> import ('@/components/Admin/AdminForm.vue'))
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToGregorian} from "@/assets/js/functions";

export default {
  data() {
    return {
      loading: false,
    }
  },

  components: {AdminForm, DashboardLayout },

  methods:{
    convertPersianToEnglishNumber(input) {
      const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

      let result = '';
      for (let i = 0; i < input.length; i++) {
        const index = persianNumbers.indexOf(input[i]);
        if (index !== -1) {
          result += englishNumbers[index];
        } else {
          result += input[i];
        }
      }

      return result;
    },

    validate(){
      this.$refs.AdminForm.$refs.addForm.validate()
      setTimeout(()=>{
        if (this.$refs.AdminForm.valid) this.createAdmin()
      } , 200)
    },

    async createAdmin(){
      this.loading=true
      const birthDate = convertDateToGregorian(this.$refs.AdminForm.form.birthDate , '-' , false)
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/crud/create'
      formData.append('first_name' , this.$refs.AdminForm.form.fistName)
      formData.append('last_name', this.$refs.AdminForm.form.lastName)
      formData.append('phone_number', this.convertPersianToEnglishNumber(this.$refs.AdminForm.form.phoneNumber))
      formData.append('email', this.$refs.AdminForm.form.email)
      formData.append('birth_date', birthDate)
      formData.append('password', this.$refs.AdminForm.form.password)
      if (this.avatar) formData.append('avatar', this.avatar)
      formData.append('role_id', this.$refs.AdminForm.form.rolePermission)
      formData.append('is_ban', 0)
      formData.append('password_confirmation', this.$refs.AdminForm.form.repeatPassword)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.toast_error = true
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$router.push('/admin/index')

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