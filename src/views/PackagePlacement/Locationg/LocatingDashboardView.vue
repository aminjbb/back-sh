<script setup>
import LocatingDashboard from '@/components/PackagePlacement/Locating/LocatingDashboard.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh d-flex justify-center">
      <div class="scan-container">
        <LocatingDashboard />
      </div>
    </v-main>
  </v-layout>
</template>
<style>
.scan-container{
  max-width: 420px;
  min-width: 420px;
}
</style>
