

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
<!--    <AddColorForm/>-->
      <div class="h-100vh">
        <v-card
            class="ma-5 br--12 pa-10 position__relative"
            min-height="600"
        >
          <ColorForm
              ref="ColorForm"
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
                <v-icon>mdi-plus</v-icon>
              </template>
              افزودن رنگ
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
const AddColorForm = defineAsyncComponent(()=> import ('@/components/Colors/Add/AddColorForm.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  components:{
    ColorForm,
    DashboardLayout,
    Header
  },

  data() {
    return {
      loading: false,
    }
  },

  setup() {
    const { colorGroups, getGroupColor } = Colors();
    return { colorGroups, getGroupColor};
  },

  mounted(){
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
     * Submite From
     */
    async submitForm() {
      this.loading = true
      var formdata = new FormData();

      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/color/crud/create'
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
        this.$router.push('/color/index')
      }
      else {
        this.loading = false
      }
    }
  }
}
</script>
