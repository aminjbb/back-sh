<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <HomePageSectionList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-4">
            <v-col cols="6">
            </v-col>

            <v-col cols="6">
              <v-row justify="end" class="pt-3">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="sectionsHeader" />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="sectionsHeader"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
              :activePath="'page/home/section/crud/update/activation/'">
            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>
              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false">
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`${editRoute(item.data.type , item.data.id)}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-pen
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>

          <v-divider />

        </v-card>
      </div>

    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const HomePageSectionList = defineAsyncComponent(()=> import ('@/components/HomePage/HomePageSectionList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast, convertDateToJalai } from "@/assets/js/functions";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  components: {
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable,
    DashboardLayout,
    Header
  },

  setup() {
    const {
      sectionsHeader,
      getHomeSections,
      homeSections,
      dataTableLength,
      page,
      filterField
    } = new Home();
    return {
      sectionsHeader,
      getHomeSections,
      homeSections,
      dataTableLength,
      page,
      filterField
    };
  },

  data() {
    return {
      perPageFilter:false,
      itemListTable:[]
    }
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.sectionsHeader[index].show = value
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    editRoute(type, id) {
      if (type === 'banner' && id == 1) return `/home-page/${id}/add/banner`
      else if (type === 'slider' && id == 2) return `/home-page/${id}/special-sales/index`
      else if (type === 'slider' && id == 5) return `/home-page/${id}/partition-slider/index`
      else if (type === 'banner' && id == 3) return `/home-page/${id}/category/index`
      else if (type === 'banner' && id == 13) return `/home-page/${id}/blog/index`
      else if (type === 'banner' && id == 10) return `/home-page/${id}/gift/add`
      else if (type === 'banner' && (id == 4 || id == 8 || id == 12)) return `/home-page/${id}/banner/ads`
      else if (type === 'brand' && id == 7) return `/home-page/${id}/brand/index`
      else if (type === 'category' && (id == 6 || id == 11)) return `/home-page/${id}/section-sku/index`
      else if (type === 'sku') return `/home-page/${id}/add/sku`
    }
  },

  mounted() {
    this.getHomeSections()
  },

  watch: {
    homeSections(){
      this.itemListTable = []

      this.homeSections.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                label: item.name,
                title: item.label,
                type: item.type,
                updated_at: convertDateToJalai(item.updated_at ,'-',true ),
                is_active: item.is_active,
                is_active_id: item.id,
              },
          ),
      )
    },

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
      this.getHomeSections()
    },

    page(){
      if (!this.perPageFilter){
        this.getHomeSections()
      }
    },

    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getMenus();
          openToast(
              this.$store,
              'منو مورد نظر با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
  }
}
</script>


