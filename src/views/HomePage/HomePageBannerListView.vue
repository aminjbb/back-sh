<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <HomePageBannerList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-4">
            <v-col cols="6">
              <ModalAddBanner :getHomePageBanner="getHomePageBanner" />
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="bannerHeader" />

                <PanelFilter
                    :path="`home-page/${$route.params.sectionId}/add/banner`"
                    :filterField="filterBannerField" />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              @resetPage="resetPage"
              class="flex-grow-1"
              :header="bannerHeader"
              :items="homePageBanner.data"
              editUrl="/seller/edit/"
              activePath="page/home/section/banner/update/activation/"
              deletePath="page/home/section/banner/delete/"
              changeStatusUrl="seller/crud/update/contract/"
              :loading="loading"
              updateUrl="seller/csv/mass-update"
              model="sku" />

          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start" />

              <v-col cols="6" class="d-flex justify-center" />

              <v-col cols="3" class="d-flex justify-end">
                <div
                    align="center"
                    id="rowSection"
                    class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>
                  <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="dataTableLength"
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]" />
                        </span>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const HomePageBannerList = defineAsyncComponent(()=> import ('@/components/HomePage/HomePageBannerList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/HomePage/Table/HomePageBannerTable.vue'
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import {openToast} from "@/assets/js/functions";
import ModalAddBanner from "@/components/HomePage/Modals/ModalAddBanner.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  setup() {
    const {
      bannerHeader,
      getHomePageBanner,
      homePageBanner,
      dataTableLength,
      page,
      filterBannerField,
      loading,
    } = new Home();
    return {
      bannerHeader,
      getHomePageBanner,
      homePageBanner,
      dataTableLength,
      page,
      filterBannerField,
      loading
    };
  },

  data() {
    return {
      perPageFilter:false
    }
  },

  components: {
    PanelFilter,
    ModalAddBanner,
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    DashboardLayout,
    Header
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.bannerHeader[index].show = value
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    }
  },

  mounted() {
    this.getHomePageBanner()
  },

  watch: {
    dataTableLength() {
      this.perPageFilter = true
      this.page = 1
      let query = this.$route.query
      if (query) {
        this.$router.replace({
          query: {
            ...query,
            per_page: this.dataTableLength,
          }
        })
      }
      else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },

    $route(){
      this.getHomePageBanner()
    },

    page(){
      if (!this.perPageFilter){
        this.getHomePageBanner()
      }
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject')) {
        if (!val) {
          this.getHomePageBanner()
          openToast(
              this.$store,
              'منو مورد نظر با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    }
  }
}
</script>


