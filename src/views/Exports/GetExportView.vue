<script setup>

import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import GetExport from '@/components/Export/Get/GetExport.vue'

</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <GetExport/>
    </v-main>
  </v-layout>

  
</template>
 