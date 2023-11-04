<template>
  <v-form ref="updateSeo" v-model="valid" class="create-product__info-form scroller">
    <v-row justify="start" align="center">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14500">
                          عنوان
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.metaTitle"
        />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14500">
                       slug
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.slug"
        />
      </v-col>
      <v-col cols="12" md="12">
        <div class="text-right my-5">
                      <span class="t14500">
                       توضیحات
                      </span>
        </div>
        <v-textarea
            max-rows="2"
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.metaDescription"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14500">
                          OG:Title
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.ogTitle"
        />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14500">
                       OG:Description
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.ogDescription"
        />
      </v-col>

    </v-row>
  </v-form>
</template>
<script>

import {convertDateToJalai} from "@/assets/js/functions";
export default {

  props: {
    page:null
  },

  data() {
    return {
      form: {
        slug: '',
        metaTitle: '',
        metaDescription:'',
        ogTitle:'',
        ogDescription:'',

      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
    }
  },

  methods: {
    /**
     * Set from
     */
    setForm() {
      try {
        this.form.slug = this.page.slug
        this.form.metaTitle = this.page.meta_title
        this.form.metaDescription = this.page.meta_description
        this.form.ogTitle = this.user.og_title
        this.form.ogDescription = this.user.og_description

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
