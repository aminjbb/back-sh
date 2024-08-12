<template>
  <div class="create-product flex-column d-flex h-100vh">
    <v-card class="ma-5 br--12 pb-15 flex-grow-1" height="600">
      <ProductForm
          ref="ProductForm"
          type="create"
      />

      <footer class="create-warehouse__actions">
        <v-row
            justify="end"
            class="pa-5"
        >
          <v-btn
              :loading="loading"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1"
          >
            <template v-slot:prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            افزودن محصول
          </v-btn>

          <v-btn
              @click="$router.go(-1)"
              variant="outlined"
              height="40"
              rounded
              class="px-8 mt-1 mr-5"
          >
            <template v-slot:prepend>
              <v-icon>mdi-cancel</v-icon>
            </template>
            انصراف
          </v-btn>
        </v-row>
      </footer>
    </v-card>
  </div>
</template>
<script>

import ProductForm from '@/components/Products/ProductForm.vue'
import {AxiosCall} from '@/assets/js/axios_call.js'
import {openToast} from "@/assets/js/functions";

export default {
  components: {
    ProductForm
  },

  data() {
    return {
      loading: false,

    }
  },

  methods: {
    /**
     * validation fomr
     */
    validate() {
      if (this.$refs.ProductForm.form.productImage == null) {
        openToast(this.$store, 'حتما باید عکس اضافه شود', 'error')
      } else {
        this.$refs.ProductForm.$refs.addProduct.validate()
        if (this.$refs.ProductForm.valid) {
          this.submitForm()
        }
      }

    },

    /**
     * Submit form
     */
    async submitForm() {
      this.loading = true
      var formdata = new FormData();

      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/crud/create/'
      AxiosMethod.form = formdata
      this.$refs.ProductForm.form.selectedAttributes.forEach((element , index) =>{
        formdata.append('attributes[' + index + '][attribute_id]', element.attribute_id);
        const array = []
        this.$refs.ProductForm.form.selectedAttributes[index].attribute_value_ids.forEach(attrvalue=>{
          array.push(attrvalue)
        })
        array.forEach((arrayElement , i)=>{
          formdata.append('attributes[' + index + '][attribute_value_ids][' + i + ']', arrayElement);
        })
      })
      formdata.append('name', this.$refs.ProductForm.form.name)
      formdata.append('label', this.$refs.ProductForm.form.label)
      formdata.append('priority', this.$refs.ProductForm.form.priority)
      formdata.append('image_id', this.$refs.ProductForm.form.productImage)
      if (this.$refs.ProductForm.form.category) formdata.append('category_id', this.$refs.ProductForm.form.category)
      if (this.$refs.ProductForm.form.active) formdata.append('is_active', 1)
      else formdata.append('is_active', 0)
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      console.log(formdata)
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/product/index')
      } else {
        this.loading = false
      }
    }
  }
}
</script>
