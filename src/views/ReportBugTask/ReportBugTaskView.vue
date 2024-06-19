<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <ReportBugTask/>
    </v-main>
  </v-layout>
</template>

<script setup>
import {defineAsyncComponent} from "vue";
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const ReportBugTask = defineAsyncComponent(()=> import ('@/components/ReportBugTask/ReportBugTask.vue'))
</script >
