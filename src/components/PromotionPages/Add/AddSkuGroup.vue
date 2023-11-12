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
                placeholder="شماره گروه کالا (SKU Group) را جستجو نمایید"
                variant="outlined"
                prepend-inner-icon-cb="mdi-map-marker"
                rounded="lg"
                :items="skuGroupList"
                item-title="name"
                item-value="id"
                v-debounce:1s.unlock="searchSkuGroup"
            >


              <template v-slot:item="{ props, item }">
                <v-list-item
                >
                  <v-row justify="center">

                    <v-col cols="4">

                      <div @click="assignSkuToPromotion(item.props.value)" class="seller__add-sku-btn d-flex justify-center align-center">
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

            <ModalGroupAdd getEndPoint="page/promotion/csv/get/template" uploadEndpoint="page/promotion/csv/bulk/sku_group" />

          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row justify="end">
            <!--            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="skuGroupHeader" />-->

            <!--            <ModalTableFilter path="menu/index" :filterField="filterField" />-->
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="skuGroupHeader"
          :items="promotionSkuGroups.data"
          :page="page"
          :perPage="dataTableLength"
          activePath="system/menu/crud/update/activation/"
          deletePath="system/menu/crud/delete/"
          :loading="loading"
          updateUrl="page/csv/mass-update"
          model="skuPromotionPage" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
            <ModalExcelDownload getEndPoint="page/promotion/csv/get/export" />
          </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="4"
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
import Table from '@/components/PromotionPages/Table/PromotionPageTable.vue'
import PromotionPage from "@/composables/PromotionPage";
import ModalTableFilter from '@/components/Menu/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
export default {
  setup(props) {
    const {getPromotionSkuGroups,promotionSkuGroups, pageLengthSkuGroup, promotion , promotions , getPromotion ,getPromotions, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,skuGroupHeader}=new PromotionPage()
    return{getPromotionSkuGroups,promotionSkuGroups, pageLengthSkuGroup,promotion , promotions , getPromotion ,getPromotions, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,skuGroupHeader}
  },
  data(){
    return{
      skuGroupSearchList:[]
    }
  },
  components: {
    Table,
    ModalGroupAdd,
    ModalTableFilter,
    ModalColumnFilter,
    ModalExcelDownload,
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    skuGroupList(){
      try {
        let skuGroup = []
        this.skuGroupSearchList.forEach(sku => {
          const form = {
            name: sku.label + '(' +sku.id+')',
            id : sku.id
          }
          skuGroup.push(form)
        })
        return skuGroup
      }
      catch (e) {
        console.log(e)
        return  []
      }
    },
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
    async searchSkuGroup(e){
      const filter = {
        per_page : 10,
        q : e
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = filter
      AxiosMethod.end_point = `product/sku/group/crud/index/`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.skuGroupSearchList = data.data.data
      }
    },

    async assignSkuToPromotion(id){
      const formData = new FormData()
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.store =  this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `page/promotion/${this.$route.params.promotionId}/sku_group/attach`
      formData.append('sku_group_id' , id)
      formData.append('is_active' , 1)
      AxiosMethod.form = formData
      let data = await AxiosMethod.axios_post()
      if (data) {
        // this.getSkuSeller();
        openToast(
            this.$store,
            'کد کالا با موفقیت افزوده شد.',
            "success"
        );
      }
    }
  },

  mounted() {
    this.getPromotionSkuGroups(1 , this.dataTableLength);
  },

  watch: {
    dataTableLength(val) {
      this.getPromotionSkuGroups(1 , val);
    },
    page(val){
      this.getPromotionSkuGroups(val , this.dataTableLength);
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getPromotions();
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
