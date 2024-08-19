<template>
  <v-dialog v-model="dialog" width="468">
    <v-card>
      <header class="modal__header d-flex justify-center align-center">
        <span class="t16 w400 pa-6">انتقال موجودی</span>
        <v-btn
            @click="close()"
            class="modal__header__btn"
            variant="icon">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </header>
      <div class="mb-5 px-5">
        <v-divider />
      </div>

      <div class="text-center pa-5">
        با انجام این عملیات، {{ item.warehouse_stock }} عدد موجودی انبار و {{ item.site_stock }}  عدد موجودی سایت به کالا با شناسه
        {{ item.sku_id }} منتقل می شود.
        آیا از انجام این کار اطمینان دارید؟
      </div>

      <div class="mt-5 px-5">
        <v-divider />
      </div>

      <footer class="d--rtl d-flex justify-between align-center pa-4 pt-3">
        <v-btn
            @click="close()"
            variant="text"
            height="40"
            rounded
            class="px-5 mt-1">
          انصراف
        </v-btn>

        <v-btn
            :loading="loading"
            color="primary500"
            @click="confirmed()"
            height="40"
            rounded
            class="px-5 mt-1">
          <span>
            تایید
          </span>
        </v-btn>
      </footer>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TransferModal",

  props: {
    item: Object
  },

  data(){
    return {
      dialog: false,
      loading: false
    }
  },

  methods: {
    // async setLimit() {
    //   this.loading = true
    //   var formdata = new FormData();
    //   const AxiosMethod = new AxiosCall()
    //   AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/update/order_limit/${this.orderLimitModal?.id}`
    //   AxiosMethod.form = formdata
    //   formdata.append('order_limit', this.orderLimitModel)
    //
    //   AxiosMethod.store = this.$store
    //   AxiosMethod.using_auth = true
    //   AxiosMethod.token = this.$cookies.get('adminToken')
    //   let data = await AxiosMethod.axios_post()
    //   if (data) {
    //     this.loading = false;
    //     this.close();
    //     openToast(
    //         this.$store,
    //         'مقدار مورد نظر ویرایش شد.',
    //         "success"
    //     );
    //     this.updateList('true');
    //   } else {
    //     this.loading = false;
    //     openToast(
    //         this.$store,
    //         'ویرایش با مشکل مواجه شد',
    //         "error"
    //     );
    //   }
    // },

    confirmed() {
      console.log('confirmed')
    },

   close() {
      this.dialog = false
   }
  }
}
</script>