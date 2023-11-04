<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddCategoryForm from '@/components/Categories/Add/AddCategoryForm.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
    <AddCategoryForm/>
    </v-main>
  </v-layout>

  
</template>
