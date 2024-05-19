<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
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

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          :items="pageList.data"
          :page="page"
          :perPage="dataTableLength"
          activePath="page/crud/update/activation/"
          :loading="loading"
          updateUrl="page/csv/mass-update"
          model="page"/>

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
</template>

<script>
import Table from '@/components/Pages/Table/Table.vue'
import Page from "@/composables/Page";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  data() {
    return {
      perPageFilter: false
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

  components: {
    PanelFilter,
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
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
