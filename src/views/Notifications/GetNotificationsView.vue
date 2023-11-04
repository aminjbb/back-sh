<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import GetNotification from '@/components/Notifications/Get/GetNotification.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
        <GetNotification/>
    </v-main>
  </v-layout>
  
</template>
