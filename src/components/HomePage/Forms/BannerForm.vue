<template>
  <v-form
      ref="addBanner"
      class="d--rtl "
      v-model="valid">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                   لینک
                </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            placeholder="لینک تصویر را وارد نمایید"
            :rules="rule"
            v-model="form.imageLink" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    Alt text
                </span>
        </div>
        <v-text-field
            placeholder="Alt text را وارد نمایید"
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.imageAlt" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    زمان شروع
                </span>
        </div>
        <v-text-field
            placeholder="روز و ساعت شروع"
            density="compact"
            variant="outlined"
            single-line
            class="start-date"
            :rules="rule"
            v-model="form.startDate" />
        <date-picker
            class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
            format="jYYYY-jMM-jDD HH:mm"
            display-format="jYYYY-jMM-jDD HH:mm"
            v-model="form.startDate"
            variant="outlined"
            type="datetime"
            custom-input=".start-date"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    زمان پایان
                </span>
        </div>
        <v-text-field
            placeholder="روز و ساعت پایان"
            density="compact"
            variant="outlined"
            single-line
            class="end-date"
            :rules="rule"
            v-model="form.endDate" />
        <date-picker
            class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
            format="jYYYY-jMM-jDD HH:mm"
            display-format="jYYYY-jMM-jDD HH:mm"
            type="datetime"
            v-model="form.endDate"
            variant="outlined"
            placeholder="تاریخ تولد"
            custom-input=".end-date"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    دستگاه
                </span>
        </div>
        <v-select
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            :items="deviceTypes"
            v-model="form.deviceType" />

      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    ترتیب نمایش
                </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.priority" />

      </v-col>
      <v-col cols="12">
        <UploadFileSection @getImage="getImage"/>
        <div class="d-flex align-center mt-5" v-if="form.image">
          <span>IMG-{{ form.image }}</span>
          <span class="mr-15"><v-icon color="error">mdi-delete</v-icon></span>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import {
  watch
} from 'vue'
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {
  convertDateToJalai
} from "@/assets/js/functions";
import RolePermission from '@/composables/RolePermission'
import {
  AxiosCall
} from "@/assets/js/axios_call";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
export default {
  setup() {
    const {
      allRolePermission,
      getAllRolePermission,
    } = new RolePermission()
    return {
      allRolePermission,
      getAllRolePermission
    }
  },
  props: {
    supplier: null
  },
  components: {
    UploadFileSection,
    datePicker: VuePersianDatetimePicker,

  },

  data() {
    return {
      form: {
        imageLink: '',
        imageAlt: '',
        startDate: '',
        endDate: '',
        deviceType: '',
        priority: '',
        image:''
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
      deviceTypes:[
        {title:'دسکتاپ' , value:'desktop'},
        {title:'موبایل' , value:'mobile'},
        {title:'تبلت' , value:'tablet'},
      ]
    }
  },
  methods: {
    /**
     * Get image id
     * @param {*} image
     */
    getImage(image){
      this.form.image = image.data.data.image_id
    },

    /**
     * Set from
     */
    setForm() {
      try {

        this.form.fullName = this.supplier.full_name
        this.form.shopName = this.supplier.shopping_name
        this.form.type = this.supplier.type
        this.form.province = this.supplier.state_id
        this.form.email = this.supplier.email
        this.getCities()
        this.form.city = this.supplier.city_id
        this.form.phoneNumber = this.supplier.phone
        this.form.mobileNumber = this.supplier.phone_number
        this.form.accountNumber = this.supplier.account_number
        this.form.shebaNumber = this.supplier.sheba_number
        this.form.paymentPeriod = this.supplier.payment_period
        this.form.paymentType = this.supplier.payment_type
      } catch (error) {}
    },
  },
  watch: {
    // supplier(val) {
    //   this.setForm()
    // }
  },
  computed: {

  },
}
</script>
