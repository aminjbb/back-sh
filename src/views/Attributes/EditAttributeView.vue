
<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditAttributesForm from '@/components/Attributes/Edit/EditAttributesForm.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
    <EditAttributesForm/>
    </v-main>
  </v-layout>

  
</template>
