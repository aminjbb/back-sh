<template>
  <div class="create-product flex-column d-flex vh-100">
    <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>
    <template v-if="step === 2">
      <v-card class="ma-5 br-12" height="80">
        <v-row justify="start" align="center">
          <v-col cols="6">
            <v-autocomplete
                placeholder="نام کالا یا شناسه shps را جستجو نمایید"
                variant="outlined"
                prepend-inner-icon-cb="mdi-map-marker"
                rounded="lg"
                class="mt-4 mx-5"
                :items="skuList"
                item-title="name"
                item-value="value"
                v-debounce="searchSku">

              <template v-slot:item="item">
                <v-list-item>
                  <v-row justify="center">

                    <v-col cols="4">

                      <div @click="assignSku(item.props.value)" class="seller__add-sku-btn d-flex justify-center align-center">
                        <v-icon>mdi-plus</v-icon>
                      </div>

                    </v-col>
                    <v-col cols="8">
                      <text-clamp
                          :text='item?.props?.title'
                          :max-lines='1'
                          autoResize
                          location="start"
                          class="text-gray500 t14300 text-right" />
                    </v-col>
                  </v-row>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-card>
    </template>

    <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="600">
      <template v-if="step === 1">
        <CreateOrderForm ref="CreateOrderForm" />
        <CreateManualOrderStep1/>
      </template>

      <template v-if="step === 2">
        <CreateManualOrderStep2 />
      </template>

      <footer class="create-warehouse__actions">
        <v-row justify="space-between" class="px-10 pt-10">
          <v-btn
              variant="outlined"
              :loading="loading"
              @click="validate()"
              height="40"
              rounded
              class="px-8 mt-1">
            بازگشت
          </v-btn>
          <v-btn
              variant="elevated"
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
import CreateOrderForm from "@/components/Orders/CreateOrder/CreateOrderForm.vue";
import CreateManualOrderStep1 from "@/components/ManualOrder/CreateManualOrder/CreateManualOrderStep1.vue"
import CreateManualOrderStep2 from "@/components/ManualOrder/CreateManualOrder/CreateManualOrderStep2.vue"
import {
  AxiosCall
} from "@/assets/js/axios_call";
import {
  convertDateToGregorian,
  openToast
} from "@/assets/js/functions";
import Stepper from "@/components/Public/Stepper.vue";

export default {
  data() {
    return {
      loading: false,
      steps:[
        'اطلاعات سفارش',
        'انتخاب محصول'
      ],
      step: 1,
    }
  },
  components: {
    Stepper,
    CreateOrderForm,
    CreateManualOrderStep1,
    CreateManualOrderStep2
  },
  methods: {
    validate() {

      if (!this.$refs.CreateOrderForm.shpsList.length){
        openToast(this.$store , 'محصولی انتخاب نشده است' , 'error')
      }
      else if (!this.$refs.CreateOrderForm.user){
        openToast(this.$store , 'کاربر انتخاب نشده است' , 'error')
      }
      else if (!this.$refs.CreateOrderForm.address){
        openToast(this.$store , 'آدرس حتما باید انتخاب شود' , 'error')
      }
      else if (!this.$refs.CreateOrderForm.sendingMethod){
        openToast(this.$store , 'روش ارسال را انتخاب کنید' , 'error')
      }
      else{
        this.countChecking()
      }

    },

    async countChecking() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/order/crud/check/count'
      this.$refs.CreateOrderForm.shpsList.forEach((shps, index) => {
        formData.append(`shps_list[${index}][shps]`, shps?.shps?.id)
        formData.append(`shps_list[${index}][count]`, shps?.count)
      })
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.toast_error = true
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.createOrder()
      }
      else {
        this.loading = false
      }
    },
    async createOrder() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/order/crud/create'
      this.$refs.CreateOrderForm.shpsList.forEach((shps, index) => {
        formData.append(`shps_list[${index}][shps]`, shps?.shps?.id)
        formData.append(`shps_list[${index}][count]`, shps?.count)
      })
      formData.append('user_id', this.$refs.CreateOrderForm.user.id)
      formData.append('address_id', this.$refs.CreateOrderForm.address)
      formData.append('sending_method', this.$refs.CreateOrderForm.sendingMethod)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        openToast(this.$store,
            'سفارش با موفقیت ایجاد شد.',
            "success")
      } else {
        this.loading = false
        openToast(this.$store,
            'ایجاد سفارش با مشکل مواجه شد',
            "error")
      }
    },

    changeStep(step) {
      this.step = step
    },

  },
  computed: {
    avatar() {
      return this.$store.getters['get_avatar']
    }
  },
}
</script>
