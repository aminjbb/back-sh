<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import PrintOrderLabel from '@/components/PrintOrderLabel/PrintOrderLabel.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <PrintOrderLabel />
    </v-main>
  </v-layout>
</template>
