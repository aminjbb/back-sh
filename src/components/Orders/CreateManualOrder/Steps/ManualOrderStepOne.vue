<template>
  <div class="px-2 py-2 h-100">
    <v-form
        v-model="valid"
        ref="createSeller1"
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
                        <span class="t12500">
                            {{ labels.orderId }}
                        </span>
          </div>

          <v-text-field
              v-model="form.orderId"
              :rules="rule"
              variant="outlined"
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
                :rules="rule"
                :items="userList"
                item-title="name"
                item-value="value"
                v-debounce="searchUser">
            </v-autocomplete>
          </v-col>



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
                        <span class="t12500">
                          {{ labels.description }}
                        </span>
            </div>

            <v-text-field
                v-model="form.description"
                :rule="persianRule"
                variant="outlined"
                placeholder=""
            />
          </v-col>


            <v-col class=" my-6"
              cols="8"
              >
              <div class="text-right ">
                        <span class="t12500">

                            {{ labels.sendingMethod }}
                        </span>
              </div>
              <v-col class="d-flex" cols="12">
                <v-radio-group
                    v-model="sendingMethod"
                    inline
                >
                  <v-radio
                      label="پست"
                      value="post"
                      class=" t12500"
                  ></v-radio>
                  <v-radio
                      label="نفیس اکپرس"
                      value="nafis"
                      class=" t12500"
                  ></v-radio>
                  <v-radio
                      label="تیپاکس"
                      value="tipax"
                      class=" t12500"
                  ></v-radio>
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
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
import Orders from "@/composables/Orders";
import User from "@/composables/User";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  components: {
    UploadFileSection
  },
  setup() {
    const {
      manualOrderHeader,
      getManualOrderList,
      manualOrderList,
      manualOrderListGet,
      getManualOrderListGet,

    } = new Orders;
    const {  getUserAddress , userAddress } = new User()
    return {
      manualOrderHeader,
      getManualOrderList,
      manualOrderList,
      manualOrderListGet,
      getManualOrderListGet,
      getUserAddress,
      userAddress,
    }
  },

  data: () => ({
    objData: [
      {
        userAddress: "تهران، بزرگراه باکری جنوب کوی ارم خیابان شهیدمحسن یعقوبی(بهار جنوبی) نبش کوچه شهید اکبر اصغر زاده پلاک 18",
        postalCode: "1111111111 ",
        phoneNumber: "0912111111",
        receiver: "ایدین",
      },
      {
        userAddress: "تهران، سهروردی 18",
        postalCode: "2222222222 ",
        phoneNumber: "09121222222",
        receiver: "ایدین2",
      },
      {
        userAddress: "تهران، بهار 18",
        postalCode: "333333333 ",
        phoneNumber: "0912333333",
        receiver: "ایدین3",
      }
    ],
    address:null,
    sendingMethod:null,
    user:null,
    userSearchList:[],
    labels: {
      userAddress: "تهران، بزرگراه باکری جنوب کوی ارم خیابان شهیدمحسن یعقوبی(بهار جنوبی) نبش کوچه شهید اکبر اصغر زاده پلاک 18",
      postalCode: "کد پستی ",
      phoneNumber: "شماره تماس",
      receiver: "گیرنده",
      orderId: 'شماره سفارش',
      description: 'توضیحات *',
      sendingMethod: 'روش ارسال :',
      mobile: 'تلفن همراه',
      email: 'ایمیل',
      nationalCode: 'کد ملی',
      certificateNumber: 'شماره شناسنامه',
      nationalCard: 'تصویر پشت و رو کارت ملی',
      certificate: 'تصویر صفحه اول شناسنامه',

    },
    form: {
      id: null,
      phoneNumber: null,
      sending_method: [],
      userAddress: [],
      orderId: null,
      description: null,



    },
    valid: true,
    rule: [v => !!v || 'این فیلد الزامی است'],
    persianRule: [
      (v) => !!v || "این فیلد الزامی است",
      (v) =>
          /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
          "فقط حروف فارسی ",
    ],
    mobileRule: [
      (v) => !!v || "این فیلد الزامی است",
      (v) =>
          /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
              v
          ) || "شماره موبایل معتبر نیست",
    ],
    emailRule: [
      (v) => !!v || "این فیلد الزامی است",
      (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              v
          ) || " ایمیل معتبر نیست",
    ],
    nationalCodeRule: [
      (v) => !!v || "این فیلد الزامی است",
      (v) => /^[0-9]{10}$/.test(v) || "کد ملی معتبر وارد کنید",
    ],
  }),

  props: {
    // array of brand
    brandList: [],

    // array of color
    colorList: [],

    // array of attribute
    attributeList: [],

    // array of operator
    operatorList: [],
    // array of volume
    volumeList: [],

    // get state create sku
    state: {
      type: String,
      default: ''
    },

    getAllAttributes: {
      type: Function,
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
    getLogoImage(image) {
      this.form.logo = image.data.data.image_id
    },
    getNationalCard(image) {
      this.form.nationalCard.push(image.data.data.file_id)
    },
    getCertificateImage(image) {
      this.form.certificate = image.data.data.file_id
    }
  },
  mounted() {
    if (this.$store.getters['get_naturalSellerStep1'] != null) {
      this.form = this.$store.getters['get_naturalSellerStep1']
    }
    this.getManualOrderListGet()

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
      this.getUserAddress(val.id)
    }
  },
}
</script>