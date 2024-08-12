<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <div class="h-100vh">
        <v-card
            class="ma-5 br--12 pa-10 position__relative"
            min-height="700"
        >
          <AttributeForm
              :attribute="attribute"
              ref="AttributeForm"
              type="update"
          />

          <AddAttributeValueForm
              ref="AddAttributeValueForm"
              :attributeId="attributeId"
              :attributeValues="attributeValues"
              type="update"
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
                <v-icon>mdi-pen</v-icon>
              </template>
              ویرایش ویژگی
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
    </v-main>
  </v-layout>


</template>

<script >
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

const AttributeForm = defineAsyncComponent(()=> import ('@/components/Attributes/AttributeForm.vue'))
const AddAttributeValueForm = defineAsyncComponent(()=> import ('@/components/Attributes/Add/AddAttributeValueForm.vue'))
import { AxiosCall } from '@/assets/js/axios_call.js'

export default {
  components: {
    AttributeForm,
    AddAttributeValueForm,
    DashboardLayout,
    Header
  },
  data() {
    return {
      loading: false,
      attribute: '',
      attributeId:null,
      attributeValues:[]
    }
  },

  methods: {
    /**
     * Validate form
     */
    validate() {
      this.$refs.AttributeForm.$refs.addAttribute.validate()
      setTimeout(() => {
        if (this.$refs.AttributeForm.valid) this.submitForm()
      }, 200);
    },

    /**
     * Submit form
     */
    async submitForm() {
      this.loading = true
      var formdata = new FormData();

      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/attribute/crud/update/' + this.$route.params.id
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
        this.$router.push('/attributes/index')
      }
      else {
        this.loading = false
      }
    },

    /**
     * Get attribute
     */
    async getAttribute() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/attribute/crud/get/' + this.$route.params.id
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.attribute = data.data
        this.attributeId = data.data.id
        this.attributeValues =data.data.values
      }
      else {
        this.loading = false
      }
    },
  },

  mounted(){
    this.getAttribute()
  },
}

</script>