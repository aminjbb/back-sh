<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <!--      <OrderPackagingDetail/>-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card
            class="ma-5 br--12"
            height="160"
            style="flex:0 0 150px">
          <header class="modal__header d-flex justify-center align-center ">
                <span class="t16 w400 pa-6">
                اطلاعات سفارش
                </span>
          </header>

          <v-divider color="grey"/>

          <v-row align="center" class="pa-3">
            <v-col cols="4">
              <v-text-field @keyup.enter="orderItemPack()" :autofocus="true" v-model="shpsItem" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="3">
              <v-btn
                  @click="orderItemPack()"
                  color="primary500"
                  height="40"
                  rounded
                  :loading="loading"
                  class="px-8 mt-1">
                تایید
              </v-btn>
            </v-col>

            <v-col cols="3">
              <v-radio-group v-model="accept" inline @update:model-value="dialog = true">
                <v-radio label="پردازش" :value="true"></v-radio>
                <v-radio label="نمایش" :value="false"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="2">
                    <span>
                        شناسه سفارش:
                    </span>
              <span>
                        {{ orderId }}
                    </span>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch">
          <ShTable
              class="flex-grow-1"
              :headers="detailInfo"
              :items="itemListTable"
              :loading="loading"
          />

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-5 py-2" justify="end">
              <ModalRejectOrder :orderId="orderId" :accept="accept"/>
            </v-row>
          </v-card-actions>
        </v-card>
        <Modal :orderId="orderId"/>

        <v-dialog
            v-model="dialog"
            width="468"
            persistent
        >
          <v-card>
            <v-row justify="center" align="center" class="pa-5">
              <v-col cols="12">
                <div class="text-center pl-5">
                            <span class="t14 w500">
                              از تغییر وضعیت مطمئن هستید
                            </span>
                </div>
              </v-col>
            </v-row>

            <div class="mt-3 mb-8  px-5">
              <v-divider/>
            </div>

            <div class="text-center pb-5">
              <v-btn color="primary500" @click="dialog = false" height="40" rounded class="px-5 mt-1 mr-15">
                        <span>
                            تایید
                        </span>
              </v-btn>

              <v-btn @click="closeModal()" variant="text" height="40" rounded class="px-5 mt-1 ml-15">
                انصراف
              </v-btn>
            </div>
          </v-card>
        </v-dialog>

        <ModalChangeMethod :orderId="orderId" ref='ModalChangeMethod' :sendingMethods="sendingMethods" :currentSendingMethod="currentSendingMethod"/>

        <ModalNotAvailableOrder ref="ModalNotAvailable"/>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const OrderPackagingDetail = defineAsyncComponent(()=> import ('@/components/OrderPackaging/Detail/OrderPackagingDetail.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import {ref} from 'vue'
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalRejectOrder from '@/components/OrderPackaging/Modal/ModalRejectOrder.vue'
import OrderPackagingList from '@/composables/OrderPackaging';
import Modal from "@/components/OrderPackaging/Modal/Modal.vue";
import ModalChangeMethod from "@/components/OrderPackaging/Detail/Modal/ChangeSendingMethod.vue";
import {openToast, closeToast} from "@/assets/js/functions";
import axios from "axios";
import ModalNotAvailableOrder from "@/components/OrderPackaging/Modal/ModalNotAvailableOrder.vue";

export default {
  components: {
    ModalNotAvailableOrder,
    ModalRejectOrder,
    Modal,
    ModalChangeMethod,
    ShTable,
    DashboardLayout,
    Header
  },

  data() {
    return {
      shpsItem: null,
      cargo: null,
      orderDetail: [],
      dialog: false,
      sendingMethods:[],
      currentSendingMethod:null,
      itemListTable: []
    }
  },
  setup() {
    const {
      dataTableLength,
      item,
      filterField,
      loading,
      detailInfo,
      orderListDetail,
      orderId,
      accept,
      refreshOrderPackaging
    } = OrderPackagingList();
    const orderDetails = ref(orderListDetail);
    return {
      dataTableLength,
      item,
      filterField,
      loading,
      detailInfo,
      orderListDetail,
      orderDetails,
      orderId,
      accept,
      refreshOrderPackaging
    }
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal;
    },
  },

  methods: {
    closeModal() {
      this.accept = !this.accept
      this.dialog = false
    },

    async orderItemPack() {
      openToast(
          this.$store,
          'تا برقراری ارتباط کمی صبر کنید',
          "success",
      );
      let endPointUrl = null
      if (this.accept) endPointUrl = `warehouse/order/packaging/done/?accept`
      else endPointUrl = `warehouse/order/packaging/done/`
      this.loading = true

      await axios
          .post(`${import.meta.env.VITE_API_BASEURL}/v1/${endPointUrl}`, {
            barcode: this.shpsItem,
          }, {
            headers: {
              Authorization:
                  "Bearer " + this.$cookies.get('adminToken'),
            },
          })
          .then((data) => {
            closeToast(this.$store)
            localStorage.setItem('orderIdForRefreshOrderPackaging', data?.data?.data?.order?.id)
            this.orderId = data?.data?.data?.order?.id
            if (data?.data?.data?.is_completed) {
              window.open(`${import.meta.env.VITE_API_SITEURL}order-packaging/${data?.data?.data?.order?.id}/print`, '_blank');
            }
            let sortedItem = data?.data?.data?.order_items
            sortedItem.sort(function (a, b) {
              if (a.packing_status < b.packing_status) {
                return 1;
              }
              if (a.packing_status > b.packing_status) {
                return -1;
              }
              return 0;
            })
            this.orderDetail = sortedItem
            this.loading = false
            setTimeout(()=>{this.shpsItem = null},1000)
          })
          .catch((err) => {
            this.shpsItem = null
            this.loading = false
            if (err.response.status == 400) {
              openToast(
                  this.$store,
                  err.response.message,
                  "error",
              );
            }
            else if (err.response.status == 411) {
              this.$refs.ModalNotAvailable.dialog = true
            }
            else if (err.response.status == 401) {
              this.$router.push('/login')
            } else if (err.response.status == 403) {
              openToast(
                  this.$store,
                  'مجاز به عملیات نیستید',
                  "error",
              );
            }
            else if (err.response.status == 410) {
              this.sendingMethods = err.response.data.data.sending_methods
              this.currentSendingMethod = err.response.data.data.current_sending_method
              this.$refs.ModalChangeMethod.dialogSendingMethod = true
            }
          });
    },
  },

  mounted() {
    if (localStorage.getItem('orderIdForRefreshOrderPackaging')) this.refreshOrderPackaging(localStorage.getItem('orderIdForRefreshOrderPackaging'))
  },

  watch: {
    orderDetail() {
      this.itemListTable = []
      this.orderDetail.forEach((item) => {
        this.itemListTable.push(
            {
              data: item,
              id: item.id,
              admin_name: item.admin_name,
              sorting_placement: item.sorting_placement,
              packing_status: item.packing_status,
              shps: item.shps,
              sku_label: item.sku_label ? item.sku_label : 'نامعلوم',
              shpss_barcode: item.shpss_barcode ? item.shpss_barcode : 'نامعلوم',
              image: item?.sku_image?.image_url
            }
        )
      })
    },
  }
}
</script>



