<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="780">
      <div class="d-flex flex-column">
        <span class="t14500 mt-6 mr-6">شرط ها:</span>
        <div v-if="voucherDetail?.state?.name" class="mt-3">
          <span class="t14500 mr-6">بر اساس استان:</span>
          <span class="t14500 text-gray500"> {{voucherDetail.state?.name }} </span>
          <v-divider class="mt-3"/>
        </div>

        <div v-if="voucherDetail?.code" class="mt-3">
          <span class="t14500 mr-6">بر اساس کد: </span>
          <span class="t14500 text-gray500"> {{voucherDetail?.code}} </span>
          <v-divider class="mt-3"/>
        </div>
        <div v-if="voucherDetail?.start_time_fa" class="mt-3">
          <span class="t14500 mr-6">تاریخ شروع: </span>
          <span class="t14500 text-gray500"> {{voucherDetail?.start_time_fa}} </span>
          <v-divider class="mt-3"/>
        </div>

        <div v-if="voucherDetail?.discount" class="mt-3">
          <span class="t14500 mr-6">تخفیف: </span>
          <span class="t14500 text-gray500"> {{voucherDetail?.discount }} </span>
          <v-divider class="mt-3"/>
        </div>

        <div v-if="voucherDetail?.max_discount" class="mt-3">
          <span class="t14500 mr-6">سقف تخفیف:</span>
          <span class="t14500 text-gray500">  {{voucherDetail?.max_discount}}</span>
          <v-divider class="mt-3"/>
        </div>

        <div v-if="voucherDetail?.order_count" class="mt-3">
          <span class="t14500 mr-6">تعداد سفارش:</span>
          <span class="t14500 text-gray500"> {{voucherDetail?.order_count}} </span>
          <v-divider class="mt-3"/>
        </div>

        <div v-if="voucherDetail?.order_limit" class="mt-3">
          <span class="t14500 mr-6">چندمین سفارش:</span>
          <span class="t14500 text-gray500"> {{voucherDetail?.order_limit}} </span>
          <v-divider class="mt-3"/>
        </div>

        <div v-if="voucherDetail?.min_order_price" class="mt-3">
          <span class="t14500 mr-6">حداقل هزینه سفارش:</span>
          <span class="t14500 text-gray500"> {{voucherDetail?.min_order_price}} </span>
        </div>
      </div>


    </v-card>
  </div>
</template>

<script>
import Voucher from "@/composables/Voucher";

export default {
  setup() {
    const {voucherDetail, getVoucherDetail} = new Voucher()

    return {voucherDetail, getVoucherDetail}
  },

  mounted() {
    this.getVoucherDetail()
  }
}
</script>
