<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header />
      <!--      <AddCrossDock />-->
      <section class="create-product flex-column d-flex h-100">
        <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>
        <v-card class="ma-5 br--12 pb-15 flex-grow-1">
          <template v-if="step === 1">
            <AddCrossDockStep1 :orders="orders" ref="step1"/>
          </template>
          <template v-if="step === 2">
            <AddCrossDockStep2 ref="step2"/>
          </template>
          <template v-if="step === 3">
            <AddCrossDockStep3 ref="step3"/>
          </template>



          <footer class="create-product__actions ">
            <v-row justify='space-between' class="px-8 pt-8">
              <div>
                <v-btn
                    v-if="step > 1"
                    rounded
                    variant="outlined"
                    width="115"
                    @click="decreaseStep()"
                >
              <span class="t14 w300">
                  مرحله قبلی
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
                    @click="increaseStep()"
                >
              <span
                  v-if="step < 4"
                  class="t14 w300"
              >
               تایید و ادامه
              </span>

                  <span
                      v-else
                      class="t14 w300"
                  >
                تایید و ثبت
              </span>
                </v-btn>
              </div>
            </v-row>
          </footer>
        </v-card>
      </section>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const AddCrossDock = defineAsyncComponent(()=> import ('@/components/Seller/CrossDock/Add/AddCrossDock.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Stepper from '@/components/Public/Stepper.vue'
import {AxiosCall} from '@/assets/js/axios_call.js'
import {convertDateToGregorian, openToast} from "@/assets/js/functions";
import AddCrossDockStep1 from '@/components/Seller/CrossDock/Add/Steps/AddCrossDockStep1.vue'
import AddCrossDockStep2 from '@/components/Seller/CrossDock/Add/Steps/AddCrossDockStep2.vue'
import AddCrossDockStep3 from '@/components/Seller/CrossDock/Add/Steps/AddCrossDockStep3.vue'

export default {
  components: {
    Stepper,
    AddCrossDockStep1,
    AddCrossDockStep2,
    AddCrossDockStep3,
    DashboardLayout,
    Header
  },

  data: () => ({
    step: 1,
    loading: false,
    steps:[
      'انتخاب کالا',
      'نمایش کالاهای انتخاب شده',
      'ارسال به انبار',
    ]

  }),
  methods: {

    /**
     * increase step
     */
    increaseStep() {
      if (this.step === 1){
        this.step1Validation()
      }if (this.step === 2){
        this.step2Validation()
      }if (this.step === 3){
        this.step3Validation()
      }
    },
    step1Validation(){
      console.log(this.$refs.step1.$refs.AddCrossDockStep1Table)
      setTimeout(()=>{
        if (this.$refs.step1.$refs.AddCrossDockStep1Table.selectedShpsValue.length === 0 ){
          openToast( this.$store,
              'هیچ کالایی هنوز انتخاب نشده است',
              "error")
        }
        else {
          this.$store.commit('set_crossDockSelectedShps' , this.$refs.step1.$refs.AddCrossDockStep1Table.selectedShpsValue)
          this.step++
        }
      },200)
    },
    step2Validation(){
      this.$store.commit('set_draftCrossDockSelectedShps' , this.$refs.step2.$refs.AddCrossDockStep2Table.draftCrossDockSelectedShps)
      this.step++
    },
    step3Validation(){
      this.$refs.step3.$refs.CrossDock3.validate()
      setTimeout(()=>{
        if (this.$refs.step3.valid){
          this.createCrosDock()
        }
      },200)
    },
    async createCrosDock() {
      const selectedShps =  this.$store.getters['get_crossDockSelectedShps']
      this.loading = true
      let formData =  new FormData()
      selectedShps.forEach((element  ,index) =>{
        formData.append(`shps_list[${index}][shps]`,element.shps)
        formData.append(`shps_list[${index}][order_id]`,element.order_id)
        formData.append(`shps_list[${index}][count]`,element.count)
      })

      formData.append('seller_id',this.$route.params.sellerId)
      formData.append('type','cross_dock')
      formData.append('warehouse_id',this.$refs.step3.warehouse)
      formData.append('sent_to_warehouse_at',this.$refs.step3.minDate)

      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'shipment/crossdock/crud/create'
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.go(-1)
      } else {
        this.loading = false
      }
    },
    /**
     * decrease step
     */
    decreaseStep() {
      if (this.step > 1) --this.step

    },

    /**
     *  change step from stepper button
     * @param{*} step
     */
    changeStep(step) {
      this.step = step
    },

  },

}
</script>
