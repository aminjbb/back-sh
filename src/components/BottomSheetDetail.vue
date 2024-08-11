<template>
  <div class="text-center">
    <v-btn
        @click="sheet = !sheet"
        variant="outlined"
        color="primary500"
        width="142"
        height="24"
        rounded
        class="text-primary500 t12 w500">
      {{ title }}
    </v-btn>

    <v-bottom-sheet v-model="sheet">
      <v-card
          class="text-center rounded-t-lg"
          height="900">
        <v-card-text>
          <div class="d-flex justify-space-between align-center">
            <v-icon icon="mdi-close" @click="sheet = !sheet"/>
            <span class="t16500">{{title}}</span>
          </div>
          <br>
          <br>

          <v-expansion-panels variant="inset">
            <v-expansion-panel>
              <v-expansion-panel-title class="accordion__header">
                <span class="text-gray600">اطلاعات کلی</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text class="accordion__items__content">
                <div class="simple-table-parent">
                  <div
                      v-for="(item,index) in generalDetails"
                      :key="`general-${index}`"
                      class="d-flex justify-space-between align-center mb-3">
                    <div class="t12 w500 number-font">
                          <span class="number-font text-gray600">
                            {{ item.value }}
                          </span>
                    </div>
                    <div class="">
                      <span class="t12 w500"> {{ item.label}}</span>
                      <v-icon icon="mdi-circle-small"/>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title class="accordion__header">
                <span class="text-gray600">مشخصات گیرنده</span>
              </v-expansion-panel-title>

              <v-expansion-panel-text class="accordion__items__content">
                <div class="simple-table-parent">
                  <div
                      v-for="(item,index) in userDetails"
                      :key="`user-${index}`"
                      class="d-flex justify-space-between align-center mb-3">
                    <div class="t12 w500 number-font">
                          <span class="number-font text-gray600">
                            {{ item.value }}
                          </span>
                    </div>
                    <div class="">
                      <span class="t12 w500">{{ item.label}}</span>
                      <v-icon icon="mdi-circle-small"/>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title class="accordion__header">
                <span class="text-gray600">اطلاعات پرداخت</span>
              </v-expansion-panel-title>

              <v-expansion-panel-text class="accordion__items__content">
                <div class="simple-table-parent">
                  <div
                      v-for="(item,index) in paymentDetails"
                      :key="`user-${index}`"
                      class="d-flex justify-space-between align-center mb-3">
                    <div class="t12 w500 number-font">
                          <span class="number-font text-gray600">
                            {{ item.value }}
                          </span>
                    </div>
                    <div class="">
                      <span class="t12 w500"> {{ item.label}}</span>
                      <v-icon icon="mdi-circle-small"/>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title class="accordion__header">
                <span class="text-gray600">تخفیف ها</span>
              </v-expansion-panel-title>

              <v-expansion-panel-text class="accordion__items__content">
                <div class="simple-table-parent">
                  <div
                      v-for="(item,index) in discountDetails"
                      :key="`user-${index}`">
                    <div class="d-flex justify-end align-center mb-3 ga-2">
                      <div class="t12 w500 number-font">
                        <span class="number-font text-gray600"> {{ item.name }} </span>
                      </div>
                      <div class="">
                        <span class="t12 w500"> : عنوان </span>
                        <v-icon icon="mdi-circle-small"/>
                      </div>
                    </div>
                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.discount_amount">{{ item.discount_amount }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">  : مقدار تخفیف </span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                      <div class="d-flex justify-justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.code">{{ item.code }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">: کد تخفیف </span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.start_time_fa">{{ item.start_time_fa }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">: تاریخ شروع </span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                      <div class="d-flex justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.end_time_fa">{{ item.end_time_fa }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">: تاریخ پایان </span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title class="accordion__header">
                <span class="text-gray600">جزئیات سفارش</span>
              </v-expansion-panel-title>

              <v-expansion-panel-text class="accordion__items__content">
                <div class="simple-table-parent">
                  <div
                      v-for="(item,index) in shpsDetails"
                      :key="`user-${index}`">
                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.shps.sku.seller.shopping_name">{{ item.shps.sku.seller.shopping_name }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">  : فروشگاه </span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                      <div class="d-flex justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.shps.id">{{ item.shps.id }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">  : شناسه کالا </span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-end align-center mb-3">
                      <div class="t12 w500 number-font">
                        <span class="number-font text-gray600"> {{ item.shps.sku.label }} </span>
                      </div>
                      <div class="d-flex">
                        <span class="t12 w500"> : نام کالا </span>
                        <v-icon icon="mdi-circle-small"/>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.shps.sku.seller.shopping_name">{{ item.shps.sku.seller.shopping_name }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">  : فروشگاه </span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                      <div class="d-flex justify-justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.count">{{ item.count }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">: تعداد کالا</span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex justify-justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.base_discount">{{ splitChar(item.base_discount) }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">: تخفیف پایه</span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                      <div class="d-flex justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.customer_price">{{ splitChar(item.customer_price) }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">  : قیمت کالا </span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.discount_code">{{ item.discount_code }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">  : کد تخفیف </span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                      <div class="d-flex justify-justify-end align-center mb-3 ga-2">
                        <div class="t12 w500 number-font">
                          <span class="number-font text-gray600" v-if="item.marketing_discount">{{ splitChar(item.marketing_discount) }}</span>
                          <span class="number-font text-gray600" v-else>-</span>
                        </div>
                        <div class="">
                          <span class="t12 w500">: تخفیف مارکتینگ</span>
                          <v-icon icon="mdi-circle-small"/>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-end align-center mb-3">
                      <div class="t12 w500 number-font">
                        <span class="number-font text-gray600" v-if="item.paid_price">{{ splitChar(item.paid_price) }}</span>
                        <span class="number-font text-gray600" v-else>-</span>
                      </div>
                      <div class="">
                        <span class="t12 w500">: پرداخت نهایی</span>
                        <v-icon icon="mdi-circle-small"/>
                      </div>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title class="accordion__header">
                <span class="text-gray600">جزئیات ارسال</span>
              </v-expansion-panel-title>
              <div v-for="(orderInfoObject, index) in orderInfo">
                <v-expansion-panel-text class="accordion__items__content">
                  <div class="simple-table-parent">
                    <div
                        v-for="(item,index) in orderInfoObject.details"
                        :key="`user-${index}`"
                        class="d-flex justify-space-between align-center mb-3">
                      <div class="t12 w500 number-font">
                          <span class="number-font text-gray600">
                            {{ item.value }}
                          </span>
                      </div>
                      <div class="">
                        <span class="t12 w500"> {{ item.label}}</span>
                        <v-icon icon="mdi-circle-small"/>
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-text>

                <v-expansion-panel-text class="accordion__items__content">
                  <div class="simple-table-parent">
                    <div
                        v-for="(item,index) in orderInfoObject.shippingDetail"
                        :key="`user-${index}`"
                        class="d-flex justify-space-between align-center mb-3">
                      <div class="t12 w500 number-font">
                          <span class="number-font text-gray600">
                            {{ item.value }}
                          </span>
                      </div>
                      <div class="">
                        <span class="t12 w500"> {{ item.label}}</span>
                        <v-icon icon="mdi-circle-small"/>
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-text>
                <v-divider/>
              </div>

            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {splitChar} from "@/assets/js/functions";

export default {
  name: "BottomSheetOrderDetail",
  props: {
    title: String,
    item: Object,
    id: null
  },

  data() {
    return {
      sheet: false,
      generalDetails: [],
      userDetails: [],
      shpsDetails: [],
      paymentDetails: [],
      discountDetails: [],
      shipingDetails: [],
      orderInfo: []
    }
  },

  methods: {
    splitChar,

    async getGeneralDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');
      AxiosMethod.end_point = `admin/order/crud/get/${this.id}`;
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store;
      let data = await AxiosMethod.axios_get();

      if (data) {
        if (data.data) {
          this.generalDetails = [
            {
            label: 'شناسه سفارش',
            value: data.data.id ? data.data.id : '-'
          },
            {
              label: 'وضعیت سفارش',
              value: data.data.status ? data.data.status : '-'
            },
            {
              label: 'وضعیت بارگیری',
              value: data.data.packed_status ? data.data.packed_status : '-'
            },
            {
              label: 'تاریخ ثبت سفارش',
              value: data.data.submit_date_fa ? data.data.submit_date_fa : '-'
            },
            {
              label: 'تاریخ ارسال سفارش',
              value: data.data.receive_date_fa ? data.data.receive_date_fa : '-'
            },
            {
              label: 'کد معرف',
              value: data.data.invitation_code ? data.data.invitation_code : '-'
            },
            {
              label: 'شناسه بانکی',
              value: data.data.bank_number ? data.data.bank_number : '-'
            },
            {
              label: 'وضعیت پرداخت',
              value: data.data.payment_status ? data.data.payment_status : '-'
            },
            {
              label: 'کل مبلغ پرداختی',
              value: data.data.total_price ? data.data.total_price : '-'
            },
            {
              label: 'مبلغ پرداختی از کیف پول',
              value: data.data.paid_by_wallet ? data.data.paid_by_wallet : '-'
            },
            {
              label: 'مبلغ پرداختی از درگاه بانکی',
              value: data.data.paid_by_bank ? data.data.paid_by_bank : '-'
            },
            {
              label: 'مبلغ پرداختی با اعتبار اسنپ پی',
              value: data.data.paid_price ? data.data.paid_price : '-'
            },
            {
              label: 'کد پیگیری اسنپ پی',
              value: data.data.snapp_transaction_id ? data.data.snapp_transaction_id : '-'
            },
            {
              label: 'هزینه ارسال',
              value: data.data.sending_price ? data.data.sending_price : '-'
            },
          ]

          this.userDetails = [
            {
            label: 'نام مشتری ',
            value: data.data.user && data.data.user.first_name && data.data.user.last_name ? `${data.data.user.first_name} ${data.data.user.last_name}` : '-'
          },
            {
              label: 'استان',
              value: data.data.state && data.data.state.label ? data.data.state.label : '-'
            },
            {
              label: 'شهر',
              value: data.data.city && data.data.city.label ? data.data.state.label : '-'
            },
            {
              label: 'تلفن',
              value: data.data.receiver_phone ? data.data.receiver_phone : '-'
            },
            {
              label: 'موبایل',
              value: data.data.receiver_mobile ? data.data.receiver_mobile : '-'
            },
            {
              label: 'کد پستی',
              value: data.data.receiver_postal_code ? data.data.receiver_postal_code : '-'
            },
            {
              label: 'آدرس',
              value: data.data.receiver_address ? data.data.receiver_address : '-'
            },
          ]
        }
      }
    },

    async getShpsDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/crud/shps/detail/${this.id}`
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store
      let data = await AxiosMethod.axios_get();
      if (data) {
        this.shpsDetails = data.data;
      }
    },

    async getPaymentDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');
      AxiosMethod.end_point = `admin/order/crud/payment/detail/${this.id}`;
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store;
      let data = await AxiosMethod.axios_get();

      if (data) {
        if (data.data) {
          this.paymentDetails = [
            {
            label: 'وضعیت پرداخت',
            value: data.data.payment_status ? data.data.payment_status : '-'
          },
            {
              label: 'کد رهگیری',
              value: data.data.addresses ? data.data.addresses : '-'
            },
            {
              label: 'تاریخ پرداخت',
              value: data.data.payment_date_fa ? data.data.payment_date_fa : '-'
            },
            {
              label: 'کل مبلغ پرداختی بدون تخفیف',
              value: data.data.total_price ? data.data.total_price : '-'
            },
            {
              label: 'کل مبلغ پرداختی با تخفیف',
              value: data.data.paid_price ? data.data.paid_price : '-'
            },
            {
              label: 'مبلغ تخفیف ',
              value: data.data.total_discount ? data.data.total_discount : '-'
            },
            {
              label: 'مالیات بر ارزش افزوده',
              value: data.data.tax_amount ? data.data.tax_amount : '-'
            },
          ]
        }
      }
    },

    async getDiscountDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/crud/discount/detail/${this.id}`
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store
      let data = await AxiosMethod.axios_get();
      if (data) {
        this.discountDetails = data.data
      }
    },

    async getShippingDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');
      AxiosMethod.end_point = `admin/order/tracking/${this.id}`;
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store;
      let data = await AxiosMethod.axios_get();

      if (data) {
        if (data.data) {
          this.orderInfo = []
          let orderInfoDetail = {
            details: [],
            shippingDetail: []
          }
          data.data.forEach((trackingDetail) => {
            let shippingDetailForm = []
            trackingDetail.logs.forEach((item) => {
              const form = {
                label: item.status,
                value: item.created_at,
              }
              shippingDetailForm.push(form)
            })
            const orderInfoDetail = [
              {
                label: 'بارکد',
                value: trackingDetail.tracking_code
              },
              {
                label: 'روش ارسال',
                value: trackingDetail.service_name
              },
              {
                label: 'تاریخ بارگیری',
                value: trackingDetail.pickup_date
              },
            ]
            orderInfoDetail.details = orderInfoDetail
            orderInfoDetail.shippingDetail = shippingDetailForm
            this.orderInfo.push(orderInfoDetail)

          })
        }
      }
    },
  },

  created() {
    this.$watch(
        () => this.sheet,
        (sheetState) => {
          if (sheetState) {
            this.getShpsDetails();
            this.getPaymentDetails();
            this.getGeneralDetails();
            this.getDiscountDetails();
            this.getShippingDetails()
          }
        }
    );
  },
}
</script>

<style scoped>

</style>