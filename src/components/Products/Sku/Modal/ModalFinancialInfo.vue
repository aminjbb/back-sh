<template>
  <div class="text-right">
    <div class=" pointer" @click="dialog= true">
      <v-icon class="text-grey-darken-1">mdi-currency-usd</v-icon>
      <span class="mr-2 text-grey-darken-1 t14300">
                                            اطلاعات مالی
                                        </span>
    </div>
    <v-dialog
        v-model="dialog"
        width="468"
    >
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14500">
                           اطلاعات مالی
              </span>
            </div>
          </v-col>

        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>



        <div class="mt-3 mb-8 px-5">
          <v-col cols="12">
            <div class="text-right mt-4 mb-2">
                            <span class="t12300">
                                میزان مالیات
                            </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                :rules="numberOnlyRule"
                v-model="form.tax_amount" />
          </v-col>
          <v-col cols="12">
            <div class="text-right mt-4 mb-2">
                            <span class="t12300">
                                شناسه ملی
                            </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                :rules="nationalCodeRule"
                v-model="form.identification_code" />
          </v-col>
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10">
          <v-btn
              width="80"
              @click="fianancialInfo()"
              color="primary500"
              :loading="loading"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <btn
              class="mt-3 mr-2"
              @click="dialog = false"
              style="cursor: pointer;">
            انصراف
          </btn>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";


export  default {
  props:{
    id:null,
    items: [],
  },

  components:{


  },
  data(){
    return{
      form: {
        tax_amount: '',
        identification_code: '',

      },
      numberDecimalRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) => /^\d*\.?\d*$/.test(v) || "میزان مالیات را صحیح وارد کنید"
      ],
      englishRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) => !RegExp("[\u0600-\u06FF]").test(v) || "فقط حروف انگلیسی ",
      ],
      numberOnlyRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) => /^\d+$/.test(v) || "لطفا فقط عدد وارد کنید"
      ],
      nationalCodeRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) => /^[0-9]{11}$/.test(v) || "کد ملی معتبر وارد کنید",
      ],


      loading:false,
      retailObject: null,
      dialog: false

    }
  },

  methods:{

    async fianancialInfo() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `product/sku/crud/add/financial-data/${this.id}`
      AxiosMethod.form = formdata;
      formdata.append('tax', this.form.tax_amount)
      formdata.append('national_code', this.form.identification_code);
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/product/get/skus/index');
        this.dialog = false
        openToast(this.$store,
            ' با موفقیت اضافه  شد.',
            "success");


      } else {
        this.loading = false
      }
    },



    validate(){


    },


  },

  computed:{


  },
  mounted() {

  },
  watch:{

  }
}
</script>
