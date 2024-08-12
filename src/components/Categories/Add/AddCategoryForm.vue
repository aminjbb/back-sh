<template >
    <div class="mh-100">
        <v-card 
            class="ma-5 br--12 position__relative"
            min-height="600"
        >
            <CategoryForm 
                ref="CategoryForm"
                type="create"
                :parent-category="allCategories.data"
            />
            <v-row 
                justify="end"
                class="position__absolute bottom left"
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
                      افزودن دسته بندی
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

        </v-card>
    </div>
</template>
<script>
//components
import CategoryForm from '@/components/Categories/CategoryForm.vue'

//mixins
import { AxiosCall } from '@/assets/js/axios_call.js'
import { openToast } from "@/assets/js/functions";
import Categories from '@/composables/Categories';
export default {
    components: {
        CategoryForm
    },

    data() {
        return {
            loading: false,
        }
    },

    setup() {
        const { allCategories, getAllCategories } = Categories();
        return { allCategories, getAllCategories };
    },

    mounted() {
        this.getAllCategories();
    },

    methods: {
        /**
         * Validate form
         */
        validate() {
          if (this.$refs.CategoryForm.form.categoryImage == null){
            openToast(this.$store, 'حتما باید عکس اضافه شود' , 'error')
          }
          else{
            this.$refs.CategoryForm.$refs.addCategory.validate()
            setTimeout(()=>{
              if (this.$refs.CategoryForm.valid) {
                this.submitForm()
              }
            }, 200)
          }
        },

        /**
         * Submit form
         */
        async submitForm() {
            this.loading = true
            var formdata = new FormData();

            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'category/crud/create'
            AxiosMethod.form = formdata
            formdata.append('name', this.$refs.CategoryForm.form.name)
            formdata.append('label', this.$refs.CategoryForm.form.label)
            formdata.append('image_id', this.$refs.CategoryForm.form.categoryImage)


            formdata.append('priority', this.$refs.CategoryForm.form.priority)

            if (this.$refs.CategoryForm.form.category) formdata.append('category_id', this.$refs.CategoryForm.form.category)

            if (this.$refs.CategoryForm.form.active) formdata.append('is_active', 1)
            else formdata.append('is_active', 0)

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')

            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.$router.push('/categories/index')
            }
            else {
                this.loading = false
            }
        }
    },
}
</script>
