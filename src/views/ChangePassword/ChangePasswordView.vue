
<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
<!--      <ChangePassword/>-->
      <div>
        <v-card class="ma-16 br-12  " height="400">
          <div class="ma-10 ">
            <v-btn
                @click="getPassword()"
                color="primary500"
                :loading="loading"
                height="40"
                rounded
                class=" ">
              <template v-slot:prepend>

              </template>
              ساخت رمز
            </v-btn>
          </div>
          <div class="text-center">
            <span>
                        رمز جدید شما:

            </span>
          </div>

          <div class="text-center mt-10">
            <span>
                       {{password?.data }}

            </span>
          </div>

        </v-card>
      </div>
    </v-main>
  </v-layout>

</template>

<script>
import {defineAsyncComponent} from "vue";
import {AxiosCall} from "@/assets/js/axios_call";
const ChangePassword = defineAsyncComponent(()=> import ('@/components/ChangePassword/ChangePassword.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  components:{
    Header,
    DashboardLayout
  },

  data() {
    return {
      password: null,
      loading:false
    }
  },
  methods: {
    async getPassword() {
      try {
        this.loading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.store = this.$store
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = 'system/setting/admin/crud/generate/user/code'
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.password = data
          this.loading = false

        }
        else{
          this.loading = false
        }
      }
      catch (e) {
        this.loading = false
      }

    }
  },

}
</script>

