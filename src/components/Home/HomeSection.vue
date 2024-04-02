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
                  <v-row justify="space-between" align="center" class="mt-5">
                    <div>
                      <span class="text-h5 font-weight-medium">روز</span>
                      <div class="d-flex align-end my-5">
                        <span class="text-h6 number-font">875</span>
                        <span class="text-h8 text-gray500 t14300 pr-1">سفارش </span>
                      </div>
                    </div>

                  </v-row>
                </v-col>

                <v-col cols="6">
                  <v-row justify="end" align="center">
                    <img class="" src="@/assets/img/order-box.svg">
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
                      <span class="text-h5 font-weight-medium">ماه</span>
                      <div class="d-flex align-end my-5">
                        <span class="text-h6 number-font">28,495</span>
                        <span class="text-h8 text-gray500 t14300 pr-1">سفارش </span>
                      </div>
                    </div>

                  </v-row>
                </v-col>

                <v-col cols="6">
                  <v-row justify="end" align="center">
                    <img class="" src="@/assets/img/resived-box.svg">
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
                      <span class="text-h5 font-weight-medium">سال</span>
                      <div class="d-flex align-end my-5">
                        <span class="text-h6 number-font">9,483,726,464</span>
                        <span class="text-h8 text-gray500 t14300 pr-1">سفارش </span>
                      </div>
                    </div>

                  </v-row>
                </v-col>

                <v-col cols="6">
                  <v-row justify="end" align="center">
                    <img class="" src="@/assets/img/shopping-box.svg">
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
            <v-col cols="12" class="">
              <BarChart :chart-data="dataChartCurrentSale" :options="optionCurrentSale" :height="145"/>
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
                    <span class="t14500 number-font">24</span>
                    <span class="text-gray500 t14300 pr-2">کاربر</span>
                  </div>
                </v-row>
                <v-row justify="space-between" align="center" class="my-3">
                  <span class="text-gray500 t14300">تعداد آیتم: </span>
                  <div  class="d-flex justify-start">
                    <span class="t14500 number-font">17389</span>
                    <span class="text-gray500 t14300 pr-2">آیتم</span>
                  </div>
                </v-row>
                <v-row justify="space-between" align="center">
                  <span class="text-gray500 t14300">ارزش سفارشات: </span>
                  <div  class="d-flex justify-start">
                    <span class="t14500 number-font">24</span>
                    <span class="text-gray500 t14300 pr-2">تومان</span>
                  </div>
                </v-row>
              </v-col>

              <v-col cols="6">
                <v-row justify="end" align="center">
                  <img class="" src="@/assets/img/wallet.svg">
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
                  <span class="t14500 number-font">167096</span>
                  <span class="text-gray500 t14300 pr-2">آیتم</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">سایت: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">17389</span>
                  <span class="text-gray500 t14300 pr-2">آیتم</span>
                </div>
              </v-row>
            </v-col>
          </v-card>
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">ارزش انبار</span>
            <v-col cols="12">
              <v-row justify="space-between" align="center" class="my-3">
                <span class="t14500 number-font">373,985,798,973</span>
              </v-row>
              <v-row justify="start" align="center" class="my-3">
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
                  <span class="t14500 number-font">875</span>
                  <span class="text-gray500 t14300 pr-2">سفارش</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">17389</span>
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
                <v-row align="center">
                  <span class="t14500 number-font">726916789</span>
                  <span class="text-gray500 t14300 pr-2">کاربر</span>
                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row justify="end" align="center">
                  <img class="" src="@/assets/img/male.svg">
                </v-row>
              </v-col>
            </div>


          </v-card>
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">خریدار</span>
            <div class="d-flex justify-space-between align-center">
              <v-col cols="7">
                <v-row align="center">
                  <span class="t14500 number-font">726916789</span>
                  <span class="text-gray500 t14300 pr-2">کاربر</span>
                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row justify="end" align="center">
                  <img class="" src="@/assets/img/female.svg">
                </v-row>
              </v-col>
            </div>


          </v-card>
        </v-col>
      </div>

      <div class="d-flex justify-space-between">
        <v-col cols="6">
          <v-card class="ma-5 px-5 py-5 flex-grow-1 rounded-lg">
            <span class="text-gray600 t14500">سود بازرگانی</span>
            <div class="d-flex justify-space-between align-center">
              <v-col cols="12" class="">
                <BarChart :chart-data="dataChartCurrentSale" :options="optionCurrentSale" :height="145"/>
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
                  <span class="t14500 number-font">14,731,086</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">2,536,021,933</span>
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
                  <span class="t14500 number-font">14,731,086</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">2,536,021,933</span>
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
                  <span class="t14500 number-font">14,731,086</span>
                  <span class="text-gray500 t14300 pr-2">تومان</span>
                </div>
              </v-row>
              <v-row justify="space-between" align="center" class="my-3">
                <span class="text-gray500 t14300">ماه: </span>
                <div  class="d-flex justify-start">
                  <span class="t14500 number-font">2,536,021,933</span>
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
             <LineChart :chart-data="dataChartLastMonth"/>
           </v-col>
          </v-card>
        </v-col>
      </div>
    </div>











<!--    <v-card class="ma-5 br-12 pb-15 flex-grow-1">-->
<!--      <div  class="home-info-box scroller">-->
<!--        <v-row justify="center" class="pa-10">-->
<!--          <v-col md="6" cols="12">-->
<!--            <v-card class="ma-5 br-12" min-height="250">-->
<!--              <div class="text-center my-5"> <span class="text-gray500 t14500">سفارش ها</span></div>-->
<!--              <div><v-divider></v-divider></div>-->
<!--              <v-row>-->

<!--                <v-col cols="12">-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">میزان کل سفارش : </span>-->
<!--                    <img class="" src="@/assets/img/order-box.svg">-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">میزان سفارش ماه گذشته : </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{splitChar(dashboardData?.order?.last_month_order)}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">میزان سفارش هفته گذشته : </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{splitChar(dashboardData?.order?.last_week_order)}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" class="px-10 mt-8">-->
<!--                    <span class="text-gray500 t14300"> سفارش روز گذشته : </span>-->
<!--                    <span class="text-primary300 t14500 number-font">{{dashboardData?.order?.last_day_order}}</span>-->
<!--                  </v-row>-->
<!--                </v-col>-->
<!--              </v-row>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--          <v-col md="6" cols="12">-->
<!--            <v-card class="ma-5 br-12" min-height="250">-->
<!--              <div class="text-center my-5"> <span class="text-gray500 t14500">کاربران </span></div>-->
<!--              <div><v-divider></v-divider></div>-->
<!--              <v-row>-->

<!--                <v-col cols="12">-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">تعداد کل کاربران : </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{dashboardData?.user?.total_user}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">تعداد کاربران ماه گذشته: </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{dashboardData?.user?.last_month_user}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">تعداد کاربران هفته گذشته: </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{dashboardData?.user?.last_week_user}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" class="px-10 mt-8">-->
<!--                    <span class="text-gray500 t14300">تعداد کاربران روز گذشته: </span>-->
<!--                    <span class="text-primary300 t14500 number-font">{{dashboardData?.user?.last_day_user}}</span>-->
<!--                  </v-row>-->

<!--                </v-col>-->
<!--              </v-row>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--          <v-col md="6" cols="12">-->
<!--            <v-card class="ma-5 br-12" min-height="250">-->
<!--              <div class="text-center my-5"> <span class="text-gray500 t14500">سبد خرید ها</span></div>-->
<!--              <div><v-divider></v-divider></div>-->
<!--              <v-row>-->

<!--                <v-col cols="12">-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">تعداد کل سبد خرید : </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{dashboardData?.basket?.total_basket}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">تعداد سبد خرید ماه گذشته: </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{dashboardData?.basket?.last_month_basket}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">تعداد سبد خرید هفته گذشته: </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{dashboardData?.basket?.last_week_basket}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" class="px-10 mt-8">-->
<!--                    <span class="text-gray500 t14300">تعداد سبد خرید روز گذشته: </span>-->
<!--                    <span class="text-primary300 t14500 number-font">{{dashboardData?.basket?.last_day_basket}}</span>-->
<!--                  </v-row>-->

<!--                </v-col>-->
<!--              </v-row>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--          <v-col md="6" cols="12">-->
<!--            <v-card class="ma-5 br-12" min-height="250">-->
<!--              <div class="text-center my-5"> <span class="text-gray500 t14500">تیکت ها</span></div>-->
<!--              <div><v-divider></v-divider></div>-->
<!--              <v-row>-->

<!--                <v-col cols="12">-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">تعداد کل تیکت ها : </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{dashboardData?.ticket?.total_ticket}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">تعداد تیکت های ماه گذشته: </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{dashboardData?.ticket?.last_month_ticket}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" align="center" class="px-10 mt-5">-->
<!--                    <span class="text-gray500 t14300">تعدادتیکت های هفته گذشته: </span>-->
<!--                    <span class="text-primary500 t14500 number-font">{{dashboardData?.ticket?.last_week_ticket}}</span>-->
<!--                  </v-row>-->
<!--                  <v-row justify="space-between" class="px-10 mt-8">-->
<!--                    <span class="text-gray500 t14300">تعداد تیکت های روز گذشته: </span>-->
<!--                    <span class="text-primary300 t14500 number-font">{{dashboardData?.ticket?.last_day_ticket}}</span>-->
<!--                  </v-row>-->

<!--                </v-col>-->
<!--              </v-row>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--          <v-col  cols="12">-->

<!--            <BarChart v-if="showChart" :chartData="chartData" :options="options" />-->

<!--          </v-col>-->
<!--        </v-row>-->
<!--      </div>-->

<!--    </v-card>-->
  </section>

</template>
<script lang="ts">
import {
  splitChar
} from "@/assets/js/functions";
import {defineComponent, ref} from 'vue';
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
      chartData,
      showChart
    } = new Public()
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'میزان فروش 10 روز گذشته',
        },
      },
    };


    const sellMonth = {
      labels: [],
      datasets: [
        {
          data: [15000000000, 18000000000],
          backgroundColor: ['#E91E63', '#9c5788'],
        },
      ],

    };
    const factorMonth = {
      labels: [],
      datasets: [
        {
          data: [125000, 12000],
          backgroundColor: ['#E91E63', '#9c5788'],
        },
      ],

    };
    const totalMonth = {
      labels: [],
      datasets: [
        {
          data: [190200000000, 15000000000],
          backgroundColor: ['#E91E63', '#9c5788'],
        },
      ],

    };
    const factorTotalMonth = {
      labels: [],
      datasets: [
        {
          data: [2560, 2840],
          backgroundColor: ['#E91E63', '#9c5788'],
        },
      ],

    };

    const dataChartCurrentSale = {
      labels: ['ماه', 'روز'],
      datasets: [{
        axis: 'x',
        data: [65, 59],
        backgroundColor: [
          'rgba(103, 58, 183, 1)',
          'rgba(215, 38, 133, 1)',
        ],
        borderColor: [
          'rgba(103, 58, 183, 1)',
          'rgba(215, 38, 133, 1)',
        ],
        borderWidth: 1
      }]
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


    const dataChartLastMonth = {
      labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر','مرداد'],
      datasets: [{
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          'rgba(215, 38, 133, 1)',
          'rgba(33, 150, 243, 1)',
        ],
        borderColor: [
          'rgba(215, 38, 133, 1)',
          'rgba(33, 150, 243, 1)',
        ],
        borderWidth: 1
      }]
    };

    return { options ,sellMonth ,factorTotalMonth ,totalMonth ,factorMonth ,  dashboardData, getDashboardData
      , chartData , showChart, dataChartCurrentSale, optionCurrentSale, dataChartLastMonth};
  },

  mounted() {
    this.getDashboardData()
  },

  methods:{
    splitChar
  }
});
</script>