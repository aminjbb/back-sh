<script setup>
import {defineAsyncComponent} from "vue";
const DataAttributes = defineAsyncComponent(()=> import ('../../components/Attributes/DataAttributes.vue'))
import DashboardLayout from '../../components/Layouts/DashboardLayout.vue'
import Header from '../../components/Public/Header.vue'
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
