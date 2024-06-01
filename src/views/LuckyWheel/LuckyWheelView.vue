<script setup>
import { defineAsyncComponent } from 'vue'
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const LuckyWheelList = defineAsyncComponent(() => import('@/components/LuckyWheel/LuckyWheelList.vue'));
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <LuckyWheelList />
    </v-main>
  </v-layout>
</template>
