<script setup>
import {defineAsyncComponent} from "vue";
const PricingList = defineAsyncComponent(()=> import ('@/components/Factor/PricingList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <PricingList />
    </v-main>
  </v-layout>
</template>
