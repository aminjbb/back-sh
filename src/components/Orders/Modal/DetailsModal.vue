<template>
  <div class="text-right">
    <v-dialog v-model="orderDetailsModal.dialog">
      <v-card class="pa-5 ">
        <v-expansion-panels class="accordion" variant="inset">
          <v-expansion-panel>
            <v-expansion-panel-title class="accordion__header">
                        <span>
                        اطلاعات کلی
                    </span>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="accordion__items__content">
              <div class="simple-table-parent">
                <div class="simple-table ">
                  <v-row
                      v-for="(item,index) in generalDetails"
                      :key="`general-${index}`"
                      class="ma-0 d--rtl">
                    <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                    <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                  </v-row>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="accordion__header">
                        <span>
                        مشخصات گیرنده
                    </span>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="accordion__items__content">
              <div class="simple-table-parent">
                <div class="simple-table">
                  <v-row
                      v-for="(item,index) in userDetails"
                      :key="`user-${index}`"
                      class="ma-0 d--rtl">
                    <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                    <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                  </v-row>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="accordion__header">
                        <span>
                        اطلاعات پرداخت
                    </span>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="accordion__items__content">
              <div class="simple-table-parent">
                <div class="simple-table">
                  <v-row
                      v-for="(item,index) in paymentDetails"
                      :key="`user-${index}`"
                      class="ma-0 d--rtl">
                    <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                    <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                  </v-row>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="accordion__header">
                        <span>
                        تخفیف ها
                    </span>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="accordion__items__content">
              <DiscountTable :items="discountDetails" :header="discountModalHeader"/>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="accordion__header">
                        <span>
                        جزئیات سفارش
                    </span>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="accordion__items__content">
              <div class="flex-grow-1 d-flex flex-column align-stretch">
                <ShpsTable class="flex-grow-1" :items="shpsDetails" :header="shpsModalHeader"/>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="accordion__header">
                        <span>
                         جزئیات ارسال
                    </span>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="accordion__items__content">
              <div class="simple-table-parent">
                <div class="simple-table">
                  <v-row
                      v-for="(item,index) in orderInfo"
                      :key="`user-${index}`"
                      class="ma-0 d--rtl">
                    <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                    <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                  </v-row>
                </div>
              </div>
            </v-expansion-panel-text>

            <v-expansion-panel-text class="accordion__items__content">
              <div class="simple-table-parent">
                <div class="simple-table">
                  <v-row
                      v-for="(item,index) in shipingDetails"
                      :key="`user-${index}`"
                      class="ma-0 d--rtl">
                    <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                    <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                  </v-row>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  closeModal
} from "@/assets/js/functions_seller";
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import Orders from "@/composables/Orders";
import ShpsTable from '@/components/Orders/Table/ShpsModalTable.vue'
import DiscountTable from '@/components/Orders/Table/DiscountModalTable.vue'

export default {

  data() {
    return {
      dialog: false,
      stockModel: null,
      userDetails: [],
      shpsDetails: [],
      paymentDetails: [],
      generalDetails: [],
      discountDetails: [],
      shipingDetails: [],
      orderInfo: []
    }
  },

  computed: {
    orderDetailsModal() {
      try {
        return this.$store.getters['get_orderDetailsModal']
      } catch (error) {
        return ''
      }
    }
  },

  setup() {
    const {
      shpsModalHeader,
      discountModalHeader
    } = Orders();


    return {
      shpsModalHeader,
      discountModalHeader
    };
  },

  components: {
    ShpsTable,
    DiscountTable
  },

  methods: {
    close() {
      this.shipingDetails=[]
      closeModal(this.$store, 'set_orderDetailsModal')
    },

    /**
     * Get order 'General' details by order_id
     */
    async getGeneralDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');
      AxiosMethod.end_point = `admin/order/crud/get/${this.orderDetailsModal.id}`;
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store;
      let data = await AxiosMethod.axios_get();

      if (data) {
        if (data.data) {
          this.generalDetails = [{
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
              value: data.data.paid_by_snapp ? data.data.paid_by_snapp : '-'
            },
            {
              label: 'هزینه ارسال',
              value: data.data.sending_price ? data.data.sending_price : '-'
            },
          ]

          this.userDetails = [{
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

    /**
     * Get order 'Shps' details by order_id
     */
    async getShpsDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/crud/shps/detail/${this.orderDetailsModal.id}`
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store
      let data = await AxiosMethod.axios_get();
      if (data) {
        this.shpsDetails = data.data;
      } else {
      }
    },

    /**
     * Get order 'Payment' details by order_id
     */
    async getPaymentDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');
      AxiosMethod.end_point = `admin/order/crud/payment/detail/${this.orderDetailsModal.id}`;
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store;
      let data = await AxiosMethod.axios_get();

      if (data) {
        if (data.data) {
          this.paymentDetails = [{
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

    /**
     * Get order 'Discount' details by order_id
     */
    async getDiscountDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/crud/discount/detail/${this.orderDetailsModal.id}`
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store
      let data = await AxiosMethod.axios_get();
      if (data) {
        this.discountDetails = data.data;
      } else {
      }
    },

    /**
     * Get order 'shipping' details by order_id
     */
    async getShippingDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');
      AxiosMethod.end_point = `admin/order/tracking/${this.orderDetailsModal.id}`;
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store;
      let data = await AxiosMethod.axios_get();

      if (data) {
        if (data.data) {
          this.orderInfo = [
            {
              label: 'بارکد',
              value: data.data.tracking_code
            },
            {
              label: 'روش ارسال',
              value: data.data.service_name
            },
            {
              label: 'تاریخ بارگیری',
              value: data.data.pickup_date
            }
          ]
          data.data.logs.forEach((item) => {
            const form = {
              label: item.status,
              value: item.created_at,
            }
            this.shipingDetails.push(form)
          })

        }
      }
    },

  },

  created() {
    this.$watch(
        () => this.orderDetailsModal.dialog,
        (dialogState) => {
          if (dialogState) {
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

<style>

.v-expansion-panels--variant-inset > .v-expansion-panel--active {
  max-width: 100% !important;
}

.v-expansion-panel-title--active > .v-expansion-panel-title__overlay {
  background: #FCE4EC !important;
  opacity: 1 !important;
}

.accordion__header span {
  z-index: 1 !important;
}

.v-expansion-panel-title {
  min-height: 56px !important;
}

.v-expansion-panels {
  overflow-y: auto !important;
}

</style>