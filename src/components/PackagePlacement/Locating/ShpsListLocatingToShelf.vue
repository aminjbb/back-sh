<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3">
        <span class="t20400">
          جایگذاری بسته
        </span>
      </div>
      <div class="pa-3">
        <v-icon size="30">
          mdi-chevron-left
        </v-icon>
      </div>
    </div>

    <v-card class="ma-5 br-15" min-height="196">
      <div class="d-flex justify-center my-3">
          <span class="t20400">
            اطلاعات جایگذاری
          </span>
      </div>
      <v-divider/>
      <div class="text-right my-5 px-5 d-flex justify-space-between px-10">
         <div>
           <span class="t16400">
           شماره ردیف :
            <span class="text-gray600">
              ۳۴
            </span>
          </span>
         </div>
        <div>
          <span class="t16400">
           شماره قفسه  :
            <span class="text-gray600">
              ۳۴
            </span>
          </span>
        </div>
      </div>
      <div class="text-right mt-10 px-5 d-flex justify-space-between px-10">
        <div>
           <span class="t16400">
           شماره طبقه :
            <span class="text-gray600">
              ۳۴
            </span>
          </span>
        </div>
        <div>
          <span class="t16400">
           شماره شلف   :
            <span class="text-gray600">
              ۳۴
            </span>
          </span>
        </div>
      </div>
    </v-card>

    <LocatingToShelfError v-if="error"/>
    <div class="px-5">
      <v-card min-height="92" class="d-flex justify-center align-center">
        <v-card class="ml-5 br br__12 d-flex justify-center align-center" height="52" width="52" color="primary500">
            <span class="text-white">
              1
            </span>
        </v-card>
        <span class="t16400 text-black">عدد از ۴ عدد اسکن شده</span>
      </v-card>
      <v-card class="mt-2">
        <div class="d-flex justify-center">
          <img src="@/assets/img/productImge.png" width="150" height="150" alt="">
        </div>
        <div class="text-center px-10 my-3">
          <span class="text-gray600">
            سرم روشن کننده پوست پرایم مدل C_Prime ظرفیت ۳۰ میلی لیتر
          </span>
        </div>
      </v-card>
    </div>
    <div class="bottom-box">
      <v-btn
          color="primary500"
          height="40"
          width="348"
          rounded
          class="px-8 mt-2">
        بازگشت به لیست
      </v-btn>
    </div>
    <LocatingToast/>
  </v-card>
</template>
<script>
import LocatingToShelfError from '@/components/PackagePlacement/Locating/LocatingToShelfError.vue'
import LocatingToast from '@/components/PackagePlacement/Locating/LocatingToast.vue'
export default {
  data(){
    return {
      error:false
    }
  },

  components:{
    LocatingToShelfError,
    LocatingToast
  }
}
</script>