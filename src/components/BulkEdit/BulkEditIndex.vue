<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="center"
          align="start"
          class="px-10 py-5">
        <v-col
            cols="12"
            class="d-flex justify-center align-center t14500">
          ویرایش گروهی
        </v-col>
        <v-divider color="grey"/>
        <v-col cols="12">
          <v-col cols="12">
            <p class="text-center">
              در صورت نیاز به اعمال بازه زمانی برای تخفیف ها پیش از بارگذاری تاریخ شروع و پایان را تکمیل نمایید و سپس دکمه اعمال تغییرات را بزنید.
            </p>
          </v-col>


        </v-col>
        <v-col cols="12">

          <v-row justify="center">
            <v-btn
                :loading="templateLoading"
                @click="getTemplate()"
                width="166"
                variant="outlined"
                color="black"
                rounded
                class="mx-5"
            >
                        <span class="t14300">
                            دانلود فایل نمونه
                        </span>
            </v-btn>
            <v-btn
                :loading="uploadFileLoading"
                @click="selectFile()"
                width="166"
                color="primary500"
                rounded
                class="mx-5"
            >
                        <span class="t14300">
                            انتخاب فایل
                        </span>
            </v-btn>
          </v-row>
        </v-col>

        <v-col cols="6">
          <div class="text-right ">
            <span class="text-gray600 t14500">
             تاریخ شروع بازرگانی
            </span>

          </div>
          <div>
            <v-text-field

                label="تاریخ شروع"
                single-line
                density="compact"
                variant="outlined"
                class="custom-input1"
                :rules="rule"
                v-model="form.bazarganiStartDate"
            />
            <date-picker
                type="datetime"
                compact-time
                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
                display-format="jYYYY-jMM-jDD"
                v-model="form.bazarganiStartDate"
                variant="outlined"
                placeholder="تاریخ شروع"
                custom-input=".custom-input1"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-right ">
            <span class="text-gray600 t14500">
             تاریخ پایان بازرگانی
            </span>

          </div>
          <div>
            <v-text-field
                label="تاریخ پایان"
                single-line
                density="compact"
                variant="outlined"
                class="custom-input2"
                :rules="rule"
                v-model="form.bazarganiEndDate"
            />
            <date-picker
                type="datetime"
                compact-time
                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
                display-format="jYYYY-jMM-jDD"
                v-model="form.bazarganiEndDate"
                variant="outlined"
                placeholder="تاریخ پایان"
                custom-input=".custom-input2"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-right ">
            <span class="text-gray600 t14500">
             تاریخ شروع مارکتینگ
            </span>

          </div>
          <div>
            <v-text-field
                type="datetime"
                compact-time
                label="تاریخ شروع"
                single-line
                density="compact"
                variant="outlined"
                class="custom-input3"
                :rules="rule"
                v-model="form.marketingStartDate"
            />
            <date-picker
                type="datetime"
                compact-time
                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
                display-format="jYYYY-jMM-jDD"
                v-model="form.marketingStartDate"
                variant="outlined"
                placeholder="تاریخ شروع"
                custom-input=".custom-input3"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-right ">
            <span class="text-gray600 t14500">
              تاریخ پایان مارکتینگ
            </span>

          </div>
          <div>
            <v-text-field
                label="تاریخ پایان"
                single-line
                density="compact"
                variant="outlined"
                class="custom-input4"
                :rules="rule"
                v-model="form.marketingEndDate"
            />
            <date-picker
                type="datetime"
                compact-time
                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
                display-format="jYYYY-jMM-jDD"
                v-model="form.marketingEndDate"
                variant="outlined"
                placeholder="تاریخ پایان"
                custom-input=".custom-input4"
            />
          </div>
        </v-col>
        <v-col cols="12">
          <v-row justify="space-between pa-5">
            <v-btn
                :loading="loading"
                @click="validate()"
                width="166"
                color="primary500"
                rounded
            >
                        <span class="t14300">
                           اعمال تغییرات
                        </span>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

    </v-card>
  </div>
</template>

<script>

import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {convertDateToGregorian, openToast} from "@/assets/js/functions";

export default {
  components: {
    datePicker: VuePersianDatetimePicker,
  },

  data() {
    return {
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid:true,
      urlFile:'',
      uploadFileLoading:false,
      templateLoading:false,
      loading:false,
      form:{
        bazarganiStartDate:null,
        bazarganiEndDate:null,
        marketingEndDate:null,
        marketingStartDate:null
      }

    }
  },
  methods: {
    async validate(){
      this.submitForm()
    },

    /**
     * submit form
     */
    async submitForm() {
      try {

        const baseStartTimeSplit = this.form.bazarganiStartDate.split(' ')
        const baseStartTime = convertDateToGregorian(baseStartTimeSplit[0] , '/' , false)

        const baseEndTimeSplit = this.form.bazarganiEndDate.split(' ')
        const baseEndTime = convertDateToGregorian(baseEndTimeSplit[0] , '/' , false)

        const marketingStartTimeSplit = this.form.marketingStartDate.split(' ')
        const marketingStartDate = convertDateToGregorian(marketingStartTimeSplit[0] , '/' , false)


        const marketingEndTimeSplit = this.form.marketingEndDate.split(' ')
        const marketingEndDate = convertDateToGregorian(marketingEndTimeSplit[0] , '/' , false)
        this.loading = true
        const AxiosMethod = new AxiosCall()
        var formdata = new FormData();
        formdata.append('file', this.urlFile)
        formdata.append('base_discount_start_date_time',baseStartTime + ' '  + baseStartTimeSplit[1])
        formdata.append('base_discount_end_date_time', baseEndTime + ' '  + baseEndTimeSplit[1])
        formdata.append('marketing_discount_start_date_time', marketingStartDate + ' '  + marketingStartTimeSplit[1])
        formdata.append('marketing_discount_end_date_time', marketingEndDate + ' '  + marketingEndTimeSplit[1])
        AxiosMethod.end_point = 'system/bulk/update/shps'
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.form = formdata
        AxiosMethod.using_auth = true
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading = false
          openToast(this.$store , 'لطفا کمی صبر کنید' , 'success')
        } else {
          this.loading = false
        }
      }
      catch (e) {
        this.loading = false
      }
    },
    /**
     * Get template
     */
    async getTemplate() {
      this.templateLoading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'system/bulk/update/shps-template'
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.using_auth = true
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.templateLoading = false
        window.open(data.data);
        // openToast(
        //     this.$store,
        //    data.message,
        //     "success"
        // );
      } else {
        this.templateLoading = false
      }
    },

    /**
     * Upload file
     * @param {*} file
     */
    async uploadFile(file) {
      this.uploadFileLoading = true
      const AxiosMethod = new AxiosCall()
      var formdata = new FormData();
      formdata.append('file', file)
      formdata.append('module', 'bulk')
      AxiosMethod.end_point = 'file-manager/direct/store'
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = formdata
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      let data = await AxiosMethod.axios_image_upload()
      if (data) {
        this.uploadFileLoading = false
        this.urlFile = data.data.data.url
      } else {
        this.uploadFileLoading = false
      }
    },

    /**
     * Select file
     */
    selectFile() {
      var input = document.createElement('input');
      input.type = 'file';
      input.onchange = e => {
        var file = e.target.files[0];
        this.uploadFile(file)
      }
      input.click();
    }
  }
}
</script>
