<script setup>
import {defineAsyncComponent} from "vue";
const SkuList = defineAsyncComponent(()=> import ('@/components/Products/Sku/SkuList.vue'))
const GroupSkuList = defineAsyncComponent(()=> import ('@/components/Products/Sku/GroupSkuList.vue'))
const ProductSkuList = defineAsyncComponent(()=> import ('@/components/Products/Sku/ProductSkuList.vue'))
const SkuGroupList = defineAsyncComponent(()=> import ('@/components/Products/Sku/Group/SkuGroupList.vue'))
const ProductSkuGroupList = defineAsyncComponent(()=> import ('@/components/Products/Sku/Group/ProductSkuGroupList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

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
