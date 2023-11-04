<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddAttributesForm from '@/components/Attributes/Add/AddAttributesForm.vue'
</script>

<template>
    <v-layout class="bg-gray">
        <DashboardLayout />
        <v-main>
            <Header/>
            <AddAttributesForm/>
        </v-main>
    </v-layout>
</template>
