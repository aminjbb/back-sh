<script setup>
import {defineAsyncComponent} from "vue";
const EditBrandForm = defineAsyncComponent(()=> import ('../../components/Brands/Edit/EditBrandForm.vue'))
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
    <EditBrandForm/>
    </v-main>
  </v-layout>

  
</template>
