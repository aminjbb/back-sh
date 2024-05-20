<script setup>
import {defineAsyncComponent} from "vue";
const PermissionList = defineAsyncComponent(()=> import ('@/components/Admin/Permission/PermissionList.vue'))
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'

</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <PermissionList />
    </v-main>
  </v-layout>
</template>
