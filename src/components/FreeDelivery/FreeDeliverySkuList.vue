<template>
    <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
      <v-card height="70" class="ma-5 br-12 pt-5" max-height="70">
        <div class="d-flex align-center justify-lg-space-evenly">
          <div>
             <span class="t14 w500">عنوان:</span>

            <span class="t14 w500 text-gray500">{{ detailData?.name }}</span>
          </div>
          <div>
            <span class="t14 w500">روش ارسال:</span>
            <span v-if="detailData?.tipax" class="t14 w500 text-gray500">تیپاکس</span>
            &nbsp
            <span v-if="detailData?.post" class="t14 w500 text-gray500">پست</span>
            &nbsp
            <span v-if="detailData?.pishtaz" class="t14 w500 text-gray500">پیشتاز </span>
            &nbsp
            <span v-if="detailData?.nafis" class="t14 w500 text-gray500">نفیس اکسپرس</span>
          </div>
        </div>
      </v-card>
      <v-card height="70" class="mx-5 br-12" max-height="70" br-12 stretch-card-header-70>
        <v-row
            justify="end"
            align="center"
            class="px-10 py-3">
          <v-row class="mt-2">
            <ModalGroupAdd
                getEndPoint="admin/delivery-discount/crud/get/template"
                type="voucher"
                dataForm="shps_file"
                :uploadEndpoint= "`admin/delivery-discount/attach/shps/${freeDeliveryId}`" />
          </v-row>

          <v-row justify="end"
                 align="center">
            <PanelFilter
                :path="`free-delivery/${$route.params.freeDeliveryId}/shps`"
                :filterField="filterFieldShps" />
          </v-row>
        </v-row>
      </v-card>
      <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <ShTable
            class="flex-grow-1"
            :headers="headerShps"
            :items="itemListTable"
            :page="page"
            :perPage="pageLength"
            />
  
        <v-divider/>
  
        <v-card-actions class="pb-3">
          <v-row class="pr-5">
            <v-col cols="3">
            </v-col>
            <v-col cols="6">
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
  
            <v-col cols="3">
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
  import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
  import FreeDelivery from '@/composables/FreeDelivery'
  import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
  import ShTable from "@/components/Components/Table/sh-table.vue";

  export default {
    setup() {
      const {
        headerShps,
        voucher,
        dataTableLength,
        getDetail,
        detailData,
        pageLength,
        page,
        getVoucherDetail,
        voucherDetail,
        skuList,
        getSkuList,
        getFreeDeliveryList,
        filterFieldShps
      } = new FreeDelivery()

      return {
        headerShps,
        voucher,
        dataTableLength,
        getDetail,
        detailData,
        pageLength,
        page,
        getVoucherDetail,
        voucherDetail,
        skuList,
        getSkuList,
        getFreeDeliveryList,
        filterFieldShps
      }
    },

    data() {
        return{
            freeDeliveryId:this.$route.params.freeDeliveryId,
            itemListTable: []
        }
    },

    components: {
        PanelFilter,
        ModalGroupAdd,
        ShTable
    },
    
    mounted() {
      this.getSkuList()
      this.getFreeDeliveryList()
      this.getDetail()
    },

    watch:{
        skuList() {
              this.itemListTable = []
              this.skuList.forEach((item) => {
                  this.itemListTable.push(
                      {
                          sku_id: item.sku?.id,
                          sku_label: item.sku?.label,
                          customer_price: item.customer_price,
                          buying_price: item.buying_price,
                      }
                  )
              })
          },
      }
  }
  </script>