<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">


    <v-card height="120" class="ma-5 br-12 " max-height="120">
      <div class="d-flex br-12 pt-5 pb-2 align-center justify-lg-space-evenly t14500">اطلاعات تخفیف</div>
      <v-divider></v-divider>

      <div class="d-flex align-center pt-5 justify-lg-space-evenly">
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
          <span class="t14500 text-gray500">
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
          <span class="t14500 text-gray500 number-font" v-if="voucherDetail?.discount_type === 'percent'">
              {{ voucherDetail?.discount }} %
          </span> <span class="t14500 text-gray500 number-font" v-else>
              {{ voucherDetail?.discount }} ریال
          </span>
        </div>
      </div>
    </v-card>


    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">

      <Table
          class="flex-grow-1"
          :header="headerPublicVoucherList"
          :items="voucherGroup"
          :page="page"
          :perPage="pageLength"
          :loading="false"
      />

      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
            <ModalExcelDownload getEndPoint="page/csv/get/export" />
          </v-col>


        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import Table from "@/components/Voucher/Table/PublicVoucherTable.vue";
import Voucher from '@/composables/Voucher';
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";

export default {
  setup() {
    const {
      headerShps, headerPublicVoucherList, getVoucherShps, voucher, dataTableLength,
      pageLength, page, getVoucherDetail, voucherDetail, getVoucherGroup, voucherGroup
    } = new Voucher()
    return {
      headerShps, getVoucherShps, voucher, dataTableLength, headerPublicVoucherList,
      pageLength, page, getVoucherDetail, voucherDetail, getVoucherGroup, voucherGroup
    }
  },
  components: {
    Table,
    ModalExcelDownload,
  },
  mounted() {
    this.getVoucherShps()
    this.getVoucherDetail()
    this.getVoucherGroup()
  }
}
</script>