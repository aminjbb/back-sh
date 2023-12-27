<script setup>import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ShpsLocation from '@/components/PackagePlacement/Locating/ShpsLocation.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh d-flex justify-center">
      <div class="scan-container">
        <ShpsLocation />
      </div>
    </v-main>
  </v-layout>
</template>
<style>
.scan-container{
  max-width: 420px;
}
</style>
