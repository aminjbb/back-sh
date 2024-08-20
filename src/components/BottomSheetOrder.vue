<template>
  <div class="text-center">
    <v-btn
        @click="sheet = !sheet"
        variant="outlined"
        color="primary500"
        width="142"
        height="24"
        rounded
        class="text-primary500 t12 w500">
      {{ title }}
    </v-btn>

    <v-bottom-sheet v-model="sheet">
      <v-card
          class="text-center rounded-t-lg"
          height="460">
        <v-card-text>
          <div class="d-flex justify-space-between align-center">
            <v-icon icon="mdi-close" @click="sheet = !sheet"/>
            <span class="t16 w500">{{title}}</span>
          </div>
          <br>
          <br>
          <div>
            <div class="flex-column">
              <div class="d-flex justify-space-between align-center">
                <div class="t12 w500 number-font">
                <span class="text-gray600" v-if="item.snapp_transaction_id">
                  {{ item.snapp_transaction_id }}
                </span>
                <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> اسنپ پی </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>
              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500 number-font">
                <span class="text-gray600" v-if="item.payment_status">
                 {{ getPaymentStatus(item.payment_status) }}
                </span>
                  <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> وضعیت پرداخت </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>
              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500 number-font">
                <span class="text-gray600" v-if="item.payment_method">
                 {{ getPaymentMethod(item.payment_method) }}
                </span>
                  <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> روش پرداخت </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>
              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500 number-font">
                <span  class="number-font text-gray600" v-if="item.shps_count">
                {{ item.shps_count }}
                </span>
                  <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> تعداد کالا </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>
              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500 number-font">
                <span class="number-font text-gray600" v-if="item.paid_price">
                 {{ splitChar(item.paid_price) }}
                  ریال
                </span>
                  <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> مبلغ پرداختی </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>
              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500 number-font">
                  <span class="number-font">
                  <v-icon :icon="setIcon(item.packed_status)" :color="item.packed_status === 1 ? 'green' : 'red'" />
                </span>
                </div>
                <div class="">
                  <span class="t12 w500"> وضعیت بارگیری </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>
              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500 number-font">
                <span class="number-font text-gray600" v-if="item.submit_date_fa">
                  {{ item.submit_date_fa }} {{splitTime(item.submit_date)}}
                </span>
                  <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> تاریخ ثبت سفارش </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>
              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500 number-font">
                <span class="number-font text-gray600" v-if="item.logistic_date_fa">
                 {{ item.logistic_date_fa }}
                </span>
                  <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> تاریخ ارسال سفارش </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import {splitChar} from "@/assets/js/functions";

export default {
  name: "BottomSheetOrder",
  props: {
    title: String,
    item: Object
  },

  data() {
    return {
      sheet: false,
    }
  },

  methods: {
    splitChar,

    getPaymentStatus(method) {
      if (method === 'unsuccessful') {
        return 'نا موفق'
      } else if (method === 'contradictory') {
        return 'دارای مغایرت'
      }
      else if (method === 'payment_out_date') {
        return 'انقضای پرداخت'
      } else if (method === 'successful') {
        return 'موفق'
      }
    },

    getPaymentMethod(method) {
      if (method === 'saman') {
        return 'درگاه سامان'
      } else if (method === 'wallet') {
        return 'کیف پول'
      } else if (method === 'snapp') {
        return 'اسنپ پی'
      }
    },

    setIcon(status) {
      if (status === 1) {
        return 'mdi-check-bold'
      } else {
        return 'mdi-close-thick'
      }
    },

    splitTime(date) {
      try {
        const dateSplit = date.split(' ')
        return dateSplit[1]
      } catch (e) {
      }
    }
  }
}
</script>

<style scoped>

</style>