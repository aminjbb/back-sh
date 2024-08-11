<template>
  <div class="px-2 py-2 h-100">
    <v-form
        v-model="valid"
        ref="manualOrder1"
        class="create-product__info-form scroller"
    >
      <v-row
          justify="center"
          align="center"
      >
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">
                            {{ labels.orderId }}
                        </span>
          </div>

          <v-text-field
              v-model="form.orderId"
              :rules="rule"
              variant="outlined"
              readonly
              placeholder=""
          />
        </v-col>

        <v-col cols="6">
          <div  class="text-right my-2">
                <span class="t14500 text-gray600">
                    {{ labels.phoneNumber }}
                </span>
          </div>
          <v-autocomplete
              placeholder="شماره تلفن کاربر را وارد کنید"
              variant="outlined"
              prepend-inner-icon-cb="mdi-map-marker"
              rounded="lg"
              v-model="user"
              readonly
              :rules="rule"
              :items="userList"
              item-title="name"
              item-value="value"
              v-debounce="searchUser">
          </v-autocomplete>
        </v-col>



        <v-row justify="center">
          <v-col cols="10">
            <v-item-group v-model="form.userAddress" selected-class="bg-primary500">
              <v-col
                  :rules="rule"
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
                        <v-icon icon="mdi-checkbox-blank-circle-fill"/>
                        <span class="t12 w500 text-right mt-4">
                         {{ address?.state?.label }} ، {{ address?.city?.label }} {{ address?.address }}
                    </span>
                      </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                      <v-col cols="4">
                        <v-icon size="x-small">mdi-checkbox-blank-circle-outline</v-icon>
                        <span class="mr-1">کد پستی :</span>
                        <span class="t12 w500 text-right mt-4">{{ address?.postal_code }}</span>
                      </v-col>
                      <v-col cols="4">
                        <v-icon size="x-small">mdi-checkbox-blank-circle-outline</v-icon>
                        <span class="mr-1">شماره تماس :</span>
                        <span class="t12 w500 text-right mt-4"> {{ address?.phone_number }}</span>
                      </v-col>
                      <v-col cols="4">
                        <v-icon size="x-small">mdi-checkbox-blank-circle-outline</v-icon>
                        <span class="mr-1">گیرنده :</span>
                        <span class="t12 w500 text-right mt-4">{{ address?.first_name }} {{ address?.last_name }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-item>
              </v-col>
            </v-item-group>
          </v-col>

        </v-row>
        <v-col
            cols="12"
            class="brands-list"
        >

          <div class="d-flex"  >
            <v-col
                cols="6"
                class="brands-list"
            >
              <div class=" my-4">
                        <span class="t12 w500">
                          {{ labels.description }}
                        </span>
              </div>

              <v-text-field
                  v-model="form.description"
                  :rules="rule"
                  variant="outlined"
                  placeholder=""
              />
            </v-col>


            <v-col class="my-6" cols="8">
              <div class="text-right">
                <span class="t12 w500">روش ارسال</span>
              </div>

              <v-col class="d-flex" cols="12">
                <v-radio-group
                    v-model="form.sendingMethod"
                    inline >
                  <v-radio
                      v-for="(send, index) in sendingMethodList"
                      :key="index"
                      :label="send.title"
                      :value="send.name"
                      class=" t12 w500"/>
                </v-radio-group>
              </v-col>
            </v-col>
          </div>
        </v-col>
      </v-row>

    </v-form>
  </div>
</template>

<script>
import Orders from "@/composables/Orders";
import User from "@/composables/User";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  components: {

  },
  setup() {
    const {  getUserAddress , userAddress } = new User()
    return {
      getUserAddress,
      userAddress,
    }
  },

  data: () => ({
    sendingMethodList: '',
    user:null,
    userId: null,
    userSearchList:[],
    labels: {
      phoneNumber: "شماره تماس",
      orderId: 'شماره سفارش',
      description: 'توضیحات *',
      sendingMethod: 'روش ارسال :',
    },
    form: {
      id: null,
      userId:'',
      phoneNumber: null,
      sendingMethod: null,
      userAddress: '',
      orderId: '',
      description: '',
    },
    valid: true,
    rule: [v => !!v || 'این فیلد الزامی است'],


  }),

  props: {
    orderDetail: null,
    state: {
      type: String,
      default: ''
    },


  },

  methods: {
    async getSendingMethods(addressId) {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'admin/order/sending-methods'
      formData.append('user_id', this.user)
      formData.append('address_id', addressId)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.sendingMethodList = data.data
      }
    },
    setForm() {
      try {

        this.user = this.orderDetail?.user?.id
        this.searchUser(this.orderDetail?.user?.phone_number)
        this.form.orderId = this.orderDetail.id
        this.form.sendingMethod = this.orderDetail.sending_method
        this.form.description = this.orderDetail.description
      } catch (error) {


      }
    },

    async searchUser(search) {
      this.skuSearchList = []
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `user/crud/index?phone_number=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.userSearchList = data.data.data
        this.userId = this.userSearchList[0].id
        this.$emit("sending",this.userId)

      }
    },
  },
  computed:{
    userList(){
      try {
        let users = []
        this.userSearchList.forEach(user => {
          const form = {
            name: user?.first_name + ' ' +user?.last_name + '(' + user.phone_number + ')',
            value: user.id
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
    orderDetail(newVal) {
        this.setForm()

    },
    user(val){
      this.$emit('selectedUser',val)
      this.getUserAddress(val)
    },

    description(newVal){
      this.$emit('description',newVal)
    },

    sendingMethod(newVal){
      this.$emit('selectedSendingMethod',newVal)
    },

    'form.userAddress': function (newVal, oldVal){
      if (newVal){
        this.$emit('selectAddress' , newVal)
        this.getSendingMethods(newVal)
      }
      else{
        this.sendingMethodList = []
      }


    },
    'form.description': function (newVal, oldVal){
      if (newVal){
        this.$emit('selectDescription' , newVal)
      }
    },
    'form.sendingMethod': function (newVal, oldVal){
      this.$emit('selectedSendingMethod',newVal)
    },
  },
}
</script>