<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <CreateManualOrder />-->
      <div class="create-product flex-column d-flex h-100">
        <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>

        <v-card class="ma-5 br--12 pb-15 flex-grow-1" height="600">
          <template v-if="step === 1">
            <ManualOrderStepOne
                @sending="sending"
                @selectAddress="selectAddress"
                @selectDescription="selectDescription"
                @selectedSendingMethod="selectedSendingMethod"
                ref="step1"
                :orderDetail="orderDetail"
            />

          </template>

          <template v-if="step === 2">
            <ManualOrderStepTwo ref="ManualOrderStepTwo"/>
          </template>

          <footer class="create-product__actions ">
            <v-row justify="space-between" class="px-8 pt-8">
              <div>
                <v-btn
                    v-if="step > 1"
                    rounded
                    variant="outlined"
                    width="115"
                    @click="decreaseStep()">
              <span class="t14 w300">
                  بازگشت
              </span>
                </v-btn>
                <v-btn
                    v-else
                    rounded
                    variant="outlined"
                    width="115"
                    @click="$router.go(-1)"
                >
              <span class="t14 w300">
                 بازگشت
              </span>
                </v-btn>
              </div>
              <div>
                <v-btn
                    :loading="loading"
                    rounded
                    color="primary400"
                    variant="elevated"
                    width="115"
                    @click="increaseStep()">
              <span
                  v-if="step < 2"
                  class="t14 w300">
                تایید و ادامه
              </span>

                  <span
                      v-else
                      class="t14 w300"
                      @click="sendingData()"
                  >
                تایید و ثبت
              </span>
                </v-btn>
              </div>
            </v-row>
          </footer>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const CreateManualOrder = defineAsyncComponent(()=> import ('@/components/Orders/CreateManualOrder/CreateManualOrder.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Stepper from '@/components/Public/Stepper.vue'
import Orders from "@/composables/Orders";
import {AxiosCall} from '@/assets/js/axios_call.js'
import {openToast} from "@/assets/js/functions";
import ManualOrderStepOne from '@/components/Orders/CreateManualOrder/Steps/ManualOrderStepOne.vue'
import ManualOrderStepTwo from '@/components/Orders/CreateManualOrder/Steps/ManualOrderStepTwo.vue'

export default {
  components: {
    ManualOrderStepOne,
    ManualOrderStepTwo,
    Stepper,
    DashboardLayout,
    Header
  },

  data: () => ({
    orderDetail: null,
    step: 1,
    loading: false,
    steps:[
      'اطلاعات سفارش',
      'انتخاب محصول',
    ],
    userId: '',
    updatedShpsList: [],
    useId:null,
    addressId:null,
    sendMethod: null,
    descriptionData: null,
    orderAddress:null,
    orderDescription:null,
    sendingMethod:null
  }),
  setup() {
    const {

      manualOrderListGet,
      getManualOrderListGet,
      getManualOrderList,
      manualOrderList,
      orderList , getOrderList

    } = new Orders;

    return {
      getManualOrderList,
      manualOrderList,
      manualOrderListGet,
      getManualOrderListGet,
      orderList , getOrderList
    }
  },

  methods: {
    selectAddress(item){
      this.orderAddress = item
    },
    selectDescription(item){
      this.orderDescription = item
    },
    selectedSendingMethod(item){
      this.sendingMethod = item
    },
    sending(user){
      this.userId = user
    },

    updatedShpsList(id){
      this.updatedShpsList = id
    },

    async getOrderDetail() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/crud/get/${this.$route.params.orderId}`

      let data = await AxiosMethod.axios_get()
      if (data) {
        this.orderDetail = data.data
      }
      else {}
    },

    decreaseStep() {
      if (this.step > 1) {
        --this.step
      }
    },
    increaseStep() {
      if (this.step === 1){
        this.step1Validation()
      }
    },

    step1Validation(){
      this.$refs.step1.$refs.manualOrder1.validate()
      setTimeout(()=>{

        if (this.$refs.step1.form.description.length <1){
          console.log(this.$refs.step1.form.description, "testDescription")
          openToast( this.$store,
              'توضیحات الزامی است',
              "error")
        }
        else if (this.$refs.step1.valid){
          this.$store.commit('set_manualOrderStep1' , this.$refs.step1.form)
          this.step ++
        }
      },200)
    },

    sendingData(){
      const zeroCountShpsList = this.$refs.ManualOrderStepTwo.$refs.manualOrderTable.values.find(shps => shps.count == 0)
      if (zeroCountShpsList){
        openToast( this.$store,'محصولی با تعداد صفر نمیتوانید وارد کنید' , 'error')
      }
      else{
        this.createOrder()
      }
    },

    async createOrder() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/order/crud/create'
      this.$refs.ManualOrderStepTwo.$refs.manualOrderTable.values.forEach((shps,index)=>{
        formData.append(`shps_list[${index}][shps]`, shps?.shps)
        formData.append(`shps_list[${index}][count]`, shps?.count)
      })
      formData.append('parent_id', this.$route.params.orderId)
      formData.append('user_id', this.userId)
      formData.append('address_id', this.orderAddress)
      formData.append('sending_method', this.sendingMethod)
      formData.append('description', this.orderDescription)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_post()

      if (data) {
        this.loading = false

        this.$router.go(-1)
      } else {
        this.loading = false

      }
    },
    /**
     *  change step from stepper button
     * @param{*} step
     */
    changeStep(step) {
      this.step = step
    },
  },

  mounted() {

    this.getManualOrderListGet()
    this.getManualOrderList()
    this.getOrderDetail()
  },
}
</script>