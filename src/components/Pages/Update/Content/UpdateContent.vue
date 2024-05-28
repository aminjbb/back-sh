<template>
  <div class="create-product flex-column d-flex vh-100">
    <v-card
        class="ma-5 br-12 pb-15 flex-grow-1"
        min-height="600"
    >
      <ContentForm
          :page="pageSingle"
          ref="ContentForm"
      />
      <footer class="create-warehouse__actions">
        <v-row
            justify="end"
            class="pl-10 pt-5"
        >
          <v-btn
              :loading="loading"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1"
          >
            تایید
          </v-btn>
        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import ContentForm from "@/components/Pages/Update/Content/ContentForm.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";
import Page from "@/composables/Page";

export default {
  setup(){
    const {pageSingle , getPage}  = new Page()
    return {pageSingle , getPage}
  },
  data() {
    return {
      loading: false,
    }
  },
  components: {ContentForm},
  methods:{
    validate(){

      if (!this.$refs.ContentForm.form.content){
        openToast(this.$store , 'محتوا را وارد کنید' , 'error')
      }
      else{
        this.updateContent()
      }
    },

    async updateContent(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point =`page/crud/update/content/${this.$route.params.pageId}`
      formData.append('content' , this.$refs.ContentForm.form.content)

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$router.push('/page/index')

      }
      else{
        this.loading=false
      }
    }
  },

  mounted() {
    this.getPage()
  }

}
</script>