<template>
  <v-form
      ref="addOrder"
      class="create-product__info-form scroller"
      v-model="valid">
    <v-row justify="center" align="center">
      <v-col cols="3">
        <div class="text-center">
          <span class="t14500">عنوان *</span>
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
      voucherForm: {
        title:null,
        code:null,
        voucherType:null,
        voucherAmount:null,
        voucherActive:1,
        sending:null,
        // voucherCondination:[]
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
