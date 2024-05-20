<script setup>
import {defineAsyncComponent} from "vue";
const DataBrands = defineAsyncComponent(()=> import ('@/components/Brands/DataBrands.vue'))
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <DataBrands/>
    </v-main>
  </v-layout>

  
</template>
