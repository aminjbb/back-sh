<template>
  <v-form
      ref="addForm"
      class="d--rtl "
      v-model="valid">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                   عنوان
                  <span class="text-error">*</span>
                </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            placeholder="لینک تصویر را وارد نمایید"
            :rules="rule"
            v-model="form.title" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    لینک
                  <span class="text-error">*</span>
                </span>
        </div>
        <v-text-field
            placeholder="Alt text را وارد نمایید"
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.link" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
               <span class="t14500">
                    Alt text
                  <span class="text-error">*</span>
                </span>
        </div>
        <v-text-field

            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.imageAlt" />

      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                   ترتیب نمایش
                </span>
        </div>
        <v-text-field
            placeholder="ترتیب نمایش"
            density="compact"
            variant="outlined"
            single-line
            v-model="form.priority" />

      </v-col>
      <v-col cols="12">
        <UploadFileSection @getImage="getImage"/>
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
        title: '',
        link: '',
        imageAlt: '',
        priority: 1,
        image: '',
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
    }
  },
  methods: {
    /**
     * Get image id
     * @param {*} image
     */
    getImage(image) {
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
    supplier(val) {
      this.setForm()
    }
  },
  computed: {

  },

}
</script>
