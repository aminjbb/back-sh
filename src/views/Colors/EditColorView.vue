

<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main>
      <Header/>
      <!--        <EditColorForm/>-->
      <div class="h-100vh">
        <v-card
            class="ma-5 br--12 pa-10 position__relative"
            min-height="600"
        >
          <ColorForm
              ref="ColorForm"
              :color="color"
              type="edit"
              :group-list="colorGroups"
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
              ویرایش رنگ
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

<script>
import {defineAsyncComponent} from "vue";
import ColorForm from "@/components/Colors/ColorForm.vue";
import Colors from "@/composables/Colors";
import {AxiosCall} from "@/assets/js/axios_call";
const EditColorForm = defineAsyncComponent(() => import ('@/components/Colors/Edit/EditColorForm.vue'))
const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))

export default {
  components:{
    Header,
    DashboardLayout,
    ColorForm
  },

  data() {
    return {
      loading: false,
      color:''
    }
  },

  setup() {
    const { colorGroups, getGroupColor } = Colors();
    return { colorGroups, getGroupColor};
  },

  mounted(){
    this.getColor();
    this.getGroupColor();
  },

  methods: {
    /**
     * Validate from
     */
    validate() {
      this.$refs.ColorForm.$refs.addColor.validate()
      setTimeout(() => {
        if (this.$refs.ColorForm.valid) this.submitForm()
      }, 200);

    },

    /**
     * Submit form
     */
    async submitForm() {
      this.loading = true
      var formdata = new FormData();

      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/color/crud/update/'+ this.$route.params.id
      AxiosMethod.form = formdata
      formdata.append('name', this.$refs.ColorForm.form.name)
      formdata.append('label', this.$refs.ColorForm.form.label)
      formdata.append('group', this.$refs.ColorForm.form.group)
      formdata.append('priority', this.$refs.ColorForm.form.priority)
      formdata.append('value', this.$refs.ColorForm.form.color)
      formdata.append('is_active', this.$refs.ColorForm.form.active)

      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.go(-1)
      }
      else {
        this.loading = false
      }
    },

    /**
     * Grt color
     */
    async getColor() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/color/crud/get/' + this.$route.params.id
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.color = data.data
      }

    }
  },
}
</script>
