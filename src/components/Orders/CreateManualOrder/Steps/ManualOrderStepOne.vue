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
              v-model="form.fullName"
              :rules="persianRule"
              variant="outlined"
              placeholder=""
          />
        </v-col>

        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12500">

                            {{ labels.description }}
                        </span>
          </div>

          <v-text-field
              v-model="form.shopName"
              :rules="persianRule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="12"
            class="brands-list"
        >



          <div class="bg-deep-purple-accent-2 mt-5 pa-10" >
            <div>hello wrld</div>
            <div>not</div>
          </div>
        </v-col>
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12500">

                            {{ labels.mobile }}
                        </span>
          </div>

          <v-text-field
              v-model="form.mobile"
              :rules="mobileRule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12500">

                            {{ labels.email }}
                        </span>
          </div>

          <v-text-field
              v-model="form.email"
              :rules="emailRule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12500">

                            {{ labels.nationalCode }}
                        </span>
          </div>

          <v-text-field
              v-model="form.nationalCode"
              :rules="nationalCodeRule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12500">

                            {{ labels.certificateNumber }}
                        </span>
          </div>

          <v-text-field
              v-model="form.certificateNumber"
              :rules="rule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="12"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12500">

                            {{ labels.nationalCard }}
                        </span>
          </div>

          <UploadFileSection @getImage="getNationalCard"/>
          <div class="d-flex align-center mt-5" v-for="(image , index) in form.nationalCard">
            <span>IMG-{{image}}</span>
            <span class="mr-15"><v-icon color="error">mdi-delete</v-icon></span>
          </div>
        </v-col>
        <v-col
            cols="12"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12500">

                            {{ labels.certificate }}
                        </span>
          </div>

          <UploadFileSection @getImage="getCertificateImage"/>
          <div class="d-flex align-center mt-5" v-if="form.certificate">
            <span>IMG-{{ form.certificate }}</span>
            <span class="mr-15"><v-icon color="error">mdi-delete</v-icon></span>
          </div>
        </v-col>
      </v-row>

    </v-form>
  </div>
</template>

<script>
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
export default {
  components:{
    UploadFileSection
  },
  setup() {

  },

  data: () => ({

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
    form:{
      fullName:null,
      shopName:'',
      logo:null,
      mobile:null,
      email:null,
      nationalCode :null,
      certificateNumber:null,
      certificate:null,
      nationalCard:[]
    },
    valid:true,
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
      type :String,
      default :''
    },

    getAllAttributes:{
      type:Function,
    }
  },

  methods:{
    getLogoImage(image){
      this.form.logo = image.data.data.image_id
    },
    getNationalCard(image){
      this.form.nationalCard.push(image.data.data.file_id)
    },
    getCertificateImage(image){
      this.form.certificate = image.data.data.file_id
    }
  },
  mounted() {
    if (this.$store.getters['get_naturalSellerStep1'] != null){
      this.form = this.$store.getters['get_naturalSellerStep1']
    }
  }
}
</script>