<template>
  <div class="px-2 py-2 h-100">
    <v-form
        v-model="valid"
        ref="createSeller3"
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

                            {{ labels.accountNumber }}
                        </span>
          </div>

          <v-text-field
              v-model="form.accountNumber"


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

                            {{ labels.shebaNumber }}
                        </span>
          </div>

          <v-text-field
              v-model="form.shebaNumber"
              :rules="shebaRule"
              variant="outlined"
              placeholder=""
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-right my-5">
                      <span class="t14500">
                            {{labels.paymentType }}
                      </span>
          </div>
          <v-select
              :items="paymentTypes"
              density="compact"
              variant="outlined"
              single-line
              :rules="rule"
              v-model="form.paymentType"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-right my-5">
                      <span class="t14500">
                         {{labels.paymentPeriod }}
                      </span>
          </div>
          <v-text-field
              density="compact"
              type="number"
              variant="outlined"
              single-line
              :rules="rule"
              v-model="form.paymentPeriod"
          />
        </v-col>
        <v-col
            cols="12"
            class="brands-list"
        >
          <div class="text-right my-2">
                        <span class="t12 w500">

                            {{ labels.contract }}
                        </span>
          </div>

          <UploadFileSection @getImage="getContractImage"/>
          <div class="d-flex align-center mt-5" v-if="form.contract">
            <span>IMG-{{form.contract}}</span>
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
    paymentTypes:[
      {title:'نقدی' , value:'cash'},
      {title:'اعتباری' , value:'credit'},
      {title:'امانی' , value:'safekeeping'},

    ],
    labels: {
      accountNumber: 'شماره حساب',
      shebaNumber: 'شماره شبا',
      contract: 'فایل قرارداد',
      paymentType: 'نوع پرداخت',
      paymentPeriod: 'بازه پرداخت',

    },
    form:{
      accountNumber:null,
      shebaNumber:'',
      contract:null,
      paymentType:null,
      paymentPeriod:null,

    },
    valid:true,
    rule: [v => !!v || 'این فیلد الزامی است'],
    shebaRule: [
      (v) => !!v || "این فیلد الزامی است",
      (v) =>
          /^[0-9]{24}$/.test(
              v
          ) || "شماره شبا معتبر وارد کنید",
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
    getContractImage(image){
      this.form.contract = image.data.data.file_id
    },
  },
  mounted() {
    if (this.$store.getters['get_naturalSellerStep3']!= null){
      this.form = this.$store.getters['get_naturalSellerStep3']
    }
  }
}
</script>