<template>
  <section class="create-product flex-column d-flex h-100">
    <div class="home-info-box scroller">
      <span class="text-gray600 t14500 mx-3">تعداد سفارش </span>

      <v-row justify="space-between" align="center">
        <v-col cols="4">
          <v-card class="ma-2 px-2 py-5 flex-grow-1 rounded-lg">
            <v-row justify="space-between" align="center">
              <v-col cols="6">
                <h6>روز</h6>
              </v-col>
              <v-col cols="6" class="pr-5 pt-5">
                <span>
                <img src="../../assets/img/order-box.png" alt="order-box" width="24" height="19">
                </span>
              </v-col>
            </v-row>
            <v-row justify="center">
              <span class="t13300 number-font">{{ dashboardData?.order?.last_day_order }}</span>
            </v-row>
            <v-row justify="center">
              <span class="text-h8 text-gray500 t12 w300 pr-1">سفارش </span>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="ma-2 px-2 py-5 flex-grow-1 rounded-lg">
            <v-row justify="space-between" align="center">
              <v-col cols="6">
                <h6>ماه</h6>
              </v-col>
              <v-col  cols="6" class="pr-5 pt-5">
                <img  src="../../assets/img/receive-box.png" alt="resived-box" width="24" height="19">
              </v-col>
            </v-row>
            <v-row justify="center">
              <span class="t13300 number-font">{{ dashboardData?.order?.last_month_order }}</span>
            </v-row>
            <v-row justify="center">
              <span class="text-h8 text-gray500 t12 w300 pr-1">سفارش </span>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="ma-2 px-2 py-5 flex-grow-1 rounded-lg">
            <v-row justify="space-between" align="center">
              <v-col cols="6">
                <h6>سال</h6>
              </v-col>
              <v-col cols="6" class="pr-5 pt-5">
                <img  src="@/assets/img/shopping-box.svg" alt="shopping-box" width="24" height="19">
              </v-col>
            </v-row>
            <v-row justify="center">
              <span class="t13300 number-font">{{ dashboardData?.order?.last_year_order }}</span>
            </v-row>
            <v-row justify="center">
              <span class="text-h8 text-gray500 t12 w300 pr-1">سفارش </span>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="py-0" cols="12">
          <v-card class="ma-2 px-5 py-5 flex-grow-1 rounded-lg" height="203">
            <span class="text-gray600 t16500">فروش جاری</span>
            <BarChart v-if="showChart" :chart-data="dataChartCurrentSale" :options="optionCurrentSale" :height="145"/>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="py-0"  cols="12">
          <v-card class="ma-2 px-5 py-5 flex-grow-1 rounded-lg"  height="203">
            <span class="text-gray600 t16500">درگاه</span>
            <v-row justify="center" align="center">
              <v-col cols="7">
                <v-row justify="space-between" align="center" class="my-3">
                  <span class="text-gray500 t14300 pr-3">تعداد کاربر: </span>
                  <div class="d-flex justify-start">
                    <span class="t14500 number-font">{{ dashboardData?.payment_in_progress?.user_count }}</span>
                    <span class="text-gray500 t14300 pr-2">کاربر</span>
                  </div>
                </v-row>
                <v-row justify="space-between" align="center" class="my-3">
                  <span class="text-gray500 t14300 pr-3">تعداد آیتم: </span>
                  <div  class="d-flex justify-start">
                    <span class="t14500 number-font">{{ dashboardData?.payment_in_progress?.item_count }}</span>
                    <span class="text-gray500 t14300 pr-2">آیتم</span>
                  </div>
                </v-row>
                <v-row justify="space-between" align="center">
                  <span class="text-gray500 t14300 pr-3">ارزش سفارشات: </span>
                  <div  class="d-flex justify-start">
                    <span class="t14500 number-font">{{ splitChar(toRial(dashboardData?.payment_in_progress?.order_value)) }}</span>
                    <span class="text-gray500 t14300 pr-2">تومان</span>
                  </div>
                </v-row>
              </v-col>

              <v-col cols="5" class="pr-15">
                <v-row justify="center" align="center" class="pr-10">
                  <img src="@/assets/img/wallet.png" alt="wallet" width="51" height="68">
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="py-0" cols="12">
          <v-card class="ma-2 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t16500">موجودی</span>

            <div class="d-flex justify-space-between align-center">
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">انبار: </span>
                <div class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{ dashboardData?.stock?.warehouse }}</span>
                  <span class="text-gray500 t14300 pr-2">آیتم</span>
                </div>
              </div>
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">سایت: </span>
                <div  class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{ dashboardData?.stock?.site }}</span>
                  <span class="text-gray500 t14300 pr-2">آیتم</span>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="py-0" cols="12">
          <v-card class="ma-2 px-5 py-6 flex-grow-1 rounded-lg">
            <v-row justify="space-between" align="center" class="px-3">
              <span class="text-gray600 t16500">ارزش انبار</span>
              <div class="">
                <span class="t14500 number-font">{{ splitChar(toRial(dashboardData?.warehouse?.value)) }}</span>
                <span class="text-gray500 t14300 mr-2">تومان</span>
              </div>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="py-0" cols="12">
          <v-card class="ma-2 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t16500">خروج انبار</span>

            <div class="d-flex justify-space-between align-center">
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">روز: </span>
                <div class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{dashboardData?.warehouse?.exit?.day}}</span>
                  <span class="text-gray500 t14300 pr-2">سفارش</span>
                </div>
              </div>
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{dashboardData?.warehouse?.exit?.month}}</span>
                  <span class="text-gray500 t14300 pr-2">سفارش</span>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="space-between" align="center">
        <v-col class="py-0" cols="6">
          <v-card class="d-flex justify-space-between align-center ma-2 px-5 py-5 flex-grow-1 rounded-lg">
            <div class="">
              <span class="text-gray600 t16500">کاربر فعال</span>
              <v-row align="start">
                <span class="t14500 number-font mt-3 mr-3">{{ dashboardData?.user?.active }}</span>
                <span class="text-gray500 t14300 mt-3 mr-2">کاربر</span>
              </v-row>
            </div>
            <div>
                <img src="@/assets/img/male.png" alt="male" width="27" height="37" class="mr-5 mt-3">
            </div>
          </v-card>
        </v-col>
        <v-col class="py-0" cols="6">
          <v-card class="d-flex justify-space-between align-center ma-2 px-5 py-5 flex-grow-1 rounded-lg">
            <div class="">
              <span class="text-gray600 t16500">خریدار</span>
              <v-row align="start">
                <span class="t14500 number-font mt-3 mr-3">{{ dashboardData?.user?.with_orders }}</span>
                <span class="text-gray500 t14300 mt-3 mr-2">کاربر</span>
              </v-row>
            </div>
            <div>
                <img src="@/assets/img/female.png" alt="female" width="27" height="37" class="mr-5 mt-3">
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="py-0" cols="12">
          <v-card class="ma-2 px-5 py-5 flex-grow-1 rounded-lg" height="280">
            <span class="text-gray600 t16500">سود بازرگانی</span>
            <v-row>
              <BarChart v-if="showChart" :chart-data="dataChartBusinessProfit" :options="optionBusinessProfit" :height="145"/>
            </v-row>
            <v-row align="start" justify="end" class="my-1 mt-8">
              <span :class="parseInt(dashboardData?.profit?.month) > 0 ? 'success-text' : 'text-error'" class="t16500 number-font d--ltr">{{ splitChar(toRial(dashboardData?.profit?.month)) }}</span>
              <span class="text-gray500 t14300 pr-2">تومان</span>
              <span class=" t16500 pr-2">: ماه</span>
            </v-row>
            <v-row align="start" justify="end" class="my-3">
                <span :class="parseInt(dashboardData?.profit?.month) > 0 ? 'success-text' : 'text-error'" class="t16500 number-font d--ltr">{{ splitChar(toRial(dashboardData?.profit?.day)) }}</span>
                <span class="text-gray500 t14300 pr-2 ">تومان</span>
                <span class=" t16500 pr-2">: روز</span>
              </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="py-0" cols="12">
          <v-card class="ma-2 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t16500">تخفیف پایه</span>
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">روز: </span>
                <div class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{splitChar(toRial(dashboardData?.discount?.base?.day))}}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </div>
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{ splitChar(toRial(dashboardData?.discount?.base?.month)) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>


      <v-row justify="center">
        <v-col class="py-0" cols="12">
          <v-card class="ma-2 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t16500">تخفیف مارکتینگ</span>
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">روز: </span>
                <div class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{ splitChar(toRial(dashboardData?.discount?.marketing?.day)) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </div>
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{ splitChar(toRial(dashboardData?.discount?.marketing?.month)) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="py-0" cols="12">
          <v-card class="ma-2 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t16500">کد تخفیف</span>
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">روز: </span>
                <div class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{ splitChar(toRial(dashboardData?.discount?.voucher?.day)) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </div>
              <div class="d-flex justify-start">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start mr-5">
                  <span class="t14500 number-font">{{ splitChar(toRial(dashboardData?.discount?.voucher?.month)) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col class="py-0" cols="12">
          <span class="text-gray600 t16500 mx-8">سفارشات ماه گذشته </span>
          <v-card class="ma-2 px-10 py-5 flex-grow-1 rounded-lg">
            <v-col cols="12">
              <LineChart v-if="showChart" :chart-data="dataChartLastMonth" :options="optionLastMonth"/>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script lang="ts">
import {
  splitChar
} from "@/assets/js/functions";
import {defineComponent} from 'vue';
import {BarChart, DoughnutChart, LineChart} from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import Public from '@/composables/Public'
Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  components: {LineChart, BarChart ,DoughnutChart },
  setup() {
    const {
      dashboardData,
      getDashboardData,
      showChart,
      dataChartCurrentSale,
      dataChartBusinessProfit,
      dataChartLastMonth
    } = new Public()

    const optionBusinessProfit = {
      indexAxis: 'y',
      scales: {
        y: {
          grid: {
            color: 'rgb(0, 0, 0, 0)'
          },
          ticks: { beginAtZero: true, maxRotation: 10 }
        },
        x: {
          grid: {
            color: 'rgb(0, 0, 0, 0)'
          },
          ticks: { beginAtZero: true }
        }
      },
      responsive: true,
      plugins: {
        dataLabels: {
          display: false
        }
      }
    }
    const optionCurrentSale = {
      indexAxis: 'y',
      scales: {
        y: {
          grid: {
            color: 'rgb(0, 0, 0, 0)'
          },
          ticks: { beginAtZero: true, maxRotation: 10 }
        },
        x: {
          grid: {
            color: 'rgb(0, 0, 0, 0)'
          },
          ticks: { beginAtZero: true }
        }
      },
      responsive: true,
      plugins: {
        dataLabels: {
          display: false
        }
      }
    }
    const optionLastMonth = {
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'left-y-axis',
          scaleLabel: {
            display: true
          },
          ticks: {
            beginAtZero: true
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'right-y-axis',
          scaleLabel: {
            display: true
          },
          ticks: {
            beginAtZero: true
          },
          grid: {
            drawOnChartArea: false,
          },
        }
      }
    }

    return {
      dashboardData,
      getDashboardData ,
      showChart,
      dataChartCurrentSale,
      optionCurrentSale,
      dataChartLastMonth,
      dataChartBusinessProfit,
      optionBusinessProfit,
      optionLastMonth}
  },

  mounted() {
    this.getDashboardData()
  },

  methods:{
    splitChar,

    toRial(price){
      try {
        const newPrice = parseInt(price) /10
        if (isNaN(newPrice)) return 0
        return newPrice.toFixed(0)
      }
      catch (e) {
        return 0
      }
    }
  }
})
</script>