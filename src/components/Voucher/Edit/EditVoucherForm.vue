<template>
  <v-form
      ref="addVoucher"
      class="create-product__info-form scroller"
      v-model="valid">
    <v-row justify="start" align="center">
      <v-col cols="12">
        <div class="text-center">
          <span class="t14500">ساخت کد تخفیف</span>
        </div>
      </v-col>
      <v-col >
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   عنوان *
                </span>
        </div>

        <v-text-field
            variant="outlined"
            :rules="rule"
            v-model="voucherForm.title"
            rounded="lg">

        </v-text-field>

      </v-col>

      <v-col cols="12" md="5">
        <div class="text-right my-5">
                      <span class="t14500">
                          تاریخ پایان
                      </span>
        </div>
        <v-text-field
            label="تاریخ پایان"
            single-line
            name="create-user-date"
            clearable
            density="compact"
            variant="outlined"
            class="custom-input"
            :rules="rule"
            v-model="voucherForm.endTime"
        />
        <date-picker
            name="create-user-date"
            class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"

            v-model="voucherForm.endTime"
            variant="outlined"
            placeholder="تاریخ پایان"
            custom-input=".custom-input"
        />
      </v-col>




    </v-row>

  </v-form>
</template>


<script>

import {AxiosCall} from "@/assets/js/axios_call";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import {convertDateToJalai} from "@/assets/js/functions";


export default {
  components: {
    ModalGroupAdd,
    datePicker: VuePersianDatetimePicker,
  },
  props: {
    voucherDetail:null
  },
  data() {
    return {
      voucherForm: {
        title: null,
        code: null,
        voucherType: null,
        voucherCount: 1,
        voucherAmountType: null,
        voucherAmount: null,
        voucherActive: '1',
        sending: null,
        endTime:'',
        voucherCondition: new Set()
      },

      voucherTypes: [
        {
          title: 'عادی',
          value: 'regular'
        },
        {
          title: 'گروهی',
          value: 'group'
        },
        {
          title: 'نظیر به نظیر',
          value: 'peer_to_peer'
        },

      ],
      voucherAmountTypes: [
        {
          title: 'ریالی',
          value: 'rial'
        },
        {
          title: 'درصدی',
          value: 'percent'
        },

      ],
      voucherActives: [
        {
          title: 'فعال',
          value: '1'
        },
        {
          title: 'غیرفعال',
          value: '0'
        },

      ],
      sendingItems: [
        {
          title: 'پیش فرض',
          value: 'default'
        },
        {
          title: 'رایگان',
          value: 'free'
        },

      ],
      voucherConditionsTemp:{
        title: 'سقف مبلغ تخفیف',
        value: 'max_discount',
        data:'',
        inputType:'text'
      },
      voucherConditions: [


        {
          title: 'زمان شروع و پایان',
          value: 'start-and-end-time',
          data:[],
          inputType:'date'
        },


      ],
      applyCustomer:{
        title: 'اعمال تخفیف بر اساس مشتری',
        value: 'user_file',
        data:null,
        inputType:'file'
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      englishRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) => RegExp("^[a-zA-Z0-9$@$!%*?&#^-_. +]+$").test(v) || "کد تخفیف قابل قبول نیست",
      ],
      valid: false,
      provinces:[]

    }
  },

  methods: {
    chekCondition(e){
      if (e === 'rial'){
        this.voucherForm.voucherCondition.forEach(x => x.value === 'max_discount' ? this.voucherForm.voucherCondition.delete(x) : x)
        const indexConditions = this.voucherConditions.findIndex(condition =>condition.value === 'max_discount')
        if (indexConditions !== -1) this.voucherConditions.splice(indexConditions , 1)
      }
      else{
        this.voucherConditions.push(this.voucherConditionsTemp)
      }
    },
    async getProvince() {
      const form = {
        per_page: 10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/state/crud/index`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.provinces = data.data.data
      }
    },
    updateCondition(conditionObject , url){
      const object = this.voucherConditions.find(voucherConditionObject => voucherConditionObject.value ===  conditionObject.value)
      if (object) object.data = url
    },

    addCondition(value){
      this.voucherForm.voucherCondition.add(value)
    },
    checkUserCondition(){
      const object = this.voucherConditions.find(item => item.value === 'user_file')
      if (!object){
        this.voucherConditions.push(this.applyCustomer)
      }
      if (this.voucherForm.voucherType === 'peer_to_peer') {
        const applyDiscounts = this.voucherConditions.find(item => item.value === 'user_file')
        if (applyDiscounts) this.addCondition(applyDiscounts)
      }
      else  if (this.voucherForm.voucherType === 'group'){
        const objectIndex = this.voucherConditions.findIndex(item => item.value === 'user_file')
        if (objectIndex >-1) this.voucherConditions.splice(objectIndex , 1)
      }
      else{
        const objectIndex = this.voucherForm.voucherCondition.findIndex(item => item.value === 'user_file')
        if (objectIndex >-1) this.voucherForm.voucherCondition.splice(objectIndex , 1)
      }
    },
    setForm() {
      try {
        this.voucherForm.title = this.voucherDetail.name
        this.voucherForm.endTime = this.voucherDetail.end_time_fa

      } catch (error) { }
    }

  },
  computed: {
    provinceList() {
      try {
        let provinceList = []
        this.provinces.forEach(province => {
          const form = {
            title: province.label,
            value: province.id
          }
          provinceList.push(form)
        })
        return provinceList
      } catch (e) {
        return []
      }
    },
  },
  watch: {
    user(val) {
      this.getUserAddress(val.id)
    },
    voucherDetail(val){
      this.setForm()
    }

  },
  mounted() {
    this.getProvince()
  }

}
</script>


<style>
</style>
