<template>
  <v-form
      ref="addForm"
      class="d--rtl "
      v-model="valid">
    <v-row justify="start" align="center" class="px-15">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                  عنوان<span class="text-error">*</span>
                </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            placeholder="عنوان وارد نمایید"
            :rules="rule"
            v-model="form.title" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                     لینک<span class="text-error">*</span>
                </span>
        </div>
        <v-text-field
            placeholder="لینک را وارد نمایید"
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.link" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    زمان شروع<span class="text-error">*</span>
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
            type="datetime"
            variant="outlined"
            custom-input=".start-date"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    زمان پایان <span class="text-error">*</span>
                </span>
        </div>
        <v-text-field
            placeholder="روز و ساعت پایان"
            density="compact"
            variant="outlined"
            single-line
            class="end-date"
            :rules="emailRule"
            v-model="form.endDate" />
        <date-picker
            class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
            format="jYYYY-jMM-jDD HH:mm"
            display-format="jYYYY-jMM-jDD HH:mm"
            v-model="form.endDate"
            variant="outlined"
            type="datetime"
            custom-input=".end-date"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    کد رنگ پس‌زمینه
                </span>
        </div>
        <v-text-field
            placeholder="برای مثال FFFFFF#"
            density="compact"
            variant="outlined"
            :rules="rule"
            v-model="form.colorCode" />
      </v-col>

      <v-col cols="12">
        <UploadFileSection @getImage="getImage"/>
        <div class="d-flex align-center mt-5" v-if="form.image">
          <span>IMG-{{ form.image }}</span>
          <span class="mr-15"><v-icon @click="removeItem(form.image)" color="error">mdi-delete</v-icon></span>
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
  convertDateToJalai, openConfirm
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
    specialSale: null
  },
  components: {
    UploadFileSection,
    datePicker: VuePersianDatetimePicker,

  },

  data() {
    return {
      form: {
        link: '',
        title: '',
        startDate: '',
        endDate: '',
        colorCode: '',
        image: ''
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
    }
  },
  methods: {
    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
    },
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
        const startDate =  convertDateToJalai(this.specialSale.start_time , '-' , true)
        const endDate =  convertDateToJalai(this.specialSale.end_time , '-' , true)
        const startDateSplit = this.specialSale.start_time.split(' ')
        const endDateSplit = this.specialSale.end_time.split(' ')
        this.form.colorCode = this.specialSale.background_hex_code
        this.form.title = this.specialSale.label
        this.form.link = this.specialSale.link
        this.form.startDate =`${startDate} ${startDateSplit[1].slice(0,5)}`
        this.form.endDate =`${endDate} ${endDateSplit[1].slice(0,5)}`
        this.form.image = this.specialSale.image_id


      } catch (error) {}
    },
  },
  watch: {
    specialSale(val) {
      this.setForm()
    },
    confirmModal(val){
      if (!val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          this.form.imag= null
          localStorage.removeItem('deleteObject')
        }
      }
    },
  },

}
</script>
