<script setup>
import {defineAsyncComponent} from 'vue'
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
const AddAdmin = defineAsyncComponent(()=> import ('@/components/Admin/Add/AddAdmin.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddAdmin />
    </v-main>
  </v-layout>
</template>
