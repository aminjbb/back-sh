<template>
<div class="text-right ">
    <v-dialog v-model="dialog" width="700">
        <v-card class="">
            <v-row justify="space-between" align="center" class="pa-1 my-2">
                <v-col class="mx-10" cols="2">
                    <v-btn @click="close()" variant="icon">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="7" class="t16400 ">
                    پرینت برچسب سفارش
                </v-col>
            </v-row>
            <v-divider class="center-divider" />
            <div class=" px-5">
                <div>
                    <div class=" mt-10 d-flex justify-center ">

                        <div class="border-nested-modal">
                            <div>
                                <div class="d-flex justify-between">
                                    <span>
                                        <img src="@/assets/img/nafis-image.png" alt="shavaz image">

                                    </span>

                                    <span v-if="modalPrintOrderObject && modalPrintOrderObject.weight" class=" number-font">
                                        {{modalPrintOrderObject.weight}}
                                        <span class="modal__content__title"> : وزن بسته </span>
                                    </span>

                                    <span v-if="modalPrintOrderObject && modalPrintOrderObject.sender" class=" number-font">
                                        <span>فرستنده: </span>
                                        {{modalPrintOrderObject.sender}}

                                    </span>

                                </div>
                            </div>
                            <div>
                                <span class=" d-flex justify-end">

                                    <span class=" number-font "> {{modalPrintOrderObject.receiver_postal_code}} </span>
                                    : کد پستی

                                </span>
                            </div>
                            <br />
                            <div class="d-flex justify-between">
                                <span>شماره تماس:
                                    <span class=" number-font "> {{modalPrintOrderObject.receiver_mobile}} </span>
                                </span>

                                <span>گیرنده

                                    <span class=" number-font "> {{modalPrintOrderObject.receiver_name}} </span>
                                </span>

                            </div>
                            <br />
                            <div class="d-flex justify-end">
                                <span>
                                    ادرس:
                                    <span class=" number-font "> {{modalPrintOrderObject.receiver_address}} </span>
                                </span>

                            </div>

                            <div class="main-body-modal">
                                <div class="d-flex justify-end">
                                    <span class="t12500">{{modalPrintOrderObject.sender_address}}</span>
                                    <span>:ادرس</span>
                                </div>
                                <br />
                                <div class="d-flex justify-between">
                                    <span>
                                        <span class=" number-font "> {{modalPrintOrderObject.order_factor_id}} </span>
                                        :شماره فاکتور</span>
                                    <span>
                                        <span class=" number-font"> {{modalPrintOrderObject.sender_postal_code}} </span>

                                        :کد پستی
                                    </span>

                                </div>

                            </div>
                            <div class="d-flex justify-center mt-4">

                                <img src="@/assets/img/qrcode3.png" alt="shavaz image">

                            </div>
                            <div class="d-flex justify-center">
                                <span>۱۲۳۴۵۶۶۴۳۳۹۹۵۸</span>
                            </div>

                        </div>

                    </div>
                </div>
                <v-row class="justify-between my-2 mx-2">

                    <v-col cols="3" class="d-flex mx-10 ">
                        <v-btn @click="print()" height="40" rounded variant="flat" class="px-5 mt-1 border ">
                            <template v-slot:prepend>
                                <v-icon>mdi-printer-outline</v-icon>
                            </template>
                            پرینت برچسب
                        </v-btn>
                        <span>

                        </span>
                    </v-col>
                    <v-col cols="3" class="d-flex justify-end mx-10">
                        <btn class="mt-3 mr-2" @click="close()" style="cursor: pointer;">
                            انصراف
                        </btn>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>
    
<script>
import OrderPackaging from "@/composables/OrderPackaging";
export default {
    data() {
        return {
            form: {
                id: '',
                name: '',
            },
        }
    },

    setup() {
        const {
            orderList,
            dataTableLength,
            page,
            header,
            loading,
            headerShps,
            orderListDetail,
            getShpssDetailLost,
            shpssDetailLost,
            getShpsList
        } = OrderPackaging();

        return {
            orderList,
            getShpssDetailLost,
            shpssDetailLost,
            dataTableLength,
            orderListDetail,
            page,
            header,
            loading,
            headerShps,
            getShpsList
        };
    },

    methods: {
        print() {
            window.open(`${ import.meta.env.VITE_API_SITEURL}order-packaging/${this.$route.params.orderId}/print`, '_blank');
        },

        close() {
            const form = {
                dialog: false,
                object: ''
            }
            this.$store.commit('set_modalPrintOrder', form)
        },

    },
    watch: {
        'form.selectedItems': function (newVal, oldVal) {
            console.log('Selected Items Changed:', newVal)
        }
    },

    computed: {
        modalPrintOrderObject() {
            const data = this.$store.getters['get_modalPrintOrderObject'];
            return data;
        },

        dialog() {
            return this.$store.getters['get_modalPrintOrder']
        },

    }
}
</script>