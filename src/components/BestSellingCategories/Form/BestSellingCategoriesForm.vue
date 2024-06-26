<template>
  <v-form
      ref="addBanner"
      class="d--rtl "
      v-model="valid">
    <v-row justify="center" align="center" class="pa-15">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                   عنوان
                </span>
          <span class="text-error">
              *
            </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.name"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14500">
                   اولویت
                </span>
          <span class="text-error">
              *
            </span>
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
                <span class="t14500">
                   دستگاه
                </span>
          <span class="text-error">
              *
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

      <v-col cols="6">
        <div class="text-right my-5">
                <span class="t14500">
                  لینک
                </span>
          <span class="text-error">
              *
            </span>
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
        <div class="d-flex align-center mt-5" v-if="form.image">
          <span>IMG-{{ form.image }}</span>
          <span class="mr-15"><v-icon @click="removeItem(image)" color="error">mdi-delete</v-icon></span>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
<script >
import {defineAsyncComponent} from 'vue'
const UploadFileSection = defineAsyncComponent(()=> import('@/components/Public/UploadFileSection.vue'))
export default {
  data(){
    return{
      form:{
        name:null,
        priority:null,
        device:null,
        link:null,
        image:null
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
    removeItem(id) {
      this.form.image = ''
    },
    /**
     * Get image id
     * @param {*} image
     */
    getImage(image){
      this.form.image = image.data.data.image_id
      this.form.imageUrl = image.data.data.url
    },
  }
}
</script>