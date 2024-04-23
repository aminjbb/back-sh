<template>
  <div class="">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <div class="text-center py-6">
          <span class="t14500">اطلاعات سفارش</span>
        </div>
      </v-col>
    </v-row>
    <v-divider/>

    <v-row justify="center" class="mt-10">
      <v-col cols="4">
        <div class="d-flex align-center text-right my-5">
          <span class="t14500 text-gray600"> شماره سفارش </span>
        </div>
        <v-text-field
            variant="outlined"
            name="filter.value"
            hide-details
            v-model="userId" />
      </v-col>

      <v-col cols="1" align-self="end">
        <v-btn color="primary500" rounded>ذخیره</v-btn>
      </v-col>

      <v-col cols="5">
        <div class="d-flex align-center text-right my-5">
          <span class="t14500 text-gray600"> کاربر</span>
          <span class="t14500 text-red-accent-3 mr-1">*</span>
        </div>
        <v-autocomplete
            variant="outlined"
            prepend-inner-icon-cb="mdi-map-marker"
            rounded="lg"
            v-model="user"
            :items="userList"
            item-title="name"
            item-value="value"
            v-debounce="searchUser">
        </v-autocomplete>
      </v-col>
    </v-row>
  </div>
  <div class="">
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
                    <v-icon icon="mdi-checkbox-blank-circle-fill"/>
                    <span class="t12500 text-right mt-4">
                         {{ address?.state?.label }} ، {{ address?.city?.label }} {{ address?.address }}
                    </span>
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col cols="4">
                    <v-icon icon="mdi-checkbox-blank-circle-fill"/>
                    <span>کد پستی :</span>
                    <span class="t12500 text-right mt-4">{{ address?.postal_code }}</span>
                  </v-col>
                  <v-col cols="4">
                    <v-icon icon="mdi-checkbox-blank-circle-fill"/>
                    <span>شماره تماس :</span>
                    <span class="t12500 text-right mt-4"> {{ address?.phone_number }}</span>
                  </v-col>
                  <v-col cols="4">
                    <v-icon icon="mdi-checkbox-blank-circle-fill"/>
                    <span>گیرنده :</span>
                    <span class="t12500 text-right mt-4">{{ address?.first_name }} {{ address?.last_name }}</span>
                  </v-col>
                </v-row>
              </v-card>
            </v-item>
          </v-col>
        </v-item-group>
      </v-col>

    </v-row>
  </div>
<!--<div v-if="userSearchList.length>0">-->
<!--  <v-row justify="center" class="my-5">-->
<!--    <v-col cols="10">-->
<!--      <v-card v-for="user in userSearchList" :key="user.id" class="br-12 px-7 py-7 flex-grow-1" color="primary500">-->
<!--        <v-row justify="center" align="center">-->
<!--          <v-col cols="12">تهران، بزرگراه باکری جنوب کوی ارم خیابان شهیدمحسن یعقوبی(بهار جنوبی) نبش کوچه شهید اکبر اصغر زاده پلاک 18</v-col>-->
<!--        </v-row>-->

<!--        <v-row justify="center" align="center">-->
<!--          <v-col cols="4">-->
<!--            <span> کد پستی: </span>-->
<!--            <span>کد پستی</span>-->
<!--          </v-col>-->
<!--          <v-col cols="4">-->
<!--            <span> شماره تماس: </span>-->
<!--            <span>{{user.phone_number}}</span>-->
<!--          </v-col>-->
<!--          <v-col cols="4">-->
<!--            <span> گیرنده: </span>-->
<!--            <span>{{ user.first_name }} {{ user.last_name }}</span>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-card>-->
<!--    </v-col>-->
<!--  </v-row>-->

<!--  <v-row justify="center">-->
<!--    <v-col cols="10">-->
<!--      <v-col cols="6" class="brands-list">-->
<!--        <div class="d-flex align-center text-right my-5">-->
<!--          <span class="t14500 text-gray600"> توضیحات</span>-->
<!--          <span class="t14500 text-red-accent-3 mr-1">*</span>-->
<!--        </div>-->
<!--        <v-text-field-->
<!--            variant="outlined"-->
<!--            placeholder="" />-->
<!--      </v-col>-->
<!--      <v-col class="my-6" cols="8">-->
<!--        <div class="text-right">-->
<!--          <span class="t12500">روش ارسال</span>-->
<!--        </div>-->

<!--        <v-col class="d-flex" cols="12">-->
<!--          <v-radio-group inline >-->
<!--            <v-radio-->
<!--                label="پست"-->
<!--                value="post"-->
<!--                class=" t12500"></v-radio>-->
<!--            <v-radio-->
<!--                label="نفیس اکپرس"-->
<!--                value="nafis"-->
<!--                class=" t12500"></v-radio>-->
<!--            <v-radio-->
<!--                label="تیپاکس"-->
<!--                value="tipax"-->
<!--                class=" t12500"-->
<!--            ></v-radio>-->
<!--          </v-radio-group>-->
<!--        </v-col>-->
<!--      </v-col>-->
<!--    </v-col>-->
<!--  </v-row>-->
<!--</div>-->

</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import User from '@/composables/User'
export default {
  setup(){
    const {  getUserAddress , userAddress } = new User()
    return {  getUserAddress , userAddress }
  },
  data() {
    return {
      sendingMethod:null,
      address:null,
      userSearchList:[],
      skuSearchList:[],
      shpsList:[],
      user:null,
      userId: null,
      form: {
        name: '',
        type: [],
        marketCapacity: '',
        RetailCapacity: '',
        address: '',
        postalCode: '',
        phoneNumber: '',
        latLong: {
          latitude: 35.745669792668494,
          longitude: 51.35438114404677
        },
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,

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

    async searchSku(search) {
      this.skuSearchList = []
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `seller/sku/search?q=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.skuSearchList = data.data.data
      }
    },
    async assignSku(shps) {
      const form = {
        shps : shps,
        count:1
      }

      this.shpsList.push(form)

    },
  },
  computed:{
    skuList() {
      try {
        let sku = []
        this.skuSearchList.forEach(skuSearch => {
          const form = {
            name: skuSearch.sku?.label + '(' + skuSearch.id + ')',
            value: skuSearch
          }
          sku.push(form)
        })
        return sku
      } catch (e) {
        return []
      }
    },

    userList(){
      try {
        let users = []
        this.userSearchList.forEach(user => {
          const form = {
            name: user?.first_name + ' ' +user?.last_name,
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
      this.getUserAddress(val.id)
    },

    // $route(){
    //   this.getUserAddress()
    //
    // }
  },

}
</script>

<style scoped>

</style>