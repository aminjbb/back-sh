<script setup>import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ScanPackagePlacement from '@/components/PackagePlacement/ScanPackagePlacement.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh d-flex justify-center">
      <div class="scan-container">
        <ScanPackagePlacement />
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
