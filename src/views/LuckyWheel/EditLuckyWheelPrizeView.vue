<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <LuckyWheelPrizeEdit />-->
      <div class="create-product flex-column d-flex h-100">

        <v-card class="mx-5 br--12 pb-15 flex-grow-1" height="600">

          <LuckyWheelFormStep2 :getLuckyWheelPrize="getLuckyWheelPrize" :luckyWheelPrize="luckyWheelPrize" ref="LuckyWheelFormStep2" status="edit"/>

          <footer class="create-product__actions ">
            <v-row justify="space-between" class="px-8 pt-8">
              <div>

                <v-btn
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
            </v-row>
          </footer>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const Stepper = defineAsyncComponent(() => import('@/components/Public/Stepper.vue'))
const LuckyWheelFormStep2 = defineAsyncComponent(() => import('@/components/LuckyWheel/Steps/LuckyWheelFormStep2.vue'))
import {convertDateToGregorian, openConfirm, openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
import LuckyWheel from '@/composables/LuckyWheel'
// const LuckyWheelPrizeEdit = defineAsyncComponent(() => import('@/components/LuckyWheel/Edit/LuckyWheelPrizeEdit.vue'));

export default {
  components: {
    Stepper,
    LuckyWheelFormStep2,
    DashboardLayout,
    Header
  },
  setup(){
    const {
      getLuckyWheelPrize , luckyWheelPrize
    } = new LuckyWheel()
    return { getLuckyWheelPrize , luckyWheelPrize}
  },

  methods: {
    /**
     *  change step from stepper button
     * @param{*} step
     */
    changeStep(step) {
      this.step = step
    },

    decreaseStep() {
      if (this.step > 1) --this.step
    },

    validationStepOne() {
      if(this.isLabel && this.isName && this.isStartDate && this.isEndDate && this.isChance) {
        this.step++
      }
      else {
        if(this.isLabel===false) {
          openToast( this.$store,'نام فارسی گردونه شانس وارد نشده است' , 'error')
        }
        else if (this.isName===false) {
          openToast( this.$store, 'لبیل انگلیسی گردانه وارد نشده است' , 'error')
        }
        else if (this.isStartDate===false ) {
          openToast( this.$store,'تاریخ شروع لازم است' , 'error')
        }
        else if (this.isEndDate===false) {
          openToast( this.$store,'تاریخ پایان لازم است' , 'error')
        }
        else if (this.isChance===false) {
          openToast( this.$store,'تعداد شانس وارد نشده است' , 'error')
        }
      }
    },


    async sendingData() {
      let dateSplit = this.startDateData.split(' ')
      const convertDate = convertDateToGregorian(dateSplit[0] , '/' , false)

      let dateSplitEnd = this.endDateData.split(' ')
      const convertDateEnd = convertDateToGregorian(dateSplitEnd[0] , '/' , false)
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'game/lucky-wheel/crud/creat'
      formData.append('name', this.nameData)
      formData.append('label', this.labelData)
      formData.append('start_time', convertDate + ' ' + dateSplit[1] + ':00')
      formData.append('end_time', convertDateEnd + ' ' +  dateSplitEnd[1]+ ':00')
      formData.append('turn_per_user', this.chanceData)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.$refs.LuckyWheelFormStep2.prizeList.forEach(prize=>{
          this.createPrize(data.data.id , prize)
        })
        this.loading = false
        openToast(this.$store,
            'چرخونه با موفقیت ایجاد شد.',
            "success")
      } else {
        this.loading = false
      }
    },

    async createPrize(luckyWheelId , item) {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'game/lucky-wheel/prize/crud/creat'
      formData.append('lucky_wheel_id', luckyWheelId)
      formData.append('name', item.name)
      formData.append('label', item.label)
      formData.append('voucher_id', item.voucher)
      formData.append('deadline_for_use', item.time)
      formData.append('chance', item.chance)
      formData.append('desktop_image_id', item.image)
      formData.append('mobile_image_id', item.imageMobile)
      formData.append('description', item.description)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/lucky-wheel/index')

      } else {
        this.loading = false
      }
    }
  },

  mounted() {
    this.getLuckyWheelPrize()
  }

}
</script>

