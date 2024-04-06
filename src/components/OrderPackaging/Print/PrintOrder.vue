<template>
<div v-if="modalPrintOrderObject" class="pa-5" id="printableArea-order ">
    <div>
        <div class=" mt-10 d-flex justify-center ">
            <div class="border-nested-modal">
                <div>
                    <div class="d-flex justify-between">
                        <span class=" number-font">
                            <span>فرستنده: </span>
                            {{modalPrintOrderObject.sender}}
                        </span>
                        <span class=" number-font">

                            <span class="modal__content__title"> وزن بسته: </span>
                            {{modalPrintOrderObject.weight}}
                        </span>
                        <span>
                            <img src="@/assets/img/nafis-image.png" alt="shavaz image">
                        </span>
                    </div>
                </div>
                <div>
                    <span class=" d-flex justify-start">
                        کد پستی:
                        <span class=" number-font "> {{modalPrintOrderObject.receiver_postal_code}} </span>

                    </span>
                </div>
                <br />
                <div class="d-flex justify-between">
                    <span>گیرنده:

                        <span class=" number-font "> {{modalPrintOrderObject.receiver_name}} </span>
                    </span>
                    <span>شماره تماس:
                        <span class=" number-font "> {{modalPrintOrderObject.receiver_mobile}} </span>
                    </span>
                </div>
                <br />
                <div class="d-flex justify-start">
                    <span>
                        ادرس:

                        <span class=" number-font "> {{modalPrintOrderObject.receiver_address}} </span>
                    </span>
                </div>

                <div class="main-body-modal">
                    <div class="d-flex justify-start">
                        <span>ادرس: </span>
                        <span class="t12500">
                            {{modalPrintOrderObject.sender_address}}
                        </span>

                    </div>
                    <br />
                    <div class="d-flex justify-between">
                        <span>

                            شماره فاکتور:</span>
                        <span class=" number-font "> {{modalPrintOrderObject.order_factor_id}} </span>
                        <span>
                            کد پستی:
                            <span class=" number-font"> {{modalPrintOrderObject.sender_postal_code}} </span>

                        </span>

                    </div>

                </div>
              <div class="d-flex justify-center mt-4">
                <barcode
                    :barcodeValue="modalPrintOrderObject.logistic_barcode"
                    :format="'CODE128'"
                    :index="1"
                    text=""
                ></barcode>
              </div>
              <div class="d-flex justify-center">
                <span>{{ modalPrintOrderObject.logistic_barcode }}</span>
              </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Barcode from "@/components/OrderPackaging/Barcode/OrderPackagingBarcode.vue";
import OrderPackaging from "@/composables/OrderPackaging";
import {
    AxiosCall
} from '@/assets/js/axios_call.js'

export default {

    data() {
        return {
            modalPrintOrderObject: null,
            form: {
                id: '',
                name: '',
            },
        }
    },

    setup() {
        const {
            dataTableLength,
            page,
            header,
            loading,
            headerShps,
            orderListDetail,
            getShpssDetailLost,
            shpssDetailLost
        } = OrderPackaging();

        return {
            getShpssDetailLost,
            shpssDetailLost,
            dataTableLength,
            page,
            orderListDetail,
            header,
            loading,
            headerShps
        };
    },

    components: {
      Barcode
    },

    mounted() {
        this.getOrderListDetail()
    },

    methods: {
        async getOrderListDetail() {
            const AxiosMethod = new AxiosCall();
            AxiosMethod.using_auth = true;
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `admin/order/print/label/${this.$route.params.orderId}`;
            try {
                let response = await AxiosMethod.axios_get();
                if (response) {
                    this.modalPrintOrderObject = response.data

                    setTimeout(() => {
                        let myElement = document.getElementById('printableArea-order');
                        window.print(myElement);
                    }, 2000)

                } else {

                }
            } catch (error) {
                console.error("Error in API call:", error);

                return [];
            }
        }
    },
    watch: {
        'form.selectedItems': function (newVal, oldVal) {
            console.log('Selected Items Changed:', newVal)
        }
    },
}
</script>
