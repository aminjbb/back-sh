<script setup>
import {defineAsyncComponent} from "vue";
const AddBrandForm = defineAsyncComponent(()=> import ('@/components/Brands/Add/AddBrandForm.vue'))
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'

</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <AddBrandForm/>
    </v-main>
  </v-layout>

  
</template>
