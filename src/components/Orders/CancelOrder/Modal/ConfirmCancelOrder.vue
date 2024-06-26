<template>

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
          <div class="text-left pl-15">
                            <span class="t14500">
                           ذخیره اطلاعات
                            </span>
          </div>
        </v-col>
      </v-row>
      <div class="mt-3 mb-8  px-5">
        <v-divider/>
      </div>

      <div class="text-center pa-5">
                        <span class="t14500">
                           با ذخیره اطلاعات کیف پول کاربر به مبلغ {{splitChar(cancelOrderAccept.refund_amount)}} ریال شارژ خواهد شد.
                        </span>
      </div>
      <div class="text-center pa-5">
                        <span class="t14500">
                          آیا از انجام این کار اطمینان دارید؟
                        </span>
      </div>
      <div class="mt-3 mb-8  px-5">
        <v-divider/>
      </div>

      <div class="text-center pb-5">
        <v-btn :loading="loading" @click="acceptCancelOrder()" color="primary500"  height="40" rounded
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
</template>
<script>
import {closeConfirm, splitChar} from "@/assets/js/functions";
import {AxiosCall} from '@/assets/js/axios_call.js'

export default {
  props:{
    cancelOrderAccept:null,
    status:null
  },
  data() {
    return {
      loading: false,
      dialog: false
    }
  },

  computed: {
    confirmModalState() {
      try {
        return this.$store.getters['get_confirmForm']
      } catch (error) {
        return ''
      }
    }
  },

  methods: {
    acceptCancelOrder(){
      this.$emit('cancelOrder' , {accept : 1 , status:this.status})
    },
    splitChar,
    close() {
      this.dialog = false
    },

    async deleteItem() {
      localStorage.setItem('deleteObject', 'doing')
      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = this.confirmModalState.confirmModalEndpoint
      AxiosMethod.using_auth = true
      AxiosMethod.toast_error = true
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_delete()
      if (data) {
        localStorage.setItem('deleteObject', 'done')
        this.loading = false
        this.close()
      } else {
        localStorage.setItem('deleteObject', 'error')
        this.loading = false
        this.close()
      }

    }
  }
}
</script>