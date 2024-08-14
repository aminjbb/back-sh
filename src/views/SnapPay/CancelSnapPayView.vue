<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="start">
                <ModalGroupAdd title="افزودن" btnColor="primary500" btnVariant="flat" :plusIcon="true" :isSnap="true"
                               @updateList="updateOrderList" getEndPoint="admin/order/csv/get/template"
                               uploadEndpoint="admin/order/csv/cancel/order/list"/>

                <v-btn
                    color="primary500"
                    variant="outlined"
                    height="40"
                    rounded
                    class="px-8 mt-1 mr-5"
                    :loading="allOrderCancelLoading"
                    @click="cancelSnapPayAllOrder()">
                  <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                  </template>
                  لغو همه سفارشات
                </v-btn>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :isSnappType="true"
              :page="1"
              :perPage="100">
            <template v-slot:customSlot="item">
              <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          <v-chip :color="chipColor(statuses[item.index])">
                          {{ statuses[item.index] }}
                          </v-chip>
                        </span>
              </div>
            </template>

            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>

              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                <v-list class="c-table__more-options">
                  <v-list-item-title>
                    <div class="ma-5 pointer" @click="cancelSnapPayOrder(item.data.order_number , item.index)">
                      <span class="mr-2 text-grey-darken-1 t14 w300">کنسل سفارش</span>
                      <v-icon class="text-grey-darken-1">mdi-pencil-box-outline</v-icon>
                    </div>
                  </v-list-item-title>

                  <v-list-item-title>
                    <div class="ma-3 pointer d--rtl" @click="removeItem(item.index)">
                      <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                    </div>
                  </v-list-item-title>
                </v-list>
              </v-menu>
            </template>
          </ShTable>

<!--          <Table-->
<!--              @removeItem="removeItem"-->
<!--              :header="header"-->
<!--              :items="orderList"-->
<!--              :page="1"-->
<!--              :perPage="100"-->
<!--              ref="snapTable"-->
<!--          />-->
          <v-divider/>

          <v-card-actions class="pb-3">
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
import CancelSnapPay from '@/composables/CancelSnapPay'
import {AxiosCall} from "@/assets/js/axios_call";
const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
const Table = defineAsyncComponent(() => import ('@/components/SnapPay/Table/Table.vue'))
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))
const ModalGroupAdd = defineAsyncComponent(() => import ('@/components/Public/ModalGroupAdd.vue'))
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  components: {
    DashboardLayout,
    Table,
    Header,
    ModalGroupAdd,
    ShTable
  },
  setup() {
    const {header, loading} = new CancelSnapPay()
    return {header, loading}
  },

  data() {
    return {
      orderList: [],
      allOrderCancelLoading : false,
      itemListTable: [],
      statuses:[],
      orderStatus: [
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
      ],
    }
  },

  methods: {
    chipColor(status){
      if (status === 'در انتظار') return 'warning'
      else if (status === 'موفق') return 'success'
      else if (status === 'ناموفق') return 'error'
    },

    getOrderStatus(status) {
      const persianStatus = this.orderStatus.find(orderStatus => orderStatus.value === status)
      if (persianStatus) return persianStatus.text
    },

    translateSendingMethod(status) {
      if (status === 'nafis') {
        return 'نفیس اکسپرس '
      }
      if (status === 'post') {
        return 'پست '
      }
      if (status === 'pishtaz') {
        return ' پست پیشتاز '
      }
    },

    translateStatus(status) {
      if (status === 'wallet') {
        return 'کیف پول '
      }
      if (status === 'snapp') {
        return '  اسنپ پی'
      }
      else return  'پرداخت اینترنتی'
    },

    async cancelSnapPayOrder(id , index){
      try {
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'admin/order/cancel/snapp/orders'
        formData.append('order_number[0]', id)
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.form = formData
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data){
          this.statuses[index] = 'موفق'
        }
        else{
          this.statuses[index] = 'ناموفق'
        }
      }
      catch (e) {
        this.statuses[index] = 'ناموفق'
      }
    },

    updateOrderList(data) {
        this.orderList = data
    },

    async cancelSnapPayAllOrder(id){
      try {
        this.allOrderCancelLoading = true
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'admin/order/cancel/snapp/orders'
        this.orderList.forEach((element , index)=>{
          formData.append(`order_number[${index}]`, element?.order_number)
        })
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.form = formData
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data){
          this.allOrderCancelLoading = false
          this.orderList.forEach((element , index)=>{
            this.$refs.snapTable.changeStatus(index , 'موفق')
          })
        }
        else{
          this.allOrderCancelLoading = false
          this.orderList.forEach((element , index)=>{
            this.$refs.snapTable.changeStatus(index , 'ناموفق')
          })
        }
      }
      catch (e) {
        this.allOrderCancelLoading = false
        this.orderList.forEach((element , index)=>{
          this.$refs.snapTable.changeStatus(index , 'ناموفق')
        })
      }
    },

    removeItem(index){
      this.itemListTable.splice(index , 1)
    }
  },

  watch:{
    orderList() {
      this.itemListTable = []
      this.orderList.forEach((item) => {
        this.itemListTable.push(
            {
              id: item.id,
              order_number: item.order_number,
              user: item.user.first_name,
              mobile_number: item.user.phone_number,
              count: item.items_count,
              order_status: this.getOrderStatus(item.status),
              custom: this.statuses.push('در انتظار'),
              payment: this.translateStatus(item.pay_type),
              paid_price: item.paid_price,
              logestic: item.shipping ? 'mdi-check|success' : 'mdi-close|error',
              sending_method: this.translateSendingMethod(item.sending_method),
              created_at: item.submit_date,
            }
        )
      })
    },
  }
}
</script>
