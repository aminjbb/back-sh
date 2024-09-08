<template>
  <v-form ref="updateContent" v-model="valid" class="create-product__info-form scroller" v-if="load" >
    <v-row justify="start" align="center">
      <v-col cols="12">
        <div class="text-right my-5">
                      <span class="t14 w500">
                          محتوا
                      </span>
        </div>
        <TinymceVue @input="fillDescription" :value="form.content" id="TinymceVue2" class="mb-8 cke_rtl"
                    :other_options="options">
        </TinymceVue>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import {component as ckeditor} from '@mayasabha/ckeditor4-vue3'
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
import TinymceVue from "@/components/Public/TinymceVue.vue";

export default {

  props: {
    page: null
  },

  components: {
    UploadFileSection,
    ckeditor,
    TinymceVue
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
      options: {
        height: 500,
      },
      load: false
    }
  },

  methods: {
    fillDescription(e) {
      this.form.content = e
    },
    /**
     * Set from
     */
    setForm() {
      try {
        this.form.content = this.page.content
        setTimeout(()=>{
          this.load = true
        },500)
      } catch (error) {
      }
    }
  },
  watch: {
    page() {
      this.setForm()
    }
  },

}
</script>
