<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import SystemVariableLsit from '@/components/System/SystemVariableLsit.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="vh-100">
      <Header />
      <SystemVariableLsit />
    </v-main>
  </v-layout>
</template>
