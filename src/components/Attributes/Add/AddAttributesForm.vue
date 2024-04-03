<template>
    <div class="vh-100">
        <v-card 
            class="ma-5 br-12 pa-10 position__relative" 
            min-height="600"
        >
            <AttributeForm 
                ref="AttributeForm" 
                type="create"
            />

            <AddAttributeValueForm
                ref="AddAttributeValueForm" 
                type="create"
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
                      افزودن ویژگی
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
import AttributeForm from '@/components/Attributes/AttributeForm.vue'
import AddAttributeValueForm from '@/components/Attributes/Add/AddAttributeValueForm.vue'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { openToast } from '@/assets/js/functions.js'

export default {
    components: {
        AttributeForm,
        AddAttributeValueForm
    },

    data() {
        return {
            loading: false,
        }
    },

    methods: {
        /**
         * Validate form
         */
        validate() {
          if ( this.$refs.AddAttributeValueForm.values !== null){
            this.$refs.AttributeForm.$refs.addAttribute.validate()
            setTimeout(() => {
              if (this.$refs.AttributeForm.valid) this.submitForm()
            }, 200);
          }
          else {
            openToast(this.$store , 'حتما یک مقدار ویژگی باید وارد کنید' , 'error')
          }

        },
        
        /**
         * Submit form 
         */
        async submitForm() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'product/attribute/crud/create'
            AxiosMethod.form = formdata

            formdata.append('name', this.$refs.AttributeForm.form.name)
            formdata.append('label', this.$refs.AttributeForm.form.label)
            formdata.append('priority', this.$refs.AttributeForm.form.priority)
            formdata.append('type', this.$refs.AttributeForm.form.nameType)
            this.$refs.AddAttributeValueForm.values.forEach((item) => {
                formdata.append('values[]', item);
            });
            if (this.$refs.AttributeForm.form.fillterable) formdata.append('is_filterable', 1)
            else formdata.append('is_filterable', 0)
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.$router.push('/attributes/index')
            }
            else {
                this.loading = false
            }
        },
    },

    computed: {
        /**
         * Get attribute value length
         */
        attrValueLength() {
            try {
                return this.values.size + 1
            } catch (error) {
                return 1
            }
        }
    }
}
</script>
