<template>
<v-dialog v-if="dialog" v-model="dialog" width="1000px">
    <v-card class="pa-5 ">
        <v-expansion-panels class="accordion" variant="inset">
            <v-expansion-panel>
                <v-expansion-panel-title class="accordion__header">
                    <span>
                        اطلاعات سفارش
                    </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="accordion__items__content">
                    <div class="simple-table-parent">
                        <div class="simple-table ">
                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">نام و نام خانوادگی بسته بند</v-col>
                                <v-col col="6" class="pa-0 number-font">
                                    <template v-if="data.pickupper !== null">
                                        {{ data.pickupper }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">زمان پیک آپ سفارش</v-col>
                                <v-col col="6" class="pa-0 number-font">
                                    <template v-if="data.pickup_date !== null">
                                        {{ data.pickup_date }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">زمان سورت شدن سفارش</v-col>
                                <v-col col="6" class="pa-0 number-font">
                                    <template v-if="data.sort_date !== null">
                                        {{ data.sort_date }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">زمان ثبت سفارش</v-col>
                                <v-col col="6" class="pa-0 number-font">
                                    <template v-if="data.created_at_fa !== null">
                                        {{ data.created_at_fa }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">زمان پکیج سفارش</v-col>
                                <v-col col="6" class="pa-0 number-font">
                                    <template v-if="data.packed_date !== null">
                                        {{ data.packed_date }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">وضعیت</v-col>
                                <v-col col="6" class="pa-0 number-font">
                                    <template v-if="data.status !== null">
                                        {{ data.status }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">مبلغ سفارش</v-col>
                                <v-col col="6" class="pa-0 number-font">
                                    <template v-if="data.paid_price !== null">
                                        {{ data.paid_price }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">کد تخفیف</v-col>
                                <v-col col="6" class="pa-0 number-font">
                                    <template v-if="data.voucher_code !== null">
                                        {{ data.voucher_code }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">مبلغ تخفیف</v-col>
                                <v-col col="6" class="pa-0 number-font">
                                    <template v-if="data.voucher_amount !== 0">
                                        {{ data.voucher_amount }}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title class="accordion__header">
                    <span>
                        لیست کالاها
                    </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="accordion__items__content">
                    <div class="simple-table-parent">
                        <div class="simple-table">
                            <v-row v-for="(item,index) in data.order_details" :key="`order-${index}`" class="ma-0 d--rtl">
                                <v-col cols="3" class="pa-0 d-flex align-center justify-center">
                                    <img v-if="item.sku_image" alt="image" :src="item?.sku_image" width="100" height="100">
                                </v-col>
                                <v-col cols="7" class="pa-0 number-font d-flex align-center ">{{ item?.sku_label }}</v-col>
                                <v-col cols="2" class="pa-0 d-flex align-center justify-center">{{ item?.count }}</v-col>
                            </v-row>
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        }
    },

    props: {
        data: Array
    }
}
</script>

<style>
.v-expansion-panels--variant-inset>.v-expansion-panel--active {
    max-width: 100% !important;
}

.v-expansion-panel-title--active>.v-expansion-panel-title__overlay {
    background: #FCE4EC !important;
    opacity: 1 !important;
}

.accordion__header span {
    z-index: 1 !important;
}

.v-expansion-panel-title {
    min-height: 56px !important;
}

.v-expansion-panels {
    overflow-y: auto !important;
}
</style>
