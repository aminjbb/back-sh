<script setup>
import {defineAsyncComponent} from "vue";
const EditBrandForm = defineAsyncComponent(()=> import ('../../components/Brands/Edit/EditBrandForm.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

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
