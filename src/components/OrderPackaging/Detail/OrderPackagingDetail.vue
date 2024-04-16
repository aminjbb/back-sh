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
      <v-row align="center" class="pa-3">
        <v-col cols="6">
          <v-text-field @keyup.enter="orderItemPack()" :autofocus="true" v-model="shpsItem" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-btn
                @click="orderItemPack()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
              تایید
            </v-btn>
        </v-col>
        <v-col cols="3">

            <span class="t13400 color-grey">
<!--                     {{ orderDetail.id }}   شناسه سفارش :-->
            </span>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="200">

      <Table
          ref="oredrDetailFunc"
          class="flex-grow-1"
          :header="detailInfo"
          :items="orderDetail"
          :loading="loading"
          deletePath="report/crud/delete/"
      />

      <v-divider/>
      <v-card-actions class="pb-3">
        <v-row class="px-5 py-2" justify="end">
         <ModalRejectOrder/>
        </v-row>
      </v-card-actions>
    </v-card>
    <Modal :orderId="orderId"/>
  </div>
</template>

<script>
import {ref} from 'vue'
import Table from '@/components/OrderPackaging/Table/TableDetail.vue'
import ModalRejectOrder from '@/components/OrderPackaging/Modal/ModalRejectOrder.vue'
import OrderPackagingList from '@/composables/OrderPackaging';
import Modal from "@/components/OrderPackaging/Modal/Modal.vue";

import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import {openToast , closeToast} from "@/assets/js/functions";

export default {
  components: {
    Table,
    ModalRejectOrder,
    Modal
  },

  data() {
    return {
      shpsItem:null,
      cargo: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      orderId: null,
      orderDetail:[]
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

  methods: {

    async orderItemPack() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `warehouse/order/packaging/done/`
      formdata.append('barcode' , this.shpsItem)
      AxiosMethod.form = formdata
      AxiosMethod.store = this.$store
      AxiosMethod.toast_error = true
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.orderId = data?.data?.order?.id
        if (data?.data?.is_completed){
          openToast(this.$store , 'لطفا منتظر بمانید')
          this.getDetailModal(data?.data?.order)
        }
        this.orderDetail = data?.data?.order_items
        this.loading = false
        setTimeout(()=>{this.shpsItem = ''},1000)
      } else {
        this.loading = false
      }
    },
    async getDetailModal(item) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/print/label/${item.id}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        closeToast(this.$store )
        const form = {
          dialog :true,
          object : data.data
        }
        this.$store.commit('set_modalPrintOrder' , form)
      }
    },

  },

}
</script>
  