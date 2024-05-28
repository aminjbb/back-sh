<script setup>
import {defineAsyncComponent} from "vue";
const AddDriver = defineAsyncComponent(()=> import ('@/components/DriverManagement/Add/AddDriver.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddDriver />
    </v-main>
  </v-layout>
</template>