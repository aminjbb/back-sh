<template>
  <v-form
      ref="addForm"
      class="d--rtl pb-10"
      v-model="valid">
    <v-row justify="start" align="center" class="px-15 pb-15">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14 w500">
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
                <span class="t14 w500">
                     کد رنگ پس‌زمینه
                </span>
        </div>
        <v-text-field
            placeholder="برای مثال FFFFFF#"
            density="compact"
            variant="outlined"
            single-line
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
   openConfirm
} from "@/assets/js/functions";

import UploadFileSection from "@/components/Public/UploadFileSection.vue";
export default {

  props: {
    slider: null
  },
  components: {
    UploadFileSection,

  },

  data() {
    return {
      form: {
        title: '',
        colorCode: '',
        image: '',

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

        this.form.title = this.slider.label
        this.form.colorCode = this.slider.background_hex_code
        this.form.image = this.slider.image_id

      } catch (error) {}
    },
  },
  mounted() {
    if (this.slider)  this.setForm()
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
