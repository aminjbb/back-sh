<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <FactorList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-3">
            <v-col cols="6">
              <v-btn
                  @click="$router.push('/factor/create')"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                <template v-slot:prepend>
                  <v-icon>mdi-plus</v-icon>
                </template>
                افزودن
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header"/>

                <PanelFilter @resetPage="resetPage" path="factor/index" :filterField="filterField" :statusItems="status"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              class="flex-grow-1"
              :header="header"
              :items="factorList.data"
              :page="page"
              :perPage="dataTableLength"
              @updateList="updateList"
              :loading="loading"
              deletePath="factor/crud/delete/"
              model="factor"/>

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start"/>

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
// const FactorList = defineAsyncComponent(()=> import ('@/components/Factor/FactorList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/Factor/Table/Table.vue'
import Factor from "@/composables/Factor";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import { openToast } from "@/assets/js/functions";
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
        value: ''
      },
      {
        label: 'پیش نویس',
        value: 'draft'
      },
      {
        label: 'آماده سازی محموله',
        value: 'cargo_preparing'
      },
      {
        label: 'در انتظار قیمت گذاری',
        value: 'pricing'
      },
      {
        label: 'تمام شده',
        value: 'done'
      }
    ]

    const {
      pageLength,
      getFactorList,
      factorList,
      filterField,
      dataTableLength,
      page,
      header,
      loading
    } = Factor();
    return {
      pageLength,
      getFactorList,
      factorList,
      filterField,
      dataTableLength,
      page,
      header,
      loading,
      status
    }
  },

  components: {
    PanelFilter,
    Table,
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
      this.header[index].show = value
    },

    updateList(status) {
      if (status === 'true') {
        this.getFactorList();
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
    this.getFactorList();
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
        this.getFactorList()
      }
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getFactorList()
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    $route() {
      this.getFactorList()
    }
  }
}

</script>
