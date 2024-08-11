<template>
  <div class="text-center mb-5">
    <v-card
        @click="openModal(order.status)"
        height="50"
        class="mx-2"
        variant="outlined"
        :color="cardColor(order.status)">
      <div class="d-flex align-center justify-center py-3 px-5">
        <span>شناسه:</span>
        <span class="number-font mr-1">{{ order.id }}</span>
      </div>
    </v-card>

    <v-dialog
        v-model="dialog"
        width="468">
      <v-card class="rounded-lg">
        <v-row
            justify="center"
            align="center"
            class="pa-3">
          <v-col cols="3">
            <v-btn
                @click="closeDialog()"
                variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9">
            <div class="text-left pl-16">
              <span class="t14 w500">انتخاب عملیات</span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8 px-5">
          <v-divider/>
        </div>

        <div class="text-right px-6">
          <span class="t14 w500 text-gray600">.عملیات مورد نظر را انتخاب کنید</span>
        </div>

        <div class="d-flex text-right mt-5 mx-3">
          <v-radio-group
              v-model="selectedOperation"
              inline>
            <v-radio
                label="خالی کردن شلف سورتینگ"
                value="shelf" />
            <v-radio
                class="mr-16"
                label="اتمام سفارش"
                value="order-packaging" />
          </v-radio-group>
        </div>


        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center pb-5">
          <v-btn
              :loading="loading"
              color="primary500"
              @click="confirmation()"
              height="40"
              rounded
              class="px-5 mt-1 mr-15">
            تایید
          </v-btn>
          <v-btn
              @click="closeDialog()"
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1 ml-15">
            انصراف
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Shelf -->
    <v-dialog
        v-model="dialogShelf"
        width="468">
      <v-card class="rounded-lg">
        <v-row
            justify="center"
            align="center"
            class="pa-3">
          <v-col cols="3">
            <v-btn @click="closeDialogShelf()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9">
            <div class="text-left pl-12">
              <span class="t14 w500">خالی کردن شلف سورتینگ</span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8 px-5">
          <v-divider/>
        </div>

        <div class="text-center px-6">
          <div class="t14 w500 text-gray600"> .با خالی کردن شلف سورتینگ دیگر به جزئیات آن دسترسی نخواهید داشت  </div>
          <div class="t14 w500 text-gray600 mt-2">آیا از انجام این کار اطمینان دارید؟</div>
        </div>


        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center pb-5">
          <v-btn
              :loading="loading"
              color="primary500"
              @click="confirmationShelf"
              height="40"
              rounded
              class="px-5 mt-1 mr-15">
            تایید
          </v-btn>
          <v-btn
              @click="closeDialogShelf()"
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1 ml-15">
            انصراف
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- completed Order -->
    <v-dialog
        v-model="dialogCompleteOrder"
        width="468">
      <v-card class="rounded-lg">
        <v-row justify="center" align="center" class="pa-3">
          <v-col cols="3">
            <v-btn @click="closeDialogCompletedOrder()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9">
            <div class="text-left pl-12">
              <span class="t14 w500">اتمام سفارش </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8 px-5">
          <v-divider/>
        </div>

        <div class="text-center px-6">
          <div class="t14 w500 text-gray600"> .با اتمام سفارش، جایگاه سورتینگ تخلیه خواهد شد  </div>
          <div class="t14 w500 text-gray600 mt-2">آیا از انجام این کار اطمینان دارید؟</div>
        </div>


        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center pb-5">
          <v-btn
              :loading="loading"
              color="primary500"
              @click="confirmationCompletedOrder"
              height="40"
              rounded
              class="px-5 mt-1 mr-15">
            تایید
          </v-btn>
          <v-btn
              @click="closeDialogCompletedOrder()"
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1 ml-15">
            انصراف
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

export default {
  props: {
    order: null,
    getWarehouseOrders: {
      type: Function
    }

  },
  data() {
    return {
      loading: false,
      dialog: false,
      dialogShelf: false,
      dialogCompleteOrder: false,
      selectedOperation:null
    }
  },

  methods: {
    cardColor(status) {
      if (status === 'completed') return 'success'
      else if (status === 'processing') return 'warning'
      else if (status === 'empty') return 'DarkJungle'
    },

    closeDialog() {
      this.dialog = false
    },

    closeDialogShelf() {
      this.dialogShelf = false
    },

    closeDialogCompletedOrder() {
      this.dialogCompleteOrder = false
    },

    openModal(status) {
      if (status === 'processing') {
        this.dialog = true
      }
    },

    confirmation() {
      this.dialog = false
      if (this.selectedOperation === 'shelf') {
        this.dialogShelf = true
      } else if (this.selectedOperation === 'order-packaging') {
        this.dialogCompleteOrder = true
      }
    },

    async confirmationShelf() {
      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `warehouse/order/sorting/reject/${this.order.id}`
      AxiosMethod.using_auth = true
      AxiosMethod.toast_error = true
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_get()
      if (data) {
        openToast(this.$store, 'جایگاه سورتینگ با موفقیت تخلیه شد', 'success')
        this.loading = false
        this.closeDialogShelf()
      } else {
        this.loading = false
      }
    },

    async confirmationCompletedOrder() {
      try {
        this.loading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `warehouse/order/sorting/sort-order/${this.order.id}`
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.store = this.$store
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          openToast(this.$store, 'جایگاه سورتینگ با موفقیت تخلیه شد', 'success')
          this.loading = false
          this.getWarehouseOrders()
          this.closeDialogCompletedOrder()
        } else {
          this.loading = false
        }
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
