<template>
  <div class="text-right">
    <div class="ma-3 pointer d--rtl" @click="dialog= true">
      <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
      <span class="mr-2 text-grey-darken-1 t14 w300">نمایش جزئیات ارسال</span>
    </div>
    
    <v-dialog v-model="dialog">
      <v-card class="pa-5 ">
        <v-expansion-panels class="accordion" variant="inset">
          <v-expansion-panel>
            <v-expansion-panel-title class="accordion__header">
              <span>جزئیات ارسال</span>
            </v-expansion-panel-title>
            <div v-for="(orderInfoObject, index) in orderInfo">
              <v-expansion-panel-text class="accordion__items__content">
                <div class="simple-table-parent">
                  <div class="simple-table" >
                    <v-row
                        v-for="(item,index) in orderInfoObject.details"
                        :key="`user-${index}`"
                        class="ma-0 d--rtl">
                      <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                      <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                    </v-row>
                  </div>
                </div>
              </v-expansion-panel-text>

              <v-expansion-panel-text class="accordion__items__content">
                <div class="simple-table-parent">
                  <div class="simple-table">
                    <v-row
                        v-for="(item,index) in orderInfoObject.shippingDetail"
                        :key="`user-${index}`"
                        class="ma-0 d--rtl">
                      <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                      <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                    </v-row>
                  </div>
                </div>
              </v-expansion-panel-text>
              <v-divider/>
            </div>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {closeModal} from "@/assets/js/functions_seller";
import {AxiosCall} from '@/assets/js/axios_call.js'

export default {
  props: {
    id: null
  },

  data() {
    return {
      dialog: false,
      orderInfo: []
    }
  },

  computed: {
    orderDetailsModal() {
      try {
        return this.$store.getters['get_orderDetailsModal']
      } catch (error) {
        return ''
      }
    }
  },

  methods: {
    close() {
      closeModal(this.$store, 'set_orderDetailsModal')
    },

    async getSendingDetails() {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');
      AxiosMethod.end_point = `admin/campaign/sending/detail/${this.id}`;
      AxiosMethod.form = formdata;
      AxiosMethod.store = this.$store;
      let data = await AxiosMethod.axios_get();

      if (data) {
        console.log('data', data)
        // if (data.data) {
        //   this.orderInfo = []
        //   let orderInfoDetail = {
        //     details: [],
        //     shippingDetail: []
        //   }
        //   data.data.forEach((trackingDetail) => {
        //     let shippingDetailForm = []
        //     trackingDetail.logs.forEach((item) => {
        //       const form = {
        //         label: item.status,
        //         value: item.created_at,
        //       }
        //       shippingDetailForm.push(form)
        //     })
        //     const orderInfoDetail = [
        //       {
        //         label: 'بارکد',
        //         value: trackingDetail.tracking_code
        //       },
        //       {
        //         label: 'روش ارسال',
        //         value: trackingDetail.service_name
        //       },
        //       {
        //         label: 'تاریخ بارگیری',
        //         value: trackingDetail.pickup_date
        //       },
        //     ]
        //     orderInfoDetail.details = orderInfoDetail
        //     orderInfoDetail.shippingDetail = shippingDetailForm
        //     this.orderInfo.push(orderInfoDetail)
        //   })
        // }
      }
    },
  },

  created() {
    this.$watch(
        () => this.dialog,
        (dialogState) => {
          if (dialogState) {
            this.getSendingDetails()
          }
        }
    );
  },
}
</script>

<style>

.v-expansion-panels--variant-inset > .v-expansion-panel--active {
  max-width: 100% !important;
}

.v-expansion-panel-title--active > .v-expansion-panel-title__overlay {
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