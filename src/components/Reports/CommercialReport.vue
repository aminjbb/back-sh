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
                    :model-value="100 - ((remainingTime/selectedRefreshRate)*100)"
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
                      itemImagePath="/src/assets/img/order-box.png"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.total_order_items" itemName="تعداد آیتم سفارش"
                      itemImagePath="/src/assets/img/order-box.png"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.total_order_details" itemName="تعداد اقلام سفارش"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_customer_amount))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_customer_amount))"
                      itemName="مجموع قیمت مشتری"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_buy_amount))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_buy_amount))" itemName="مجموع قیمت خرید"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_base_discount))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_base_discount))" itemName="مجموع تخفیف بازرگانی"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_marketing_discount))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_marketing_discount))"
                      itemName="مجموع تخفیف بازاریابی" itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.gmv))"
                      :itemValue="formatNumber(toToman(commercialReportData?.gmv))" itemName="GMV"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.nmv))"
                      :itemValue="formatNumber(toToman(commercialReportData?.nmv))" itemName="NMV"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_profit))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_profit))" itemName="مجموع سود"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.total_margin" itemName="مجموع مارجین"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.AOV_GMV))"
                      :itemValue="formatNumber(toToman(commercialReportData?.AOV_GMV))" itemName="AOV GMV"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.AOV_NMV))"
                      :itemValue="formatNumber(toToman(commercialReportData?.AOV_NMV))" itemName="AOV NMV"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_voucher_amount))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_voucher_amount))" itemName="مجموع وچرها"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.avv))"
                      :itemValue="formatNumber(toToman(commercialReportData?.avv))" itemName="میانگین وچر به ازای هر سفارش"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.IPO" itemName="تعداد آیتم در هر سفارش"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_post_income))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_post_income))" itemName="مجموع درآمد پستی"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_paid_price))"
                      :itemValue="formatNumber(toToman(commercialReportData?.total_paid_price))" itemName="مجموع مبالغ پرداخت شده"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.APP))"
                      :itemValue="formatNumber(toToman(commercialReportData?.APP))"
                      itemName="میانگین مبلغ پرداخت شده به ازای هر سفارش"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.total_buyers" itemName="مجموع تعداد خریداران"
                      itemImagePath="/src/assets/img/order-box.png" :loading=loading
          />
          <reportCard :itemValueFormatted="commercialReportData?.average_order_per_buyer"
                      itemName="تعداد سفارش به ازای هر خریدار" itemImagePath="/src/assets/img/order-box.png"
                      :loading=loading
          />
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.average_amount_per_buyer))"
                      :itemValue="formatNumber(toToman(commercialReportData?.average_amount_per_buyer))"
                      itemName="مبلغ سفارش به ازای هر خریدار" itemImagePath="/src/assets/img/order-box.png"
                      :loading=loading
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Reports from '../../composables/Reports'
import ReportCard from "@/components/Reports/ReportCard.vue"

export default defineComponent({
  name: 'CommercialReport',
  components: {ReportCard},

  data() {
    return {
      selectedRefreshRate: 300000,
      intervalId: null as unknown as ReturnType<typeof setInterval>,
      selectedPeriod: "24h",
      fromDate: new Date().getTime() - (24 * 60 * 60 * 1000), //last 24 hours
      toDate: new Date().getTime(),
      remainingTime: 300000,
      startTime: Date.now(),
      refreshRates: [
        {
          name: 'هر 1 دقیقه',
          value: 60000
        },
        {
          name: 'هر ۵ دقیقه',
          value: 300000
        },
        {
          name: 'هر ۱۵ دقیقه',
          value: 900000
        },
        {
          name: 'هر ۳۰ دقیقه',
          value: 1800000
        },
        {
          name: 'هر یک ساعت',
          value: 3600000
        }
      ],
      periods: [
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
    selectedRefreshRate() {
      this.refreshInterval()
    },

    selectedPeriod(newValue, oldValue) {
      switch (newValue) {
        case '12h':
          this.fromDate = new Date().getTime() - (12 * 60 * 60 * 1000) //last 12 hours
          break
        case '24h':
          this.fromDate = new Date().getTime() - (24 * 60 * 60 * 1000) //last 24 hours
          break
        case '48h':
          this.fromDate = new Date().getTime() - (48 * 60 * 60 * 1000) //last 48 hours
          break
        case '7d':
          this.fromDate = new Date().getTime() - (7 * 24 * 60 * 60 * 1000) //last 7 days
          break
        case '30d':
          this.fromDate = new Date().getTime() - (30 * 24 * 60 * 60 * 1000) //last 30 days
          break
      }
      this.refreshInterval()
    }
  },

  methods: {
    refreshInterval(){
      this.stopInterval()
      this.startTime = Date.now()
      this.fetchData()
      this.startInterval()
    },
    startInterval() {
      this.intervalId = setInterval(() => {
        this.startTime = Date.now() // Reset start time after each fetch
        this.fetchData()
      }, this.selectedRefreshRate)
      this.updateRemainingTime()
    },

    stopInterval() {
      clearInterval(this.intervalId)
      this.intervalId = null as unknown as ReturnType<typeof setInterval>
    },

    updateRemainingTime() {
      if (this.intervalId) {
        const elapsed = Date.now() - this.startTime
        this.remainingTime = this.selectedRefreshRate - elapsed
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
      this.getCommercialReportData(this.fromDate, this.toDate)
    }
  }
})
</script>