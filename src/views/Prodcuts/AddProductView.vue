<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddProduct from '@/components/Products/Create/AddProduct.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
    <AddProduct/>
    </v-main>
  </v-layout>

  
</template>
