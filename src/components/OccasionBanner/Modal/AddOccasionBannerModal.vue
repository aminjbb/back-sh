<template>
  <div class="text-right">
    <div  @click="dialog = true" class="ma-5 pointer" v-if="type ==='edit'">
      <v-icon class="text-grey-darken-1">mdi-pen-minus</v-icon>
      <span class="mr-2 text-grey-darken-1 t14 w300">
                                            ویرایش
      </span>

    </div>
    <v-btn
        v-else
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
    <v-dialog v-model="dialog" width="1080">
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
                        <span class="t14 w500">
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
              <v-col cols="12" md="4">
                <div class="text-right my-5">
                <span class="t14 w500">
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
              <v-col cols="12" md="4">
                <div class="text-right my-5">
                <span class="t14 w500">
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
                <span class="t14 w500">
                   دستگاه
                </span>
                </div>
                <v-select
                    density="compact"
                    variant="outlined"
                    single-line
                    multiple
                    :rules="rule"
                    v-model="form.device"
                    :items="deviceTypes"
                />
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-right my-5">
                <span class="t14 w500">
                   انتخاب صفحات
                </span>
                </div>
                <v-select
                    density="compact"
                    variant="outlined"
                    multiple
                    :rules="rule"
                    v-model="form.pages"
                    :items="pages"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 2">
                      <span>{{ item.title }}</span>
                    </v-chip>
                    <span
                        v-if="index === 2"
                        class="text-grey text-caption align-self-center"
                    >
                    (+{{ form.pages.length - 2 }} others)
                  </span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-right my-5">
                <span class="t14 w500">
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
                    type="datetime"

                    display-format="jYYYY-jMM-jDD"
                    :custom-input="`.start-input-start-date`"
                    v-model="form.startDate" />
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-right my-5">
                <span class="t14 w500">
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
                    type="datetime"
                    display-format="jYYYY-jMM-jDD"
                    :custom-input="`.start-input-end-date`"
                    v-model="form.endDate" />
              </v-col>
              <v-col cols="12" v-if="form.device.find(element => element === 'desktop')">
                <div class="text-right mb-3">
                  <span>
                    تصویر بنر دسکتاپ
                  </span>
                </div>
                <UploadFileSection  @getImage="getImageDesktop"/>
                <div class="d-flex align-center mt-5" v-if="form.imageDesktop">
                  <span>IMG-{{ form.imageDesktop }}</span>
                  <span class="mr-15"><v-icon @click="removeItem(form.imageDesktop , 'desktop')" color="error">mdi-delete</v-icon></span>
                </div>
              </v-col>
              <v-col cols="12" v-if="form.device.find(element => element === 'tablet')">
                <div class="text-right mb-3">
                  <span>
                    تصویر بنر تبلت
                  </span>
                </div>
                <UploadFileSection  @getImage="getImageTablet"/>
                <div class="d-flex align-center mt-5" v-if="form.imageTablet">
                  <span>IMG-{{ form.imageTablet }}</span>
                  <span class="mr-15"><v-icon @click="removeItem(form.imageTablet ,'tablet')" color="error">mdi-delete</v-icon></span>
                </div>
              </v-col>
              <v-col cols="12" v-if="form.device.find(element => element === 'mobile')">
                <div class="text-right mb-3">
                  <span>
                    تصویر بنر موبایل
                  </span>
                </div>
                <UploadFileSection  @getImage="getImageMobile"/>
                <div class="d-flex align-center mt-5" v-if="form.imageMobile">
                  <span>IMG-{{ form.imageMobile }}</span>
                  <span class="mr-15"><v-icon @click="removeItem(form.imageMobile , 'mobile')" color="error">mdi-delete</v-icon></span>
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
              @click="dialog = false"
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
import {convertDateToGregorian, openConfirm, openToast} from "@/assets/js/functions";
export default {
  components: {  datePicker: VuePersianDatetimePicker,UploadFileSection},
  props: {
    banner: null,
    type:'create',
  },

  data() {
    return {
      dialog: false,
      removeStatus :'',
      image: '',
      imageId:'',
      loading:false,
      form: {
        device: [],
        pages: [],
        link:'',
        imageAlt: '',
        imageDesktop:'',
        imageTablet:'',
        imageMobile:'',
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

      pages:[
        // {title:'انتخاب همه' , value:'all'},
        {title:'دسته بندی' , value:'category'},
        {title:'برند' , value:'brand'},
        {title:'کالا' , value:'sku'},
        {title:'محصولات' , value:'product'},
        {title:'گروه کالا' , value:'sku_group'},
        {title:'صفحه اصلی' , value:'main_page'},
        {title:'صفحه پروموشن' , value:'promotion'},
      ],
      valid:true
    }
  },

  methods: {
    getImageDesktop(image){
      this.form.imageDesktop = image.data.data.image_id
    },
    getImageTablet(image){
      this.form.imageTablet = image.data.data.image_id
    },
    getImageMobile(image){
      this.form.imageMobile = image.data.data.image_id
    },
     removeItem(id , status) {
        this.imageId = id;
        localStorage.setItem('imageIdDeleted', status)
       openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, false)
    },
    validate() {
      this.$refs.addOccasionBanner.validate()
      setTimeout(() => {
        if (this.valid) this.sendDataBanner()

      }, 200)
    },

    async sendDataBanner() {
      try {
        const startDateSplit = this.form.startDate.split(' ')
        const endDateSplit = this.form.endDate.split(' ')
        const startTimeSplit = startDateSplit[1].split(':')
        const endTimeSplit = endDateSplit[1].split(':')
        this.loading = true
        let formData = new FormData();
        let endPoint = null
        if (this.type === 'edit') endPoint = `page/top_banner/crud/update/${this.banner.id}`
        else endPoint = `page/top_banner/crud/create`
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = endPoint
        formData.append('link', this.form.link)
        formData.append(`image_alt`, this.form.imageAlt)
        formData.append(`start_time`,`${ convertDateToGregorian(startDateSplit[0] ,'/' , false)} ${startTimeSplit[0]}:${startTimeSplit[1]}:00`)
        formData.append(`end_time`,`${ convertDateToGregorian(endDateSplit[0] ,'/' , false)} ${endTimeSplit[0]}:${endTimeSplit[1]}:00`)
        if (this.form.imageDesktop)  formData.append('desktop_image_id', this.form.imageDesktop)
        if (this.form.imageTablet)  formData.append('tablet_image_id', this.form.imageTablet)
        if (this.form.imageMobile)  formData.append('mobile_image_id', this.form.imageMobile)
        this.form.device.forEach((device , index)=>{
          formData.append(`device[${index}]`, device)
        })
        this.form.pages.forEach((page , index)=>{
          formData.append(`pages[${index}]`, page)
        })
        if (this.type === 'edit'){
          if (this.banner.is_active) formData.append('is_active', 1)
          else  formData.append('is_active', 0)
        }
        else formData.append('is_active', 0)

        AxiosMethod.form = formData

        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          openToast(this.$store , 'بنرر با موفقیت آپلود شد' , 'success')
          this.loading = false
          this.dialog = false
          this.$emit('updateList')
          this.resetForm()
        } else {
          this.loading = false

        }
      }
      catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    resetForm(){
      this.form = {
        device: [],
        pages: [],
        link:'',
        imageAlt: '',
        imageDesktop:'',
        imageTablet:'',
        imageMobile:'',
        imageUrl:'',
        startDate:null,
        endDate:null
      }
    },
    setForm(){
      try {
        let startDateSplit = this.banner.start_time.split(' ')
        startDateSplit = startDateSplit[1].split('.')
        let endDateSplit = this.banner.end_time.split('')
        endDateSplit = endDateSplit[1].split('.')
        this.form.link = this.banner.link
        this.form.imageAlt = this.banner.image_alt
        this.form.pages = this.banner.pages
        this.form.device = this.banner.device
        this.form.endDate = `${this.banner.end_time_fa} ${startDateSplit[0]}`
        this.form.startDate = `${this.banner.start_time_fa} ${endDateSplit[0]}`
        this.form.imageDesktop = this.banner.desktop_image_id
        this.form.imageTablet = this.banner.tablet_image_id
        this.form.imageMobile = this.banner.mobile_image_id

      }
      catch (e) {
        console.log(e)
      }
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
          console.log(localStorage.getItem('imageIdDeleted') )
          if (localStorage.getItem('imageIdDeleted') == 'desktop')   this.form.imageDesktop = null
          if (localStorage.getItem('imageIdDeleted') == 'tablet')this.form.imageTablet = null
          if (localStorage.getItem('imageIdDeleted') == 'mobile')this.form.imageMobile = null
          localStorage.removeItem('deleteObject')
          setTimeout(()=>{
            localStorage.removeItem('imageIdDeleted')
          } , 2000)
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
