<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card
        class="ma-5 br-12"
        height="160"
        style="flex:0 0 150px">
      <header class="modal__header d-flex justify-center align-center ">
            <span class="t16400 pa-6">
              اطلاعات بارکد
            </span>
      </header>
      <v-divider color="grey"/>
      <v-row align="center" class="pa-3">
        <v-col cols="6">
          <v-text-field @keyup.enter="orderItemPack()" :autofocus="true" v-model="postBarcode" variant="outlined"></v-text-field>
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

            <span class="t13 w400 color-grey">
<!--                     {{ orderDetail.id }}   شناسه سفارش :-->
            </span>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="200">

      <Table
          ref="oredrDetailFunc"
          class="flex-grow-1"
          :header="printLabelHeader"
          :items="orderDetail"
          :loading="loading"
          deletePath="report/crud/delete/"
      />

      <v-divider/>
    </v-card>
    <Modal :orderId="orderId"/>
  </div>
</template>

<script>
import {ref} from 'vue'
import Table from '@/components/PrintOrderLabel/Table/Table.vue'
import OrderPackagingList from '@/composables/OrderPackaging';
import Modal from "@/components/OrderPackaging/Modal/Modal.vue";
import {AxiosCall} from '@/assets/js/axios_call.js'

export default {
  components: {
    Table,
    Modal
  },

  data() {
    return {
      postBarcode:null,
      cargo: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      orderId: null,
      orderDetail:[]
    }
  },

  setup() {
    const {
      dataTableLength,
      printLabelHeader,
      orderListDetail
    } = OrderPackagingList();
    const orderDetails = ref(orderListDetail);
    return {
      dataTableLength,
      printLabelHeader,
      orderListDetail
    };
  },

  methods: {
    async orderItemPack() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `admin/order/print/label-barcode/${this.postBarcode}`
      AxiosMethod.form = formdata
      AxiosMethod.store = this.$store
      AxiosMethod.toast_error = true
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.loading = false
        this.orderDetail = data?.data?.order?.details
        window.open(`${import.meta.env.VITE_API_SITEURL}order-packaging/${data?.data?.order?.id}/print`, '_blank');
      } else {
        this.loading = false
      }
    }
  },
}
</script>
  