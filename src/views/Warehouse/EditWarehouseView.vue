<script setup>
import {defineAsyncComponent} from "vue";
const EditWarehouse = defineAsyncComponent(()=> import ('@/components/Warehouse/Edit/EditWarehouse.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditWarehouse />
    </v-main>
  </v-layout>
</template>
