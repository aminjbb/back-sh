<template>
    <div>
        <v-form 
            ref="addCategory"
            v-model="valid"
        >
            <v-row
                justify="center"
                align="center"
                class="pa-5 px-15"
            >
                <v-col cols="12" md="6">
                    <div class="text-right my-5">
                        <span class="t14500">
                            اسم انگلیسی
                        </span>
                    </div>

                    <v-text-field
                        density="compact"
                        variant="outlined"
                        single-line
                        label="اسم انگلیسی"
                        :rules="englishRule"
                        v-model="form.name"
                    />
                </v-col>

                <v-col cols="12" md="6">
                    <div class="text-right my-5">
                        <span class="t14500">
                            اسم فارسی
                        </span>
                    </div>

                    <v-text-field
                        density="compact"
                        variant="outlined"
                        single-line
                        label="اسم فارسی"
                        :rules="persianRule"
                        v-model="form.label"
                    />
                </v-col>

                <v-col cols="12" md="6">
                    <div class="text-right my-5">
                        <span class="t14500">
                            دسته بندی مادر
                        </span>
                    </div>

                    <v-select
                        :items="parentCategory"
                        density="compact"
                        variant="outlined"
                        item-title="label"
                        item-value="id"
                        single-line
                        label="دسته بندی مادر"
                        v-model="form.category"
                    />
                </v-col>

                <v-col cols="12" md="6">
                    <div class="text-right my-5">
                        <span class="t14500">
                            اولویت
                        </span>
                    </div>

                    <v-text-field
                        type="number"
                        density="compact"
                        variant="outlined"
                        single-line
                        label="اولویت"
                        v-model="form.priority"
                        :rules="rule"
                    />
                </v-col>
               
                <v-col cols="12">
                    <UploadFileSection @getImage="getCategoryImage"/>
                  <div class="d-flex align-center mt-5" v-if="form.categoryImage">
                    <span>IMG-{{ form.categoryImage }}</span>
                    <span class="mr-15"><v-icon color="error" @click="removeItem(form.categoryImage)">mdi-delete</v-icon></span>
                  </div>
                </v-col>
            </v-row>

        </v-form> 
    </div>
</template>

<script>
//components
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
import {openConfirm} from "@/assets/js/functions";
export default {
    props: {
        type: '',
        category: {},
        parentCategory: [],
        imagesNumber:{
            type: Number,
            default: 1,
        }
    },

    data() {
        return {
            valid: true,
          imageId:null,
            form: {
                name: '',
                label: '',
                category: '',
                active: 0,
                priority: 1,
                imageValidation: 0,
                categoryImage:null
            },

            loading: false,
            rule: [v => !!v || 'این فیلد الزامی است'],
            persianRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                    /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
                    "فقط حروف فارسی ",
            ],
            englishRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) => !RegExp("[\u0600-\u06FF]").test(v) || "فقط حروف انگلیسی ",
            ],
            receivedImages:[],
        }
    },

    components: {
      UploadFileSection
    },

  computed:{
      confirmModal(){
        return this.$store.getters['get_confirmForm'].confirmModal
      }
  },

     methods: {
       removeItem(id) {
          this.imageId = id;
          openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
        },
      getCategoryImage(image){
        this.form.categoryImage = image.data.data.image_id
      },
        /**
         * Set form
         */
        setForm() {
            try {
                this.form.name = this.category.name
                this.form.label = this.category.label
                this.form.category = this.category.category_id
                this.form.priority = this.category.priority
                this.form.active = this.category.is_active
                this.form.categoryImage = this.category.image_id
            } catch (error) { }
        },

        handleModalSubmission(imagesArray) {
            if(this.receivedImages.length){
                this.form.images = [];
            }

            this.form.imageValidation = this.imagesNumber > imagesArray.length ? 0 : 1;
            this.form.images = imagesArray;
        }
    },

    watch: {
        category(val) {
            this.setForm()
        },

      confirmModal(val){
        if (!val) {
          if (localStorage.getItem('deleteObject') === 'done') {
            this.form.categoryImage = null
            localStorage.removeItem('deleteObject')
          }
        }
      },
    }
}
</script>
