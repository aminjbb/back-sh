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





<!--  <v-form-->
<!--      ref="addOrder"-->
<!--      class="create-product__info-form scroller"-->
<!--      v-model="valid">-->
<!--&lt;!&ndash;    <v-row justify="center" align="center">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      <v-col cols="12">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <div class="text-center">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          <span class="t14500">ساخت سفارش</span>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      </v-col>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;      <v-col cols="8">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="text-right my-5">&ndash;&gt;-->
<!--&lt;!&ndash;                <span class="t14500 text-gray600">&ndash;&gt;-->
<!--&lt;!&ndash;                    انتخاب محصول&ndash;&gt;-->
<!--&lt;!&ndash;                </span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->

<!--&lt;!&ndash;        <v-autocomplete&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="نام کالا یا شماره SKU را جستجو نمایید"&ndash;&gt;-->
<!--&lt;!&ndash;            variant="outlined"&ndash;&gt;-->
<!--&lt;!&ndash;            prepend-inner-icon-cb="mdi-map-marker"&ndash;&gt;-->
<!--&lt;!&ndash;            rounded="lg"&ndash;&gt;-->
<!--&lt;!&ndash;            :items="skuList"&ndash;&gt;-->
<!--&lt;!&ndash;            item-title="name"&ndash;&gt;-->
<!--&lt;!&ndash;            item-value="value"&ndash;&gt;-->
<!--&lt;!&ndash;            v-debounce="searchSku">&ndash;&gt;-->

<!--&lt;!&ndash;          <template v-slot:item="item">&ndash;&gt;-->
<!--&lt;!&ndash;            <v-list-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <v-row justify="center">&ndash;&gt;-->

<!--&lt;!&ndash;                <v-col cols="4">&ndash;&gt;-->

<!--&lt;!&ndash;                  <div @click="assignSku(item.props.value)" class="seller__add-sku-btn d-flex justify-center align-center">&ndash;&gt;-->
<!--&lt;!&ndash;                    <v-icon>mdi-plus</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->

<!--&lt;!&ndash;                </v-col>&ndash;&gt;-->
<!--&lt;!&ndash;                <v-col cols="8">&ndash;&gt;-->
<!--&lt;!&ndash;                  <text-clamp&ndash;&gt;-->
<!--&lt;!&ndash;                      :text='item?.props?.title'&ndash;&gt;-->
<!--&lt;!&ndash;                      :max-lines='1'&ndash;&gt;-->
<!--&lt;!&ndash;                      autoResize&ndash;&gt;-->
<!--&lt;!&ndash;                      location="start"&ndash;&gt;-->
<!--&lt;!&ndash;                      class="text-gray500 t14300 text-right" />&ndash;&gt;-->
<!--&lt;!&ndash;                </v-col>&ndash;&gt;-->
<!--&lt;!&ndash;              </v-row>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-list-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-autocomplete>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-col>&ndash;&gt;-->
<!--&lt;!&ndash;    </v-row>&ndash;&gt;-->
<!--&lt;!&ndash;    <v-row justify="center" align="center">&ndash;&gt;-->
<!--&lt;!&ndash;      <v-col cols="6" v-for="(shps , index) in shpsList">&ndash;&gt;-->
<!--&lt;!&ndash;        <v-card min-height="150" class="d-flex align-center px-5">&ndash;&gt;-->
<!--&lt;!&ndash;          <div>&ndash;&gt;-->
<!--&lt;!&ndash;            <img width="100" src="@/assets/img/productImge.png">&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;          <div>&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="t12500 text-gray600">&ndash;&gt;-->
<!--&lt;!&ndash;              {{shps?.shps?.sku.label}}&ndash;&gt;-->
<!--&lt;!&ndash;            </span>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="px-5">&ndash;&gt;-->
<!--&lt;!&ndash;            <div><span>تعداد</span></div>&ndash;&gt;-->
<!--&lt;!&ndash;            <div>&ndash;&gt;-->
<!--&lt;!&ndash;              <v-text-field v-model="shpsList[index].count" type="number" variant="outlined"></v-text-field>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-card>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-col>&ndash;&gt;-->
<!--&lt;!&ndash;    </v-row>&ndash;&gt;-->

<!--&lt;!&ndash;    <v-row justify="center" class="mt-10">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="text-center mb-5">&ndash;&gt;-->
<!--&lt;!&ndash;        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;          کاربر و آدرس&ndash;&gt;-->
<!--&lt;!&ndash;        </span>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-divider></v-divider>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-col cols="8">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="text-right my-5">&ndash;&gt;-->
<!--&lt;!&ndash;                <span class="t14500 text-gray600">&ndash;&gt;-->
<!--&lt;!&ndash;                    انتخاب کاربر&ndash;&gt;-->
<!--&lt;!&ndash;                </span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <v-autocomplete&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="شماره تلفن کاربر را وارد کنید"&ndash;&gt;-->
<!--&lt;!&ndash;            variant="outlined"&ndash;&gt;-->
<!--&lt;!&ndash;            prepend-inner-icon-cb="mdi-map-marker"&ndash;&gt;-->
<!--&lt;!&ndash;            rounded="lg"&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="user"&ndash;&gt;-->
<!--&lt;!&ndash;            :items="userList"&ndash;&gt;-->
<!--&lt;!&ndash;            item-title="name"&ndash;&gt;-->
<!--&lt;!&ndash;            item-value="value"&ndash;&gt;-->
<!--&lt;!&ndash;            v-debounce="searchUser">&ndash;&gt;-->

<!--&lt;!&ndash;        </v-autocomplete>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-col>&ndash;&gt;-->

<!--&lt;!&ndash;    </v-row>&ndash;&gt;-->

<!--&lt;!&ndash;    <v-row>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-item-group v-model="address" selected-class="bg-primary500">&ndash;&gt;-->
<!--&lt;!&ndash;        <v-container>&ndash;&gt;-->
<!--&lt;!&ndash;          <v-row>&ndash;&gt;-->

<!--&lt;!&ndash;            <v-col&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="(address , index) in userAddress"&ndash;&gt;-->
<!--&lt;!&ndash;                :key="address.id"&ndash;&gt;-->
<!--&lt;!&ndash;                cols="12"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <v-item :value="address.id" v-slot="{ isSelected, selectedClass, toggle }">&ndash;&gt;-->
<!--&lt;!&ndash;                <v-card&ndash;&gt;-->
<!--&lt;!&ndash;                    :class="['d-flex align-center justify-lg-space-evenly px-10', selectedClass]"&ndash;&gt;-->
<!--&lt;!&ndash;                    dark&ndash;&gt;-->
<!--&lt;!&ndash;                    height="200"&ndash;&gt;-->
<!--&lt;!&ndash;                    class="d&#45;&#45;rtl"&ndash;&gt;-->
<!--&lt;!&ndash;                    min-width="400"&ndash;&gt;-->
<!--&lt;!&ndash;                    @click="toggle"&ndash;&gt;-->
<!--&lt;!&ndash;                >&ndash;&gt;-->
<!--&lt;!&ndash;                  <div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="text-right">&ndash;&gt;-->
<!--&lt;!&ndash;                        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;                          آدرس :&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="text-right mt-4">&ndash;&gt;-->
<!--&lt;!&ndash;                        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;                         {{ address?.state?.label }} ، {{ address?.city?.label }} {{ address?.address }}&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="text-right">&ndash;&gt;-->
<!--&lt;!&ndash;                        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;                          کد پستی :&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="text-right mt-4">&ndash;&gt;-->
<!--&lt;!&ndash;                        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;                       {{ address?.postal_code }}&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="text-right">&ndash;&gt;-->
<!--&lt;!&ndash;                        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;                          شماره تماس گیرنده :&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="text-right mt-4">&ndash;&gt;-->
<!--&lt;!&ndash;                        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;                       {{ address?.phone_number }}&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="text-right">&ndash;&gt;-->
<!--&lt;!&ndash;                        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;                          نام و نام خانواگی گیرنده :&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="text-right mt-4">&ndash;&gt;-->
<!--&lt;!&ndash;                        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;                       {{ address?.first_name }} {{ address?.last_name }}&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                </v-card>&ndash;&gt;-->
<!--&lt;!&ndash;              </v-item>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-col>&ndash;&gt;-->
<!--&lt;!&ndash;          </v-row>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-container>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-item-group>&ndash;&gt;-->
<!--&lt;!&ndash;    </v-row>&ndash;&gt;-->

<!--&lt;!&ndash;    <v-row justify="center" class="mt-10">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="text-center mb-5">&ndash;&gt;-->
<!--&lt;!&ndash;        <span class="t12500">&ndash;&gt;-->
<!--&lt;!&ndash;         روش ارسال&ndash;&gt;-->
<!--&lt;!&ndash;        </span>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-divider></v-divider>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-col cols="8">&ndash;&gt;-->
<!--&lt;!&ndash;        <v-radio-group&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="sendingMethod"&ndash;&gt;-->
<!--&lt;!&ndash;            inline&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <v-radio&ndash;&gt;-->
<!--&lt;!&ndash;              label="پست"&ndash;&gt;-->
<!--&lt;!&ndash;              value="post"&ndash;&gt;-->
<!--&lt;!&ndash;              class="mx-2"&ndash;&gt;-->
<!--&lt;!&ndash;          ></v-radio>&ndash;&gt;-->
<!--&lt;!&ndash;          <v-radio&ndash;&gt;-->
<!--&lt;!&ndash;              label="نفیس اکپرس"&ndash;&gt;-->
<!--&lt;!&ndash;              value="nafis"&ndash;&gt;-->
<!--&lt;!&ndash;              class="mx-2"&ndash;&gt;-->
<!--&lt;!&ndash;          ></v-radio>&ndash;&gt;-->
<!--&lt;!&ndash;          <v-radio&ndash;&gt;-->
<!--&lt;!&ndash;              label="تیپاکس"&ndash;&gt;-->
<!--&lt;!&ndash;              value="tipax"&ndash;&gt;-->
<!--&lt;!&ndash;              class="mx-2"&ndash;&gt;-->
<!--&lt;!&ndash;          ></v-radio>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-radio-group>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-col>&ndash;&gt;-->

<!--&lt;!&ndash;    </v-row>&ndash;&gt;-->
<!--  </v-form>-->
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
