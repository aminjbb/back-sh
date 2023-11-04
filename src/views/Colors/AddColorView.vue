<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddColorForm from '@/components/Colors/Add/AddColorForm.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
    <AddColorForm/>
    </v-main>
  </v-layout>

  
</template>
