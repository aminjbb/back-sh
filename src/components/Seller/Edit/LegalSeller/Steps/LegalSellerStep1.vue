<template>
  <div class="px-2 py-2 h-100">
    <v-form
        v-model="valid"
        ref="legalSeller1"
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

                            {{ labels.name }}
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
                        <span class="t12 w500">
                            {{ labels.birthDate }}
                        </span>
          </div>

          <v-text-field
              v-model="form.birthDate"
              :rules="rule"
              variant="outlined"
              placeholder=""
              class="birthDate-input"
          />
          <date-picker
              clearable
              custom-input=".birthDate-input"
              v-model="form.birthDate"
          />
        </v-col>

        <v-col
            cols="6"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

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
                        <span class="t12 w500">

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
                        <span class="t12 w500">

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
                        <span class="t12 w500">

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
                        <span class="t12 w500">

                            {{ labels.nationalCard }}
                        </span>
          </div>

          <UploadFileSection @getImage="getNationalCard"/>
          <div class="d-flex align-center mt-5" v-for="(image , index) in form.nationalCard">
            <span>IMG-{{image}}</span>
            <span class="mr-15"><v-icon @click="deleteNationalCard(index , image)" color="error">mdi-delete</v-icon></span>
          </div>
        </v-col>
        <v-col
            cols="12"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.certificate }}
                        </span>
          </div>

          <UploadFileSection @getImage="getCertificateImage"/>
          <div class="d-flex align-center mt-5" v-if="form.certificate">
            <span>IMG-{{ form.certificate }}</span>
            <span class="mr-15"><v-icon @click="deleteCertificate(form.certificate)" color="error">mdi-delete</v-icon></span>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
import {convertDateToJalai} from "@/assets/js/functions";
export default {
  components:{
    datePicker: VuePersianDatetimePicker,
    UploadFileSection
  },


  data: () => ({
    labels: {
      name: 'نام و نام خانوادگی',
      birthDate: 'تاریخ تولد',
      logo: 'لوگو یا تصویر فروشگاه',
      mobile: 'تلفن همراه',
      email: 'ایمیل',
      nationalCode: 'کد ملی',
      certificateNumber: 'شماره شناسنامه',
      nationalCard: 'تصویر پشت و رو کارت ملی',
      certificate: 'تصویر صفحه اول شناسنامه',
      width: 'عرض',
      length: 'طول',
      weight: 'وزن',
      volume: 'حجم',
      product: 'محصول',
      skuGroup: 'گروه بندی'
    },
    form:{
      fullName:null,
      birthDate:'',
      logo:null,
      mobile:null,
      email:null,
      nationalCode :null,
      certificateNumber:null,
      nationalCard:[],
      certificate:null,
      certificateIdDeleted:null,
      nationalCardIdDeleted:[],
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
    seller:{}
  },
  methods:{
    deleteCertificate(id){
      this.form.certificateIdDeleted = id
      this.form.certificate = null
    },
    deleteNationalCard(index , id){
      this.form.nationalCardIdDeleted.push(id)
      this.form.nationalCard.splice(index , 1)
    },
    // getLogoImage(image){
    //   this.form.logo = image.data.data.image_id
    // },
    getNationalCard(image){
      this.form.nationalCard.push(image.data.data.file_id)
    },
    getCertificateImage(image){
      this.form.certificate = image.data.data.file_id
    },
    setForm(){
      const nationalCardImage = []
      this.seller.identification_cart_files.forEach(file => {
        nationalCardImage.push(file.pivot.file_id)
      })
      this.form = {
        fullName:this.seller.full_name,
        birthDate:convertDateToJalai(this.seller.birth_date , '-' , false),
        mobile:this.seller.phone_number,
        email:this.seller.email,
        nationalCode :this.seller.identification_code,
        certificateNumber:this.seller.birth_certificate_code,
        certificate:this.seller.birth_certificate_file_id,
        nationalCard:nationalCardImage,
        certificateIdDeleted:null,
        nationalCardIdDeleted:[],
      }
    }
  },

  mounted() {
    if (this.$store.getters['get_legalSellerStep1']){
      this.form = this.$store.getters['get_legalSellerStep1']
    }

  },

  watch:{
    seller(val){
      this.setForm()
    }
  }
}
</script>