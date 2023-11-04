<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditCategoryForm from '@/components/Categories/Edit/EditCategoryForm.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
    <EditCategoryForm/>
    </v-main>
  </v-layout>

  
</template>
