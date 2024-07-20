<template>
    <div >
        <div class="d-flex justify-space-between align-center mx-5">
            <span class="12700">
             کالاهای تخفیف
            </span>

            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                rounded
                class="px-3 mt-1 mr-4">
                بازگشت
            </v-btn>
        </div>

        <v-card class="ma-5 br-12 pa-2" min-height="70">
            <v-row no-gutters class="t14500 " >
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
                    <span class="t14500 text-gray500" v-else>
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


        <v-card  v-for="(item , index) in voucher"  :key="index"
            class="ma-5 br-12 pa-3" min-height="70">
            <v-row no-gutters class="t14500 " >
                <v-col cols="12">
                    <v-icon>mdi-circle-small</v-icon>
                    شناسه کالا :
                    <span class=" number-font"  >
                     {{ item?.sku?.id }}
                    </span>
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    نام کالا :
                    <span class=" number-font"  >
                    {{ item?.sku?.label }}
                    </span>
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    قیمت مصرف کننده :
                    <span class=" number-font"  >
                         {{  item?.customer_price  }} ریال
                    </span>
                </v-col>

                <v-col cols="12" class="mt-3">
                    <v-icon>mdi-circle-small</v-icon>
                    قیمت فروش :

                    <span class=" number-font"  >
                         {{  item?.customer_price  }} ریال
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
            getVoucherShps,
            getVoucherDetail,
            voucherDetail
        } = new Voucher()
        return {
            voucher,
            getVoucherShps,
            getVoucherDetail,
            voucherDetail
        }
    },

    mounted() {
        this.getVoucherShps()
        this.getVoucherDetail()
    },
}
</script>