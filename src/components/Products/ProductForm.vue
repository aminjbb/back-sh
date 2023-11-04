<template >
    <div>
        <v-form ref="addProduct" v-model="valid">
            <v-row justify="center" align="center" class="pa-5 px-15 mx-15">
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
                    <v-autocomplete
                        :items="dataCategoreis"
                        density="compact"
                        variant="outlined"
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
                <UploadFileSection @getImage="getProductImage"/>
                <div class="d-flex align-center mt-5" v-if="form.productImage">
                  <span>IMG-{{ form.productImage }}</span>
                  <span class="mr-15"><v-icon color="error" @click="removeItem(form.productImage)">mdi-delete</v-icon></span>
                </div>
              </v-col>
            </v-row>
        </v-form> 
    </div>
</template>
<script>
import ModalAddFile from '@/components/Public/ModalAddFile.vue'
import Categories from '@/composables/Categories';
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import {openConfirm} from "@/assets/js/functions";
export default {
    setup(props) {
        const { allCategories, getAllCategories } = Categories();
        return {allCategories, getAllCategories };
    },
    props:{
        type:'',
        product:''
    },

    computed:{
        dataCategoreis(){
            try {
                const categories = []
                this.allCategories.data.forEach(element => {
                    const form = {
                        title : element.label,
                        value : element.id
                    }
                    categories.push(form)
                });
              return  categories
            } catch (error) {
                return []
            }
        },
      confirmModal(){
        return this.$store.getters['get_confirmForm'].confirmModal
      }
    },
    components: {
      UploadFileSection,
        ModalAddFile,
    },

    methods:{
      removeItem(id) {
        this.imageId = id;
        openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
      },
      getProductImage(image){
        this.form.productImage = image.data.data.image_id
      },


        setForm(){
            try {
                this.form.name = this.product.name
                this.form.label = this.product.label
                this.form.category = this.product.category_id
                this.form.priority = this.product.priority
                this.form.productImage = this.product.image_id
                if(this.product.is_active) this.form.active = true
                else this.form.active = false

            } catch (error) {
                
            }
        }
    },
    data() {
        return {
            valid: true,
            form: {
                name: '',
                label: '',
                category: '',
                active: false,
                priority: 1,
                productImage:null
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
        }
    },

    watch:{
        product(val){
            this.setForm()
        },

      confirmModal(val){
        if (!val) {
          if (localStorage.getItem('deleteObject') === 'done') {
            this.form.productImage = null
            localStorage.removeItem('deleteObject')
          }
        }
      },
    },
    mounted() {
      this.getAllCategories()
    }
}
</script>
