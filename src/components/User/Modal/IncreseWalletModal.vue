<template>
  <div class="text-right">
    <v-btn
        @click="dialog = true"
        color="primary500"
        height="40"
        rounded
        class="px-8 mt-1"
    >
      <template v-slot:prepend>
        <v-icon>mdi-plus</v-icon>
      </template>
      شارژ کیف پول
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="868"
    >

      <v-card>

        <div class="flex">
          <v-form @submit.prevent="validate()" ref="wallet" v-model="valid">
            <v-row align="center" class="px-15">
              <v-col cols="4" md="6">
                <div class="text-right my-5">
                  <span class="text-error">*</span>
                  <span class="t14 w500">
علت تراکنش                         </span>

                </div>
                <v-autocomplete
                    :items="reasonItem"
                    density="compact"
                    variant="outlined"
                    item-title="label"
                    :rules="rule"
                    item-value="value"
                    v-model="form.reason"/>
              </v-col>
              <v-col cols="4" md="6">
                <div class="text-right my-5">
                  <span class="text-error">*</span>
                  <span class="t14 w500">
مبلغ شارژ (ریال)                         </span>

                </div>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    type="number"
                    single-line
                    :rules="rule"
                    v-model="form.amount"/>
              </v-col>
              <v-col cols="12" md="12">
                <div class="text-right my-5">
                        <span class="t14 w500">
توضیحات                         </span>

                </div>
                <v-textarea
                    max-rows="3"
                    density="compact"
                    variant="outlined"
                    v-model="form.description"/>
              </v-col>
            </v-row>
          </v-form>


        </div>
        <v-card-actions>
          <v-row justify="space-between" class="mx-10 my-1 ">
            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                variant="flat"
                rounded
                class="">

              تایید
            </v-btn>

            <v-btn
                @click="dialog = false"
                variant="outlined"
                height="40"
                rounded
                class=" mt-1 ">

              انصراف
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  AxiosCall
} from '@/assets/js/axios_call.js'

import {
  openToast
} from '@/assets/js/functions.js'

export default {

  data() {
    return {
      dialog: false,
      data: null,
      valid: true,
      form: {
        reason: null,
        description: null,
        amount: null,

      },
      reasonItem: [
        {
          label: "مرجوعی سفارش",
          value: "return_order"
        },
        {
          label: "انصراف از خرید",
          value: "cancel_order"
        },
        {
          label: "مغایرت",
          value: "difference_order"
        },
        {
          label: "سایر",
          value: "other"
        },
        {
          label: "هزینه پستی",
          value: "post_cost"
        },
      ],
      rule: [v => !!v || 'این فیلد الزامی است'],
      loading: false,
    }
  },
  props: {
    getTransactionList: {type: Function}
  },
  methods: {
    openModal() {
      this.dialog = true;
    },

    closeModal() {
      this.dialog = false;
    },

    async validate() {
      await this.$refs.wallet.validate()
      if (this.valid) this.increaseWallet()
    },

    /**
     * Submit form
     */
    async increaseWallet() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'finance/admin/wallet/deposit'
      AxiosMethod.form = formdata;

      formdata.append('user_id', this.$route.query.user_id)
      formdata.append('amount', this.form.amount);
      formdata.append('description', this.form.description);
      formdata.append('reason', this.form.reason);

      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.data = data.data;
        openToast(this.$store,
            'موجودی با موفقیت افزایش یافت',
            "success")
        this.closeModal();
        this.loading = false;
        this.getTransactionList()
        this.$refs.wallet.reset()

      } else {
        this.loading = false
      }
    },
  }
}
</script>
