<template>
    <v-layout class="bg-gray" v-if="screenType==='desktop'">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header/>
            <DetailVoucher/>
        </v-main>
    </v-layout>

    <v-layout class="bg-gray mh-100" v-if="screenType==='mobile'" >
        <DashboardLayoutMobile @closeSidebar="ToggleSideBarMenu" v-if="isMenu" />
        <v-main >
            <HeaderMobile @sideMenu="ToggleSideBarMenu"/>
            <DetailVoucherMobile/>
        </v-main>
    </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
const DetailVoucher = defineAsyncComponent(()=> import ('@/components/Voucher/DetailVoucher.vue'))
const DetailVoucherMobile = defineAsyncComponent(()=> import ('@/components/Voucher/Mobile/DetailVoucherMobile.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const DashboardLayoutMobile = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayoutMobile.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const HeaderMobile = defineAsyncComponent(()=> import ('@/components/Public/HeaderMobile.vue'))

export default {
    components:{
        DetailVoucher,
        DetailVoucherMobile,
        DashboardLayout,
        DashboardLayoutMobile,
        Header,
        HeaderMobile,
    },

    data(){
        return {
            isMenu: false,
            screenType: null,
        }
    },

    mounted() {
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

    methods: {
        ToggleSideBarMenu() {
            this.isMenu = !this.isMenu
        }
    }
}
</script>
