<script setup>import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ShpsLocation from '@/components/PackagePlacement/Locating/ShpsLocation.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh">
      <div class="vh-100 d-flex justify-center">
        <ShpsLocation />
      </div>
    </v-main>
  </v-layout>
</template>
<style>

</style>
