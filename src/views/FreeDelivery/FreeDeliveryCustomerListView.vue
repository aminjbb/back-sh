<script setup>
import {defineAsyncComponent} from "vue";
const FreeDeliveryCustomerList = defineAsyncComponent(()=> import ('@/components/FreeDelivery/FreeDeliveryCustomerList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <FreeDeliveryCustomerList/>
    </v-main>
  </v-layout>
</template>
