<template>

  <v-row justify="center" align="center">
    <v-col cols="12">
      <div class="text-center py-6">
        <span class="t14500">اطلاعات سفارش</span>
      </div>
    </v-col>
  </v-row>
  <v-divider/>
  <v-form
      ref="addOrder"
      class="create-product__info-form scroller"
      v-model="valid">
      <v-row justify="center" class="mt-10">
        <v-col cols="4">
          <div class="d-flex align-center text-right my-5">
            <span class="t14500 text-gray600"> شماره سفارش </span>
          </div>
          <v-text-field
              variant="outlined"
              name="filter.value"
              hide-details
              v-model="orderId" />
        </v-col>

        <v-col cols="1" align-self="end">
          <v-btn
              :disabled="!orderId"
              @click="$router.push(`/orders/user/${orderId}/manual-order`)"
              rounded
              color="primary400"
              variant="elevated">ذخیره</v-btn>
        </v-col>

        <v-col cols="5">
          <div class="d-flex align-center text-right my-5">
            <span class="t14500 text-gray600"> کاربر</span>
            <span class="t14500 text-red-accent-3 mr-1">*</span>
          </div>
          <v-autocomplete
              placeholder="شماره تلفن کاربر را وارد کنید"
              variant="outlined"
              prepend-inner-icon-cb="mdi-map-marker"
              rounded="lg"
              v-model="user"
              :items="userList"
              item-title="name"
              item-value="value"
              :rules="rule"
              v-debounce="searchUser" />
        </v-col>
      </v-row>
    <div>
      <v-row justify="center">
        <v-col cols="10">
          <v-item-group v-model="address" selected-class="bg-primary500">
            <v-col
                v-for="(address , index) in userAddress"
                :key="address.id"
                cols="12">
              <v-item :value="address.id" v-slot="{ isSelected, selectedClass, toggle }">
                <v-card
                    :class="['align-center justify-lg-space-evenly px-10', selectedClass]"
                    dark
                    height="120"
                    class="d--rtl"
                    min-width="400"
                    @click="toggle">
                  <v-row class="py-5">
                    <v-col>
                      <span class="t12500 text-right mt-4">
                         {{ address?.state?.label }} ، {{ address?.city?.label }} {{ address?.address }}
                    </span>
                    </v-col>
                  </v-row>
                  <v-row justify="center" align="center">
                    <v-col cols="4">
                      <span class="mr-1">کد پستی :</span>
                      <span class="t12500 text-right mt-4">{{ address?.postal_code }}</span>
                    </v-col>
                    <v-col cols="4">
                      <span class="mr-1">شماره تماس :</span>
                      <span class="t12500 text-right mt-4"> {{ address?.phone_number }}</span>
                    </v-col>
                    <v-col cols="4">
                      <span class="mr-1">گیرنده :</span>
                      <span class="t12500 text-right mt-4">{{ address?.first_name }} {{ address?.last_name }}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
            </v-col>
          </v-item-group>
        </v-col>

      </v-row>

      <v-row justify="center">
        <v-col cols="10">
          <v-col cols="6" class="brands-list">
            <div class="d-flex align-center text-right my-5">
              <span class="t14500 text-gray600"> توضیحات</span>
              <span class="t14500 text-red-accent-3 mr-1">*</span>
            </div>
            <v-text-field
                :rules="rule"
                variant="outlined"
                v-model="description"
                placeholder="" />
          </v-col>
          <v-col class="my-6" cols="8">
            <div class="text-right">
              <span class="t12500">روش ارسال</span>
            </div>

            <v-col class="d-flex" cols="12">
              <v-radio-group
                  v-model="sendingMethod"
                  inline >
                <v-radio
                    v-for="(send, index) in sendingMethodList"
                    :key="index"
                    :label="send.title"
                    :value="send.name"
                    class=" t12500"/>
              </v-radio-group>
            </v-col>
          </v-col>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import User from '@/composables/User'
export default {
  setup(){
    const { getUserAddress , userAddress } = new User()
    return { getUserAddress , userAddress }
  },

  data() {
    return {
      sendingMethod:null,
      address:null,
      userSearchList:[],
      user:null,
      orderId: null,
      description: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
      sendingMethodList: []
    }
  },

  methods: {
    async searchUser(search) {
      this.skuSearchList = []
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `user/crud/index?phone_number=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.userSearchList = data.data.data
      }
    },

    async getSendingMethods(addressId) {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/order/sending-methods'
      formData.append('user_id', this.user.id)
      formData.append('address_id', addressId)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.sendingMethodList = data.data
      }
    }
  },

  computed:{
    userList(){
      try {
        let users = []
        this.userSearchList.forEach(user => {
          const form = {
            name: user?.first_name + ' ' +user?.last_name + '(' + user.phone_number + ')',
            value: user
          }
          users.push(form)
        })
        return users
      } catch (e) {
        return e
      }
    }
  },

  watch: {
    user(val){
      this.$emit('selectedUser',val)
      this.getUserAddress(val?.id)
    },

    description(newVal){
      this.$emit('description',newVal)
    },

    sendingMethod(newVal){
      this.$emit('selectedSendingMethod',newVal)
    },

    address(newVal){
      if (newVal){
        this.getSendingMethods(newVal)

        this.$emit('selectedAddress',newVal)
      }
      else {
        this.sendingMethodList = []
      }

    }
  }
}
</script>