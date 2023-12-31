<template>

  <v-form ref="createPromotionPage" v-model="valid" class="create-with-title__info-form scroller">
    <v-row justify="start" align="center">

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14500">
                          نام فارسی <span class="text-error">*</span>
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="persianRule"
            v-model="form.lable"
        />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14500">
                        نام انگلیسی <span class="text-error">*</span>
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="englishRule"
            v-model="form.name"
        />
      </v-col>

    </v-row>
  </v-form>
</template>
<script>

import {convertDateToJalai} from "@/assets/js/functions";
export default {
  props: {
    promotion:null
  },

  data() {
    return {
      form: {
        lable: '',
        name: '',
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      persianRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) =>
            /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
            "فقط حروف فارسی ",
      ],
      englishRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) => !RegExp("[\u0600-\u06FF]").test(v) || "فقط حروف انگلیسی ",
      ],
      mobileRule: [
      (v) => !!v || "این فیلد الزامی است",
      (v) =>
          /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
              v
          ) || "شماره موبایل معتبر نیست",
    ],
    nationalCodeRule: [
      (v) => !!v || "این فیلد الزامی است",
      (v) => /^[0-9]{10}$/.test(v) || "کد ملی معتبر وارد کنید",
    ],
      valid: false,
      deviceType:[
        {title:'موبایل' , value:'mobile'},
        {title:'تبلت' , value:'tablet'},
        {title:'دسکتاپ' , value:'desktop'},
      ],
      flashIcon:[
        {title:'دارد' , value:1},
        {title:'ندارد' , value:0},
      ],
      positions:[
        {title:'سمت راست رعدوبرق' , value:'right-flash'},
        {title:'وسط هاور گرادینت' , value:'center'},
        {title:'سمت راست ساده' , value:'right'},
      ],

    }
  },
  methods: {
    /**
     * Set from
     */
    setForm() {
      try {
        this.form.lable = this.promotion.label
        this.form.name = this.promotion.name


      } catch (error) {
        console.log(error) }
    }
  },
  watch: {
    promotion(){
      this.setForm()
    }
  },

}
</script>
