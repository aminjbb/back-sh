<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddBrandForm from '@/components/Brands/Add/AddBrandForm.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <AddBrandForm/>
    </v-main>
  </v-layout>

  
</template>
