<template>
  <section class="create-product flex-column d-flex h-100">
    <div class="home-info-box scroller">
      <div class="mt-5">
        <div class="d-flex flex-wrap px-4">
          <v-row align="center" class="flex-md-row flex-sm-column">
            <v-col cols="12" sm="3">
              <v-label>
                بازه گزارش
              </v-label>
              <v-row>
                <v-select v-model="selectedPeriod"
                          density="compact"
                          variant="outlined"
                          single-line
                          item-title="name"
                          item-value="value"
                          label="بازه گزارش"
                          :items=periods
                >
                </v-select>
              </v-row>
            </v-col>
            <v-col cols="12" sm="3">
              <v-label>
                تازه سازی
              </v-label>
              <v-row class="mx-1">
                <v-select v-model="selectedRefreshRate"
                          density="compact"
                          variant="outlined"
                          single-line
                          item-title="name"
                          item-value="value"
                          label="زمان تازه‌سازی"
                          :items=refreshRates
                >
                </v-select>
                <v-progress-circular
                    :model-value="100 - ((remainingTime/progressRefreshIn)*100)"
                    :rotate="360"
                    :size="40"
                    :width="5"
                    color="teal"
                >
                  {{ (remainingTime / 1000).toFixed(0) }}
                </v-progress-circular>
              </v-row>

            </v-col>
            <v-col cols="12" sm="3">

            </v-col>
          </v-row>
        </div>
      </div>
      <div class="mt-5">
        <div class="d-flex flex-wrap">
          <reportCard :itemValueFormatted="commercialReportData?.total_orders" itemName="تعداد سفارش"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.total_order_items" itemName="تعداد آیتم سفارش"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.total_order_details" itemName="تعداد اقلام سفارش"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.total_customer_amount)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_customer_amount))"
                      itemName="مجموع قیمت مشتری"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.total_buy_amount)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_buy_amount))"
                      itemName="مجموع قیمت خرید"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.total_base_discount)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_base_discount))"
                      itemName="مجموع تخفیف بازرگانی"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.total_marketing_discount)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_marketing_discount))"
                      itemName="مجموع تخفیف بازاریابی"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.gmv)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.gmv))" itemName="GMV"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.nmv)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.nmv))" itemName="NMV"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.total_profit)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_profit))" itemName="مجموع سود"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.total_margin" itemName="مجموع مارجین"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.AOV_GMV)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.AOV_GMV))" itemName="AOV GMV"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.AOV_NMV)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.AOV_NMV))" itemName="AOV NMV"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.total_voucher_amount)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_voucher_amount))"
                      itemName="مجموع وچرها"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.avv)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.avv))"
                      itemName="میانگین وچر به ازای هر سفارش"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.IPO" itemName="تعداد آیتم در هر سفارش"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.total_post_income)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_post_income))"
                      itemName="مجموع درآمد پستی"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.total_paid_price)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_paid_price))"
                      itemName="مجموع مبالغ پرداخت شده"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.APP)))"
                      :itemValue="formatNumber(toToman(commercialReportData?.APP))"
                      itemName="میانگین مبلغ پرداخت شده به ازای هر سفارش"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.total_buyers" itemName="تعداد خریداران"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.average_order_per_buyer"
                      itemName="تعداد سفارش به ازای هر خریدار"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="splitChar(priceFormat(toToman(commercialReportData?.average_amount_per_buyer)))"
                      :itemValue="splitChar(toToman(commercialReportData?.average_amount_per_buyer))"
                      itemName="مبلغ سفارش به ازای هر خریدار"
                      :loading=loading
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">

import {splitChar} from "@/assets/js/functions";
import {defineComponent} from 'vue'
import Reports from '@/composables/Reports.js'
import ReportCard from "@/components/Reports/ReportCard.vue"

export default defineComponent({
  name: 'CommercialReport',
  components: {ReportCard},

  data() {
    return {
      selectedRefreshRate: '5m',
      intervalId: null as unknown as ReturnType<typeof setInterval>,
      selectedPeriod: "today",
      progressRefreshIn: 300000,
      fromDate: new Date().getTime() - (24 * 60 * 60 * 1000), //last 24 hours
      toDate: new Date().getTime(),
      remainingTime: 300000,
      startTime: Date.now(),
      refreshRates: [
        {
          name: 'هر 1 دقیقه',
          value: '1m'
        },
        {
          name: 'هر ۵ دقیقه',
          value: '5m'
        },
        {
          name: 'هر ۱۵ دقیقه',
          value: '15m'
        },
        {
          name: 'هر ۳۰ دقیقه',
          value: '30m'
        },
        {
          name: 'هر یک ساعت',
          value: '1h'
        }
      ],
      periods: [
        {
          name: 'امروز',
          value: "today"
        },
        {
          name: 'دیروز',
          value: "yesterday"
        },
        {
          name: 'هفته جاری',
          value: 'week'
        },
        {
          name: 'ماه جاری',
          value: 'month'
        },
        {
          name: '۱۲ ساعت گذشته',
          value: "12h"
        },
        {
          name: '۲۴ ساعت گذشته',
          value: "24h"
        },
        {
          name: '۴۸ ساعت گذشته',
          value: "48h"
        },
        {
          name: 'یک هفته گذشته',
          value: '7d'
        },
        {
          name: 'یک ماه گذشته',
          value: '30d'
        },
      ],

    }
  },

  setup() {
    const {
      commercialReportData,
      getCommercialReportData,
      loading
    } = new Reports()

    return {commercialReportData, getCommercialReportData, loading}
  },

  mounted() {
    this.refreshInterval()
  },

  close() {
    this.stopInterval()
  },

  watch: {
    selectedRefreshRate(newValue, oldValue) {
      switch (newValue) {
        case '1m':
          this.progressRefreshIn = 60000
          break
        case '15m':
          this.progressRefreshIn = 900000
          break
        case '30m':
          this.progressRefreshIn = 1800000
          break
        case '1h':
          this.progressRefreshIn = 3600000
          break
        case '5m':
        default:
          this.progressRefreshIn = 300000
          break
      }
      this.refreshInterval()
    },

    selectedPeriod() {
      this.refreshInterval()
    }
  },

  methods: {
    splitChar,
    refreshInterval() {
      this.stopInterval()
      this.startTime = Date.now()
      this.fetchData()
      this.startInterval()
    },
    startInterval() {
      this.intervalId = setInterval(() => {
        this.startTime = Date.now() // Reset start time after each fetch
        this.fetchData()
      }, this.progressRefreshIn)
      this.updateRemainingTime()
    },

    stopInterval() {
      clearInterval(this.intervalId)
      this.intervalId = null as unknown as ReturnType<typeof setInterval>
    },

    updateRemainingTime() {
      if (this.intervalId) {
        const elapsed = Date.now() - this.startTime
        this.remainingTime = this.progressRefreshIn - elapsed
        requestAnimationFrame(this.updateRemainingTime)
      }
    },

    //convert price fields from Rial to Toman
    toToman(price: any) {
      try {
        const newPrice = parseInt(price) / 10
        if (isNaN(newPrice)) return 0
        return newPrice.toFixed(0)
      } catch (e) {
        return price
      }
    },

    formatNumber(price: any) {
      try {
        let stringPrice = String(price).replace(/,/g, '');

        return stringPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } catch (e) {
        return price;
      }
    },

    priceFormat(price: any) {
      if (!price) return ''
      let formattedValue

      if (price >= 1e9) {
        formattedValue = (price / 1e9).toFixed(3) + ' میلیارد'
      } else if (price >= 1e6) {
        formattedValue = (price / 1e6).toFixed(2) + ' میلیون'
      } else {
        formattedValue = price.toLocaleString()
      }
      return formattedValue
    },

    fetchData() {
      this.getCommercialReportData(this.selectedPeriod, this.selectedRefreshRate)
    }
  }
})
</script>