<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AssignShpsToPackageAcceptList from '@/components/AssignShpsToPackageAccept/AssignShpsToPackageAcceptList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AssignShpsToPackageAcceptList/>
    </v-main>
  </v-layout>
</template>
