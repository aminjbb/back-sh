<script setup>
import {defineAsyncComponent} from "vue";
const EditHomePageSpecialSale = defineAsyncComponent(()=> import ('@/components/HomePage/Add/EditHomePageSpecialSale.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditHomePageSpecialSale />
    </v-main>
  </v-layout>
</template>
