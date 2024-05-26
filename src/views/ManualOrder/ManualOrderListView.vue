<script setup>
import Header from "@/components/Public/Header.vue";
import DashboardLayout from "@/components/Layouts/DashboardLayout.vue";
import ManualOrderList from "@/components/ManualOrder/ManualOrderList.vue";
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <ManualOrderList/>
    </v-main>
  </v-layout>
</template>