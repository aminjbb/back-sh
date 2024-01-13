<template>
  <v-form
      ref="addOrder"
      class="create-product__info-form scroller"
      v-model="valid">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <div class="text-center">
          <span class="t14500">ساخت سفارش</span>
        </div>
      </v-col>
      <v-col cols="8">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                    انتخاب محصول
                </span>
        </div>

        <v-autocomplete
            placeholder="نام کالا یا شماره SKU را جستجو نمایید"
            variant="outlined"
            prepend-inner-icon-cb="mdi-map-marker"
            rounded="lg"
            :items="skuList"
            item-title="name"
            item-value="value"
            v-debounce:1s.unlock="searchSku">

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
              {{shps.sku.label}}
            </span>
          </div>
          <div class="px-5">
            <div><span>تعداد</span></div>
            <div>
              <v-text-field type="number" variant="outlined">

              </v-text-field>
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
            :items="userList"
            item-title="name"
            item-value="value"
            v-debounce:1s.unlock="searchUser">

        </v-autocomplete>
      </v-col>

    </v-row>

    <v-row>
      <v-item-group v-model="address" selected-class="bg-primary500">
        <v-container>
          <v-row>
            <v-col
                v-for="n in 3"
                :key="n"
                cols="12"
            >
              <v-item :value="n" v-slot="{ isSelected, selectedClass, toggle }">
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
                         تهران ، آزادی ، استاد معین
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
                       1252225255585
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
                       09223732465
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
                       امین جباری
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
            v-model="shipment"
            inline
        >
          <v-radio
              label="پست"
              value="radio-1"
              class="mx-2"
          ></v-radio>
          <v-radio
              label="نفیس اکپرس"
              value="radio-2"
              class="mx-2"
          ></v-radio>
        </v-radio-group>
      </v-col>

    </v-row>
  </v-form>
</template>


<script>

import {AxiosCall} from "@/assets/js/axios_call";
export default {

  data() {
    return {
      shipment:null,
      address:null,
      userSearchList:[],
      skuSearchList:[],
      shpsList:[],
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
      }

      this.shpsList.push(shps)

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

  },

}
</script>


<style>
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>
