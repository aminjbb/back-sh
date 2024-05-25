<script setup>
import {defineAsyncComponent} from "vue";
const AddSpecialExitCapacity = defineAsyncComponent(()=> import ('@/components/Warehouse/SpecialExitCapacity/AddSpecialExitCapacity.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddSpecialExitCapacity />
    </v-main>
  </v-layout>
</template>
