<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditLegalSeller from '@/components/Seller/Edit/LegalSeller/EditLegalSeller.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditLegalSeller />
    </v-main>
  </v-layout>
</template>
