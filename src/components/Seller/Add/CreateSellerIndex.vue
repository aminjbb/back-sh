<template>
  <v-card class="mt-5 h-100vh">
      <v-row justify="center" class="pa-15">
        <v-col cols="6">
          <v-card variant="outlined" color="#E0E0E0"  min-height="304">
            <div class="d-flex justify-center">
              <img src="@/assets/img/NaturalSelle.png" alt="">
            </div>

            <div class="text-right px-10">
              <span class="t14 w500 text-DarkJungle">
                فروشنده حقیقی
              </span>
            </div>
            <div class="text-justify px-10 mt-3">
              <p class="t14 w300 text-CharcoalGrey">
                فروشنده حقیقی، یک فرد است که مشخصاتی مانند نام، نام خانوادگی، تاریخ تولد، کد ملی، شماره شناسنامه و... دارد، اما شرکت و کد اقتصادی ندارد.
              </p>
            </div>
            <div class="d-flex justify-end pa-5" >
              <v-btn @click="$router.push('/seller/create/natural-seller')" color="primary500" rounded>
                <span class="text-white t12 w500">
                  ثبت فروشنده حقیقی
                </span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card variant="outlined" color="#E0E0E0" min-height="304">
            <div class="d-flex justify-center">
              <img src="@/assets/img/legalSeller.png" alt="">
            </div>

            <div class="text-right px-10">
              <span class="t14 w500 text-DarkJungle">
                فروشنده حقوقی
              </span>
            </div>
            <div class="text-justify px-10 mt-3">
              <p class="t14 w300 text-CharcoalGrey">
                فروشنده حقوقی یک موسسه یا شرکت است که به صورت قانونی ثبت شده و مشخصاتی مانند تاریخ ثبت، شماره ثبت، کد شناسایی و کد اقتصادی دارد.
              </p>
            </div>
            <div class="d-flex justify-end pa-5" >
              <v-btn @click="$router.push('/seller/create/legal-seller')" color="primary500" rounded>
                <span class="text-white t12 w500">
                  ثبت فروشنده حقوقی
                </span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>

</script>