<script setup>
import DashboardLayout from "@/components/Layouts/DashboardLayout.vue";
import Header from "@/components/Public/Header.vue";
import EditOrder from "@/components/ManualOrder/EditOrder/EditOrder.vue";
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditOrder/>
    </v-main>
  </v-layout>
</template>
