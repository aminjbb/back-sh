

<template>
  <v-app>
    <RouterView />
    <Toast />
    <ConfirmModal />
  </v-app>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import Toast from '@/components/Public/Toast.vue'
import ConfirmModal from '@/components/Public/ConfirmModal.vue'
import Notifications from '@/composables/Notifications'
import Echo from "laravel-echo";
import {AxiosCall} from "@/assets/js/axios_call";
export default {
  components: {
    ConfirmModal,
    Toast
  },

  setup(props) {
    const { getNotifications } = Notifications();
    return { getNotifications };
  },
  methods:{
    setEcho(){
      if (this.$cookies.get('adminToken')){
        this.getNotifications('', this.$store)
        window.Echo = new Echo({
          broadcaster: 'pusher',
          key: import.meta.env.VITE_APP_WEBSOCKETS_KEY,
          wsHost: import.meta.env.VITE_APP_WEBSOCKETS_SERVER,
          wsPort: import.meta.env.VITE_APP_WEBSOCKETS_wsPort,
          cluster: "mt1",
          forceTLS: import.meta.env.VITE_APP_FORCE_TLS !== 'false',
          disableStats: true,
          encrypted: true,
          authEndpoint: import.meta.env.VITE_API_BASEURL +'/v1/admin/broadcasting/auth',
          auth: {
            headers: {
              Authorization: 'Bearer ' + this.$cookies.get('adminToken'),
            }
          },
          // authorizer: (channel) => {
          //     return {
          //         authorize: (socketId, callback) => {
          //             axios.post(import.meta.env.VITE_API_BASEURL +'/v1/admin/broadcasting/auth', {
          //                 socket_id: socketId,
          //                 channel_name: channel.name
          //             }, {
          //                 headers: {
          //                     Authorization: this.$cookies.get('token')
          //                 }
          //             })
          //                 .then(response => {
          //                     callback(false, response.data);
          //                 })
          //                 .catch(error => {
          //                     console.log('error')
          //                     callback(true, error);
          //                 });
          //         }
          //     };
          // }

        });
        setTimeout(()=>{
          window.Echo.private(`export.notification.${localStorage.getItem('userId')}`).listen('ExportNotification', (event) => {
            console.log('ExportNotification call' , event); // the data from the server
            this.getNotifications('', this.$store)
          })}, 300)
      }

    },
    async getProfile(){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'auth/admin/profile'
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false

        localStorage.setItem('fullName' ,data.data.first_name + ' ' + data.data.last_name)
        localStorage.setItem('userId' ,data.data.id )
      }
      else{
        this.loading=false
      }
    }
  },
  watch:{
    $route(to, from){
      if (from.name === "login") this.setEcho()
      else this.getProfile()

    }
  },
  mounted() {

    this.setEcho()
  }
}
</script>