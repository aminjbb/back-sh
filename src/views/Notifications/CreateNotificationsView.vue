<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CreateNotification from '@/components/Notifications/Add/CreateNotification.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
        <CreateNotification/>
    </v-main>
  </v-layout>

  
</template>
