<script>
import {defineAsyncComponent} from "vue";
const OrderList = defineAsyncComponent(()=> import ('@/components/Orders/OrderList.vue'))
const OrderListMobile = defineAsyncComponent(()=> import ('@/components/Orders/OrderListMobile.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const DashboardLayoutMobile = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayoutMobile.vue'))
const HeaderMobile = defineAsyncComponent(()=> import ('@/components/Public/HeaderMobile.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

export default {
  components:{
    DashboardLayout,
    DashboardLayoutMobile,
    HeaderMobile,
    Header,
    OrderList,
    OrderListMobile
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

<template>
  <v-layout class="bg-gray" v-if="screenType==='desktop'">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <OrderList />
    </v-main>
  </v-layout>

  <v-layout class="bg-gray" v-if="screenType==='mobile'">
    <DashboardLayoutMobile @closeSidebar="ToggleSideBarMenu" v-if="isMenu" />
    <v-main class="h-100vh">
      <HeaderMobile @sideMenu="ToggleSideBarMenu"/>
      <OrderListMobile/>
    </v-main>

  </v-layout>

</template>
