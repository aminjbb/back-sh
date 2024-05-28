<script setup>
import {defineAsyncComponent} from "vue";
const FreeDeliveryOrderList = defineAsyncComponent(()=> import ('@/components/FreeDelivery/FreeDeliveryOrderList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <FreeDeliveryOrderList/>
    </v-main>
  </v-layout>
</template>
