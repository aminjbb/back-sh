<template>
    <div class="text-right">
        <v-btn 
            @click="dialog = true"
            variant="icon"
            rounded
            class="text-right mt-3"
        >
            <v-icon>mdi-plus</v-icon>
            <v-tooltip
                activator="parent"
                location="top"
                class="d--rtl"
            >
                افزودن مقدار جدید
            </v-tooltip>
        </v-btn>

        <v-dialog
            v-model="dialog"
            width="800"
        >
            <v-card>
                <v-row 
                    justify="center"
                    align="center"
                    class="pa-5"
                >
                    <v-col cols="5">
                        <v-btn @click="dialog = false" variant="icon">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                    
                    <v-col cols="7">
                        <div class="text-left pl-2">
                            <span class="t14500">
                                مقدار ویژگی ها
                            </span>
                        </div>
                    </v-col>
                </v-row>

                <div class="mt-3 mb-8 px-5">
                    <v-divider />
                </div>
                <div>
                    <AddAttributeValueForm
                        ref="AddAttributeValueForm"
                        :attributeId="attributeId"
                        :attributeValues="values"
                        type="update"
                        :skuType="skuType"

                    />
                </div>
                <v-row 
                    justify="start"
                    class="pa-10"
                >
                    <v-btn 
                        @click="attributeValuesEdit()"
                        variant="outlined"
                        height="40"
                        rounded
                        class="px-8 mt-1 mr-5"
                    >
                        ثبت
                    </v-btn>

                    <v-btn
                        @click="dialog = false"
                        variant="outlined"
                        height="40"
                        rounded
                        class="px-8 mt-1 mr-5"
                    >
                        بستن
                    </v-btn>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import AddAttributeValueForm from '@/components/Attributes/Add/AddAttributeValueForm.vue'
import { AxiosCall } from '@/assets/js/axios_call.js'
export default {
    props: {
        skuType:null,
        values: [],
        attributeId: null,
      index:null,
      attribute:'',
        getAttributes: { type: Function },
      getAttributeValues: { type: Function },
      getAllAttributes:{
        type:Function,
      }
    },

    data() {
        return {
            dialog: false,
        }
    },

    components: {
        AddAttributeValueForm
    },

    methods: {
        /**
         * Attribute values edit
         */
        async attributeValuesEdit() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'product/attribute/crud/update/values/' + this.attributeId
            AxiosMethod.form = formdata
            this.$refs.AddAttributeValueForm.values.forEach((item) => {
                formdata.append('values[]', item);
            });
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.dialog = false
              if (this.skuType === 'updateFromSku') {
                const valuesItem = []
                data.data.values.forEach(value =>{
                  const from = {
                    title : value.value,
                    id :value.id
                  }
                  valuesItem.push(from)
                })
                const newItem = {
                  title: data.data.label,
                  id: data.data.id,
                  values: valuesItem,
                }
                this.getAttributeValues(newItem, this.index , true)
              }
              else   this.getAttributes();
            }
            else {
                this.loading = false
            }
        }
    },
}
</script>
