<template>
<section class="review-order flex-column d-flex h-100">
    <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="600">
        <h3 class="t14400 create-product__header">اطلاعات درخواست مرجوعی</h3>
        <v-divider color="grey" />

        <ReviewRequestStep1 :content="returnedOrder?.data" />

<!--        <template v-else-if="step === 2 && status==='x'">-->
<!--            <div style="padding:20px 10% 80px">-->
<!--                <h2 class="t12300 text-grey mb-3">دلیل رد مرجوعی <span class="text-red">*</span></h2>-->
<!--                <v-textarea variant="outlined" v-model="rejectModel" />-->
<!--            </div>-->
<!--        </template>-->

<!--        <template v-else-if="step === 2 && status==='y'">-->
<!--            <returnedShpsTable :items="returnedShpsDetails" :header="returnedShpsModalHeader" />-->
<!--        </template>-->

        <footer class="create-warehouse__actions ">
            <v-row justify="space-between" class="px-8 pt-8">
                <div>
                    <template v-if="step == 1">
                        <v-btn
                            rounded
                            variant="outlined"
                            width="115"
                            @click="$router.go(-1)">
                            <span class="t14300">
                                بازگشت
                            </span>
                        </v-btn>
                    </template>

                    <template v-if="step == 2">
                        <v-btn
                            rounded
                            variant="outlined"
                            width="115"
                            @click="decreaseStep()">
                            <span class="t14300">
                                مرحله قبل
                            </span>
                        </v-btn>
                    </template>
                </div>

                <div>
                    <v-btn
                        rounded
                        color="primary400"
                        variant="elevated"
                        width="115"
                        class="ml-2"
                        v-if="step == 1"
                        @click="increaseStep('x')">
                        <span class="t12400">رد درخواست</span>
                    </v-btn>

                    <v-btn
                        :loading="loading"
                        rounded
                        :color="step < 2 ? 'light-green-lighten-4' : 'primary500'"
                        variant="elevated"
                        width="115"
                        @click="increaseStep('y')">
                        <span v-if="step < 2" class="t12400">
                            تایید درخواست
                        </span>

                        <span v-else class="t12400">
                            تایید و ثبت
                        </span>
                    </v-btn>
                </div>
            </v-row>
        </footer>
    </v-card>
</section>
</template>

<script>
import Stepper from '@/components/Public/Stepper.vue'
import ReviewRequestStep1 from '@/components/ReturnedOrders/ReviewRequestStep1.vue'
import ReturnedOrders from "@/composables/ReturnedOrders";
import returnedShpsTable from '@/components/ReturnedOrders/Table/returnedShpsModalTable.vue'

export default {

    data: () => ({
      content:null,
        step: 1,
        loading: false,
        steps: [
            'اطلاعات درخواست مرجوعی',
            'جزئیات درخواست'
        ],
        rejectModel: null,
        status:null,
        returnedShpsDetails: [],
    }),

    components: {
        ReviewRequestStep1,
        Stepper,
        returnedShpsTable
    },

    setup() {
        const {
         getReturnOrder , returnedOrder
        } = ReturnedOrders();
        return {
         getReturnOrder , returnedOrder
        };
    },

    methods: {
        /**
         * increase step
         */
        increaseStep(status) {
            if (this.step < 2) {
                ++this.step;
                this.status = status
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
   mounted() {
      this.getReturnOrder()
   }
}
</script>

<style lang="scss">
.review-order {
    .stepper {
        .v-col-1 {
            flex-grow: 1 !important;
            max-width: inherit !important;
        }
    }
}
</style>
