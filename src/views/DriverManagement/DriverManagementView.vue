<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import DriverManagementList from '@/components/DriverManagement/DriverManagementList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <DriverManagementList/>
    </v-main>
  </v-layout>
  
</template>
 