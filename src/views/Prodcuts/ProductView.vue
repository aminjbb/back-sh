<script setup>

import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import DataProduct from '@/components/Products/DataProduct.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <DataProduct/>
    </v-main>
  </v-layout>

  
</template>
