<script>
import {defineAsyncComponent} from "vue";
const HomeSectionMobile = defineAsyncComponent(()=> import ('../components/Home/HomeSectionMobile.vue'))
const HomeSectionDesktop = defineAsyncComponent(()=> import ('../components/Home/HomeSectionDesktop.vue'))
const HeaderMobile = defineAsyncComponent(()=> import ('@/components/Public/HeaderMobile.vue'))
const DashboardLayoutMobile = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayoutMobile.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

export default {
  components:{
    DashboardLayout,
    Header,
    HomeSectionDesktop,
    DashboardLayoutMobile,
    HeaderMobile,
    HomeSectionMobile
  },

  data(){
    return {
      isMenu: false,
      screenType: null,
    }
  },

  mounted() {
    /**
     * Check screen size
     */
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
      <Header/>
       <HomeSectionDesktop/>
    </v-main>
  </v-layout>

  <v-layout class="bg-gray" v-if="screenType==='mobile'">
    <DashboardLayoutMobile @closeSidebar="ToggleSideBarMenu" v-if="isMenu" />
    <v-main class="h-100vh">
      <HeaderMobile @sideMenu="ToggleSideBarMenu"/>
      <HomeSectionMobile/>
    </v-main>

  </v-layout>
</template>
