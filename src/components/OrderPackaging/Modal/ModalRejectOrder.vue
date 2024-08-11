<template>
  <div class="text-center">
    <v-btn
        height="40"
        rounded
        variant="flat"
        class="px-8 mt-2"
        @click="dialog = true"
    >
      گزارش مغایرت
    </v-btn>

    <v-dialog
        v-model="dialog"
        width="468"
    >
      <v-card>
        <v-row justify="center" align="center" class="pa-5">
          <v-col cols="3">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9">
            <div class="text-left pl-15" >
                            <span class="t14 w500">
                              ثبت مغایرت
                            </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center pa-5">
                        <span class="t14 w500">
                            از ثبت عملیات مطمئن هستید؟
                        </span>
        </div>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center pb-5">
          <v-btn :loading="loading" color="primary500" @click="rejectOrder()" height="40" rounded
                 class="px-5 mt-1 mr-15">
                        <span>
                            تایید
                        </span>
          </v-btn>
          <v-btn @click="close()" variant="text" height="40" rounded class="px-5 mt-1 ml-15">
            انصراف
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {closeConfirm} from "@/assets/js/functions";
import {AxiosCall} from '@/assets/js/axios_call.js'

export default {
  props: {
    orderId: null,
    accept: null
  },
  data() {
    return {
      loading: false,
      dialog: false
    }
  },
  methods: {
    close() {
      this.dialog = false
    },
    async rejectOrder() {
      try {
        this.loading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'warehouse/order/packaging/reject?order_id=' + this.orderId
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.store = this.$store
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_get()
        if (data) {
          this.loading = false
          this.close()
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