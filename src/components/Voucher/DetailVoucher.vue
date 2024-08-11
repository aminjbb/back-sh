<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="70" class="ma-5 br-12 pt-5" max-height="70">
      <div class="d-flex align-center justify-lg-space-evenly">
        <div>
          <span class="t14 w500">عنوان:</span>
          <span class="t14 w500 text-gray500">{{ voucherDetail?.name }}</span>
        </div>
        <div>
          <span class="t14 w500">کد تخفیف:</span>
          <span class="t14 w500 text-gray500" >{{ voucherDetail?.code }}</span>
        </div>
        <div class="d-flex">
          <span class="t14 w500">نوع تخفیف:</span>
          <div>
            <span class="t14 w500 text-gray500" v-if="voucherDetail?.voucher_type === 'percent'">
              درصدی
            </span>
            <span class="t14 w500 text-gray500" v-else>
              ریالی
            </span>
          </div>
        </div>
        <div>
          <span class="t14 w500">مقدار تخفیف:</span>
          <span class="t14 w500 text-gray500 number-font"  v-if="voucherDetail?.discount_type === 'percent'">
              {{ voucherDetail?.discount }} %
          </span>
          <span class="t14 w500 text-gray500 number-font"  v-else>
              {{  voucherDetail?.discount  }} ریال
          </span>
        </div>
      </div>
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

      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import {defineAsyncComponent} from "vue";
const ShTable = defineAsyncComponent(()=> import ("@/components/Components/Table/sh-table.vue"))

import Voucher from '@/composables/Voucher'

export default {
  data(){
      return{
          itemListTable: []
      }
  },
  setup() {
    const {
      headerShps,
      getVoucherShps,
      voucher,
      dataTableLength,
      pageLength,
      page,
      getVoucherDetail,
      voucherDetail
    } = new Voucher()
    return {
      headerShps,
      getVoucherShps,
      voucher,
      dataTableLength,
      pageLength,
      page,
      getVoucherDetail,
      voucherDetail
    }
  },

  components: {
    ShTable
  },

  mounted() {
    this.getVoucherShps()
    this.getVoucherDetail()
  },

  watch: {
        voucher() {
            this.itemListTable = []
            this.voucher.forEach((item) => {
                this.itemListTable.push(
                    {
                        sku_id: item.sku.id,
                        sku_label: item.sku.label,
                        customer_price: item.customer_price ? item.customer_price : '-',
                        site_price: item.site_price ? item.site_price : '-',
                    }
                )
            })
        },
    }
}
</script>