<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <AddSkuToSeller />-->
      <div class="h-100 d-flex flex-column align-stretch sku-seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="start">
                <v-autocomplete
                    placeholder="نام کالا یا شماره SKU را جستجو نمایید"
                    variant="outlined"
                    prepend-inner-icon-cb="mdi-map-marker"
                    rounded="lg"
                    :items="skuList"
                    item-title="name"
                    item-value="id"
                    v-debounce="searchSku">

                  <template v-slot:item="item">
                    <v-list-item>
                      <v-row justify="center">

                        <v-col cols="4">

                          <div @click="assignSkuToSeller(item.props.value)" class="seller__add-sku-btn d-flex justify-center align-center">
                            <v-icon>mdi-plus</v-icon>
                          </div>

                        </v-col>
                        <v-col cols="8">
                          <text-clamp
                              :text='item?.props?.title'
                              :max-lines='1'
                              autoResize
                              location="start"
                              class="text-gray500 t14 w300 text-right"/>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </template>
                </v-autocomplete>

                <ModalGroupAdd getEndPoint="seller/sku/csv/get/template" uploadEndpoint="seller/sku/csv/bulk"/>

              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter
                    :changeHeaderShow="changeHeaderShow"
                    :header="headerSku"/>
                <PanelFilter
                    :path="`seller/${$route.params.sellerId}/add/sku`"
                    :filterField="filterFieldSku"
                    show-category
                    model="sellerSku"
                    :statusItems="status"
                    :page="skuPage"
                    :perPage="addSkuSellerPerPage"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <!--        <Table
                      class="flex-grow-1"
                      :header="headerSku"
                      :page="skuSellerPage"
                      :perPage="dataSkuTableLength"
                      :items="sellerSku.data"
                  editUrl="/seller/edit/"
                  :activePath="`seller/${$route.params.sellerId}/sku/update/activation/`"
                      :deletePath="`seller/${$route.params.sellerId}/sku/delete/`"
                  changeStatusUrl="seller/crud/update/contract/"
                      :loading="loading"
                  @updateList="updateList"
                  updateUrl="seller/csv/mass-update"
                      model="sku" />-->

          <ShTable
              class="flex-grow-1"
              :headers="headerSku"
              :items="itemListTable"
              :page="skuSellerPage"
              :perPage="dataTableLength"
              :loading="loading"
              :activePath="`seller/${$route.params.sellerId}/sku/update/activation/`">
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
                      <div class="ma-5 pointer">
                        <v-icon color="grey-darken-1" icon="mdi-file-document-multiple-outline" size="xsmall"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">تاریخچه‌ی موجودی انبار</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/seller/sku/${$route.params.sellerId}/history/site-inventory/${item.data.sku_id}`)">
                        <v-icon color="grey-darken-1" icon="mdi-format-list-bulleted" size="xsmall"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">تاریخچه‌ی موجودی سایت</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="openInventoryManagementModal(item.data.sku_id)">
                        <v-icon color="grey-darken-1" icon="mdi-package-variant-closed" size="xsmall"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">مدیریت موجودی سایت</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="openConsumerPriceModal(item.data.sku_id)">
                        <v-icon color="grey-darken-1" icon="mdi-currency-usd" size="xsmall"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">قیمت مصرف کننده</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="openBasicDiscountModal(item.data.sku_id)">
                        <v-icon color="grey-darken-1" icon="mdi-percent-box-outline" size="xsmall"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">تخفیف پایه</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="openMarketingDiscountModal(item.data.sku_id)">
                        <v-icon color="grey-darken-1" icon="mdi-percent-box-outline" size="xsmall"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">تخفیف مارکتینگ</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="openOrderLimitModal(item.data.sku_id)">
                        <v-icon color="grey-darken-1" icon="mdi-close-octagon-outline" size="xsmall"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">محدودیت سفارش</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/seller/sku/${$route.params.sellerId}/history/price/${item.data.sku_id}`)">
                        <v-icon color="grey-darken-1" icon="mdi-file-document-multiple-outline" size="xsmall"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">تاریخچه ی قیمت</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="openTransferStockModal(item.data.sku_id)">
                        <v-icon color="grey-darken-1" icon="mdi-folder-arrow-up-down-outline" size="xsmall"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">انتقال موجودی</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.sku_id)">
                        <v-icon size="xsmall" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
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
                <ModalExcelDownload :getEndPoint="`seller/${$route.params.sellerId}/sku/csv/get/export`"/>
              </v-col>

              <v-col cols="6" class="d-flex justify-center">
                <div class="text-center">
                  <v-pagination
                      v-model="skuSellerPage"
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
                                :items="[25,50,100]"/>
                        </span>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <!-- menu modals-->
        <TransferModal ref="transferModal" :item="shpsItem"/>
        <TransferStockModal @closeFirsModal="transferStock" @updateList="updateList"/>
        <OrderLimitModal @updateList="updateList" />
        <InventoryManagementModal @updateList="updateList" />
        <ConsumerPriceModal @updateList="updateList" />
        <BasicDiscountModal @updateList="updateList" />
        <MarketingDiscountModal @updateList="updateList" />
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const AddSkuToSeller = defineAsyncComponent(()=> import ('@/components/Seller/Sku/AddSkuToSeller.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/Seller/Table/SkuTable.vue'
import Seller from "@/composables/Seller";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openConfirm, splitChar} from "@/assets/js/functions";
import {openToast,} from "@/assets/js/functions";
import {AxiosCall,} from "@/assets/js/axios_call";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import {openModal} from "@/assets/js/functions_seller";
import BasicDiscountModal from "@/components/Seller/Modals/BasicDiscountModal.vue";
import ConsumerPriceModal from "@/components/Seller/Modals/ConsumerPriceModal.vue";
import OrderLimitModal from "@/components/Seller/Modals/OrderLimitModal.vue";
import InventoryManagementModal from "@/components/Seller/Modals/InventoryManagementModal.vue";
import MarketingDiscountModal from "@/components/Seller/Modals/MarketingDiscountModal.vue";
import TransferStockModal from "@/components/Seller/Modals/TransferStockModal.vue";
import TransferModal from "@/components/Seller/Modals/TransferModal.vue";
import { closeModal } from "@/assets/js/functions_seller";

export default {
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
      },
    ]
    const {
      loading,
      getSkuSeller,
      sellerSku,
      headerSku,
      filterFieldSku,
      skuPage,
      dataTableLength,
      addSkuSellerPerPage,
      pageLength,
      skuSellerPage,
    } = Seller();
    return {
      loading,
      getSkuSeller,
      sellerSku,
      headerSku,
      filterFieldSku,
      addSkuSellerPerPage,
      pageLength,
      skuSellerPage,
      skuPage,
      dataTableLength,
      status,
    };
  },

  data() {
    return {
      skuSearchList: [],
      perPageFilter: false,
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: `seller/${this.$route.params.sellerId}/sku/delete/`,
      },
      itemListTable: [],
      shpsItem: {}
    }
  },

  components: {
    TransferModal,
    TransferStockModal,
    PanelFilter,
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable,
    MarketingDiscountModal,
    InventoryManagementModal,
    OrderLimitModal,
    ConsumerPriceModal,
    BasicDiscountModal,
    DashboardLayout,
    Header
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    skuList() {
      try {
        let sku = []
        this.skuSearchList.forEach(permission => {
          const form = {
            name: permission.label + '(' + permission.id + ')',
            id: permission.id,
          }
          sku.push(form)
        })
        return sku
      } catch (e) {
        return []
      }
    },
  },

  methods: {
    splitChar,
    changeHeaderShow(index, value) {
      this.headerSku[index].show = value
    },

    updateList(status) {
      if (status === 'true') {
        this.getSkuSeller();
      }
    },

    async searchSku(e) {
      const filter = {
        per_page: 10,
        q: e,
        is_active: 1,
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = filter
      AxiosMethod.end_point = `product/sku/crud/index/`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.skuSearchList = data.data.data
      }
    },

    async assignSkuToSeller(id) {
      const formData = new FormData()
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/create`
      formData.append('sku_id', id)
      formData.append('is_active', 1)
      AxiosMethod.form = formData
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.getSkuSeller();
        openToast(
            this.$store,
            'کد کالا با موفقیت افزوده شد.',
            "success",
        );
      }
    },
    /* modals */
    openInventoryManagementModal(id) {
      openModal(this.$store, 'set_inventoryManagementModal', id, true)
    },

    openConsumerPriceModal(id) {
      openModal(this.$store, 'set_consumerPriceModal', id, true)
    },

    openBasicDiscountModal(id) {
      openModal(this.$store, 'set_basicDiscountModal', id, true)
    },

    openMarketingDiscountModal(id) {
      openModal(this.$store, 'set_marketingDiscountModal', id, true)
    },

    openOrderLimitModal(id) {
      openModal(this.$store, 'set_orderLimitModal', id, true)
    },

    openTransferStockModal(id) {
      openModal(this.$store, 'set_transferStockModal', id, true)
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },

    transferStock(itemShps) {
      closeModal(this.$store, 'set_transferStockModal')
      this.$refs.transferModal.dialog = true
      this.shpsItem = itemShps
    }
  },

  mounted() {
    this.getSkuSeller();
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
          },
        })
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          },
        })
      }
      this.perPageFilter = false
    },
    skuSellerPage(val) {
      if (!this.perPageFilter) {
        this.getSkuSeller(val)
      }
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getSkuSeller();
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success",
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    $route(to, from) {
      this.getSkuSeller(to)
    },

    sellerSku() {
      this.itemListTable = []

      this.sellerSku.data.forEach((item) =>
          this.itemListTable.push(
              {
                sku_id: item.sku.id, /*or item.sku_id*/
                id: item.id,
                label: item.sku.label,
                warehouse_stock: item.warehouse_stock,
                site_stock: item.site_stock,
                customer_price: splitChar(item.customer_price),
                base_discount: item.base_discount,
                marketing_discount: item.marketing_discount,
                site_price: splitChar(item.site_price),
                is_active: item.is_active,
                is_active_id: item.sku.id,
                image: item?.sku?.image?.image_url,
              },
          ),
      )
    },
  }
}
</script>


