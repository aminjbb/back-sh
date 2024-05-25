<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AssignShpsToPackageList from '@/components/AssignShpsToPackage/AssignShpsToPackageList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AssignShpsToPackageList/>
    </v-main>
  </v-layout>
</template>
