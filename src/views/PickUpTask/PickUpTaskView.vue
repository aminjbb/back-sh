<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import PickUpTaskList from '@/components/PickUpTask/PickUpTaskList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header />
      <PickUpTaskList/>
    </v-main>
  </v-layout>
</template>
