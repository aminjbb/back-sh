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
            placeholder=" ترتیب نمایش را وارد کنید"
            single-line
            :rules="rule"
            v-model="form.priority" />

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
  convertDateToJalai, openConfirm
} from "@/assets/js/functions";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
export default {

  props: {
    status: null,
    bannerObject:null
  },
  components: {
    UploadFileSection,

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
    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
    },
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
        const startDate =  convertDateToJalai(this.bannerObject.start_time , '-' , true)
        const endDate =  convertDateToJalai(this.bannerObject.end_time , '-' , true)
        const startDateSplit = this.bannerObject.start_time.split(' ')
        const endDateSplit = this.bannerObject.end_time.split(' ')
        this.form.imageLink = this.bannerObject.link
        this.form.imageAlt = this.bannerObject.image_alt
        this.form.startDate =`${startDate} ${startDateSplit[1].slice(0,5)}`
        this.form.endDate =`${endDate} ${endDateSplit[1].slice(0,5)}`
        this.form.deviceType = this.bannerObject.device
        this.form.priority = this.bannerObject.priority
        this.form.image = this.bannerObject.image_id
      } catch (error) {}
    },
  },

  mounted() {
    console.log(this.status)
    if (this.status == 'edit') this.setForm()
  },
  computed: {
    bannerObject(){
      return this.$store.getters['get_homePageBannerObject']
    }
  },
}
</script>
