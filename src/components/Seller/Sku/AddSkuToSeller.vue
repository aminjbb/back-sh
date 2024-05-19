<template>
<div class="h-100 d-flex flex-column align-stretch sku-seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
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
                                            class="text-gray500 t14300 text-right" />
                                    </v-col>
                                </v-row>
                            </v-list-item>
                        </template>
                    </v-autocomplete>

                    <ModalGroupAdd getEndPoint="seller/sku/csv/get/template" uploadEndpoint="system/bulk/update/shps" />

                    <ModalGroupAdd getEndPoint="seller/sku/csv/get/template" uploadEndpoint="seller/sku/csv/bulk" />
                </v-row>
            </v-col>

          <v-col cols="6">
            <v-row justify="end">
              <ModalColumnFilter
                  :changeHeaderShow="changeHeaderShow"
                  :header="headerSku" />

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

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
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
            model="sku" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-8">
                <v-col cols="3" class="d-flex justify-start">
                    <ModalExcelDownload :getEndPoint="`seller/${$route.params.sellerId}/sku/csv/get/export`" />
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
                                v-model="dataSkuTableLength"
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
</template>

<script>
import Table from '@/components/Seller/Table/SkuTable.vue'
import Seller from "@/composables/Seller";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
    openToast
} from "@/assets/js/functions";
import {
    AxiosCall
} from "@/assets/js/axios_call";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
export default {
  setup(props) {
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
    const {
      getSkuSeller,
      sellerSku,
      headerSku,
      filterFieldSku,
      skuPage,
      dataSkuTableLength,
      addSkuSellerPerPage,
      pageLength,
      skuSellerPage,
    } = Seller();
    return {
      getSkuSeller,
      sellerSku,
      headerSku,
      filterFieldSku,
      addSkuSellerPerPage,
      pageLength,
      skuSellerPage,
      skuPage,
      dataSkuTableLength,
      status
    };
  },

  data(){
    return{
      skuSearchList:[],
      perPageFilter:false
    }
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
    },

    skuList() {
      try {
        let sku = []
        this.skuSearchList.forEach(permission => {
          const form = {
            name: permission.label + '(' + permission.id + ')',
            id: permission.id
          }
          sku.push(form)
        })
        return sku
      } catch (e) {
        return []
      }
    }
  },

  methods: {
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
        q: e
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
            "success"
        );
      }
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
    page(){
      if (!this.perPageFilter){
        this.getSkuSeller()
      }
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getSkuSeller();
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    $route(to, from) {
      this.getSkuSeller(to)
    }
  }


}
</script>
