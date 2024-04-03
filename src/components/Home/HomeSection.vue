<template>
  <section class="create-product flex-column d-flex h-100">
    <div class="home-info-box scroller">
      <div class="mt-5">
        <span class="text-gray600 t14500 mx-8">تعداد سفارش </span>
        <div class="d-flex justify-space-between">
          <v-col cols="4">
            <v-card class="ma-5 px-10 py-3 flex-grow-1 rounded-lg">
              <div class="d-flex justify-space-between align-center">
                <v-col cols="6">
                  <v-row align="center" class="mt-5">
                    <div>
                      <h2>روز</h2>
                      <div class="d-flex align-end my-5">
                        <span class="text-h6 number-font">{{ dashboardData?.order?.last_day_order }}</span>
                        <span class="text-h8 text-gray500 t14300 pr-1">سفارش </span>
                      </div>
                    </div>

                  </v-row>
                </v-col>

                <v-col cols="6">
                  <v-row justify="end" align="center">
                    <img src="@/assets/img/order-box.svg" alt="order-box">
                  </v-row>
                </v-col>
              </div>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card class="ma-5 px-10 py-3 flex-grow-1 rounded-lg">
              <div class="d-flex justify-space-between align-center">
                <v-col cols="6">
                  <v-row justify="space-between" align="center" class="mt-5">
                    <div>
                      <h2>ماه</h2>
                      <div class="d-flex align-end my-5">
                        <span class="text-h6 number-font">{{ dashboardData?.order?.last_month_order }}</span>
                        <span class="text-h8 text-gray500 t14300 pr-1">سفارش </span>
                      </div>
                    </div>

                  </v-row>
                </v-col>

                <v-col cols="6">
                  <v-row justify="end" align="center">
                    <img src="@/assets/img/resived-box.svg" alt="resived-box">
                  </v-row>
                </v-col>
              </div>

            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card class="ma-5 px-10 py-3 flex-grow-1 rounded-lg">
              <div class="d-flex justify-space-between align-center">
                <v-col cols="6">
                  <v-row justify="space-between" align="center" class="mt-5">
                    <div>
                      <h2>سال</h2>
                      <div class="d-flex align-end my-5">
                        <span class="text-h6 number-font">{{ dashboardData?.order?.last_year_order }}</span>
                        <span class="text-h8 text-gray500 t14300 pr-1">سفارش </span>
                      </div>
                    </div>

                  </v-row>
                </v-col>

                <v-col cols="6">
                  <v-row justify="end" align="center">
                    <img src="@/assets/img/shopping-box.svg" alt="shopping-box">
                  </v-row>
                </v-col>
              </div>

            </v-card>
          </v-col>

        </div>
      </div>

      <div class="d-flex justify-space-between">
        <v-col cols="6">
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg" height="203">
            <span class="text-gray600 t14500">فروش جاری</span>
            <v-col cols="12">
              <BarChart v-if="showChart" :chart-data="dataChartCurrentSale" :options="optionCurrentSale" :height="145"/>
            </v-col>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">درگاه</span>
            <div class="d-flex justify-space-between align-center">
              <v-col cols="6">
                <v-row justify="space-between" align="center" class="my-3">
                  <span class="text-gray500 t14300">تعداد کاربر: </span>
                  <div class="d-flex justify-start">
                    <span class="t14500 number-font">{{ dashboardData?.payment_in_progress?.user_count }}</span>
                    <span class="text-gray500 t14300 pr-2">کاربر</span>
                  </div>
                </v-row>
                <v-row justify="space-between" align="center" class="my-3">
                  <span class="text-gray500 t14300">تعداد آیتم: </span>
                  <div  class="d-flex justify-start">
                    <span class="t14500 number-font">{{ dashboardData?.payment_in_progress?.item_count }}</span>
                    <span class="text-gray500 t14300 pr-2">آیتم</span>
                  </div>
                </v-row>
                <v-row justify="space-between" align="center">
                  <span class="text-gray500 t14300">ارزش سفارشات: </span>
                  <div  class="d-flex justify-start">
                    <span class="t14500 number-font">{{ splitChar(dashboardData?.payment_in_progress?.order_value) }}</span>
                    <span class="text-gray500 t14300 pr-2">تومان</span>
                  </div>
                </v-row>
              </v-col>

              <v-col cols="6">
                <v-row justify="end" align="center">
                  <img src="@/assets/img/wallet.svg" alt="wallet">
                </v-row>
              </v-col>
            </div>
          </v-card>
        </v-col>
      </div>

      <div class="d-flex justify-space-between">
        <v-col cols="6" class="d-flex justify-space-between">
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">موجودی</span>
            <v-col cols="12">
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">انبار: </span>
                <div class="d-flex justify-start">
                  <span class="t14500 number-font">{{ dashboardData?.stock?.warehouse }}</span>
                  <span class="text-gray500 t14300 pr-2">آیتم</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">سایت: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">{{ dashboardData?.stock?.site }}</span>
                  <span class="text-gray500 t14300 pr-2">آیتم</span>
                </div>
              </v-row>
            </v-col>
          </v-card>
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">ارزش انبار</span>
            <v-col cols="12">
              <v-row justify="end" align="center" class="my-3">
                <span class="t14500 number-font">{{ splitChar(dashboardData?.warehouse?.value) }}</span>
              </v-row>
              <v-row justify="end" align="center" class="my-3">
                <span class="text-gray500 t14300">تومان</span>
              </v-row>
            </v-col>
          </v-card>
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">خروج انبار</span>
            <v-col cols="12">
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">روز: </span>
                <div class="d-flex justify-start">
                  <span class="t14500 number-font">{{dashboardData?.warehouse?.exit?.day}}</span>
                  <span class="text-gray500 t14300 pr-2">سفارش</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">{{dashboardData?.warehouse?.exit?.month}}</span>
                  <span class="text-gray500 t14300 pr-2">سفارش</span>
                </div>
              </v-row>
            </v-col>
          </v-card>
        </v-col>

        <v-col cols="6" class="d-flex justify-space-between flex-grow-1">
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">کاربر فعال</span>
            <div class="d-flex justify-space-between align-center">
              <v-col cols="7">
                <v-row align="start">
                  <span class="t14500 number-font">{{ dashboardData?.user?.active }}</span>
                </v-row>
                <v-row align="start">
                  <span class="text-gray500 t14300">کاربر</span>
                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row justify="end" align="center">
                  <img src="@/assets/img/male.svg" alt="male">
                </v-row>
              </v-col>
            </div>


          </v-card>
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">خریدار</span>
            <div class="d-flex justify-space-between align-center">
              <v-col cols="7">
                <v-row align="start">
                  <span class="t14500 number-font">{{ dashboardData?.user?.with_orders }}</span>
                </v-row>
                <v-row align="start">
                  <span class="text-gray500 t14300">کاربر</span>
                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row justify="end" align="center">
                  <img src="@/assets/img/female.svg" alt="female">
                </v-row>
              </v-col>
            </div>


          </v-card>
        </v-col>
      </div>

      <div class="d-flex justify-space-between">
        <v-col cols="6">
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg" height="205">
            <span class="text-gray600 t14500">سود بازرگانی</span>
            <div class="d-flex justify-space-between align-center">
              <v-col cols="12">
                <BarChart v-if="showChart" :chart-data="dataChartBusinessProfit" :options="optionBusinessProfit" :height="145"/>
              </v-col>
            </div>
          </v-card>
        </v-col>

        <v-col cols="6" class="d-flex justify-space-between">
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">تخفیف پایه</span>
            <v-col cols="12">
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">روز: </span>
                <div class="d-flex justify-start">
                  <span class="t14500 number-font">{{splitChar(dashboardData?.discount?.base?.day)}}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">{{ splitChar(dashboardData?.discount?.base?.month) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </v-row>
            </v-col>
          </v-card>

          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">تخفیف مارکتینگ</span>
            <v-col cols="12">
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">روز: </span>
                <div class="d-flex justify-start">
                  <span class="t14500 number-font">{{ splitChar(dashboardData?.discount?.marketing?.day) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">{{ splitChar(dashboardData?.discount?.marketing?.month) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </v-row>
            </v-col>
          </v-card>

          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">کد تخفیف</span>
            <v-col cols="12">
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">روز: </span>
                <div class="d-flex justify-start">
                  <span class="t14500 number-font">{{ splitChar(dashboardData?.discount?.voucher?.day) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">{{ splitChar(dashboardData?.discount?.voucher?.month) }}</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </v-row>
            </v-col>
          </v-card>
        </v-col>
      </div>

      <div>
        <span class="text-gray600 t14500 mx-8">سفارشات ماه گذشته </span>
        <v-col cols="12">
          <v-card class="ma-5 px-10 py-5 flex-grow-1 rounded-lg">
           <v-col cols="12">
             <LineChart v-if="showChart" :chart-data="dataChartLastMonth" :options="optionLastMonth"/>
           </v-col>
          </v-card>
        </v-col>
      </div>
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
    };
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
    };
    const optionLastMonth = {
      type: 'line',
      data: dataChartLastMonth,
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            grid: {
              drawOnChartArea: false,
            },
          },
        }
      },
    };

    return { dashboardData, getDashboardData , showChart, dataChartCurrentSale, optionCurrentSale,
      dataChartLastMonth, dataChartBusinessProfit, optionBusinessProfit, optionLastMonth};
  },

  mounted() {
    this.getDashboardData()
  },

  methods:{
    splitChar
  }
})
</script>