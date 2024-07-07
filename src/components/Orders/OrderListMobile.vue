<template>
  <div class="h-100 d-flex flex-column align-stretch scroller">
    <div class="mx-5">
      <!-- filter -->
      <div class="d-flex justify-end">
        <PanelFilterMobile
            @resetPage="resetPage"
            path="orders/index"
            :filterField="filterField"
            :statusItems="status"
            :paymentStatuses="paymentStatus"
            :paymentMethods="paymentMethods"
            :packedStatus="packedStatus"
        />
      </div>

      <!-- cards -->
      <div
          v-for="(item, itemIndex) in orderList"
          :key="itemIndex"
          class="">
        <v-card class="py-5 px-5 mt-5">
          <div class="d-flex justify-space-between">
            <div class="flex-column">
              <div class="">
                <v-icon icon="mdi-circle-small"/>
                <span class="t12500"> شناسه سفارش : </span>
                <span class="t12500 number-font"> {{item.id}} </span>
              </div>
              <div class="mt-3">
                <v-icon icon="mdi-circle-small"/>
                <span class="t12500"> شماره سفارش : </span>
                <span class="t12500 number-font"> {{item.order_number}} </span>
              </div>
              <div class="mt-3">
                <v-icon icon="mdi-circle-small"/>
                <span class="t12500"> نام مشتری : </span>
                <span class="t12500">  {{ item.user.first_name }} {{ item.user.last_name }} </span>
              </div>
              <div class="mt-3">
                <v-icon icon="mdi-circle-small"/>
                <span class="t12500"> شماره تماس : </span>
                <span class="t12500 number-font"> {{ item.user.phone_number }} </span>
              </div>
            </div>
            <div>
              <span class="t12500 text-primary500 bg-primary400 rounded px-3 py-1">{{ getOrderStatus(item.status) }}</span>
            </div>
          </div>
          <div class="d-flex justify-space-between mt-3">
            <BottomSheetOrderDetail :item="item" :title="`نمایش جزئیات`" :id="item.id"/>

            <BottomSheetOrder :item="item" :title="`اطلاعات سفارش`"/>
          </div>
        </v-card>
      </div>

      <!-- pagination -->
      <div class="my-3">
        <v-row justify="center">
          <v-col cols="12">
            <v-pagination
                v-model="page"
                :length="pageLength"
                rounded="circle"
                size="40"
                :total-visible="7"
                prev-icon="mdi-chevron-right"
                next-icon="mdi-chevron-left"/>
          </v-col>
          <v-col cols="12">
            <div
                id="rowSection"
                class="d-flex justify-center align-center">
              <span class="ml-5">تعداد سطر در هر صفحه</span>
              <span id="row-selector">
                <v-select
                    v-model="dataTableLength"
                    class="t1330"
                    variant="outlined"
                    :items="[25,50,100]"/>
              </span>
            </div>
          </v-col>
        </v-row>
      </div>

    </div>
  </div>
</template>

<script>
import Table from '@/components/Orders/Table/Table.vue'
import Orders from "@/composables/Orders";
import BottomSheet from "@/components/BottomSheetOrder.vue";
import BottomSheetOrder from "@/components/BottomSheetOrder.vue";
import BottomSheetOrderDetail from "@/components/BottomSheetDetail.vue";
import PanelFilterMobile from "@/components/PanelFilterMobile.vue";

export default {
  data() {
    return {
      perPageFilter: false
    }
  },
  setup() {
    const orderStatus= [
      {
      text: 'پرداخت شده',
      value: 'paid'
    },
      {
        text: 'پیش پردازش',
        value: 'pre_progress'
      },
      {
        text: 'در حال ارسال',
        value: 'sending'
      },
      {
        text: 'در حال پردازش',
        value: 'processing'
      },
      {
        text: 'لغو شده',
        value: 'cancelled'
      },
      {
        text: 'تحویل شده',
        value: 'received'
      },
      {
        text: 'مرجوعی',
        value: 'returned'
      },
      {
        text: 'در انتظار پرداخت',
        value: 'payment_in_progress'
      },
      {
        text: 'انقضای سفارش',
        value: 'payment_out_date'
      },
      {
        text: 'درحال بسته بندی',
        value: 'boxing'
      }
    ]
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
      packedStatus,
      orderStatus
    }
  },

  components: {
    PanelFilterMobile,
    BottomSheetOrderDetail,
    BottomSheetOrder,
    BottomSheet,
    Table,
  },

  methods: {
    getOrderStatus(status) {
      const persianStatus = this.orderStatus.find(orderStatus => orderStatus.value === status)
      if (persianStatus) return persianStatus.text
    },

    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    updateList(status) {
      if (status === 'true') {
        this.getOrderList();
      }
    },

    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    }
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
    }
  }
}
</script>
