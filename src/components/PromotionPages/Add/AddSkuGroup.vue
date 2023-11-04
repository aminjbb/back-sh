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
                :items="skuList"
                item-title="name"
                item-value="id"
                v-debounce:1s.unlock="searchSkuGroup"
            >


              <template v-slot:item="{ props, item }">
                <v-list-item
                >
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

            <ModalGroupAdd getEndPoint="seller/sku/csv/get/template" uploadEndpoint="seller/sku/csv/bulk" />

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
          :items="[]"
          :page="page"
          :perPage="dataTableLength"
          activePath="system/menu/crud/update/activation/"
          deletePath="system/menu/crud/delete/"
          :loading="loading"
          updateUrl="page/csv/mass-update"
          model="page" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
            <ModalExcelDownload getEndPoint="page/csv/get/export" />
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
export default {
  setup(props) {
    const { promotion , promotions , getPromotion ,getPromotions, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,skuGroupHeader}=new PromotionPage()
    return{promotion , promotions , getPromotion ,getPromotions, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,skuGroupHeader}
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
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

  },

  mounted() {
    this.getPromotions();
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
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
