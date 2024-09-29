<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <PageList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6"/>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header"/>

                <PanelFilter
                    @resetPage="resetPage"
                    path="page/index"
                    :filterField="filterField"
                    :statusItems="status"
                    :typeItems="pageTypeFilter"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading"
              :activePath="'page/crud/update/activation/'">

            <template v-slot:switchSlot="item">
              <v-switch
                  :true-value="1"
                  :false-value="0"
                  v-model="item.data.switch"
                  inset
                  color="success"
                  @change="changeIsIndex(item.data.id,item.data.switch)"/>
            </template>

            <template v-slot:customSlot="item">
              <v-switch
                  :true-value="1"
                  :false-value="0"
                  v-model="item.data.custom"
                  inset
                  color="success"
                  @change="changeIsFollow(item.data.id,item.data.custom)"/>
            </template>

            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>
              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/page/${item.data.id}/update/template`)">
                        <v-icon class="text-grey-darken-1">mdi-page-layout-header-footer</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">قالب صفحه</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/page/${item.data.id}/update/seo`)">
                        <v-icon class="text-grey-darken-1">mdi-cog</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">تنظیمات سئو</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/page/${item.data.id}/update/image`)">
                        <v-icon class="text-grey-darken-1">mdi-image-area</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">تصاویر</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/page/${item.data.id}/update/content`)">
                        <v-icon class="text-grey-darken-1">mdi-text-box-multiple-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">محتوا</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/page/${item.data.id}/sliders/index`)">
                        <v-icon class="text-grey-darken-1">mdi-package-variant-closed</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">مدیریت محصولات</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start">
                <ModalExcelDownload getEndPoint="page/csv/get/export"/>
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
                      next-icon="mdi-chevron-left"/>
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
                                :items="[25,50,100]"/>
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
// const PageList = defineAsyncComponent(()=> import ('@/components/Pages/PageList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Page from "@/composables/Page";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import { AxiosCall } from "../../assets/js/axios_call";

export default {
  components: {
    PanelFilter,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable,
    DashboardLayout,
    Header
  },

  data() {
    return {
      perPageFilter: false,
      itemListTable: []
    }
  },

  setup() {
    const status = [
      {
        label: 'همه',
        value: '',
      },
      {
        label: 'فعال',
        value: '1',
      },
      {
        label: 'غیرفعال',
        value: '0',
      }
    ]
    const pageTypeFilter = [
      {
        label: 'همه',
        value: '',
      },
      {
        label: 'دسته بندی',
        value: 'category',
      },
      {
        label: 'برند',
        value: 'brand',
      },
      {
        label: 'کالاها',
        value: 'sku',
      },
      {
        label: 'محصول',
        value: 'product',
      },
      {
        label: 'گروه کالا',
        value: 'skugroup',
      },
      {
        label: 'صفحات استاتیک',
        value: 'static_page',
      },
    ]
    const {
      pageLength,
      getPageList,
      pageList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = Page();
    return {
      pageLength,
      getPageList,
      pageList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading,
      pageTypeFilter,
      status
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    async changeIsIndex(id, index) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = "page/crud/update/index/"+id
      formdata.append('is_index', index)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (!data) {
        index.switch = false
      }
    },

    async changeIsFollow(id, follow) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = "page/crud/update/follow/"+id
      formdata.append('is_follow', follow)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (!data) {
        follow.custom = false
      }
    },

    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    updateList(status) {
      if (status === 'true') {
        this.getPageList();
      }
    },

    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    }
  },

  mounted() {
    this.getPageList();
  },

  watch: {
    pageList() {
      this.itemListTable = []

      this.pageList.data.forEach((item) =>
          this.itemListTable.push(
              {
                label: item.label? item.label : '---',
                type: item.type,
                id: item.id,
                created_at: item.created_at_fa,
                updated_at: item.updated_at_fa,
                is_active: item.is_active,
                is_active_id: item.id,
                switch: item.is_index,
                switch_id: item.id,
                custom: item.is_follow,
                custom_id: item.id,
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
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },
    page() {
      if (!this.perPageFilter) {
        this.getPageList()
      }
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject')) {
        if (!val) {
          this.getPageList()
          openToast(
              this.$store,
              'عکس مورد نظر با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    $route() {
      this.getPageList()
    }
  }
}
</script>

