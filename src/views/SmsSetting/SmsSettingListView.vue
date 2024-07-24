<script setup>
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const SmsSettingList = defineAsyncComponent(()=> import ('@/components/SmsSetting/SmsSettingList.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <SmsSettingList/>
    </v-main>
  </v-layout>
</template>
