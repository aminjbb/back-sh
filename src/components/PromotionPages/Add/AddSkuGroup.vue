<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-4">
        <v-col cols="6" >
          <v-row align="center" justify="start" class="pt-1">
            <v-autocomplete
                placeholder="نام کالا یا شماره SHPS را جستجو نمایید"
                variant="outlined"
                prepend-inner-icon-cb="mdi-map-marker"
                rounded="lg"
                :items="skuList"
                item-title="name"
                item-value="value"
                v-debounce="searchSku">

              <template v-slot:item="item">
                <v-list-item>
                  <v-row justify="center">

                    <v-col cols="4">
                      <div @click="sendShps(item.props.value)" class="seller__add-sku-btn d-flex justify-center align-center">
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

            <ModalGroupAdd
                getEndPoint="page/promotion/csv/get/template"
                uploadEndpoint="page/promotion/csv/bulk/seller-sku" />
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row justify="end">
            <PanelFilter
                :path="`promotion-page/${$route.params.promotionId}/sku-group/add`"
                :filterField="filterFieldPromotionSku"/>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="skuGroupHeader"
          :items="itemListTable"
          :page="page"
          :perPage="dataTableLength"
          activePath="system/menu/crud/update/activation/"
          :loading="loading"
      >
          <template v-slot:customSlot="item">
              <v-text-field variant="outlined" v-model="item.data.custom" type="number" />
          </template>
          <template v-slot:customSlot2="item">
              <div @click="saveSkuToPromotion(item.data, item.index)"
                   class="seller__add-sku-btn d-flex justify-center align-center pointer">
                  <v-icon size="15"> {{item.data.custom2}}</v-icon>
              </div>
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
                              <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                                  <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14300">
                                        حذف
                                  </span>
                              </div>
                          </v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
          </template>
      </ShTable>
      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
            <ModalExcelDownload
                :hasFilter="false"
                :getEndPoint="`page/promotion/csv/${$route.params.promotionId}/get/seller-sku/export`" />
          </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="promotionPage"
                  :length="pageLengthShpsList"
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
</template>

<script>
import PromotionPage from "@/composables/PromotionPage";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
import ShTable from "@/components/Components/Table/sh-table.vue";


import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
export default {
  setup() {
    const {
      getPromotionShpsList,
      promotionShpsList,
      pageLengthShpsList,
      promotion ,
      promotions ,
      getPromotion ,
      getPromotions,
      pageLength,
      filterField ,
      addPerPage,
      dataTableLength,
      promotionPage,
      header,
      loading ,
      page,
      skuGroupHeader,
      filterFieldPromotionSku
    }=new PromotionPage()

    return{
      getPromotionShpsList,
      promotionShpsList,
      pageLengthShpsList,
      promotion ,
      promotions ,
      getPromotion ,
      getPromotions,
      pageLength,
      filterField ,
      addPerPage,
      dataTableLength,
      promotionPage,
      header,
      loading ,
      page,
      skuGroupHeader,
      filterFieldPromotionSku
    }
  },
  data(){
    return{
      skuSearchList:[],
      perPageFilter:false,
      itemListTable: []
    }
  },
  components: {
    PanelFilter,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    skuList() {
      try {
        let sku = []
        this.skuSearchList.forEach(skuSearch => {
          const form = {
            name: skuSearch.sku?.label + '(' + skuSearch.id + ')',
            value: skuSearch
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
    async searchSku(search) {
      this.skuSearchList = []
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `seller/sku/search?q=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.skuSearchList = data.data.data
      }
    },
    async sendShps(item){
      try {
        this.loading = true
        const formData = new FormData()
        formData.append('seller_sku_id' , item.id)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.store = this.$store
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `page/promotion/${this.$route.params.promotionId}/seller-sku/attach`
        AxiosMethod.form = formData
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading = false
          this.getPromotionShpsList(1 , this.dataTableLength);
          openToast(
              this.$store,
              ' با موفقیت ایجاد گردید.',
              "success"
          );
        }
        else {
          this.loading = false
        }
      }
      catch (e) {
        this.loading = false
      }
    },

    removeItem(id) {
          openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", `page/promotion/${this.$route.params.promotionId}/seller-sku/detach/`+id, true)
      },
    async saveSkuToPromotion(item, index) {
          const formData = new FormData();
          const AxiosMethod = new AxiosCall();
          AxiosMethod.using_auth = true;
          AxiosMethod.store = this.$store;
          AxiosMethod.token = this.$cookies.get('adminToken');
          AxiosMethod.end_point = `page/promotion/${this.$route.params.promotionId}/seller-sku/attach`;
          formData.append('seller_sku_id', item.id);
          formData.append('is_active', 1);
          formData.append('priority', item.custom);
          AxiosMethod.form = formData;

          let data = await AxiosMethod.axios_post();
          if (data) {
              openToast(
                  this.$store,
                  'کد کالا با موفقیت افزوده شد.',
                  "success"
              );
          }
      },

  },

  mounted() {
    this.getPromotionShpsList();
  },

  watch: {
    dataTableLength(val) {
      this.perPageFilter = true
      this.promotionPage = 1
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
    promotionPage(){
      if (!this.perPageFilter){
        this.getPromotionShpsList()
      }
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getPromotionShpsList(1 , this.dataTableLength);
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },

    $route(){
      this.getPromotionShpsList();

    },

      promotionShpsList() {
          if(this.promotionShpsList.data) {

              this.itemListTable = []
              this.promotionShpsList.data.forEach((item) => {
                  this.itemListTable.push(
                      {
                          /* custom === priority*/
                          sku_label: item.sku?.label,
                          id: item.id,
                          custom: item?.pivot?.priority,
                          custom2: 'mdi-plus',
                      }
                  )
              })
          }
      },
  }
}
</script>
