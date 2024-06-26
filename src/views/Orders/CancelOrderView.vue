<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <CancelOrder/>
    </v-main>
  </v-layout>
</template>

<script setup>
import {defineAsyncComponent} from "vue";
const CancelOrder = defineAsyncComponent(()=> import ('@/components/Orders/CancelOrder/CancelOrder.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>