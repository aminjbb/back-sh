<template>
<div class="text-center">
  <v-card>
    <header class="modal__header modal__header--factor">

    </header>
    <div class="pa-4">
      <div class="modal__content d--rtl py-3 px-4 mb-2">
        <v-row>
          <v-col
              cols="6"
              sm="3"
              md="3"
              lg="3">
            <span class="modal__content__title">شناسه فاکتور: </span>
            <span v-if="factorData && factorData.id" class="modal__content__txt number-font">
                                {{factorData.id}}
                            </span>
          </v-col>
          <v-col
              cols="6"
              sm="3"
              md="3"
              lg="3">
            <span class="modal__content__title">تامین کننده: </span>
            <span v-if="factorData && factorData.supplier && factorData.supplier.full_name" class="modal__content__txt number-font">
                                {{factorData.supplier.full_name}}
                            </span>
          </v-col>
          <v-col
              cols="6"
              sm="3"
              md="3"
              lg="3">
            <span class="modal__content__title">شماره فاکتور تامین کننده: </span>
            <span v-if="factorData && factorData.factor_number" class="modal__content__txt number-font">
                                {{factorData.factor_number}}
                            </span>
          </v-col>
          <v-col
              cols="6"
              sm="3"
              md="3"
              lg="3">
            <span class="modal__content__title">تاریخ ساخت: </span>
            <span v-if="factorData && factorData.created_at_fa" class="modal__content__txt number-font">
                                {{factorData.created_at_fa}}
                            </span>
          </v-col>
        </v-row>
      </div>

      <div class="modal__content d--rtl">
        <y-row class="c-table">
          <header class="c-table__header d-flex justify-between">
            <div class="text-center c-table__header__item t12500 text-black" style="width:7.1111%;padding: 20px 5px;">
              ردیف
            </div>
            <div class="text-right c-table__header__item t12500 text-black" style="width:17.1111%;padding: 20px 5px;">
              نام کالا
            </div>
            <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding: 20px 5px;">
              شناسه shps
            </div>
            <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding: 20px 5px;">
              قیمت خرید
            </div>
            <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding: 20px 5px;">
              قیمت مصرف
            </div>
            <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding: 20px 5px;">
              تعداد درخواستی
            </div>
            <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding: 20px 5px;">
              تعداد دریافتی
            </div>
            <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding: 20px 5px;">
              قیمت خرید کل
            </div>
            <div class="text-center c-table__header__item t12500 text-black" style="width:12.1111%;padding: 20px 5px;">
              قیمت مصرف کل
            </div>
            <div class="text-center c-table__header__item t12500 text-black" style="width:11.1111%;padding: 20px 5px;">
              درصد سود
            </div>
          </header>

          <div class="stretch-table">
            <div v-if="factorSkuData && factorSkuData.shps_list && factorSkuData.shps_list.length" class="c-table__contents">
              <div
                  v-for="(shps , index) in factorSkuData.shps_list"
                  :key="index"
                  class="d-flex justify-between c-table__contents__row">
                <div class="c-table__contents__item justify-center" style="width:7.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            {{rowIndexTable(index)}}
                                        </span>
                </div>

                <div class="c-table__contents__item justify-start" style="width:17.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            <template v-if="shps.sku">
                                                {{shps.sku}}
                                            </template>
                                            <template v-else>
                                                -
                                            </template>
                                        </span>
                </div>

                <div class="c-table__contents__item justify-center" style="width:10.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            <template v-if="shps.shps !== null">
                                                {{shps.shps}}
                                            </template>
                                            <template v-else>
                                                -
                                            </template>
                                        </span>
                </div>

                <div class="c-table__contents__item justify-center" style="width:10.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            <template v-if="shps.buying_price !== null">
                                                {{shps.buying_price}}
                                            </template>
                                            <template v-else>
                                                -
                                            </template>
                                        </span>
                </div>

                <div class="c-table__contents__item justify-center" style="width:11.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            <template v-if="shps.customer_price !== null">
                                                {{shps.customer_price}}
                                            </template>
                                            <template v-else>
                                                -
                                            </template>
                                        </span>
                </div>

                <div class="c-table__contents__item justify-center" style="width:10.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            <template v-if="shps.shps_requested_count !== null">
                                                {{shps.shps_requested_count}}
                                            </template>
                                            <template v-else>
                                                -
                                            </template>
                                        </span>
                </div>
                <div class="c-table__contents__item justify-center" style="width:10.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            <template v-if="shps.shps_received_count !== null">
                                                {{shps.shps_received_count}}
                                            </template>
                                            <template v-else>
                                                -
                                            </template>
                                        </span>
                </div>

                <div class="c-table__contents__item justify-center" style="width:11.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            <template v-if="shps.sum_buying_price !== null">
                                                {{shps.sum_buying_price}}
                                            </template>
                                            <template v-else>
                                                -
                                            </template>
                                        </span>
                </div>

                <div class="c-table__contents__item justify-center" style="width:12.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            <template v-if="shps.sum_customer_price !== null">
                                                {{shps.sum_customer_price}}
                                            </template>
                                            <template v-else>
                                                -
                                            </template>
                                        </span>
                </div>

                <div class="c-table__contents__item justify-center" style="width:11.1111%;padding:3px 10px">
                                        <span class="t12300 text-gray500 py-5 number-font">
                                            <template v-if="shps.profit !== null">
                                                {{shps.profit}}
                                            </template>
                                            <template v-else>
                                                -
                                            </template>
                                        </span>
                </div>
              </div>
            </div>
            <div v-else class="d-flex justify-center align-center flex-column" style="height:300px">
              <img src="@/assets/img/NullTable.png" alt="shavaz image">
              <div class="d-flex justify-center align-center flex-column">
                <span class="title4 text-black mb-5">لیست خالی!</span>
                <span class="t14300 text-grey-darken-3">تاکنون کالایی به این لیست، افزوده نشده است.</span>
              </div>
            </div>
          </div>
        </y-row>

        <div class="calculate-all d-flex justify-between align-center">
          <div class="text-center c-table__header__item t12500 text-black" style="width:7.1111%;padding:15px 10px">
            جمع:
          </div>
          <div class="text-center c-table__header__item t12500 text-black number-font" style="width:17.1111%;padding:15px 10px"></div>
          <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px"></div>
          <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
            <template v-if="factorSkuData && factorSkuData.sum_total_buying_price >=0">
              {{factorSkuData.sum_total_buying_price}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
            <template v-if="factorSkuData && factorSkuData.sum_total_customer_price >= 0">
              {{factorSkuData.sum_total_customer_price}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t12500 text-black number-font" style="width:11.1111%;padding:15px 10px">
            <template v-if="factorSkuData && factorSkuData.total_requested_count >= 0">
              {{factorSkuData.total_requested_count}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t12500 text-black number-font" style="width:11.1111%;padding:15px 10px">
            <template v-if="factorSkuData && factorSkuData.total_received_count >= 0">
              {{factorSkuData.total_received_count}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t12500 text-black number-font" style="width:11.1111%;padding:15px 10px">
            <template v-if="factorSkuData && factorSkuData.total_buying_price >= 0">
              {{factorSkuData.total_buying_price}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t12500 text-black number-font" style="width:12.1111%;padding:15px 10px">
            <template v-if="factorSkuData && factorSkuData.total_customer_price >= 0">
              {{factorSkuData.total_customer_price}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t12500 text-black number-font" style="width:11.1111%;padding:15px 10px">
            <template v-if="factorSkuData && factorSkuData.total_profit >= 0">
              {{factorSkuData.total_profit}}
            </template>
            <template v-else>
              -
            </template>
          </div>
        </div>


      </div>
    </div>
  </v-card>
</div>
</template>

<script>
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
export default {
    data() {
        return {
            loading: false,
            factorData: null,
            factorSkuData: null
        }
    },

    methods: {

        async getFactorDetails() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `factor/crud/get/${this.$route.params.id}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.factorData = data.data;
                this.getFactorSkuDetails();
            }
        },

        async getFactorSkuDetails() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `factor/crud/detail/${this.$route.params.id}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.factorSkuData = data.data;
                if (this.factorSkuData) {

                    setTimeout(() => {
                        window.print();
                    }, 200)
                }
            }
        },

        /**
         * Get row index in table
         * @param {*} index
         */
        rowIndexTable(index) {
            let rowIndex = 0
            rowIndex = (1 + index)
            return rowIndex
        },
    },

    mounted() {
        this.getFactorDetails();
    },
}
</script>
