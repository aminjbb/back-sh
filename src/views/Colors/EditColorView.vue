<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditColorForm from '@/components/Colors/Edit/EditColorForm.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
        <EditColorForm/>
    </v-main>
  </v-layout>

  
</template>
