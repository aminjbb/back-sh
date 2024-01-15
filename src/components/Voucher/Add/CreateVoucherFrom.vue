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
      <v-col :cols="voucherForm.voucherType === 'group' ? 3 : 4">
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
      <v-col :cols="voucherForm.voucherType === 'group' ? 3 : 4">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   کد تخفیف *
                </span>
        </div>

        <v-text-field
            :rules="rule"
            variant="outlined"
            v-model="voucherForm.code"
            rounded="lg">

        </v-text-field>
      </v-col>
      <v-col :cols="voucherForm.voucherType === 'group' ? 3 : 4">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   نوع تخفیف *
                </span>
        </div>

        <v-select
            :rules="rule"
            :items="voucherTypes"
            variant="outlined"
            v-model="voucherForm.voucherType"
            rounded="lg"
        @update:modelValue="checkUserCondition()">
        </v-select>
      </v-col>
      <v-col v-if="voucherForm.voucherType === 'group'" cols="3">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   تعداد
                </span>
        </div>
        <v-text-field variant="outlined" v-model="voucherForm.voucherCount" type="number" min="1"/>
      </v-col>
      <v-col cols="6">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   نوع مقدار تخفیف *
                </span>
        </div>

        <v-select
            :rules="rule"
            :items="voucherAmountTypes"
            variant="outlined"
            v-model="voucherForm.voucherAmountType"
            rounded="lg">

        </v-select>
      </v-col>
      <v-col cols="6">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   مقدار تخفیف *
                </span>
        </div>

        <v-text-field
            :rules="rule"
            variant="outlined"
            v-model="voucherForm.voucherAmount"
            rounded="lg">

        </v-text-field>
      </v-col>
      <v-col cols="6">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   وضعیت کد تخفیف *
                </span>
        </div>

        <v-select
            :items="voucherActives"
            variant="outlined"
            v-model="voucherForm.voucherActive"
            rounded="lg">

        </v-select>
      </v-col>
      <v-col cols="6">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   هزینه ارسال *
                </span>
        </div>

        <v-select
            :rules="rule"
            :items="sendingItems"
            variant="outlined"
            v-model="voucherForm.sending"
            rounded="lg">

        </v-select>
      </v-col>
      <v-col cols="6">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   افرودن شرط
                </span>
        </div>

        <v-autocomplete
            :items="voucherConditions"
            variant="outlined"
            item-title="title"
            item-value="value"
            return-object
            rounded="lg">
          <template v-slot:item="item">
            <v-list-item>
              <v-row justify="center">

                <v-col cols="4">

                  <div @click="addCondition(item.props.value)" class="seller__add-sku-btn d-flex justify-center align-center">
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
<!--   for condition   -->

      <v-col cols="6" v-for="(condition , index) in voucherForm.voucherCondition">
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   {{ condition.title }}
                </span>
        </div>

        <template v-if="condition.inputType === 'select'">
          <v-autocomplete
              :items="provinceList"
              v-model="condition.data"
              variant="outlined"
              item-title="title"
              item-value="value"
              rounded="lg">
          </v-autocomplete>
        </template>
        <template v-else-if="condition.inputType === 'text'">
          <v-text-field
              v-model="condition.data"
              variant="outlined"
              rounded="lg">
          </v-text-field>
        </template>
        <template v-else-if="condition.inputType === 'date'">
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field
                v-model="condition.data[0]"
                variant="outlined"
                class="custom-input-start-date"
                clearable
                rounded="lg">
            </v-text-field>
            <date-picker

                type="datetime"
                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"

                v-model="condition.data[0]"
                variant="outlined"
                placeholder="تاریخ تولد"
                custom-input=".custom-input-start-date"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
                v-model="condition.data[1]"
                variant="outlined"
                class="custom-input-end-date"
                clearable
                rounded="lg">
            </v-text-field>
            <date-picker

                type="datetime"
                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"

                v-model="condition.data[1]"
                variant="outlined"
                placeholder="تاریخ تولد"
                custom-input=".custom-input-end-date"
            />
          </v-col>
        </v-row>
        </template>
        <template v-else-if="condition.inputType === 'file'">
        <div class="d-flex">
          <v-text-field
              readonly
              v-model="condition.data"
              variant="outlined"
              rounded="lg">
          </v-text-field>
          <ModalGroupAdd
              getEndPoint="voucher/crud/get/template"
              :isVoucher="true"
              :updateCondition="updateCondition"
              :condition="condition"
          />
        </div>

        </template>

      </v-col>
    </v-row>

  </v-form>
</template>


<script>

import {AxiosCall} from "@/assets/js/axios_call";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";

export default {
  components: {
    ModalGroupAdd,
    datePicker: VuePersianDatetimePicker,
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
      voucherConditions: [
        {
          title: 'انتخاب استان',
          value: 'state_id',
          data:null,
          inputType:'select'
        },
        {
          title: 'چندمین سفارش',
          value: 'order_count',
          data:null,
          inputType:'text'
        },
        {
          title: 'تعداد استفاده سفارش',
          value: 'order_limit',
           data:null,
          inputType:'text'
        },
        {
          title: 'تعداد استفاده مشتری',
          value: 'user_limit',
           data:null,
          inputType:'text'
        },
        {
          title: 'حداقل هزینه سفارش',
          value: 'min_order_price',
           data:null,
          inputType:'text'
        },
        {
          title: 'سقف هزینه سفارش',
          value: 'max_discount',
           data:'',
          inputType:'text'
        },
        {
          title: 'زمان شروع و پایان',
          value: 'start-and-end-time',
           data:[],
          inputType:'date'
        },
        {
          title: 'اعمال تخفیف بر اساس کالا',
          value: 'shps_file',
           data:null,
          inputType:'file'
        }, {
          title: 'اعمال تخفیف بر اساس مشتری',
          value: 'user_file',
           data:null,
          inputType:'file'
        },

      ],
      applyCustomer:{
        title: 'اعمال تخفیف بر اساس مشتری',
        value: 'user_file',
        data:null,
        inputType:'file'
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
      provinces:[]

    }
  },

  methods: {
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
    }
  },
  mounted() {
    this.getProvince()
  }

}
</script>


<style>
</style>
