<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">
        <v-col cols="12">
          <v-btn
              :loading="loadingAllItem"
              @click="cancelOrder( {accept:0 , status :'all'})"
              variant="outlined"
              rounded
              class="px-3 mt-1">
            لغو کل سفارش
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <CancelOrderTable
          ref="cancelOrderTable"
          class="flex-grow-1"
          :header="headerCanselOrder"
          :items="shpsDetails"/>
      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row justify="space-between" class="pr-10">
          <v-col cols="1" class="ml-15">
            <span class="text-center">جمع:</span>
          </v-col>
          <v-col cols="1" class="text-center number-font ">{{ shpsListAllCount }}</v-col>
          <v-col cols="1" class="text-center number-font mr-15">{{shpsListAllCancelledCount}}</v-col>
          <v-col cols="1" class="text-center number-font ml-1">{{ shpsListAllRemainedCount }}</v-col>
          <v-col cols="1" class="text-center number-font mr-15">{{ splitChar(shpsListAllCustomerPrice) }}</v-col>
          <v-col cols="1" class="text-center number-font">{{ splitChar(shpsListAllBaseDiscount) }}</v-col>
          <v-col cols="1" class="text-center number-font">{{ splitChar(shpsListAllMarketingDiscount) }}</v-col>
          <v-col cols="2" class="text-center number-font ml-15 pl-15"> {{splitChar(shpsListAllTotalCustomerPrice)}}</v-col>
        </v-row>
      </v-card-actions>

      <v-divider/>

      <v-card-actions>
        <v-row justify="space-between">
          <v-col cols="1"/>
          <v-col cols="3">
            <v-btn
                @click="$router.go(-1)"
                height="40"
                rounded
                class="px-8 mt-1 mr-5">
              انصراف
            </v-btn>
            <v-btn
                color="primary500"
                height="40"
                rounded
                variant="elevated"
                :loading="loadingItem"
                @click="cancelOrder({accept:0 , status :'items'})"
                class="px-8 mt-1">
              ذخیره
            </v-btn>
           <ConfirmCancelOrder  :status="status" @cancelOrder="cancelOrder" :cancelOrderAccept="cancelOrderAccept" ref="ConfirmCancelOrder"/>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Orders from "@/composables/Orders";
import CancelOrderTable from "@/components/Orders/Table/CancelOrderTable.vue";
import {defineAsyncComponent} from "vue";
const ConfirmCancelOrder =defineAsyncComponent(()=> import ('@/components/Orders/CancelOrder/Modal/ConfirmCancelOrder.vue'))
import SaveModal from "@/components/Orders/Modal/SaveModal.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast, splitChar} from "@/assets/js/functions";

export default {
  components: {SaveModal, CancelOrderTable, ConfirmCancelOrder},
  setup() {
    const {
      headerCanselOrder,
    } = Orders();
    return {
      headerCanselOrder,
    }
  },

  data() {
    return {
      dialog: false,
      shpsDetails:[],
      cancelOrderAccept:null,
      status:'items',
      loadingItem:false,
      loadingAllItem:false
    }
  },

  methods:{
    splitChar,
    /**
     * Get order 'Shps' details by order_id
     */
    async getShpsDetails() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/crud/shps/detail/${this.$route.params.orderId}`
      AxiosMethod.store = this.$store
      let data = await AxiosMethod.axios_get();
      if (data) {
        this.shpsDetails = data.data;
      } else {
      }
    },

    async cancelOrder(object ){
      try {
        const formData = new FormData()
        this.status = object.status
        if (object.status === 'items'){
          this.loadingItem = true
          this.$refs.cancelOrderTable.form.forEach((element , index) =>{
            if (element.cancelled_count){
              formData.append(`shps_list[${index}][shps]` , element.shps)
              formData.append(`shps_list[${index}][count]` , element.cancelled_count)
            }
          })
        }
        else if (object.status === 'all'){
          this.loadingAllItem = true
          this.$refs.cancelOrderTable.form.forEach((element , index) =>{
            formData.append(`shps_list[${index}][shps]` , element.shps)
            formData.append(`shps_list[${index}][count]` , element.count)
          })
        }
        formData.append(`accept` , object.accept)
        formData.append(`order_id` , this.$route.params.orderId)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/cancel/`
        AxiosMethod.store = this.$store
        AxiosMethod.form = formData
        let data = await AxiosMethod.axios_post();
        if (data) {
          this.cancelOrderAccept = data.data;
          this.loadingItem = false
          this.loadingAllItem = false
          if (object.accept){
            this.$refs.ConfirmCancelOrder.dialog  = false
            openToast(this.$store , 'آیتم های سفارش با موفقیت کنسل شد' , 'success')
            this.getShpsDetails()

          }
          else{
            this.$refs.ConfirmCancelOrder.dialog  = true

          }
        } else {
          this.loadingItem = false
          this.loadingAllItem = false
        }
      }
      catch (e) {
        this.loadingItem = false
        this.loadingAllItem = false
      }
    }
  },

  mounted() {
    this.getShpsDetails()
  },

  computed:{
    shpsListAllCount(){
      let allCount = 0
      this.shpsDetails.forEach(shps=>{
        allCount += shps.count
      })
      return allCount
    },
    shpsListAllCancelledCount(){
      let Count = 0
      this.shpsDetails.forEach(shps=>{
        Count += shps.cancelled_count
      })
      return Count
    },
    shpsListAllRemainedCount(){
      let Count = 0
      this.shpsDetails.forEach(shps=>{
        Count += shps.remained_count
      })
      return Count
    },
    shpsListAllCustomerPrice(){
      let Count = 0
      this.shpsDetails.forEach(shps=>{
        Count += shps.customer_price
      })
      return Count
    },
    shpsListAllBaseDiscount(){
      let Count = 0
      this.shpsDetails.forEach(shps=>{
        Count += shps.base_discount
      })
      return Count
    },
    shpsListAllMarketingDiscount(){
      let Count = 0
      this.shpsDetails.forEach(shps=>{
        Count += shps.marketing_discount
      })
      return Count
    },
    shpsListAllTotalCustomerPrice(){
      let Count = 0
      this.shpsDetails.forEach(shps=>{
        Count += shps.paid_price
      })
      return Count
    },
  }
}
</script>


<style scoped>

</style>