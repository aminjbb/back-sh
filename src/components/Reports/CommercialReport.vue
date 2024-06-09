<template>
  <section class="create-product flex-column d-flex h-100">
    <div class="home-info-box scroller">
      <div class="mt-5">
        <div class="d-flex flex-wrap pr-4">
          <v-row align="center">
            <v-col cols="3">
              <v-label>
                بازه گزارش
              </v-label>
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
            </v-col>
            <v-col cols="3">
              <v-label>
                تازه سازی
              </v-label>
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
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="mt-5">
        <div class="d-flex flex-wrap" v-if="!!commercialReportData">
          <reportCard :itemValueFormatted="commercialReportData?.total_orders" itemName="تعداد سفارش"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="commercialReportData?.total_order_items" itemName="تعداد آیتم سفارش"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="commercialReportData?.total_order_details" itemName="تعداد اقلام سفارش"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_customer_amount))"
                      :itemValue="toToman(commercialReportData?.total_customer_amount)"
                      itemName="مجموع قیمت مشتری"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_buy_amount))"
                      :itemValue="toToman(commercialReportData?.total_buy_amount)" itemName="مجموع قیمت خرید"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_base_discount))"
                      :itemValue="toToman(commercialReportData?.total_base_discount)" itemName="مجموع تخفیف بازرگانی"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_marketing_discount))"
                      :itemValue="toToman(commercialReportData?.total_marketing_discount)"
                      itemName="مجموع تخفیف بازاریابی" itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.gmv))"
                      :itemValue="toToman(commercialReportData?.gmv)" itemName="GMV"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.nmv))"
                      :itemValue="toToman(commercialReportData?.nmv)" itemName="NMV"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_profit))"
                      :itemValue="toToman(commercialReportData?.total_profit)" itemName="مجموع سود"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="commercialReportData?.total_margin" itemName="مجموع مارجین"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.AOV_GMV))"
                      :itemValue="toToman(commercialReportData?.AOV_GMV)" itemName="AOV GMV"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.AOV_NMV))"
                      :itemValue="toToman(commercialReportData?.AOV_NMV)" itemName="AOV NMV"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_voucher_amount))"
                      :itemValue="toToman(commercialReportData?.total_voucher_amount)" itemName="مجموع وچرها"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.avv))"
                      :itemValue="toToman(commercialReportData?.avv)" itemName="میانگین وچر به ازای هر سفارش"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="commercialReportData?.IPO" itemName="تعداد آیتم در هر سفارش"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_post_income))"
                      :itemValue="toToman(commercialReportData?.total_post_income)" itemName="مجموع درآمد پستی"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.total_paid_price))"
                      :itemValue="toToman(commercialReportData?.total_paid_price)" itemName="مجموع مبالغ پرداخت شده"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.APP))"
                      :itemValue="toToman(commercialReportData?.APP)"
                      itemName="میانگین مبلغ پرداخت شده به ازای هر سفارش"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="commercialReportData?.total_buyers" itemName="مجموع تعداد خریداران"
                      itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="commercialReportData?.average_order_per_buyer"
                      itemName="تعداد سفارش به ازای هر خریدار" itemImagePath="/src/assets/img/order-box.png"/>
          <reportCard :itemValueFormatted="priceFormat(toToman(commercialReportData?.average_amount_per_buyer))"
                      :itemValue="toToman(commercialReportData?.average_amount_per_buyer)"
                      itemName="مبلغ سفارش به ازای هر خریدار" itemImagePath="/src/assets/img/order-box.png"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Reports from '../../composables/Reports'
import ReportCard from "@/components/Reports/ReportCard.vue";

export default defineComponent({
  name: 'CommercialReport',
  components: {ReportCard},
  data() {
    return {
      selectedRefreshRate: 300000,
      intervalId: null as unknown as ReturnType<typeof setInterval>,
      selectedPeriod: "24h",
      fromDate: new Date().getTime() - (30 * 24 * 60 * 60 * 1000), //last 24 hours
      toDate: new Date().getTime(),
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
          name: '48 ساعت گذشته',
          value: "48h"
        },
        {
          name: 'یک هفته گذشته',
          value: '7d'
        },
      ],

    }
  },
  setup() {
    const {
      commercialReportData,
      getCommercialReportData,
    } = new Reports()

    return {commercialReportData, getCommercialReportData}
  },

  mounted() {
    this.getCommercialReportData(this.fromDate, this.toDate); // Initial call to fetch data

  },

  close() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },

  watch: {
    selectedRefreshRate() {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.fetchData()
      }, this.selectedRefreshRate)
    },

    selectedPeriod(newValue, oldValue) {
      switch (newValue) {
        case '12h':
          this.fromDate = new Date().getTime() - (12 * 60 * 60 * 1000); //last 12 hours
          break;
        case '24h':
          this.fromDate = new Date().getTime() - (24 * 60 * 60 * 1000); //last 24 hours
          break;
        case '48h':
          this.fromDate = new Date().getTime() - (48 * 60 * 60 * 1000); //last 48 hours
          break;
        case '7d':
          this.fromDate = new Date().getTime() - (7 * 24 * 60 * 60 * 1000); //last 7 days
          break;
      }
    }
  },

  methods: {
    //convert price fields from Rial to Toman
    toToman(price: any) {
      try {
        const newPrice = parseInt(price) / 10
        if (isNaN(newPrice)) return 0
        return newPrice.toFixed(0)
      } catch (e) {
        return 0
      }
    },

    priceFormat(price: any) {
      console.log(price)
      if (!price) return '';
      let formattedValue;

      if (price >= 1e9) {
        formattedValue = (price / 1e9).toFixed(3) + ' میلیارد';
      } else if (price >= 1e6) {
        formattedValue = (price / 1e6).toFixed(2) + ' میلیون';
      } else {
        formattedValue = price.toLocaleString();
      }
      console.log(formattedValue);
      return formattedValue;
    },

    fetchData() {
      this.getCommercialReportData(this.fromDate, this.toDate);
    }
  }
})
</script>