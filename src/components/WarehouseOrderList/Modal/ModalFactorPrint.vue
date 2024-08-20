<template>
  <div class="text-right ">

    <v-dialog v-model="dialog" width="1060">
      <v-card class="pb-10 d--rtl">
        <div class="px-5 pt-8 text-right">
          <img src="@/assets/img/shavaz-logo2.png" width="56" class="mb-5 mr-7" alt="shavaz image">
        </div>
        <div class="text-center mb-5 t16 w700">
          صورت حساب الکترونیکی فروش
        </div>
        <div>
          <v-row justify="end" class="px-6">
             <v-col cols="1" class="pa-1">
               <div class="border-header-box bg-gray200">
                  <span class="rotate-span text-center mt-4 mr-3 t12 w500">
                    حق العمل کار
                  </span>

               </div>
             </v-col>
            <v-col cols="7" class="pa-1">
              <div class="border-header-box">
                <div class="d-flex justify-space-between pa-2">
                  <div class="t11 w500">
                    نام فروشگاه : {{ factorDetail.company_name }}
                  </div>
                  <div class="t11 w500">
                    شناسه ملی : {{ factorDetail.identification_code }}
                  </div>
                  <div class="t11 w500">
                    شماره ثبت : {{ factorDetail.company_registration_number }}
                  </div>
                  <div class="t11 w500">
                    شماره اقتصادی : {{ factorDetail.economic_code }}
                  </div>
                </div>
                <div class="d-flex justify-space-between pa-2">
                  <div class="t11 w500">
                    نشانی شرکت : {{ factorDetail.address }}
                  </div>
                  <div class="t11 w500">
                    کد پستی : {{factorDetail.postal_code}}
                  </div>
                  <div class="t11 w500">
                    تلفن : {{ factorDetail.phone }}
                  </div>

                </div>
              </div>
            </v-col>
            <v-col cols="4" class="pa-1">
            <div class="border-header-box pa-1">
              <div class="d-flex justify-space-between">
                <span class="t11 w500">
                  شماره فاکتور :
                </span>

                <span class="t11 w500 number-font">
                  {{ factorDetail.order_factor_id }}
                </span>
              </div>
              <div class="d-flex justify-space-between mt-1">
                <span class="t11 w500">
                  تاریخ :
                </span>

                <span class="t11 w500 number-font">
                  {{ factorDetail.created_at_fa }}
                </span>
              </div>
              <div class="d-flex justify-space-between mt-1">
                <span class="t11 w500">
                  پیگیری :
                </span>

                <span class="t11 w500 number-font">
                 {{ factorDetail.order_factor_id }}
                </span>
              </div>
            </div>
          </v-col>

          </v-row>
          <v-row justify="end" class="px-6">

            <v-col cols="1" class="pa-1">
              <div class="border-header-box bg-gray200">
                  <span class="rotate-span text-center mt-6 mr-3 t12 w500">
                    خریدار
                  </span>
              </div>
            </v-col>
            <v-col cols="7" class="pa-1">
              <div class="border-header-box">
                <div class="d-flex justify-space-between pt-1 px-2">
                  <div class="t11 w500">
                    خریدار :  {{ factorUser.first_name }} {{ factorUser.last_name }}
                  </div>
                  <div class="t11 w500">
                    شماره اقتصادی/شماره ملی : {{ factorUser.national_code }}
                  </div>
                  <div class="t11 w500">
                    شناسه ملی : {{ factorUser.national_code }}
                  </div>
                  <div class="t11 w500">
                    شماره ثبت : {{ factorUser.id }}
                  </div>
                </div>
                <div class="text-right t11 w500 pt-1 px-2">
                  نشانی : {{ factorDetail?.state?.label }} - {{ factorDetail?.city?.label }} - نبش خیابان بیست و یکم - پلاک ۲۳
                </div>
                <div class="d-flex justify-space-between pt-1 px-2">
                  <div class="t11 w500">
                    شماره تماس : {{ factorUser?.phone_number }}
                  </div>
                  <div class="t11 w500 ml-15 pl-15">
                    کد پستی : ۰۰۲۳۴۸۷۸۷
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="4" class="pa-1">
              <div class="border-header-box pa-1">
                <div class="d-flex justify-space-between">
                <span class="t11 w500">
                 شماره مالیاتی :
                </span>

                  <span class="t11 w500 number-font">
                  {{ factorDetail.tax_code }}
                </span>
                </div>
                <div class="d-flex justify-space-between mt-1">
                <span class="t11 w500">
                  سریال حافظه مالیاتی :
                </span>

                  <span class="t11 w500 number-font">
                  {{ factorDetail?.tax_memory_code }}
                </span>
                </div>
                <div class="d-flex justify-space-between mt-1">
                <span class="t11 w500">
                 سریال پایانه فروشگاهی :
                </span>

                  <span class="t11 w500 number-font">
                  {{ factorDetail?.shopping_terminal_code }}
                </span>
                </div>
              </div>
            </v-col>

          </v-row>
          <v-row justify="end" class="px-6">
            <v-col cols="1" class="px-0">
              <div class="border-header-box bg-gray200 d-flex justify-center align-center">
                <span class="t11600">
                  ردیف
                </span>
              </div>
            </v-col>

            <v-col cols="1" class="px-0">
              <div class="border-header-box bg-gray200 d-flex justify-center align-center px-10 text-center">
                <span class="t11600">
                  شناسه کالا
                </span>
              </div>
            </v-col>
            <v-col cols="3" class="px-0">
              <div class="border-header-box bg-gray200  d-flex justify-center align-center text-center">
                  <span class="t11600">
                    نام کالا
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0">
              <div class="border-header-box bg-gray200 d-flex justify-center align-center">
                  <span class="t11600">
                    تعداد
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0">
              <div class="border-header-box bg-gray200 d-flex justify-center align-center text-center">
                  <span class="t11600">
                   مبلغ واحد (ریال)
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0">
              <div class="border-header-box bg-gray200 d-flex justify-center align-center text-center px-5">
                <span class="t1160">
                  مبلغ کل (ریال)
                </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0">
              <div class="border-header-box bg-gray200 d-flex justify-center align-center text-center px-5">
                  <span class="t11600">
                   تخفیف (ریال)
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0">
              <div class="border-header-box bg-gray200 d-flex justify-center align-center text-center">
                  <span class="t11600">
                   مبلغ کل پس از تخفیف (ریال)
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0">
              <div class="border-header-box bg-gray200 d-flex justify-center align-center text-center">
                  <span class="t11600">
                   جمع مالیات وعوارض ارزش افزوده (ریال)
                  </span>
              </div>
            </v-col>

             <v-col cols="1" class="px-0">
               <div class="border-header-box bg-gray200 d-flex justify-center align-center text-center">
                  <span class="t11600">
                 جمع کل پس از تخفیف و مالیاتو عوارض (ریال)
                  </span>
               </div>
             </v-col>



          </v-row>
          <v-row v-for="(item , index) in factorDetail?.shavaz?.data" justify="end" class="px-6 mt-0">
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box  d-flex justify-center align-center">
                  <span class="t11 w500">
                    {{ item.id }}
                  </span>
              </div>
            </v-col>

            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center">
                <span class="t11 w500 px-1">
                 {{ item?.shps?.id }}
                </span>
              </div>
            </v-col>
            <v-col cols="3" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center px-2">
                <span class="t11 w500 px-1">
                   {{ item?.shps?.sku?.label }}
                </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box  d-flex justify-center align-center px-2 text-center">
                  <span class="t11 w500">
                      {{ item.count }}
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center px-2">
                  <span class="t11 w500 number-font">
                    {{ splitChar(item?.price) }}
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11 w500 number-font">
                     {{ splitChar(item?.total_price) }}
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11 w500 number-font">
                   {{splitChar(item.discount) }}
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11 w500 number-font">
                  {{splitChar(item.total_price_after_discount) }}
                  </span>
              </div>
            </v-col>

             <v-col cols="1" class="px-0 pt-0">
               <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11 w500 number-font">
                      {{splitChar(item.total_price_after_tax) }}
                  </span>
               </div>
             </v-col>
              <v-col cols="1" class="px-0 pt-0">
                <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11 w500 number-font">
                    {{splitChar(item.total_price) }}
                  </span>
                </div>
              </v-col>


          </v-row>
            <!--sum-->
          <v-row justify="end" class="px-6 mt-0" >

            <v-col cols="6" class="px-0 pt-0">
              <div class="border-header-sum bg-gray200">

              </div>
            </v-col>
            <v-col cols="5" class="px-0 pt-0">
              <div class="border-header-sum bg-gray200 text-right">
                <span class="t11 w500">
                  جمع کل پس از کسر تخفیف با احتساب مالیات و عوارض (ریال) :
                </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-sum bg-gray200 text-center">
                  <span class="t11 w500 number-font">
                   {{ splitChar(factorDetail?.shavaz?.sum_total_price_after_discount)}}
                  </span>
              </div>
            </v-col>




          </v-row>

          <v-row justify="end" class="px-6 mt-0" >

            <v-col cols="6" class="px-0 pt-0">
              <div class="border-header-sum bg-gray200">

              </div>
            </v-col>
            <v-col cols="5" class="px-0 pt-0">
              <div class="border-header-sum bg-gray200 text-right">
                <span class="t11 w500">
                  جمع کل پس از کسر تخفیف با احتساب مالیات و عوارض (ریال) :
                </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-sum bg-gray200 text-center">
                  <span class="t11 w500 number-font">
                   {{ splitChar(factorDetail?.shavaz?.sum_total_price_after_discount)}}
                  </span>
              </div>
            </v-col>




          </v-row>

          <div class="px-3">
            <div class="factor-footer">
              <div class="d-flex justify-space-between px-5 pt-2">
                 <div>
                    <span class="t11 w500">
                      مهر و امضای فروشنده :
                     </span>
                 </div>
                <div>
                  <div>
                    <span class="t11 w500">
                      تاریخ تحویل :
                    </span>
                  </div>
                  <div>
                    <span class="t11 w500 number-font">
                       1402/09/23
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span class="t11 w500">
                       روش های پرداخت :
                    </span>
                  </div>
                  <div>
                    <span class="t11 w500 number-font">
                      نقدی:13,000,000
                    </span>
                  </div>

                </div>
                <div>
                    <span class="t11 w500">
                      مهر و امضای خریدار :
                    </span>
                </div>
                <div>
                    <span class="t11 w500">
                     بارکد
                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-row class="justify-between my-2 mx-2">
          <v-col cols="3" class="d-flex justify-end mx-10">
            <btn
                class="mt-3 mr-2"
                @click="close()"
                style="cursor: pointer;">
              انصراف
            </btn>
          </v-col>
          <v-col cols="3" class="d-flex mx-10 ">
            <v-btn
                @click="print()"
                height="40"
                rounded
                variant="outlined"
                prepend-icon="mdi-printer-outline"
                class="px-5 mt-1">
              پرینت فاکتور
            </v-btn>
          </v-col>

        </v-row>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>

import {splitChar} from "../../../assets/js/functions";

export default {
  data(){
    return{

    }
  },
  methods: {
    splitChar,
    print() {
      // this.close()
      window.open(`${ import.meta.env.VITE_API_SITEURL}warehouse-orders/1/print`, '_blank');


    },
    close() {
      const form = {
        dialog: false,
        object: ''
      }
      this.$store.commit('set_modalWarehouseOrdersFactor', form)
    },

  },

  computed: {
    dialog() {
      return this.$store.getters['get_modalWarehouseOrdersFactor']
    },
    factorDetail() {
      return this.$store.getters['get_modalWarehouseOrdersFactorObject']
    },

    factorUser(){
      try {
        return this.factorDetail.user[0]
      }
      catch (e) {
        return ''
      }
    }
  }
}
</script>

<style>
.border-header-box{
  border: 1px solid #000;
  min-height: 72px;


}
.border-header-sum{
  border: 1px solid #000;
  min-height: 25px;

}
.factor-footer{
  margin-top: 0;
  border: 1px solid #000;
  height: 102px;

}
.rotate-span{
  transform: rotate(270deg) !important;
  display: block;
  width: 53px;
}
</style>
