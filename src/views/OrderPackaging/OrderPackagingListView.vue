<script setup>
import {defineAsyncComponent} from "vue";
const OrderPackagingList = defineAsyncComponent(()=> import ('@/components/OrderPackaging/OrderPackagingList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <OrderPackagingList/>
    </v-main>
  </v-layout>
</template>

