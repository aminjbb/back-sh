<script setup>
import { defineAsyncComponent } from 'vue'
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const LuckyWheelPrizeEdit = defineAsyncComponent(() => import('@/components/LuckyWheel/Edit/LuckyWheelPrizeEdit.vue'));
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <LuckyWheelPrizeEdit />
    </v-main>
  </v-layout>
</template>
