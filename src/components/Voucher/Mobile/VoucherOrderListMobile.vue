<template>
    <div >
        <div class="d-flex justify-space-between align-center mx-5">
            <span class="12700">
                سفارش های تخفیف
            </span>

            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                rounded
                class="px-3 mt-1 mr-4">
                بازگشت
            </v-btn>
        </div>

        <v-card class="ma-5 br--12 pa-2" min-height="70">
            <v-row no-gutters class="t14 w500 " >
                <v-col cols="6" class="mb-2">
                  <span >
                     عنوان :
                  </span>
                    <span class="text-gray500">
                     {{ voucherDetail?.name }}
                  </span>
                </v-col>

                <v-col cols="6" class="mb-2">
                    <span >
                         کد تخفیف :
                    </span>
                    <span class="text-gray500">
                        {{ voucherDetail?.code }}
                  </span>
                </v-col>

                <v-col cols="6">
                   <span >
                       نوع تخفیف :
                   </span>

                    <span class="text-gray500" v-if="voucherDetail?.discount_type === 'percent'">
                      درصدی
                   </span>
                    <span class="t14 w500 text-gray500" v-else>
                        ریالی
                    </span>
                </v-col>

                <v-col cols="6">
                    <span >
                      مقدار تخفیف :
                    </span>

                    <span class=" text-gray500 number-font"  v-if="voucherDetail?.discount_type === 'percent'">
                        {{ voucherDetail?.discount }} %
                    </span>
                    <span class=" text-gray500 number-font"  v-else>
                         {{  voucherDetail?.discount  }} ریال
                    </span>
                </v-col>

            </v-row>
        </v-card>


        <v-card   v-for="(item , index) in voucher?.data"  :key="index"
            class="ma-5 br--12 pa-3" min-height="70">
            <v-row no-gutters class="t14 w500 " >
                <v-col cols="12">
                    <v-icon>mdi-circle-small</v-icon>
                    شماره سفارش :
                    {{ item?.id }}
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    نام مشتری :
                    {{ item?.user?.first_name }}
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    نام خانوادگی مشتری :
                     {{  item?.user?.last_name  }}
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    شماره تماس :
                    <span class=" number-font"  >
                         {{  item?.user?.phone_number  }}
                    </span>
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    چندمین سفارش :
                    <span class=" number-font"  >
                         {{  item?.order_number  }}
                    </span>
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    تعداد آیتم :
                    <span class=" number-font"  >
                         {{  item?.details_count  }}
                    </span>
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    مبلغ :

                    <span class=" number-font"  >
                         {{  item?.total_price  }} ریال
                    </span>
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    تاریخ ثبت :

                    <span class=" number-font"  >
                         {{  item?.created_at_fa  }}
                    </span>
                </v-col>

            </v-row>
        </v-card>
    </div>
</template>

<script>
import Voucher from '@/composables/Voucher'
export default {
    setup() {
        const {
            voucher,
            getVoucherOrder,
            getVoucherDetail,
            voucherDetail
        } = new Voucher()
        return {
            voucher,
            getVoucherOrder,
            getVoucherDetail,
            voucherDetail
        }
    },

    mounted() {
        this.getVoucherOrder()
        this.getVoucherDetail()
    },
}
</script>