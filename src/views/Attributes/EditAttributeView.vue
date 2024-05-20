
<script setup>
import {defineAsyncComponent} from "vue";
const EditAttributesForm = defineAsyncComponent(()=> import ('@/components/Attributes/Edit/EditAttributesForm.vue'))
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'

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
