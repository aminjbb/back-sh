<template>
  <div class="create-product flex-column d-flex h-100">
    <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>

    <v-card class="mx-5 br-12 pb-15 flex-grow-1" height="600">
      <template v-if="step===1">
        <LuckyWheelFormStep1
            @label="getLabel"
            @name="getName"
            @startDate="getStartDate"
            @endDate="getEndDate"
            @chance="getChance"
            ref="LuckyWheelFormStep1"/>
      </template>

      <template v-if="step===2">
        <LuckyWheelFormStep2 ref="LuckyWheelFormStep2"/>
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
                color="primary500"
                variant="elevated"
                width="115"
                @click="increaseStep()">
              <span
                  v-if="step == 1"
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
</template>
<script>

import {defineAsyncComponent} from "vue";
import {convertDateToGregorian, openConfirm, openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

const Stepper = defineAsyncComponent(() => import('@/components/Public/Stepper.vue'))
const LuckyWheelFormStep1 = defineAsyncComponent(() => import('@/components/LuckyWheel/Steps/LuckyWheelFormStep1.vue'))
const LuckyWheelFormStep2 = defineAsyncComponent(() => import('@/components/LuckyWheel/Steps/LuckyWheelFormStep2.vue'))


export default {
  components: {
    Stepper,
    LuckyWheelFormStep1,
    LuckyWheelFormStep2
  },

  data() {
    return {
      step: 1,
      steps: [
        'مرحله اول',
        'مرحله دوم',
      ],
      labelData:null,
      nameData:null,
      startDateData:null,
      endDateData:null,
      chanceData:null,
      isLabel:false,
      isName:false,
      isStartDate:false,
      isEndDate:false,
      isChance:false,
    }
  },

  methods: {

    async increaseStep() {
      if (this.step === 1){
        this.validationStepOne()
      }
      // if (this.step === 2){
      //   // this.step2Validation()
      // }
      // if (this.step === 1) {
      //   ++this.step
      //   // await this.$refs.LuckyWheelFormStep1.$refs.LuckyWheelStep1Form.validate()
      //   //  if (this.$refs.LuckyWheelFormStep1.valid) ++this.step
      // }
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

    getLabel(label) {
      this.labelData = label
      if(label && label !== null && label !== ''){
        this.isLabel = true
      }
      else {
        this.isLabel = false
      }
    },
    getName (name) {
      this.nameData = name
      if(name && name !== null && name !== ''){
        this.isName = true
      }
      else {
        this.isName = false
      }
    },
    getStartDate(startDate) {
      this.startDateData = startDate
      if(startDate && startDate !== null && startDate !== ''){
        this.isStartDate = true
      }
      else {
        this.isStartDate = false
      }
    },
    getEndDate(endDate) {
      this.endDateData = endDate
      if(endDate && endDate !== null && endDate !== ''){
        this.isEndDate = true
      }
      else {
        this.isEndDate = false
      }
    },
    getChance(chance) {
      this.chanceData = chance
      if(chance && chance !== null && chance !== ''){
        this.isChance = true
      }
      else {
        this.isChance = false
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


    /**
     *  change step from stepper button
     * @param{*} step
     */
    changeStep(step) {
      this.step = step
    },

}
</script>