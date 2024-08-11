<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">
        <v-col cols="6"/>

        <v-col cols="6">
          <v-row justify="end" class="mt-0">
            <ModalColumnFilter
                :changeHeaderShow="changeHeaderShow"
                :header="header"/>

            <PanelFilter
                @resetPage="resetPage"
                path="orders/index"
                :filterField="filterField"
                :statusItems="status"
                :paymentStatuses="paymentStatus"
                :paymentMethods="paymentMethods"
                :packedStatus="packedStatus"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="auto">
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
      >
          <template v-slot:actionSlot="item">
              <div class="text-center">
                  <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                      mdi-dots-vertical
                  </v-icon>
              </div>

              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                  <v-list class="c-table__more-options">
                      <v-list-item-title>
                          <DetailsModal :id="item.data.id" />
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="$router.push(`/orders/user/${item.data.id}/edit`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-pencil-box-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
                                    ویرایش اطلاعات گیرنده
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="$router.push(`/orders/${item.data.id}/cancel-order-list`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-pencil-box-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
                                  ویرایش سفارش
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="$router.push(`/orders/user/${item.data.id}/manual-order`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-pencil-box-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
ثبت سفارش اپراتوری
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <FactorModal  :id="item.data.id" />
                      </v-list-item-title>
                  </v-list>
              </v-menu>
          </template>
      </ShTable>
      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start"/>

          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="7"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left"/>
            </div>
          </v-col>

          <v-col cols="3" class="d-flex justify-end">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>
              <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="dataTableLength"
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]"/>
                        </span>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Orders from "@/composables/Orders";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import DetailsModal from "@/components/Orders/Modal/DetailsModal.vue";
import FactorModal from "@/components/Orders/Modal/FactorModal.vue";
import {splitChar} from "@/assets/js/functions";

export default {
  data() {
    return {
        perPageFilter: false,
        itemListTable: []
    }
  },
  setup(props) {
    const status = [
      {
        label: 'در انتظار پرداخت',
        value: 'payment_in_progress'
      },
      {
        label: 'پیش پردازش',
        value: 'pre_progress'
      },
      {
        label: 'در حال پردازش',
        value: 'in_progress'
      },
      {
        label: 'در حال ارسال',
        value: 'sending'
      },
      {
        label: 'تحویل داده شده',
        value: 'received'
      },
      {
        label: 'انقضای سفارش',
        value: 'payment_out_date'
      },
      {
        label: 'در حال بسته بندی',
        value: 'boxing'
      }
    ]
    const paymentStatus = [
      {
        label: 'موفق',
        value: 'successful'
      },
      {
        label: 'ناموفق',
        value: 'unsuccessful'
      }
    ]
    const paymentMethods = [
      {
        label: 'کیف پول',
        value: 'wallet'
      },
      {
        label: 'اسنپ پی',
        value: 'snap_pay'
      }
    ]
    const packedStatus = [
      {
        label: 'بارگیری شده',
        value: '1'
      },
      {
        label: 'بارگیری نشده',
        value: '0'
      }
    ]

    const {
      pageLength,
      getOrderList,
      orderList,
      filterField,
      dataTableLength,
      page,
      header,
      addPerPage,
      loading
    } = Orders();
    return {
      pageLength,
      getOrderList,
      orderList,
      filterField,
      dataTableLength,
      page,
      header,

      addPerPage,
      loading,
      status,
      paymentStatus,
      paymentMethods,
      packedStatus

    };
  },

  components: {
    PanelFilter,
    ModalColumnFilter,
    ShTable,
    FactorModal,
    DetailsModal
  },

  computed: {},

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    },

      splitChar,
      getPaymentStatus(method) {
          if (method === 'unsuccessful') {
              return 'نا موفق'
          } else if (method === 'contradictory') {
              return 'دارای مغایرت'
          }
          else if (method === 'payment_out_date') {
              return 'انقضای پرداخت'
          } else if (method === 'successful') {
              return 'موفق'
          }
      },
      getPaymentMethod(method) {
          if (method === 'saman') {
              return 'درگاه سامان'
          } else if (method === 'wallet') {
              return 'کیف پول'
          } else if (method === 'snapp') {
              return 'اسنپ پی'
          }
      },
      getOrderStatus(status) {
          if (status === 'processing') {
              return 'در حال پردازش'
          } else if (status === 'cancelled') {
              return 'لغو شده'
          } else if (status === 'paid') {
              return 'پرداخت شده'
          } else if (status === 'received') {
              return 'تحویل شده'
          } else if (status === 'payment_in_progress') {
              return 'در انتظار پرداخت'
          } else if (status === 'returned') {
              return 'مرجوعی'
          } else if (status === 'sending') {
              return 'در حال ارسال'
          } else if (status === 'payment_out_date') {
              return 'انقضای سفارش'
          } else if (status === 'pre_progress') {
              return 'پیش پردازش'
          } else if (status === 'boxing') {
              return 'درحال بسته بندی'
          }
      },
  },

  mounted() {
    this.getOrderList();
  },

  watch: {
    dataTableLength() {
      this.perPageFilter = true
      this.page = 1
      let query = this.$route.query
      if (query) {
        this.$router.replace({
          query: {
            ...query,
            per_page: this.dataTableLength,
          }
        })
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },
    page() {
      if (!this.perPageFilter) {
        this.getOrderList()
      }
    },
    $route() {
      this.getOrderList()
    },

      orderList() {
          this.itemListTable = []
          this.orderList.forEach((item) => {
              this.itemListTable.push(
                  {
                      id: item.id,
                      order_number: item.order_number ? item.order_number : '-',
                      user: item.user ? item.user.first_name +' '+ item.user.last_name : '-',
                      phone_number: item.user.phone_number ? item.user.phone_number : '-',
                      shps_count: item.shps_count ? item.shps_count : '-',
                      orderStatus: item.status ? this.getOrderStatus(item.status) : '-',
                      snapp_transaction_id: item.snapp_transaction_id ? item.snapp_transaction_id : '-',
                      payment_status: item.payment_status ? this.getPaymentStatus(item.payment_status) : '-',
                      payment_method: item.payment_method && item.snapp_transaction_id ? 'اسنپ پی' : item.payment_method ? this.getPaymentMethod(item.payment_method) : '-',
                      paid_price: item.paid_price ? this.splitChar(item.paid_price) : '-',
                      packed_status: item.packed_status === 1 ? 'mdi-check-bold|success' : 'mdi-close-thick|error',
                      submit_date_fa: item.submit_date_fa +' '+ item.submit_date.split(' ')[1],
                      logistic_date_fa: item.logistic_date_fa ? item.logistic_date_fa : '-',
                  }
              )
          })
      },
  }
}
</script>
