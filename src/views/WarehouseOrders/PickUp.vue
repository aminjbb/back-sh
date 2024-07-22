<template>
    <v-layout class="bg-gray">
        <v-main class="h-100 ">
            <div class="vh-100 " >

                <template class="loading_modal" v-if="loading">
                    <v-progress-circular
                        indeterminate
                        color="purple">
                    </v-progress-circular>
                </template>

                <template></template>
                <template v-if="testTrue">
                    <div class="bg-red" >dad</div>
                </template>
                <template v-else-if="test">
                    <div class="d-flex justify-space-between align-center">
                        <div class="pa-3 d-flex">
                            <HandheldDrawer/>
                            <span class="t20400">
                            جمع آوری کالا
                            </span>
                        </div>
                        <div class="pa-3">
                            <v-icon @click="$router.go(-1)"  size="30">
                                mdi-chevron-left
                            </v-icon>
                        </div>
                    </div>

                    <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
                        <v-btn
                            color="primary500"
                            height="40"
                            width="348"
                            rounded
                            @click="$router.push('/locating/dashboard')"
                            class="px-8 mt-5">
                            بازگشت به داشبورد
                        </v-btn>
                    </div>


                    <v-icon>mdi-alert-circle</v-icon>
                    <span>کالایی برای جمع آوری یافت نشد.</span>

                    <v-icon>mdi-alert-circle</v-icon>
                    <span>جمع آوری سفارش انجام نشد.</span>
                    <span>کالایی برای جمع آوری یافت نشد.</span>

                    <v-icon>mdi-check-circle</v-icon>
                    <span>جمع آوری سفارش با کسری بسته شد.</span>
                    <span>
        جمع آوری سفارش با شناسه {{  }} با کسری انجام شد.
                    </span>

                    <v-icon>mdi-check-circle</v-icon>
                    <span>جمع آوری با موفقیت انجام شد.</span>
                    <span>
        جمع آوری سفارش با شناسه {{  }} با موفقیت انجام شد.
                    </span>
                </template>

            </div>
        </v-main>
    </v-layout>
</template>

<script >
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
import WarehouseOrder from '@/composables/WarehouseOrder'

export default{
    components:{
        HandheldDrawer
    },

    data() {
        return {
            test: false,
            testTrue: true

        }
    },

    setup() {
        const {
            loading,
/*            getPickUpShps,
            pickUpShps,
            pickUpIsNull,
            pickUpCount*/
        } = new WarehouseOrder()
        return {
            loading,
/*            getPickUpShps,
            pickUpShps,
            pickUpIsNull,
            pickUpCount*/
        }
    },
}
</script>