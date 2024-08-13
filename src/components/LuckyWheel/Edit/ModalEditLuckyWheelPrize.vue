<template>
  <div class="text-right">
    <div class="ma-3 pointer d--rtl" @click="dialog= true">
      <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
      <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
    </div>
    <v-dialog v-model="dialog">
      <v-card class="d--rtl">
        <v-form ref="LuckyWheelStep2Form" v-model="valid">
          <v-row justify="start" align="end" class="pa-5">
            <v-col cols="3">
              <div>
                <span>نام جایزه</span>
                <span class="text-error">*</span>
              </div>
              <div class="mt-2">
                <v-text-field variant="outlined" v-model=" form.name" :rules="rule"/>
              </div>
            </v-col>
            <v-col cols="3">
              <div>
                <span>لیبل جایزه</span>
                <span class="text-error">*</span>
              </div>
              <div class="mt-2">
                <v-text-field variant="outlined" v-model=" form.label" :rules="rule"/>
              </div>
            </v-col>
            <v-col cols="3">
              <div>
                <span>میزان درصد شانس </span>
                <span class="text-error">*</span>
              </div>
              <div class="mt-2">
                <v-text-field variant="outlined" v-model="form.chance" :rules="rule"/>
              </div>
            </v-col>
            <v-col cols="3">
              <div>
                <span>مدت زمان استفاده ( ساعت ) </span>
                <span class="text-error">*</span>
              </div>
              <div class="mt-2">
                <v-text-field variant="outlined" v-model="form.time" :rules="rule"/>
              </div>
            </v-col>
            <v-col cols="12">
              <div>
                <span>توضیحات </span>
                <span class="text-error">*</span>
              </div>
              <div class="mt-2">
                <v-text-field variant="outlined" v-model="form.description" :rules="rule"/>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="text-right mb-3">
                  <span>
                   تصویر کد تخفیف
                  </span>
                <span class="text-error">*</span>
              </div>
              <UploadFileSection @getImage="getImage"/>
              <div class="d-flex align-center mt-5" v-if="form.image">
                <span>IMG-{{ form.image }}</span>
                <span class="mr-15">
                <v-icon
                    @click="removeItem(form.image , 'mobile')"
                    color="error">mdi-delete</v-icon></span>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="text-right mb-3">
                  <span>
                   تصویر کد تخفیف موبایل
                  </span>
                <span class="text-error">*</span>
              </div>
              <UploadFileSection @getImage="getImageMobile"/>
              <div class="d-flex align-center mt-5" v-if="form.imageMobile">
                <span>IMG-{{ form.imageMobile }}</span>
                <span class="mr-15">
                <v-icon
                    @click="removeItem(form.imageMobile , 'mobile')"
                    color="error">mdi-delete</v-icon></span>
              </div>
            </v-col>
            <v-col cols="2">
              <v-btn
                  @click="editPrize()"
                  :loading="loading"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1">

                ویرایش
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

      </v-card>

    </v-dialog>
  </div>
</template>

<script>
import {
  closeModal
} from "@/assets/js/functions_seller";
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import {defineAsyncComponent} from "vue";
const UploadFileSection = defineAsyncComponent(() => import('@/components/Public/UploadFileSection.vue'))


export default {

  data() {
    return {
      loading:false,
      dialog:false,
      imageId: null,
      valid: true,
      rule: [v => !!v || "این فیلد الزامی است"],
      form: {
        name: null,
        label: null,
        voucher: null,
        chance: null,
        time: null,
        image: null,
        imageMobile: null,
        description: null
      },
    }
  },
  components:{
    UploadFileSection
  },

  props: {
    prize: null,
    getLuckyWheelPrize:{type:Function},

  },
  methods: {
    close() {
      closeModal(this.$store, 'set_orderDetailsModal')
    },
    setForm(){
      this.form.name = this.prize.name
      this.form.label = this.prize.label
      this.form.chance = this.prize.chance
      this.form.time = this.prize.deadline_for_use
      this.form.description = this.prize.description
      this.form.image = this.prize.desktop_image_id
      this.form.imageMobile = this.prize.mobile_image_id
    },
    async editPrize() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `game/lucky-wheel/prize/crud/update/${this.prize?.id}`
      formData.append('name', this.form.name)
      formData.append('label', this.form.label)
      formData.append('deadline_for_use',  this.form.time)
      formData.append('chance',this.form.chance)
      formData.append('desktop_image_id', this.form.image)
      formData.append('mobile_image_id', this.form.imageMobile)
      formData.append('description', this.form.description)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$emit('updatePrizeList')
        this.dialog =false
      } else {
        this.loading = false
      }
    },
  },

  mounted() {
    this.setForm()
  }

}
</script>
