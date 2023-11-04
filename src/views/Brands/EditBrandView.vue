<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditBrandForm from '../../components/Brands/Edit/EditBrandForm.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
    <EditBrandForm/>
    </v-main>
  </v-layout>

  
</template>
