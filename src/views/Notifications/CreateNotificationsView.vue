<script setup>
import {defineAsyncComponent} from "vue";
const CreateNotification = defineAsyncComponent(()=> import ('@/components/Notifications/Add/CreateNotification.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
        <CreateNotification/>
    </v-main>
  </v-layout>

  
</template>
