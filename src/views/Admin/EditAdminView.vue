<script setup>
import {defineAsyncComponent} from "vue";
const EditAdmin = defineAsyncComponent(()=> import ('@/components/Admin/Edit/EditAdmin.vue'))
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'

</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditAdmin />
    </v-main>
  </v-layout>
</template>
