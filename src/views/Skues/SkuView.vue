<script setup>

import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import SkuList from '@/components/Products/Sku/SkuList.vue'
import GroupSkuList from '@/components/Products/Sku/GroupSkuList.vue'
import ProductSkuList from '@/components/Products/Sku/ProductSkuList.vue'
import SkuGroupList from '@/components/Products/Sku/Group/SkuGroupList.vue'
import ProductSkuGroupList from '@/components/Products/Sku/Group/ProductSkuGroupList.vue'
</script>

<template>
    <v-layout class="bg-gray">
        <DashboardLayout />

        <v-main class="h-100vh">
            <Header/>
            
            <template v-if="$route.name === 'productSkuList'">
                <product-sku-list/>
            </template>
            <template v-else-if="$route.name === 'skuList'">
                <sku-list/>
            </template>
            <template v-else-if="$route.name === 'groupSkuList'">
                <group-sku-list/>
            </template>
            <template v-else-if="$route.name === 'skuGroupList'">
                <sku-group-list />
            </template>
            <template v-else-if="$route.name === 'productSkuGroupList'">
                <product-sku-group-list />
            </template>
        </v-main>
    </v-layout>
</template>
