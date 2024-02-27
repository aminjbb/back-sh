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
            <span class="t14500 text-gray500" v-if="voucherDetail?.discount_type === 'percent'">
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
          <span class="t14500 text-gray500 number-font"  v-if="voucherDetail?.discount_type === 'percent'">
              {{ voucherDetail?.discount }} %
          </span> <span class="t14500 text-gray500 number-font"  v-else>
              {{  voucherDetail?.discount  }} ریال
          </span>
        </div>
      </div>
    </v-card>
    <v-card height="70" class="mx-5 br-12" max-height="70">
      <v-row
          justify="end"
          align="center"
          class="px-10 py-5">


        <v-col cols="6">
          <v-row justify="end">

            <ModalTableFilter path="admin/index" :filterField="[]"/>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="headerCustomer"
          :items="voucher?.data"
          :page="page"
          :perPage="pageLength"
          :loading="false"
          model="customer"
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
import Table from "@/components/Voucher/Table/VoucherDatailCustomerTable.vue";
import ModalTableFilter from "@/components/Public/UserFilterTable.vue";
import Voucher from '@/composables/Voucher'
export default {
  setup() {
    const {headerCustomer ,getVoucherCustomer,voucher , dataTableLength ,
      pageLength,page , getVoucherDetail , voucherDetail} = new Voucher()
    return {headerCustomer,getVoucherCustomer,voucher,dataTableLength ,
      pageLength,page,getVoucherDetail , voucherDetail}
  },
  components: {
    Table,
    ModalTableFilter
  },
  mounted() {
    this.getVoucherCustomer()
    this.getVoucherDetail()
  }
}
</script>