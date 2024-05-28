<script setup>
import {defineAsyncComponent} from "vue";
const CreateRolePermission = defineAsyncComponent(()=> import ('@/components/Admin/RolePermission/Add/CreateRolePermission.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

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
