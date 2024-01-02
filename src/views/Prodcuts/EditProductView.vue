<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditProduct from '@/components/Products/Edit/EditProduct.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
        <EditProduct/>
    </v-main>
  </v-layout>

  
</template>
