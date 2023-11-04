<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import RolePermissionList from '@/components/Admin/RolePermission/RolePermissionList.vue'
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
