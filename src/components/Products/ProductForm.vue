<template>
  <v-form ref="addProduct"     class="create-product__info-form scroller" v-model="valid">
    <v-row justify="center" align="center" >
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
      <v-divider></v-divider>
      <v-col cols="12">
        اضافه کردن ویژگی و مقادیر ویژگی
        <v-btn @click="addAttribute" class="mx-4" color="success">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn @click="removeAttribute" class="mx-4" color="error">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" v-for="counter in attributeCounts" :key="counter">
        <v-row>
          <v-col cols="6">
            <v-autocomplete
                density="compact"
                variant="outlined"
                single-line
                v-model="form.selectedAttributes[counter-1].attribute_id"
                :items="attributes"
                item-title="label"
                item-value="id"
                @update:modelValue="getAttributeValues(form.selectedAttributes[counter-1].attribute_id,counter-1)"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="6" v-if="form.selectedAttributes[counter-1].attribute_id">
            <v-autocomplete
                density="compact"
                variant="outlined"
                single-line
                multiple
                v-model="form.selectedAttributes[counter-1].attribute_value_ids"
                :items="attributeValues[counter-1]"
                item-title="value"
                item-value="id"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="my-16"></v-col>

    </v-row>
  </v-form>
</template>

<script>
import ModalAddFile from '@/components/Public/ModalAddFile.vue'
import Categories from '@/composables/Categories';
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import {openConfirm} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  setup() {
    const {allCategories, getAllCategories} = Categories();
    return {allCategories, getAllCategories};
  },
  props: {
    type: '',
    product: ''
  },

  data() {
    return {
      attributes: [],
      attributeValues: [],
      attributeCounts: 1,
      valid: true,
      form: {
        selectedAttributes: [
          {attribute_id: null, attribute_value_ids: []}
        ],
        name: '',
        label: '',
        category: '',
        active: false,
        priority: 1,
        productImage: null
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

  computed: {
    dataCategoreis() {
      try {
        const categories = []
        this.allCategories.data.forEach(element => {
          const form = {
            title: element.label,
            value: element.id
          }
          categories.push(form)
        });
        return categories
      } catch (error) {
        return []
      }
    },
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },
  components: {
    UploadFileSection,
    ModalAddFile,
  },

  methods: {
    async getAttributeValues(attribute_id, index, type) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/attribute/crud/get/' + attribute_id
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.attributeValues.push([])
        this.attributeValues[index] = data.data.values
        if (type !== 'edit') {
          this.form.selectedAttributes[index].attribute_value_ids = []
        }
      }
    },
    async getAttributes() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/attribute/crud/index?per_page=10000'
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.attributes = data.data.data
      }
    },
    addAttribute() {
      this.attributeCounts++
      this.form.selectedAttributes[this.attributeCounts - 1] = {attribute_id: null, attribute_value_ids: []}
    },
    removeAttribute() {
      if (this.attributeCounts > 1) {
        this.attributeCounts--
        this.form.selectedAttributes.pop()
      }
    },
    removeItem(id) {
      this.imageId = id;
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
    },
    getProductImage(image) {
      this.form.productImage = image.data.data.image_id
    },


    setForm() {
      try {
        this.form.name = this.product.name
        this.form.label = this.product.label
        this.form.category = this.product.category_id
        this.form.priority = this.product.priority
        this.form.productImage = this.product.image_id
        this.attributeCounts = this.product.attributes.length

        this.product.attributes.forEach((attribute, index) => {
          this.getAttributeValues(attribute.attribute_id, index,'edit')
          this.form.selectedAttributes[index] = {
            attribute_id: attribute.attribute_id,
            attribute_value_ids: []
          }
          this.product.attribute_values.forEach((attributeValue, index2) => {
            if (this.form.selectedAttributes[index].attribute_id === attributeValue.attribute_id) {
              this.form.selectedAttributes[index].attribute_value_ids[index2] = attributeValue.attribute_value_id
            }
          })
        })
        if (this.product.is_active) this.form.active = true
        else this.form.active = false

      } catch (error) {
        console.log(error)
      }
    }
  },

  watch: {
    product(val) {
      this.setForm()
    },

    confirmModal(val) {
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
    this.getAttributes()
  }
}
</script>
