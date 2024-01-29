<template>
    <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
      <v-card height="70" class="ma-5 br-12 pt-5" max-height="70">
        <div class="d-flex align-center justify-lg-space-evenly">
          <div>
            <span class="t14500">
               عنوان:
            </span>
            <span class="t14500 text-gray500">
               {{ voucherDetail?.name }}
            </span>
          </div>
          <div>
            <span class="t14500">
               کد تخفیف:
            </span>
            <span class="t14500 text-gray500" >
               {{ voucherDetail?.code }}
            </span>
          </div>
          <div class="d-flex">
            <span class="t14500">
               نوع تخفیف:
            </span>
            <div>
              <span class="t14500 text-gray500" v-if="voucherDetail?.voucher_type === 'percent'">
                درصدی
              </span>
              <span class="t14500 text-gray500" v-else>
                ریالی
              </span>
            </div>
          </div>
          <div>
            <span class="t14500">
               مقدار تخفیف:
            </span>
            <span class="t14500 text-gray500 number-font">
                450,000 ریال
            </span>
          </div>
        </div>
      </v-card>
      <v-card height="70" class="mx-5 br-12" max-height="70" br-12 stretch-card-header-70>
        <v-row
            justify="end"
            align="center"
            class="px-10 py-3">

          <v-row class="mt-2">
            <ModalGroupAdd getEndPoint="admin/delivery-discount/crud/get/template" uploadEndpoint="admin/delivery-discount/attach/shps/34" />
          </v-row>


          <v-row justify="end"
                 align="center"
          >
            <ModalTableFilter path="admin/index" :filterField="[]"/>
          </v-row>






        </v-row>
      </v-card>
      <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">

        <Table
            class="flex-grow-1"
            :header="headerShps"
            :items="skuList"
            :page="page"
            :perPage="pageLength"
            :loading="false"
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
                    :total-visible="4"
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
  import Table from "@/components/FreeDelivery/Table/TableSkuList.vue";
  import ModalTableFilter from "@/components/Public/UserFilterTable.vue";
  import FreeDelivery from '@/composables/FreeDelivery'
  export default {
    setup() {
      const {headerShps ,voucher , dataTableLength ,
        pageLength,page , getVoucherDetail , voucherDetail ,skuList, getSkuList, getFreeDeliveryList} = new FreeDelivery()
      return {headerShps,voucher,dataTableLength ,
        pageLength,page,getVoucherDetail , voucherDetail, skuList, getSkuList, getFreeDeliveryList}
    },

    data() {
      return {

      }
    },
    components: {
      Table,
      ModalTableFilter,
      ModalGroupAdd
    },
    mounted() {
      this.getSkuList()
      this.getFreeDeliveryList()
    }
  }
  </script>