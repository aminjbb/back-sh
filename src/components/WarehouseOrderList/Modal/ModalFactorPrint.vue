<template>
  <div class="text-right ">

    <v-dialog v-model="dialog" width="1060">
      <v-card class="pb-10 d--rtl">
        <div class="px-5 pt-8 text-right">
          <img src="@/assets/img/shavaz-logo2.png" width="56" class="mb-5 mr-7" alt="shavaz image">
        </div>
        <div class="text-center mb-5 t16700">
          صورت حساب الکترونیکی فروش
        </div>
        <div>
          <v-row justify="end" class="px-6">
             <v-col cols="1" class="pa-1">
               <div class="border-header-box bg-gray200">
                  <span class="rotate-span text-center mt-4 mr-3 t12500">
                    حق العمل کار
                  </span>

               </div>
             </v-col>
            <v-col cols="7" class="pa-1">
              <div class="border-header-box">
                <div class="d-flex justify-space-between pa-2">
                  <div class="t11500">
                    نام فروشگاه : پارس حیان سیما
                  </div>
                  <div class="t11500">
                    شناسه ملی : ۰۰۹۹۵۸۳۷۲۳
                  </div>
                  <div class="t11500">
                    شماره ثبت : ۰۹۵۸۳۷
                  </div>
                  <div class="t11500">
                    شماره اقتصادی : ۰۹۵۸۳۷
                  </div>
                </div>
                <div class="d-flex justify-space-between pa-2">
                  <div class="t11500">
                    نشانی شرکت : تهران - گاندی جنوبی - نبش خیابان بیست و یکم - پلاک ۲۳
                  </div>
                  <div class="t11500">
                    کد پستی : ۰۹۵۸۳۷
                  </div>
                  <div class="t11500">
                    تلفن : ۸۸۱۰۳۷۴۴
                  </div>

                </div>
              </div>
            </v-col>
            <v-col cols="4" class="pa-1">
            <div class="border-header-box pa-1">
              <div class="d-flex justify-space-between">
                <span class="t11500">
                  شماره فاکتور :
                </span>

                <span class="t11500">
                  ۰۹۵۸۳۷
                </span>
              </div>
              <div class="d-flex justify-space-between mt-1">
                <span class="t11500">
                  تاریخ :
                </span>

                <span class="t11500">
                  ۱۳۹۷/12/11
                </span>
              </div>
              <div class="d-flex justify-space-between mt-1">
                <span class="t11500">
                  پیگیری :
                </span>

                <span class="t11500">
                 ۱۲۳۵۶۶۶۶۶۴
                </span>
              </div>
            </div>
          </v-col>

          </v-row>
          <v-row justify="end" class="px-6">

            <v-col cols="1" class="pa-1">
              <div class="border-header-box bg-gray200">
                  <span class="rotate-span text-center mt-6 mr-3 t12500">
                    خریدار
                  </span>
              </div>
            </v-col>
            <v-col cols="7" class="pa-1">
              <div class="border-header-box">
                <div class="d-flex justify-space-between pt-1 px-2">
                  <div class="t11500">
                    خریدار : امیر امیری
                  </div>
                  <div class="t11500">
                    شماره اقتصادی/شماره ملی : ۰۰۲۳۴۸۷۸۷
                  </div>
                  <div class="t11500">
                    شناسه ملی : ۰۰۲۳۴۸۷۸۷
                  </div>
                  <div class="t11500">
                    شماره ثبت : ۴۸۷۸۷
                  </div>
                </div>
                <div class="text-right t11500 pt-1 px-2">
                  نشانی : تهران - گاندی جنوبی - نبش خیابان بیست و یکم - پلاک ۲۳
                </div>
                <div class="d-flex justify-space-between pt-1 px-2">
                  <div class="t11500">
                    شماره تماس : ۰۹۱۲۳۱۱۳۳۸۷
                  </div>
                  <div class="t11500 ml-15 pl-15">
                    کد پستی : ۰۰۲۳۴۸۷۸۷
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="4" class="pa-1">
              <div class="border-header-box pa-1">
                <div class="d-flex justify-space-between">
                <span class="t11500">
                 شماره مالیاتی :
                </span>

                  <span class="t11500">
                  ۰۹۵۸۳۷
                </span>
                </div>
                <div class="d-flex justify-space-between mt-1">
                <span class="t11500">
                  سریال حافظه مالیاتی :
                </span>

                  <span class="t11500">
                  a12000098
                </span>
                </div>
                <div class="d-flex justify-space-between mt-1">
                <span class="t11500">
                 سریال پایانه فروشگاهی :
                </span>

                  <span class="t11500">
                  a57000001
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
          <v-row justify="end" class="px-6 mt-0">
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box  d-flex justify-center align-center">
                  <span class="t11500">
                    ۱
                  </span>
              </div>
            </v-col>

            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center">
                <span class="t11500 px-1">
                 ۱۲۳۴۵۶
                </span>
              </div>
            </v-col>
            <v-col cols="3" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center px-2">
                <span class="t11500 px-1">
                  کانسیلر میبلین مدل Instant Age
                   Rewind کد 120 ظرفیت 6 میلی لیتر
                </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box  d-flex justify-center align-center px-2 text-center">
                  <span class="t11500">
                      پارس حیان سیما
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center px-2">
                  <span class="t11500">
                    ۱
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11500 number-font">
                    13,000,000
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11500 number-font">
                    13,000,000
                  </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11500 number-font">
                    13,000
                  </span>
              </div>
            </v-col>

             <v-col cols="1" class="px-0 pt-0">
               <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11500 number-font">
                    13,000,000
                  </span>
               </div>
             </v-col>
              <v-col cols="1" class="px-0 pt-0">
                <div class="border-header-box d-flex justify-center align-center text-center">
                  <span class="t11500 number-font">
                    13,000,000
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
                <span class="t11500">
                  جمع کل پس از کسر تخفیف با احتساب مالیات و عوارض (ریال) :
                </span>
              </div>
            </v-col>
            <v-col cols="1" class="px-0 pt-0">
              <div class="border-header-sum bg-gray200 text-center">
                  <span class="t11500 number-font">
                    13,000,000
                  </span>
              </div>
            </v-col>




          </v-row>

          <v-row justify="end" class="px-6 mt-0" >
            <v-col cols="5" class="px-0 pt-0">
              <div class="border-header-sum bg-gray200 text-center">
                  <span class="t11500">
                    اعتبار مالیاتی قابل استفاده توسط خریدار
                  </span>
              </div>
            </v-col>
            <v-col cols="7" class="px-0 pt-0">
              <div class="border-header-sum bg-gray200">

              </div>
            </v-col>
          </v-row>

          <div class="px-3">
            <div class="factor-footer">
              <div class="d-flex justify-space-between px-5 pt-2">
                 <div>
                    <span class="t11500">
                      مهر و امضای فروشنده :
                     </span>
                 </div>
                <div>
                  <div>
                    <span class="t11500">
                      تاریخ تحویل :
                    </span>
                  </div>
                  <div>
                    <span class="t11500 number-font">
                       1402/09/23
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span class="t11500">
                       روش های پرداخت :
                    </span>
                  </div>
                  <div>
                    <span class="t11500 number-font">
                      نقدی:13,000,000
                    </span>
                  </div>

                </div>
                <div>
                    <span class="t11500">
                      مهر و امضای خریدار :
                    </span>
                </div>
                <div>
                    <span class="t11500">
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

export default {
  data(){
    return{

    }
  },
  methods: {
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
