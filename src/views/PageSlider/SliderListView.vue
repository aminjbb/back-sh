<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <SliderList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-3">
            <v-col cols="6">
              <v-btn
                  @click="$router.push(`/page/${this.$route.params.pageId}/sliders/add`)"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                <template v-slot:prepend>
                  <v-icon>mdi-plus</v-icon>
                </template>
                افزودن تکی
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="SliderHeader" />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="SliderHeader"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
          >
            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>

              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                          <v-icon size="small" class="text-grey-darken-1">
                            mdi-trash-can-outline
                          </v-icon>
                          <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                        </div>
                      </v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-title>
                        <div class="ma-5 pointer" @click="$router.push(`${item.data.id}/skus`)">
                          <v-icon class="text-grey-darken-1">mdi-cog</v-icon>
                          <span class="mr-2 text-grey-darken-1 t14 w300">افزودن کالا</span>
                        </div>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>

          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start">
                <ModalExcelDownload getEndPoint="page/slider/csv/get/export" />
              </v-col>

              <v-col cols="6" class="d-flex justify-center">
                <div class="text-center">
                  <v-pagination
                      v-model="page"
                      :length="pageLength"
                      rounded="circle"
                      size="40"
                      :total-visible="7"
                      prev-icon="mdi-chevron-right"
                      next-icon="mdi-chevron-left" />
                </div>
              </v-col>

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
// const SliderList = defineAsyncComponent(()=> import ('@/components/PageSliders/SliderList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Page from "@/composables/Page";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import { openToast, openConfirm } from "@/assets/js/functions";

export default {
  setup() {
    const {
      pageLength,
      getSliderList,
      sliderList,
      filterField,
      dataTableLength,
      page,
      SliderHeader,
      addPerPage,
      loading,
      addPerPageSlider
    } = Page();
    return {
      pageLength,
      getSliderList,
      sliderList,
      filterField,
      dataTableLength,
      page,
      SliderHeader,
      addPerPage,
      loading,
      addPerPageSlider
    }
  },

  data() {
    return {
      perPageFilter:false,
      itemListTable: [],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "page/slider/crud/delete/",
      },
    }
  },

  components: {
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable,
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
      this.SliderHeader[index].show = value
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  mounted() {
    this.getSliderList();
  },

  watch: {
    sliderList(){
      this.itemListTable = []

      this.sliderList.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                name: item.name,
                label: item.label,
                position: item.position,
                icon: item.icon,
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
      this.getSliderList()
    },

    page(){
      if (!this.perPageFilter){
        this.getSliderList()
      }
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getSliderList();
          openToast(this.$store, 'اسلایدر مورد نظر با موفقیت حذف شد', "success");
          localStorage.removeItem('deleteObject')
        }
      }
    },
  }
}
</script>


