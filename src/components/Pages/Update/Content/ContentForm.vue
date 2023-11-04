<template>
  <v-form ref="updateContent" v-model="valid" class="create-product__info-form scroller">
    <v-row justify="start" align="center">
      <v-col cols="12">
        <div class="text-right my-5">
                      <span class="t14500">
                          محتوا
                      </span>
        </div>
        <ckeditor  v-model="form.content" :config="editorConfig" class="cke_rtl mb-15"/>
      </v-col>

    </v-row>
  </v-form>
</template>

<script>
import {component as ckeditor} from '@mayasabha/ckeditor4-vue3'
import {convertDateToJalai} from "@/assets/js/functions";
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
export default {

  props: {
    page:null
  },

  components:{
    UploadFileSection,
    ckeditor
  },
  data() {
    return {
      editorConfig: {
        language: 'en',
        contentsLangDirection: 'rtl',
      },
      form: {
        content: null,
      },
      valid: false,
    }
  },

  methods: {
    /**
     * Set from
     */
    setForm() {
      try {
        this.form.content = this.page.content
      } catch (error) { }
    }
  },
  watch: {
    page(){
      this.setForm()
    }
  },

}
</script>
