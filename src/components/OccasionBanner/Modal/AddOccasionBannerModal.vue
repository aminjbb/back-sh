<template>
  <div class="text-right">
    <v-btn
        @click="dialog = true"
        color="primary500"
        height="40"
        rounded
        class="px-8 ">
      <template v-slot:prepend>
        <v-icon>mdi-plus</v-icon>
      </template>
      افزودن بنر
    </v-btn>
    <v-dialog v-model="dialog" width="908">
      <v-card>
        <v-row
            justify="space-between"
            align="center"
            class="pa-5">
          <v-col cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
                        <span class="t14500">
                            افزودن بنر
                        </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider />
        </div>

        <div class="d--rtl">
          <v-form ref="addOccasionBanner" v-model="valid">
            <v-row align="center" class="mx-5" justify="center">
              <v-col cols="12" md="6">
                <div class="text-right my-5">
                <span class="t14500">
                  لینک
                </span>
                </div>
                <v-text-field
                    placeholder="لینک تصویر را وارد نمایید"
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
              <v-col cols="12" md="4">
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
                    v-model="form.device"
                    :items="deviceTypes"
                />
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-right my-5">
                <span class="t14500">
                   زمان شروع
                </span>
                </div>
                <v-text-field
                    v-model="form.startDate"
                    variant="outlined"
                    placeholder="زمان شروع"
                    :class="`start-input-start-date`">

                </v-text-field>
                <date-picker
                    clearable
                    range
                    type="datetime"

                    display-format="jYYYY-jMM-jDD"
                    :custom-input="`.start-input-start-date`"
                    v-model="form.startDate" />
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-right my-5">
                <span class="t14500">
                   زمان پایان
                </span>
                </div>
                <v-text-field
                    v-model="form.endDate"
                    variant="outlined"
                    placeholder="زمان پایان"
                    :class="`start-input-end-date`">

                </v-text-field>
                <date-picker
                    clearable
                    range
                    type="datetime"
                    display-format="jYYYY-jMM-jDD"
                    :custom-input="`.start-input-end-date`"
                    v-model="form.endDate" />
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

        </div>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10">
          <v-btn
              :loading="loading"
              width="80"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <v-btn
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1">

            انصراف
          </v-btn>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  AxiosCall
} from "@/assets/js/axios_call";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {openConfirm} from "@/assets/js/functions";
export default {
  components: {  datePicker: VuePersianDatetimePicker,UploadFileSection},
  props: {
    banner: null,
    maxWidth: null,
    getHomePageBanner:{type:Function},
    type:'create',
  },

  data() {
    return {
      dialog: false,
      image: '',
      imageId:'',
      loading:false,
      form: {
        device: '',
        link:'',
        imageAlt: '',
        image:'',
        imageUrl:'',
        startDate:null,
        endDate:null
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      deviceTypes:[
        {title:'دسکتاپ' , value:'desktop'},
        {title:'موبایل' , value:'mobile'},
        {title:'تبلت' , value:'tablet'},
      ],
      valid:true
    }
  },

  methods: {
    getImage(image){
      console.log(image)
      this.form.image = image.data.data.image_id
    },
     removeItem(id) {
      this.imageId = id;
       openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
    },
    validate() {
      this.$refs.addOccasionBanner.$refs.addBanner.validate()
      setTimeout(() => {
        if (this.valid) this.sendDataBanner()
      }, 200)
    },

    async sendDataBanner() {
      try {
        this.loading = true
        let formData = new FormData();
        let endPoint = null
        if (this.type === 'edit') endPoint = `page/home/section/banner/update/${this.banner.id}`
        else endPoint = `page/home/section/banner/create/`
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = endPoint
        formData.append('homepage_section_id', this.$route.params.sectionId)
        formData.append('link', this.$refs.AddAdsForm.form.link)
        formData.append(`image_alt`, this.$refs.AddAdsForm.form.imageAlt)
        formData.append('device', this.device)
        formData.append('image_id', this.$refs.AddAdsForm.form.image)
        AxiosMethod.form = formData
        formData.append('is_active', 0)
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.getHomePageBanner()
          this.loading = false
          this.image = this.$refs.AddAdsForm.form.imageUrl
          this.dialog = false
        } else {
          this.loading = false
        }
      }
      catch (e) {
        this.loading = false
      }
    },
    setForm(){

    }
  },
  computed:{
    confirmModal(){
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },
  watch:{
    confirmModal(val){
      if (!val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          this.form.image = null
          localStorage.removeItem('deleteObject')
        }
      }
    },
  },
  mounted() {
    if (this.type === 'edit'){
      this.setForm()
    }
  }
}
</script>
