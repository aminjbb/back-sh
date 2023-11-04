<template>
  <div class="vh-100">
    <v-card
        class="ma-5 br-12 pa-10 position__relative"
        min-height="600"
    >
      <UserForm
          ref="AdminForm"
          :user="user"
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
          ویرایش
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
</template>

<script>
import UserForm from "@/components/User/UserForm.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToGregorian, openToast} from "@/assets/js/functions";
import User from '@/composables/User'

export default {
  setup(){
    const {user , getUser } = new User()
    return {user , getUser}
  },
  data() {
    return {
      loading: false,
    }
  },
  components: {UserForm},
  methods:{
    validate(){
      this.$refs.AdminForm.$refs.addForm.validate()
      setTimeout(()=>{
        if (this.$refs.AdminForm.valid) this.editUser()
      } , 200)
    },

    async editUser(){
      this.loading=true
      const birthDate = convertDateToGregorian(this.$refs.AdminForm.form.birthDate , '-' , false)
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `user/crud/update/${this.$route.params.userId}`
      formData.append('first_name' , this.$refs.AdminForm.form.fistName)
      formData.append('last_name', this.$refs.AdminForm.form.lastName)
      formData.append('phone_number', this.$refs.AdminForm.form.phoneNumber)
      formData.append('email', this.$refs.AdminForm.form.email)
      formData.append('birth_date', birthDate)
      if (this.avatar) formData.append('avatar', this.avatar)
      formData.append('is_ban', 0)
      if (this.$refs.AdminForm.form.password) formData.append('password', this.$refs.AdminForm.form.password)
      if (this.$refs.AdminForm.form.repeatPassword)formData.append('password_confirmation', this.$refs.AdminForm.form.repeatPassword)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$router.push('/User/index')

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
  mounted() {
    this.getUser()
  },

}
</script>