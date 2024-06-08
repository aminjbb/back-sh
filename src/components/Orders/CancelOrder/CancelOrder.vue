<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">
        <v-col cols="12">
          <v-btn
              variant="outlined"
              rounded
              class="px-3 mt-1">
            لغو کل سفارش
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <CanselOrderTable
          class="flex-grow-1"
          :header="headerCanselOrder"
          :items="shpsDetails"/>
      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row justify="space-between" class="pr-10">
          <v-col cols="2">
            <span class="text-center">جمع:</span>
          </v-col>
          <v-col cols="1" class="text-center number-font">تعداد کالا</v-col>
          <v-col cols="1" class="text-center number-font">کالای کنسلی</v-col>
          <v-col cols="1" class="text-center number-font">باقیمانده</v-col>
          <v-col cols="1" class="text-center number-font">قیمت کالا</v-col>
          <v-col cols="1" class="text-center number-font">مقدار تخفیف پایه</v-col>
          <v-col cols="1" class="text-center number-font">مقدار تخفیف مارکتینگ</v-col>
          <v-col cols="3" class="text-center number-font">پرداخت نهایی</v-col>
        </v-row>
      </v-card-actions>

      <v-divider/>

      <v-card-actions>
        <v-row justify="space-between">
          <v-col cols="1"/>
          <v-col cols="4">
            <v-btn
                height="40"
                rounded
                class="px-8 mt-1 mr-5">
              انصراف
            </v-btn>
           <ConfirmCancelOrder/>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Orders from "@/composables/Orders";
import CanselOrderTable from "@/components/Orders/Table/CancelOrderTable.vue";
import {defineAsyncComponent} from "vue";
const ConfirmCancelOrder =defineAsyncComponent(()=> import ('@/components/Orders/CancelOrder/Modal/ConfirmCancelOrder.vue'))
import SaveModal from "@/components/Orders/Modal/SaveModal.vue";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  components: {SaveModal, CanselOrderTable, ConfirmCancelOrder},
  setup() {
    const {
      headerCanselOrder,
    } = Orders();
    return {
      headerCanselOrder,
    }
  },

  data() {
    return {
      dialog: false,
      shpsDetails:[]
    }
  },

  methods:{
    /**
     * Get order 'Shps' details by order_id
     */
    async getShpsDetails() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/crud/shps/detail/${this.$route.params.orderId}`
      AxiosMethod.store = this.$store
      let data = await AxiosMethod.axios_get();
      if (data) {
        this.shpsDetails = data.data;
      } else {
      }
    },
  },

  mounted() {
    this.getShpsDetails()
  }
}
</script>


<style scoped>

</style>