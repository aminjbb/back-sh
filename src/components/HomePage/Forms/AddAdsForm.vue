<template>
  <v-form
      ref="addBanner"
      class="d--rtl "
      v-model="valid">
    <v-row justify="center" align="center">
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
            v-model="form.device"
            :disabled="true"
            :items="deviceTypes"
        />
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


      <v-col cols="12">
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
      <v-col cols="12">
        <UploadFileSection @getImage="getImage"/>
        <div class="d-flex align-center mt-5" v-if="form.image">
          <span>IMG-{{ form.image }}</span>
          <span class="mr-15"><v-icon @click="removeItem(image)" color="error">mdi-delete</v-icon></span>
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
    supplier: null,
    device:'',
    banner:''
  },
  components: {
    UploadFileSection,
    datePicker: VuePersianDatetimePicker,

  },

  data() {
    return {
      form: {
        device: '',
        link:'',
        imageAlt: '',
        image:'',
        imageUrl:''
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
      this.form.image = ''
      // openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
    },
    /**
     * Get image id
     * @param {*} image
     */
    getImage(image){
      this.form.image = image.data.data.image_id
      this.form.imageUrl = image.data.data.url
    },

  },
  mounted() {
    this.form.device = this.device
    if (this.banner){

      this.form.link = this.banner.link
      this.form.imageAlt = this.banner.image_alt
      this.form.image = this.banner.image_id
      this.form.imageUrl = this.banner.image?.image_url
    }

  },
  watch:{
    confirmModal(val){
      if (!val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          this.form.imag= null
          localStorage.removeItem('deleteObject')
        }
      }
    },
  }
}
</script>
