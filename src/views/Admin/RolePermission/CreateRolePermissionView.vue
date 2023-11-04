<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CreateRolePermission from '@/components/Admin/RolePermission/Add/CreateRolePermission.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <CreateRolePermission />
    </v-main>
  </v-layout>
</template>
