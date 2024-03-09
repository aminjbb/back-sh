<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import BulkEditIndex from '@/components/BulkEdit/BulkEditIndex.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <BulkEditIndex/>
    </v-main>
  </v-layout>
</template>

