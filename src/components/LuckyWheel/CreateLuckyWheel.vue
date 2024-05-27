<template>
  <div class="create-product flex-column d-flex h-100">
    <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>

    <v-card class="mx-5 br-12 pb-15 flex-grow-1" height="600">
      <template v-if="step===1">
        <LuckyWheelFormStep1 ref="LuckyWheelFormStep1"/>
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
              <span class="t14300">
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
              <span class="t14300">
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
                  class="t14300">
                تایید و ادامه
              </span>

              <span
                  v-else
                  class="t14300"
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
import {openConfirm} from "@/assets/js/functions";

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
    }
  },

  methods: {

    async increaseStep() {
      if (this.step === 1) {
        ++this.step
        // await this.$refs.LuckyWheelFormStep1.$refs.LuckyWheelStep1Form.validate()
        //  if (this.$refs.LuckyWheelFormStep1.valid) ++this.step
      }
    },

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
  }
}
</script>