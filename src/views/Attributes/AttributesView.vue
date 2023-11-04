<script setup>
import DashboardLayout from '../../components/Layouts/DashboardLayout.vue'
import Header from '../../components/Public/Header.vue'
import DataAttributes from '../../components/Attributes/DataAttributes.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <DataAttributes/>
    </v-main>
  </v-layout>

  
</template>
