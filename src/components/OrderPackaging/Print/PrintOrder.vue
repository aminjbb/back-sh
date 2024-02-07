<template>
  <div v-if="modalPrintOrderObject" class="pa-5" id="printableArea-cargo d--ltr" >

    <v-card class="">
      <v-row
          justify="space-between"
          align="center"
          class="pa-1 my-2">
        <v-col class="mx-10" cols="2">
          <v-btn @click="close()" variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="7" class="t16400 ">
          پرینت برچسب سفارش
        </v-col>
      </v-row>
      <v-divider class="center-divider"/>
      <div class=" px-5">
        <div >
          <div class=" mt-10 d-flex justify-center " >


            <div class="border-nested-modal">
              <div>
                <div class="d-flex justify-between">
                            <span>
                                <img src="@/assets/img/nafis-image.png" alt="shavaz image">

                            </span>

                  <span v-if="modalPrintOrderObject && modalPrintOrderObject.weight" class=" number-font">
                                {{modalPrintOrderObject.weight}}
                                <span class="modal__content__title">  : وزن بسته </span>
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
                         :   کد پستی

                        </span>
              </div>
              <br/>
              <div class="d-flex justify-between">
                        <span>شماره تماس:
                            <span class=" number-font "> {{modalPrintOrderObject.receiver_mobile}} </span>
                        </span>

                <span>گیرنده

                            <span class=" number-font "> {{modalPrintOrderObject.receiver_name}} </span>
                        </span>

              </div>
              <br/>
              <div class="d-flex justify-end">
                        <span>
                            ادرس:
                            <span class=" number-font "> {{modalPrintOrderObject.receiver_address}} </span>
                        </span>

              </div>

              <div class="main-body-modal">
                <div class="d-flex justify-end">
                          <span class="t12500">تهران، محله ارم، بلوار ناصر حجازی، یعقوبی، اکبر اصغرزاده،
                        پلاک ۱۶، واحد ۵</span>
                  <span>:ادرس</span>
                </div>
                <br/>
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

      </div>
    </v-card>
  </div>

</template>
<script>

import OrderPackaging from "@/composables/OrderPackaging";
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import Table from "@/components/OrderPackaging/Table/Table.vue";


export default {


  data() {
    return {
      modalPrintOrderObject: null,
      form: {

        id: '',
        name: '',

      },


    }},


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

Table

  },
  mounted() {
    this.getOrderListDetail()
  },

  methods: {

    async  getOrderListDetail(packageId = null) {
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/crud/shps/detail/${packageId}`;
      try {
        let response = await AxiosMethod.axios_get();
        if (response) {
          this.modalPrintOrderObject = data.data
          setTimeout(()=>{
            let myElement = document.getElementById('printableArea-cargo');
            window.print(myElement);
          } , 2000)

        } else {

        }
      } catch (error) {
        console.error("Error in API call:", error);
        loading.value = false;
        return [];
      }
    }






  },
  watch: {
    'form.selectedItems': function(newVal, oldVal) {
      console.log('Selected Items Changed:', newVal)
    }
  },


  computed: {



  }
}
</script>

