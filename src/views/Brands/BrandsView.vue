<script setup>

import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import DataBrands from '@/components/Brands/DataBrands.vue'
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
