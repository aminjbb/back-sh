

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
<!--        <GetNotification/>-->
      <v-card height="100vh" class="ma-5 br-12 pa-10" v-if="notification">
        <v-card-title v-if="notification.title" class="mb-5 t20 w600">
          <span class="d-inline-block d--ltr">{{notification.title}}</span>
        </v-card-title>
        <v-divider v-if="notification.title"></v-divider>

        <v-card-text v-if="notification.content" class="mt-5 t14 w500">
          {{notification.content}}
        </v-card-text>
      </v-card>

    </v-main>
  </v-layout>
  
</template>

<script>
import {defineAsyncComponent} from "vue";
import Notifications from "@/composables/Notifications";
const GetNotification = defineAsyncComponent(()=> import ('@/components/Notifications/Get/GetNotification.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  components:{
    DashboardLayout,
    Header
  },

  setup() {
    const {notification, getNotification} = Notifications();
    return {notification, getNotification};
  },

  mounted(){
    this.getNotification();
  },
}
</script>
