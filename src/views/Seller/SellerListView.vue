<script setup>
import {defineAsyncComponent} from "vue";
const SellerList = defineAsyncComponent(()=> import ('@/components/Seller/SellerList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <SellerList />
    </v-main>
  </v-layout>
</template>
