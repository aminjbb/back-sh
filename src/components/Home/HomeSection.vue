<template>
  <section class="create-product flex-column d-flex h-100">
    <v-card class="ma-5 br-12 pb-15 flex-grow-1">
      <div  class="home-info-box scroller">
        <v-row justify="center" class="pa-10">
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="250">
              <div class="text-center my-5"> <span class="text-gray500 t14500">سفارش ها</span></div>
              <div><v-divider></v-divider></div>
              <v-row>

                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">میزان کل سفارش : </span>
                    <span class="text-primary500 t14500 number-font">{{splitChar(dashboardData?.order?.total_order)}}</span>
                  </v-row>
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">میزان سفارش ماه گذشته : </span>
                    <span class="text-primary500 t14500 number-font">{{splitChar(dashboardData?.order?.last_month_order)}}</span>
                  </v-row>
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">میزان سفارش هفته گذشته : </span>
                    <span class="text-primary500 t14500 number-font">{{splitChar(dashboardData?.order?.last_week_order)}}</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300"> سفارش روز گذشته : </span>
                    <span class="text-primary300 t14500 number-font">{{dashboardData?.order?.last_day_order}}</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="250">
              <div class="text-center my-5"> <span class="text-gray500 t14500">کاربران </span></div>
              <div><v-divider></v-divider></div>
              <v-row>

                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد کل کاربران : </span>
                    <span class="text-primary500 t14500 number-font">{{dashboardData?.user?.total_user}}</span>
                  </v-row>
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد کاربران ماه گذشته: </span>
                    <span class="text-primary500 t14500 number-font">{{dashboardData?.user?.last_month_user}}</span>
                  </v-row>
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد کاربران هفته گذشته: </span>
                    <span class="text-primary500 t14500 number-font">{{dashboardData?.user?.last_week_user}}</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300">تعداد کاربران روز گذشته: </span>
                    <span class="text-primary300 t14500 number-font">{{dashboardData?.user?.last_day_user}}</span>
                  </v-row>

                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="250">
              <div class="text-center my-5"> <span class="text-gray500 t14500">سبد خرید ها</span></div>
              <div><v-divider></v-divider></div>
              <v-row>

                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد کل سبد خرید : </span>
                    <span class="text-primary500 t14500 number-font">{{dashboardData?.basket?.total_basket}}</span>
                  </v-row>
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد سبد خرید ماه گذشته: </span>
                    <span class="text-primary500 t14500 number-font">{{dashboardData?.basket?.last_month_basket}}</span>
                  </v-row>
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد سبد خرید هفته گذشته: </span>
                    <span class="text-primary500 t14500 number-font">{{dashboardData?.basket?.last_week_basket}}</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300">تعداد سبد خرید روز گذشته: </span>
                    <span class="text-primary300 t14500 number-font">{{dashboardData?.basket?.last_day_basket}}</span>
                  </v-row>

                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="250">
              <div class="text-center my-5"> <span class="text-gray500 t14500">تیکت ها</span></div>
              <div><v-divider></v-divider></div>
              <v-row>

                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد کل تیکت ها : </span>
                    <span class="text-primary500 t14500 number-font">{{dashboardData?.ticket?.total_ticket}}</span>
                  </v-row>
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد تیکت های ماه گذشته: </span>
                    <span class="text-primary500 t14500 number-font">{{dashboardData?.ticket?.last_month_ticket}}</span>
                  </v-row>
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعدادتیکت های هفته گذشته: </span>
                    <span class="text-primary500 t14500 number-font">{{dashboardData?.ticket?.last_week_ticket}}</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300">تعداد تیکت های روز گذشته: </span>
                    <span class="text-primary300 t14500 number-font">{{dashboardData?.ticket?.last_day_ticket}}</span>
                  </v-row>

                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col  cols="12">

            <BarChart v-if="showChart" :chartData="chartData" :options="options" />

          </v-col>
        </v-row>
      </div>

    </v-card>
  </section>

</template>
<script lang="ts">
import {
  splitChar
} from "@/assets/js/functions";
import {defineComponent, ref} from 'vue';
import { BarChart ,DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import Public from '@/composables/Public'
Chart.register(...registerables);
export default defineComponent({
  name: 'Home',
  components: { BarChart ,DoughnutChart },
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
    return { options ,sellMonth ,factorTotalMonth ,totalMonth ,factorMonth ,  dashboardData, getDashboardData
      , chartData , showChart};
  },

  mounted() {
    this.getDashboardData()
  },

  methods:{
    splitChar
  }
});
</script>

