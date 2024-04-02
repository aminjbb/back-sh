<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card
        class="ma-5 br-12"
        height="160"
        style="flex:0 0 150px">
      <header class="modal__header d-flex justify-center align-center ">
            <span class="t16400 pa-6">
              اطلاعات سفارش
            </span>
      </header>
      <v-divider color="grey"/>
      <div class="d-flex justify-center mx-16 mt-4 ">
        <div class="text-right my-3 mx-15">
                    <span class="t13400 color-grey">
                     {{ orderListDetail.id}}   شناسه سفارش :
                        
                    </span>
        </div>
        <div class="text-right my-3 mx-15">
                    <span class="t13400 color-grey">
                      روش ارسال :  {{ orderListDetail.sending_method }}
                      <span class="t13400 color-grey">                      
                      </span>
                    </span>
        </div>
        <v-form >
          <v-form @submit.prevent="splitedNum" >
            <div>
              <v-text-field

                  variant="outlined"
                  v-model="orderId"
                  />
            </div>
          </v-form>
        </v-form>
      </div>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="200">

      <Table
          ref="oredrDetailFunc"
          class="flex-grow-1"
          :header="detailInfo"
          :items="orderListDetail"
          :loading="loading"
          @updateList="updateList"
          @all-comparisons-successful="handleComparisonChange"
          deletePath="report/crud/delete/"
      />

      <v-divider/>
      <v-card-actions class="pb-3">
        <v-row class="px-5 py-2" justify="end">
          <v-btn

              height="40"
              rounded
              variant="flat"
              class="px-8 mt-2"
              @click="contradictedOrder"

          >
            گزارش مغایرت
          </v-btn>
          <v-btn

              color="primary500"

              height="40"
              rounded
              variant="flat"
              class="px-8 mt-2"
              :class="{'gray-button': !allComparisonsSuccessful}"
              @click="submitForm"
              >

            اتمام بسته بندی
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import {ref} from 'vue'
import Table from '@/components/OrderPackaging/Table/TableDetail.vue'
import OrderPackagingList from '@/composables/OrderPackaging';
import {
  AxiosCall
} from '@/assets/js/axios_call.js'

export default {
  components: {
    Table,
  },

  data() {
    return {
      cargo: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      allCargoData: [],
      filteredCargoData: [],
      allComparisonsSuccessful: false,
      userInputs: {},
      orderId: null,
      extractedId:[],
      savedOrderId:null,


    }
  },
  setup() {
    const {
      cargoList,
      getCargoList,
      dataTableLength,
      cargoReceivingHeader,
      item,
      filterField,
      loading,
      detailInfo,
      getOrderListDetail,
      orderListDetail,
      barcodeNum,
      getShpsList,
      extractedIds
    } = OrderPackagingList();
    const orderDetails = ref(orderListDetail);
    return {
      cargoList,
      getCargoList,
      dataTableLength,
      cargoReceivingHeader,
      item,
      filterField,
      loading,
      detailInfo,
      getOrderListDetail,
      orderListDetail,
      orderDetails,
      barcodeNum,
      getShpsList,
      extractedIds
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal;
    },
  },
  watch: {
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.$cookies.remove('deleteItem')
        }
      }
    },
    dataTableLength(val) {
      this.addPerPage(val)
    },
  },
  methods: {
    async submitForm() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `admin/order/complete/${this.$route.params.orderId}}`
      AxiosMethod.form = formdata

      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/order-packaging/index');
      } else {
        this.loading = false
      }
    },

    async contradictedOrder() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `admin/order/contradicted/${this.$route.params.orderId}`
      AxiosMethod.form = formdata
      formdata.append('is_contradicted', 1)
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/order-packaging/index');


      } else {
        this.loading = false
      }
    },

    splitedNum() {
      if (this.orderId.includes('-')) {
        const orderSplit = this.orderId.split('-')
        if (orderSplit[1]) {
          this.orderId = orderSplit[1]
          this.savedOrderId = orderSplit[1]

           this.orderListDetail.find(element => {
             this.Idshps = element.id.toString()
            const match = element.id.toString() === this.savedOrderId;
            return match;
          });

          this.$refs.oredrDetailFunc.orderDetailProp(this.orderListDetail,  this.savedOrderId )
        }

      }
    },

    updateList(value) {
      if (value === 'true') {
        this.getOrderListDetail();
      }
    },

    handleComparisonChange(allSuccessful) {
      this.allComparisonsSuccessful = allSuccessful;
    },

  },
  mounted() {
    this.getOrderListDetail(this.$route.params.orderId);
  },
}
</script>
  