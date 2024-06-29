<template>
  <v-form
      ref="addBestSelling"
      class="d--rtl "
      v-model="valid">
    <v-row justify="center" align="center" class="pa-15">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
          <span class="t14500">عنوان</span>
          <span class="text-error">*</span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.label"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
          <span class="t14500">اولویت</span>
          <span class="text-error">*</span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.priority"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
          <span class="t14500">دستگاه</span>
          <span class="text-error">*</span>
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
      <v-col cols="12" md="6">
        <div class="text-right my-5">
          <span class="t14500">alt</span>
          <span class="text-error">*</span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.image_alt"
        />
      </v-col>

      <v-col cols="12">
        <div class="text-right my-5">
          <span class="t14500">لینک</span>
          <span class="text-error">*</span>
        </div>
        <v-text-field
            placeholder="لینک تصویر را وارد نمایید"
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.link"/>

      </v-col>
      <v-col cols="12">
        <UploadFileSection @getImage="getImage"/>
        <div class="d-flex align-center mt-5" v-if="form.image_id">
          <span>IMG-{{ form.image_id }}</span>
          <span class="mr-15"><v-icon @click="removeItem(form.image_id)" color="error">mdi-delete</v-icon></span>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
<script >
import {defineAsyncComponent} from 'vue'
const UploadFileSection = defineAsyncComponent(()=> import('@/components/Public/UploadFileSection.vue'))
export default {
  props: {
    bestSelling: null,
  },

  data(){
    return{
      form:{
        label: null,
        priority: null,
        device: null,
        link: null,
        image_id: null,
        image_alt: null
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
  components:{
    UploadFileSection
  },

  methods:{
    removeItem(image_id) {
      this.form.image_id = image_id
    },

    /**
     * Get image id
     * @param {*} image
     */
    getImage(image){
      this.form.image_id = image.data.data.image_id
      this.form.imageUrl = image.data.data.url
    },

    setForm() {
      try {
        this.form.label = this.bestSelling.label
        this.form.priority = this.bestSelling.priority
        this.form.device = this.bestSelling.device
        this.form.image_alt = this.bestSelling.image_alt
        this.form.link = this.bestSelling.link
        this.form.image_id = this.bestSelling.image_id
      } catch (error) { }
    }
  },

  watch: {
    bestSelling() {
      this.setForm()
    }
  }
}
</script>