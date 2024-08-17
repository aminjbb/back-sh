<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <SellerList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="start">
                <v-btn
                    @click="$router.push('/seller/create')"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                  <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                  </template>
                  افزودن تکی
                </v-btn>

                <ModalGroupAdd getEndPoint="seller/csv/get/template" uploadEndpoint="seller/csv/bulk"/>

              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter
                    :changeHeaderShow="changeHeaderShow"
                    :header="header"/>

                <PanelFilter
                    @resetPage="resetPage"
                    path="seller/index"
                    :filterField="filterField"
                    :typeItems="sellerType"
                    :paymentType="typePayment"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading"
              activePath="seller/crud/update/activation/"
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
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(editRoute(item.data.id  , item.data.originalType))">
                        <v-icon class="text-grey-darken-1">mdi-pen-minus</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">
                                        ویرایش
                                  </span>
                      </div>
                    </v-list-item-title>

                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="changeStatus(item.data)">
                        <template v-if="item.data.contract_status === 'associate'">
                          <v-icon class="text-grey-darken-1">mdi-close-circle-outline</v-icon>
                          <span class="mr-2 text-grey-darken-1 t14300">
                                          توقف همکاری
                                      </span>
                        </template>

                        <template v-if="item.data.contract_status === 'disassociate'">
                          <v-icon class="text-grey-darken-1">mdi-check-circle-outline</v-icon>
                          <span class="mr-2 text-grey-darken-1 t14300">
                                          شروع همکاری
                                      </span>
                        </template>
                      </div>
                    </v-list-item-title>

                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/seller/${item.data.id}/add/sku/`)">
                        <v-icon class="text-grey-darken-1">mdi-view-list-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">
                                        لیست کالا‌ها
                                  </span>
                      </div>
                    </v-list-item-title>

                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/seller/consignment/index?seller_id=${item.data.id}`)">
                        <v-icon class="text-grey-darken-1">mdi-package-variant-closed</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">
                                       مدیریت محموله انبارش
                                  </span>
                      </div>
                    </v-list-item-title>

                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/seller/${item.data.id}/cross-dock/index/`)">
                        <v-icon class="text-grey-darken-1">mdi-package-variant-closed</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">
                                       مدیریت محموله فروش
                                  </span>
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
                <ModalExcelDownload getEndPoint="seller/csv/get/export"/>
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
import Table from "@/components/Seller/Table/Table.vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import Seller from "@/composables/Seller";
import {openToast} from "@/assets/js/functions";
import ShTable from "@/components/Components/Table/sh-table.vue";
// const SellerList = defineAsyncComponent(()=> import ('@/components/Seller/SellerList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

export default {
  data() {
    return {
      perPageFilter: false,
      itemListTable: []
    }
  },
  setup() {
    const sellerType = [
      {
        label: 'همه',
        value: '',
      },
      {
        label: 'حقوقی',
        value: 'legal',
      },
      {
        label: 'حقیقی',
        value: 'genuine',
      },
    ]
    const typePayment = [
      {
        label: 'همه',
        value: '',
      },
      {
        label: 'نقدی',
        value: 'cash',
      },
      {
        label: 'امانی',
        value: 'safekeeping',
      },
      {
        label: 'اعتباری',
        value: 'credit',
      }
    ]
    const {
      pageLength,
      getSellerList,
      sellerList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = Seller();
    return {
      pageLength,
      getSellerList,
      sellerList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading,
      sellerType,
      typePayment
    };
  },

  components: {
    PanelFilter,
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
      this.header[index].show = value
    },
    updateList(status) {
      if (status === 'true') {
        this.getSellerList();
      }
    },
    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    },

    getSellerType(type) {
      if (type === 'legal') {
        return 'حقوقی';
      }
      if (type === 'genuine') {
        return 'حقیقی';
      }
      return 'نامعلوم';
    },
    editRoute(id, type) {
      if (type === 'legal') {
        return '/seller/edit/legal-seller/' + id;
      }
      if (type === 'genuine') {
        return '/seller/edit/natural-seller/' + id;
      }
    },
    async changeStatus(item) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = "seller/crud/update/contract/" + item.id
      if (item.contract_status === 'associate') formdata.append('contract_status', 'disassociate')
      else if (item.contract_status === 'disassociate') formdata.append('contract_status', 'associate')

      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()

      if (data) {
        openToast(
            this.$store,
            'عملیات مورد نظر با موفقیت انحام شد.',
            "success"
        );

        this.updateList('true');
      } else {
        openToast(
            this.$store,
            'عملیات مورد نظر با مشکل مواجه شد.',
            "error"
        );
      }
    },
  },

  mounted() {
    this.getSellerList();
    this.$store.commit('set_naturalSellerStep1', null)
    this.$store.commit('set_naturalSellerStep2', null)
    this.$store.commit('set_naturalSellerStep3', null)

    this.$store.commit('set_legalSellerStep1', null)
    this.$store.commit('set_legalSellerStep2', null)
    this.$store.commit('set_legalSellerStep3', null)
    this.$store.commit('set_legalSellerStep4', null)
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
        this.getSellerList()
      }
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getSellerList();
          openToast(
              this.$store,
              'انبار با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
    $route() {
      this.getSellerList()
    },

    sellerList() {
      if(this.sellerList.data) {

        this.itemListTable = []
        this.sellerList.data.forEach((item) => {
          this.itemListTable.push(
              {
                contract_status: item.contract_status,
                originalType: item.type,
                id: item.id,
                kosar_id: item.kosar_id ? item.kosar_id : 'نامعلوم',
                shopping_name: item.shopping_name ? item.shopping_name : '---',
                type: this.getSellerType(item.type),
                email: item.email,
                payment_period: item.payment_period,
                created_at_fa: item.created_at_fa,
                is_active: item.is_active,
                is_active_id: item.id,
              }
          )
        })
      }
    },
  }
}
</script>
