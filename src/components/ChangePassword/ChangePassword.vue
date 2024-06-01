<template>
  <div >
    <v-card  class="ma-16 br-12 stretch-card-header-200  ">
            <div class="ma-10 ">
              <v-btn
                  @click="getPassword()"
                  color="primary500"
                  height="40"
                  rounded
                  class=" ">
                <template v-slot:prepend>

                </template>
              ساخت رمز
              </v-btn>
            </div>
    </v-card>
 <div class="d-flex justify-center ">
   <v-cart class="ma-16 br-12 stretch-card-header-200  " >
     <div class="ma-10">
       <span class="t18400 primary">  رمز جدید شما:</span>
       <p class="t22800 ma-16">{{password.data}}</p>
     </div>
   </v-cart>
 </div>
  </div>
</template>

<script>
import { AxiosCall } from '@/assets/js/axios_call.js'



export default {
  data() {
    return {
      password: null
    }
  },


  methods: {
    async getPassword() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'system/setting/admin/crud/generate/user/code'
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.password = data
        console.log("aydin", this.password)

      }

    }
  },

  mounted() {
  },

  watch: {

  }
}
</script>
