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
                    class="mr-4"
                >
                  {{ (remainingTime / 1000).toFixed(0) }}
                </v-progress-circular>
              </v-row>
            </v-col>
            <v-col cols="12">
              <div class="mt-5 ">
                <v-row>
                  <v-col cols="6" class="flex" md="6" v-for="(item, index) in reportCardItems" :key="index">
                    <reportCard
                        :itemValueFormatted="item.formattedValue"
                        :itemValue="item.value"
                        :itemName="item.name"
                        :loading="loading"


                    />
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
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
        { name: 'هر 1 دقیقه', value: '1m' },
        { name: 'هر ۵ دقیقه', value: '5m' },
        { name: 'هر ۱۵ دقیقه', value: '15m' },
        { name: 'هر ۳۰ دقیقه', value: '30m' },
        { name: 'هر یک ساعت', value: '1h' }
      ],
      periods: [
        { name: 'امروز', value: "today" },
        { name: 'دیروز', value: "yesterday" },
        { name: 'هفته جاری', value: 'week' },
        { name: 'ماه جاری', value: 'month' },
        { name: '۱۲ ساعت گذشته', value: "12h" },
        { name: '۲۴ ساعت گذشته', value: "24h" },
        { name: '۴۸ ساعت گذشته', value: "48h" },
        { name: 'یک هفته گذشته', value: '7d' },
        { name: 'یک ماه گذشته', value: '30d' },
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

  computed: {
    reportCardItems() {
      return [
        { formattedValue: this.commercialReportData?.total_orders, name: "تعداد سفارش" },
        { formattedValue: this.commercialReportData?.total_order_items, name: "تعداد آیتم سفارش" },
        { formattedValue: this.commercialReportData?.total_order_details, name: "تعداد اقلام سفارش" },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.total_customer_amount)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.total_customer_amount)),
          name: "مجموع قیمت مشتری"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.total_buy_amount)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.total_buy_amount)),
          name: "مجموع قیمت خرید"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.total_base_discount)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.total_base_discount)),
          name: "مجموع تخفیف بازرگانی"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.total_marketing_discount)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.total_marketing_discount)),
          name: "مجموع تخفیف بازاریابی"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.gmv)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.gmv)),
          name: "GMV"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.nmv)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.nmv)),
          name: "NMV"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.total_profit)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.total_profit)),
          name: "مجموع سود"
        },
        { formattedValue: this.commercialReportData?.total_margin, name: "مجموع مارجین" },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.AOV_GMV)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.AOV_GMV)),
          name: "AOV GMV"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.AOV_NMV)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.AOV_NMV)),
          name: "AOV NMV"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.total_voucher_amount)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.total_voucher_amount)),
          name: "مجموع وچرها"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.avv)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.avv)),
          name: "میانگین وچر به ازای هر سفارش"
        },
        { formattedValue: this.commercialReportData?.IPO, name: "تعداد آیتم در هر سفارش" },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.total_post_income)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.total_post_income)),
          name: "مجموع درآمد پستی"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.total_paid_price)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.total_paid_price)),
          name: "مجموع مبالغ پرداخت شده"
        },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.APP)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.APP)),
          name: "میانگین مبلغ پرداخت شده به ازای هر سفارش"
        },
        { formattedValue: this.commercialReportData?.total_buyers, name: "تعداد خریداران" },
        { formattedValue: this.commercialReportData?.average_order_per_buyer, name: "تعداد سفارش به ازای هر خریدار" },
        {
          formattedValue: this.priceFormat(this.toToman(this.commercialReportData?.average_amount_per_buyer)),
          value: this.formatNumber(this.toToman(this.commercialReportData?.average_amount_per_buyer)),
          name: "مبلغ سفارش به ازای هر خریدار"
        },
      ]
    }
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
    refreshInterval() {
      this.stopInterval()
      this.startTime = Date.now()
      this.fetchData()
      this.startInterval()
    },
    startInterval() {
      this.intervalId = setInterval(() => {
        this.startTime = Date.now()
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
        return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } catch (e) {
        return price
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
