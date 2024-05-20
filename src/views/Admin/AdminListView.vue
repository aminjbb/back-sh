<script setup>
import {defineAsyncComponent} from "vue";
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
const AdminList = defineAsyncComponent(()=> import ('@/components/Admin/AdminList.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AdminList />
    </v-main>
  </v-layout>
</template>
