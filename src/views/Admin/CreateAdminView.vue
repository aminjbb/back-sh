<script setup>
import {defineAsyncComponent} from 'vue'
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
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
