<template>
<v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" style="height:calc(100vh - 100px)">
    <h3 class="t14 w400 create-product__header">رسید ارسال</h3>

    <v-divider color="grey" />

    <v-row style="padding:40px 15%">
        <v-col cols="6">
            <div class="t12 w500 text-grey mb-3">تصویر فیش ارسالی</div>
            <ReceiptModal imageAddress="" />
        </v-col>
        <v-col cols="6">
            <div class="t12 w500 text-grey mb-3">وضعیت فیش ارسالی</div>
            <v-select
                density="compact"
                variant="outlined"
                single-line
                item-title="label"
                item-value="value"
                :items="receiptStatus"
                v-model="receiptStatusModel" />
        </v-col>
    </v-row>
    <footer class="create-product__actions">
        <v-row justify="space-between" class="px-8 pt-8">
            <div>
                <v-btn
                    rounded
                    variant="outlined"
                    width="115"
                    @click="$router.go(-1)">
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
                    width="115">

                    <span class="t12 w400">
                        تایید
                    </span>
                </v-btn>
            </div>
        </v-row>
    </footer>
</v-card>
</template>

<script>
import ReceiptModal from '@/components/ReturnedOrders/Modal/ReceiptModal.vue'
export default {

    data() {
        return {
            receiptStatus: [{
                    label: 'تایید شده',
                    value: 'accept'
                },
                {
                    label: 'رد شده',
                    value: 'reject'
                }
            ],
            receiptStatusModel: null,
        }
    },

    components: {
        ReceiptModal
    }
}
</script>
