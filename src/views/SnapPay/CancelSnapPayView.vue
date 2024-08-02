<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
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

        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              @removeItem="removeItem"
              :header="header"
              :items="orderList"
              :page="1"
              :perPage="100"
              ref="snapTable"
          />
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
export default {
  components: {
    DashboardLayout,
    Table,
    Header,
    ModalGroupAdd
  },
  setup() {
    const {header, loading} = new CancelSnapPay()
    return {header, loading}
  },

  data() {
    return {
      orderList: [],
      allOrderCancelLoading : false
    }
  },

  methods: {
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
      this.orderList.splice(index , 1)
    }
  }
}
</script>
