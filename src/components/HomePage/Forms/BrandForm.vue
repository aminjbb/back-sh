<template>
  <v-form
      ref="addForm"
      class="d--rtl "
      v-model="valid">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                   نام برند
                  <span class="text-error">*</span>
                </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            placeholder="نام برند را وارد نمایید"
            :rules="rule"
            v-model="form.title" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                    ترتیب نمایش
                  <span class="text-error">*</span>
                </span>
        </div>
        <v-text-field
            placeholder=" ترتیب نمایش را وارد نمایید"
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.priority" />
      </v-col>
      <v-col cols="12">
        <div class="text-right my-5">
                <span class="t14500">
                    لینک
                  <span class="text-error">*</span>
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
    status: null
  },
  components: {
    UploadFileSection,
    datePicker: VuePersianDatetimePicker,

  },

  data() {
    return {

      form: {
        title: '',
        priority: '',
        link: '',
        image:''
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

        this.form.title = this.bannerObject.label
        this.form.priority = this.bannerObject.priority
        this.form.link = this.bannerObject.link
        this.form.image = this.bannerObject.image_id

      } catch (error) {}
    },
  },
  mounted() {
      if (this.status == 'edit') this.setForm()
  },
  computed:{
    bannerObject(){
      return this.$store.getters['get_homePageBrandObject']
    }
  }
}
</script>
