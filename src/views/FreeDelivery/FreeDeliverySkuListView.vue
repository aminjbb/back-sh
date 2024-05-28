<script setup>
import {defineAsyncComponent} from "vue";
const FreeDeliverySkuList = defineAsyncComponent(()=> import ('@/components/FreeDelivery/FreeDeliverySkuList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <FreeDeliverySkuList/>
    </v-main>
  </v-layout>
</template>
