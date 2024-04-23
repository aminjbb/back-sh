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





  <v-form
      ref="addOrder"
      class="create-product__info-form scroller"
      v-model="valid">
    <v-row justify="center" align="center">
      <v-col cols="8">
        <v-autocomplete
            placeholder="نام کالا یا شماره SKU را جستجو نمایید"
            variant="outlined"
            prepend-inner-icon-cb="mdi-map-marker"
            rounded="lg"
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

    <v-row justify="center" align="center">
      <v-col cols="6" v-for="(shps , index) in shpsList">
        <v-card min-height="150" class="d-flex align-center px-5">
          <div>
            <img width="100" src="@/assets/img/productImge.png">
          </div>
          <div>
            <span class="t12500 text-gray600">
              {{shps?.shps?.sku.label}}
            </span>
          </div>
          <div class="px-5">
            <div><span>تعداد</span></div>
            <div>
              <v-text-field v-model="shpsList[index].count" type="number" variant="outlined"></v-text-field>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-10">
      <div class="text-center mb-5">
        <span class="t12500">
          کاربر و آدرس
        </span>
      </div>
      <v-divider></v-divider>
      <v-col cols="8">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                    انتخاب کاربر
                </span>
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
            v-debounce="searchUser">

        </v-autocomplete>
      </v-col>

    </v-row>

    <v-row>
      <v-item-group v-model="address" selected-class="bg-primary500">
        <v-container>
          <v-row>

            <v-col
                v-for="(address , index) in userAddress"
                :key="address.id"
                cols="12"
            >
              <v-item :value="address.id" v-slot="{ isSelected, selectedClass, toggle }">
                <v-card
                    :class="['d-flex align-center justify-lg-space-evenly px-10', selectedClass]"
                    dark
                    height="200"
                    class="d--rtl"
                    min-width="400"
                    @click="toggle"
                >
                  <div>
                    <div class="text-right">
                        <span class="t12500">
                          آدرس :
                        </span>
                    </div>
                    <div class="text-right mt-4">
                        <span class="t12500">
                         {{ address?.state?.label }} ، {{ address?.city?.label }} {{ address?.address }}
                        </span>
                    </div>
                  </div>
                  <div>
                    <div class="text-right">
                        <span class="t12500">
                          کد پستی :
                        </span>
                    </div>
                    <div class="text-right mt-4">
                        <span class="t12500">
                       {{ address?.postal_code }}
                        </span>
                    </div>
                  </div>
                  <div>
                    <div class="text-right">
                        <span class="t12500">
                          شماره تماس گیرنده :
                        </span>
                    </div>
                    <div class="text-right mt-4">
                        <span class="t12500">
                       {{ address?.phone_number }}
                        </span>
                    </div>
                  </div>
                  <div>
                    <div class="text-right">
                        <span class="t12500">
                          نام و نام خانواگی گیرنده :
                        </span>
                    </div>
                    <div class="text-right mt-4">
                        <span class="t12500">
                       {{ address?.first_name }} {{ address?.last_name }}
                        </span>
                    </div>
                  </div>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-row>

    <v-row justify="center" class="mt-10">
      <div class="text-center mb-5">
        <span class="t12500">
         روش ارسال
        </span>
      </div>
      <v-divider></v-divider>
      <v-col cols="8">
        <v-radio-group
            v-model="sendingMethod"
            inline
        >
          <v-radio
              label="پست"
              value="post"
              class="mx-2"
          ></v-radio>
          <v-radio
              label="نفیس اکپرس"
              value="nafis"
              class="mx-2"
          ></v-radio>
          <v-radio
              label="تیپاکس"
              value="tipax"
              class="mx-2"
          ></v-radio>
        </v-radio-group>
      </v-col>

    </v-row>
  </v-form>
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
      this.getUserAddress(val.id)
    }
  },

}
</script>


<style>
</style>
