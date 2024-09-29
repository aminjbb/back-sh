<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <!--      <DetailsDiscountCode/>-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="780">
          <div v-if="voucherDetail?.code" class="my-6 text-center">
            <span class="t14 w500 mr-6"> کد تخفیف: </span>
            <span class="t14 w500 text-gray500"> {{voucherDetail?.code}} </span>
            <v-divider class="mt-3"/>
          </div>

          <div class="d-flex flex-column">
            <span class="t14 w500 mt-6 mr-6">شرط ها:</span>
            <div v-if="voucherDetail?.discount" class="mt-6">
              <span class="t14 w500 mr-6">مقدارتخفیف: </span>
              <span class="t14 w500 text-gray500"> {{voucherDetail?.discount }} </span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.discount_type" class="mt-6">
              <span class="t14 w500 mr-6">نوع مقدارتخفیف: </span>
              <span class="t14 w500 text-gray500" v-text="voucherDetail?.discount_type === 'rial' ? 'ریالی' : 'درصدی'"/>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.voucher_type" class="mt-6">
              <span class="t14 w500 mr-6">نوع تخفیف: </span>
              <span class="t14 w500 text-gray500">{{voucherDetail?.voucher_type}}</span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.name" class="mt-6">
              <span class="t14 w500 mr-6">سازنده کد تخفیف: </span>
              <span class="t14 w500 text-gray500"> {{voucherDetail?.name }} </span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.state?.name" class="mt-6">
              <span class="t14 w500 mr-6">بر اساس استان: </span>
              <span class="t14 w500 text-gray500"> {{voucherDetail.state?.label }} </span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.user_limit" class="mt-6">
              <span class="t14 w500 mr-6">تعداداستفاده مشتری: </span>
              <span class="t14 w500 text-gray500"> {{voucherDetail?.user_limit }} </span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.start_time_fa" class="mt-6">
              <span class="t14 w500 mr-6">تاریخ شروع: </span>
              <span class="t14 w500 text-gray500"> {{voucherDetail?.start_time_fa}} </span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.end_time_fa" class="mt-6">
              <span class="t14 w500 mr-6">تاریخ پایان: </span>
              <span class="t14 w500 text-gray500"> {{voucherDetail?.end_time_fa}} </span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.max_discount" class="mt-6">
              <span class="t14 w500 mr-6"> سقف تخفیف: </span>
              <span class="t14 w500 text-gray500">  {{voucherDetail?.max_discount}}</span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.order_limit" class="mt-6">
              <span class="t14 w500 mr-6"> تعداد استفاده سفارش: </span>
              <span class="t14 w500 text-gray500"> {{voucherDetail?.order_limit}} </span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.order_count" class="mt-6">
              <span class="t14 w500 mr-6">  چندمین سفارش: </span>
              <span class="t14 w500 text-gray500">  {{voucherDetail?.order_count}} </span>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.sending_price" class="mt-6">
              <span class="t14 w500 mr-6"> هزینه ارسال: </span>
              <span class="t14 w500 text-gray500" v-text="voucherDetail?.sending_price === 'free' ? 'رایگان' : 'پیش فرض'"/>
              <v-divider class="mt-6"/>
            </div>

            <div v-if="voucherDetail?.min_order_price" class="mt-6">
              <span class="t14 w500 mr-6">حداقل هزینه سفارش:</span>
              <span class="t14 w500 text-gray500"> {{voucherDetail?.min_order_price}} </span>
            </div>

            <div v-if="voucherDetail?.is_active" class="mt-6">
              <span class="t14 w500 mr-6"> وضعیت کد تخفیف: </span>
              <span class="t14 w500 text-gray500" v-text="voucherDetail?.is_active === 1 ? 'فعال' : 'غیر فعال'"/>
            </div>

          </div>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const DetailsDiscountCode = defineAsyncComponent(()=> import ('@/components/Voucher/Table/DetailsDiscountCode.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Voucher from "@/composables/Voucher";

export default {
  components: {
    DashboardLayout,
    Header
  },
  setup() {
    const {voucherDetail, getVoucherDetail} = new Voucher()
    return {voucherDetail, getVoucherDetail}
  },

  mounted() {
    this.getVoucherDetail()
  }
}
</script>

