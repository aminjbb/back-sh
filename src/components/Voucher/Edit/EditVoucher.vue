<template>
  <div class="create-product flex-column d-flex vh-100">
    <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="600">

      <CreateVoucherFrom
          :voucherDetail="voucherDetail"
          ref="CreateVoucherFrom" />

      <footer class="create-warehouse__actions">
        <v-row justify="end" class="pl-10 pt-5">
          <v-btn
              :loading="loading"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>

        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import CreateVoucherFrom from "@/components/Voucher/Edit/EditVoucherForm.vue";
import Voucher from '@/composables/Voucher'

import {
  AxiosCall
} from "@/assets/js/axios_call";
import {
  convertDateToJalai, openConfirm
} from "@/assets/js/functions";
import {
  convertDateToGregorian,
  openToast
} from "@/assets/js/functions";

export default {
  setup(){
    const {voucherDetail , getVoucherDetail,  } = new Voucher()
    return {voucherDetail , getVoucherDetail, }
  },
  data() {
    return {
      loading: false,
    }
  },
  components: {
    CreateVoucherFrom
  },
  methods: {
    validate() {
      this.$refs.CreateVoucherFrom.$refs.addVoucher.validate()
      this.createVoucher()



    },
    async createVoucher() {
      try {
        this.loading = true
        let formData = new FormData();
        const AxiosMethod = new AxiosCall()
        const splitEndDate = this.$refs.CreateVoucherFrom.voucherForm.endTime.split(' ')
        const endTime = convertDateToGregorian(splitEndDate[0] , '-' , false)
        AxiosMethod.end_point = `voucher/crud/update/${this.$route.params.voucherId}`
        formData.append('name', this.$refs.CreateVoucherFrom.voucherForm.title)
        formData.append('end_time' , `${endTime} ${splitEndDate[1]}:00`)
        AxiosMethod.form = formData
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading = false
          openToast(this.$store,
              'کد تخفیف موفقیت ویرایش شد.',
              "success")
          this.$router.push('/voucher/index')
        } else {
          this.loading = false
        }
      }
      catch (e) {
        this.loading = false
      }
    },

  },
  mounted() {
    this.getVoucherDetail()
  },

}
</script>
