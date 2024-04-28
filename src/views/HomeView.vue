<script>
import DashboardLayout from '../components/Layouts/DashboardLayout.vue'
import Header from '../components/Public/Header.vue'
import HomeSectionDesktop from '../components/Home/HomeSectionDesktop.vue'
import HomeSectionMobile from '../components/Home/HomeSectionMobile.vue'
import HeaderMobile from "@/components/Public/HeaderMobile.vue";
import DashboardLayoutMobile from "@/components/Layouts/DashboardLayoutMobile.vue";

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
