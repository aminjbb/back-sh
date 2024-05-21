
<script setup>
import {defineAsyncComponent} from "vue";
const EditAttributesForm = defineAsyncComponent(()=> import ('@/components/Attributes/Edit/EditAttributesForm.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))


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
