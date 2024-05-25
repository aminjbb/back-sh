<script setup>
import {defineAsyncComponent} from "vue";
const GetNotification = defineAsyncComponent(()=> import ('@/components/Notifications/Get/GetNotification.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
        <GetNotification/>
    </v-main>
  </v-layout>
  
</template>
