<template>
  <div class="px-2 py-2 h-100">
    <v-form
        v-model="valid"
        ref="legalSeller2"
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

                            {{ labels.shopName }}
                        </span>
          </div>

          <v-text-field
              v-model="form.shopName"
              :rules="rule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.shopType }}
                        </span>
          </div>

          <v-select
              :items="shopTypes"
              v-model="form.shopType"
              :rules="rule"
              variant="outlined"
              placeholder=""
          />
        </v-col>


        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.economicCode }}
                        </span>
          </div>

          <v-text-field
              v-model="form.economicCode"
              :rules="economicCodeRule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.registrationNumber }}
                        </span>
          </div>

          <v-text-field
              v-model="form.registrationNumber"
              :rules="rule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.nationalID }}
                        </span>
          </div>

          <v-text-field
              v-model="form.nationalID"
              :rules="companyNationalIdRule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.phone }}
                        </span>
          </div>

          <v-text-field
              v-model="form.phone"
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
                        <span class="t12 w500">

                            {{ labels.officialNewspaper }}
                        </span>
          </div>

          <UploadFileSection @getImage="getOfficialNewspaperImage"/>
          <div class="d-flex align-center mt-5" v-if="form.officialNewspaper">
            <span>IMG-{{ form.officialNewspaper }}</span>
            <span class="mr-15"><v-icon color="error">mdi-delete</v-icon></span>
          </div>
        </v-col>

        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.taxCode }}
                        </span>
          </div>

          <v-text-field
              v-model="form.taxCode"
              :rules="rule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.validityDate }}
                        </span>
          </div>

          <v-text-field
              v-model="form.validityDate"
              :rules="rule"
              variant="outlined"
              placeholder=""
              class="validity-input"
          />
          <date-picker
              clearable
              custom-input=".validity-input"
              v-model="form.validityDate"
          />
        </v-col>
        <v-col
            cols="12"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.signatory }}
                        </span>
          </div>

          <v-text-field
              v-model="form.signatory"
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
                        <span class="t12 w500">

                            {{ labels.logo }}
                        </span>
          </div>

          <UploadFileSection @getImage="getLogoImage"/>
          <div class="d-flex align-center mt-5" v-if="form.logo">
            <span>IMG-{{ form.logo }}</span>
            <span class="mr-15"><v-icon color="error">mdi-delete</v-icon></span>
          </div>
        </v-col>
      </v-row>

    </v-form>
  </div>
</template>

<script>
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
export default {
  components:{
    datePicker: VuePersianDatetimePicker,
    UploadFileSection
  },
  setup() {

  },

  data: () => ({
    shopTypes:[
      {title:'سهامی خاص' , value:'private'},
      {title:'سهامی عام' , value:'public'}
    ],
    labels: {
      shopType: 'نوع شرکت',
      shopName: 'نام فروشگاه',
      logo: 'لوگو یا تصویر فروشگاه',
      mobile: 'تلفن همراه',
      officialNewspaper: 'روزنامه رسمی',
      nationalCode: 'کد ملی',
      certificateNumber: 'شماره شناسنامه',
      taxCode: 'کد مالیاتی',
      validityDate: 'تاریخ اعتبار',
      economicCode: 'کد اقتصادی',
      registrationNumber: 'شماره ثبت',
      nationalID: 'شناسه ملی شرکت',
      phone: 'تلفن ثابت',
      signatory: 'صاحبان امضا',
      skuGroup: 'گروه بندی'
    },
    form:{
      shopType:null,
      shopName:null,
      logo:null,
      mobile:null,
      email:null,
      nationalCode :null,
      phone:null,
      certificateNumber:null,
      signatory:null,
      economicCode:null,
      registrationNumber:null,
      nationalID:null,
      officialNewspaper:null,
      taxCode:null,
      validityDate:null

    },
    valid:true,
    rule: [v => !!v || 'این فیلد الزامی است'],
    companyNationalIdRule:[
        (v) =>
        /^[0-9]{11}$/.test(
            v
        ) || "شماره شناسه معتبر وارد کنید",] ,
    economicCodeRule:[
        (v) =>
        /^[0-9]{10}$/.test(
            v
        ) || "شماره شناسه معتبر وارد کنید",]
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

    getOfficialNewspaperImage(image){
      this.form.officialNewspaper = image.data.data.image_id
    }
  },
  mounted() {
    if (this.$store.getters['get_legalSellerStep2']!= null){
      this.form = this.$store.getters['get_legalSellerStep2']
    }
  }
}
</script>