<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <HomePageBrandSection />-->
      <div class="h-100 d-flex flex-column align-stretch seller">

        <v-card height="70" class="mx-5 my-2 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-4">
            <v-col cols="6">
              <ModalAddBrand :getHomeBrand="getHomeBrand" />
            </v-col>

            <v-col cols="6" />
          </v-row>
        </v-card>

        <v-card class="mx-5 my-2 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              class="flex-grow-1"
              :header="brandHeader"
              :items="homeBrand.data"
              editUrl="/seller/edit/"
              activePath="seller/crud/update/activation/"
              deletePath="page/home/section/brand/delete/"
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
// const HomePageBrandSection = defineAsyncComponent(()=> import ('@/components/HomePage/HomePageBrandSection.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/HomePage/Table/HomePageBrandTable.vue'
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openToast} from "@/assets/js/functions";
import ModalAddBrand from "@/components/HomePage/Modals/ModalAddBrand.vue";

export default {
  setup() {
    const {
      brandHeader,
      getHomeBrand,
      homeBrand,
      dataTableLength,
      page,
      filterBannerField,
      loading,
    } = new Home();
    return {
      brandHeader,
      getHomeBrand,
      homeBrand,
      dataTableLength,
      page,
      filterBannerField,
      loading
    }
  },

  components: {
    ModalAddBrand,
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
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
    }
  },

  mounted() {
    this.getHomeBrand()
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getHomeBrand();
          openToast(
              this.$store,
              'آیتم مورد نظر با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
  }
}
</script>
