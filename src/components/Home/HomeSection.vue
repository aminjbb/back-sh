<template>
  <section class="create-product flex-column d-flex h-100">
    <v-card class="ma-5 br-12 pb-15 flex-grow-1">
      <div  class="home-info-box scroller">
        <v-row justify="center" class="pa-10">
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">15 مهر ماه</span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="3">
                  <DoughnutChart :chartData="sellMonth"  />
                </v-col>
                <v-col cols="9">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">میزان فروش : </span>
                    <span class="text-primary500 t14500 number-font">15,000,000,000</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300"> فروش گذشته : </span>
                    <span class="text-primary300 t14500 number-font">18,000,000,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">15 مهر ماه</span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="3">
                  <DoughnutChart :chartData="factorMonth"  />
                </v-col>
                <v-col cols="9">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد فاکتور : </span>
                    <span class="text-primary500 t14500 number-font">125,000</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300"> فاکتور گذشته : </span>
                    <span class="text-primary300 t14500 number-font">120,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">آمار کلی ماه جاری</span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="3">
                  <DoughnutChart :chartData="totalMonth"  />
                </v-col>
                <v-col cols="9">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300"> فروش : </span>
                    <span class="text-primary500 t14500 number-font">190,200,000,000</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300"> کل فروش گذشته : </span>
                    <span class="text-primary300 t14500 number-font">15,000,000,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">آمار کلی ماه جاری</span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="3">
                  <DoughnutChart :chartData="factorTotalMonth"  />
                </v-col>
                <v-col cols="9">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">کل فاکتور ها : </span>
                    <span class="text-primary500 t14500 number-font">15,000,000,000</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300"> فاکتور ها ی گذشته : </span>
                    <span class="text-primary300 t14500 number-font">15,000,000,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">تعداد کابران</span></div>
              <div><v-divider></v-divider></div>
              <v-row>

                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">کل کاربران : </span>
                    <span class="text-primary500 t14500 number-font">15,000</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300">کاربران دارای سفارش : </span>
                    <span class="text-primary500 t14500 number-font">10,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">آخرین سفارش</span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">شناسه : </span>
                    <span class="text-primary500 t14500 number-font">shvz-15477</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-5">
                    <span class="text-gray500 t14300">زمان : </span>
                    <span class="text-primary500 t14500 number-font">12:55</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-5">
                    <span class="text-gray500 t14300">کاربر : </span>
                    <span class="text-primary500 t14500 number-font">امین جباری</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500"> اطلاعات انبار</span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">میزان انبار : </span>
                    <span class="text-primary500 t14500 number-font">85,000</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300">ارزش کل انبار : </span>
                    <span class="text-primary500 t14500 number-font">50,000,000,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">آخرین کالای موجود شده</span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">نام کالا : </span>
                    <span class="text-primary500 t14500 number-font">رژ لب</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300">تعداد : </span>
                    <span class="text-primary500 t14500 number-font">10,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">حواله های صادر شده</span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد حواله : </span>
                    <span class="text-primary500 t14500 number-font">550</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300">ارزش حواله : </span>
                    <span class="text-primary500 t14500 number-font">25,680,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">سبد خرید ها</span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300">تعداد سبد خریذ ها : </span>
                    <span class="text-primary500 t14500 number-font">890</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300">ارزش حواله : </span>
                    <span class="text-primary500 t14500 number-font">98,580,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">سود بارزگانی </span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300"> امروز : </span>
                    <span class="text-primary500 t14500 number-font">190,200,000,000</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300"> ماه گدشته : </span>
                    <span class="text-primary500 t14500 number-font">15,000,000,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card class="ma-5 br-12" min-height="200">
              <div class="text-center my-5"> <span class="text-gray500 t14500">سود کل </span></div>
              <div><v-divider></v-divider></div>
              <v-row>
                <v-col cols="12">
                  <v-row justify="space-between" align="center" class="px-10 mt-5">
                    <span class="text-gray500 t14300"> امروز : </span>
                    <span class="text-primary500 t14500 number-font">290,895,350,000</span>
                  </v-row>
                  <v-row justify="space-between" class="px-10 mt-8">
                    <span class="text-gray500 t14300"> ماه گدشته : </span>
                    <span class="text-primary500 t14500 number-font">260,803,200,000</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col  cols="12">
            <BarChart :chartData="testData" :options="options" />

          </v-col>
        </v-row>
      </div>

    </v-card>
  </section>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BarChart ,DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  components: { BarChart ,DoughnutChart },
  setup() {
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

    const testData = {
      labels: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      datasets: [
        {
          data: [1850000, 1950000, 1620000, 1200000, 182000 ,1850000, 1950000, 1620000, 1200000, 182000],
          backgroundColor: ['#AD1457', '#880E4F', '#C51162', '#EC407A', '#FCE4EC','#AD1457', '#880E4F', '#C51162', '#EC407A', '#FCE4EC'],
        },
      ],
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
    return { testData ,options ,sellMonth ,factorTotalMonth ,totalMonth ,factorMonth};
  },
});
</script>

