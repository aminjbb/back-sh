<script setup>
import {defineAsyncComponent} from "vue";
const RolePermissionList = defineAsyncComponent(()=> import ('@/components/Admin/RolePermission/RolePermissionList.vue'))
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <RolePermissionList />
    </v-main>
  </v-layout>
</template>
