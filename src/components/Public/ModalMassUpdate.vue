
<template>
  <div class="text-center">
    <v-dialog
        v-model="massUpdateModal"
        width="468"
    >
      <v-card>
        <v-row justify="center" align="center" class="pa-5">
          <v-col cols="3">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="9">
            <div class="text-left pl-15">
              <span class="t14500">
                    ویرایش گروهی
              </span>
            </div>
          </v-col>
        </v-row>

        <div class="mt-3 mb-8  px-5">
          <v-divider />
        </div>

        <div class="text-center my-5 mb-10">
          <v-btn
            :loading="uploadFileLoading"
            @click="selectFile()"
            width="166"
            color="primary500"
            rounded
          >
            <span class="t14300" >
                انتخاب فایل
            </span>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

export default {
  props: {
    updateUrl: ''
  },

  data() {
    return {
      label: '',
      active: false,
      templateLoading: false,
      uploadFileLoading:false
    }
  },

  methods: {
    /**
     * Upload file
     * @param {*} file 
     */
    async uploadFile(file) {
      this.uploadFileLoading = true
      const AxiosMethod = new AxiosCall()
      var formdata = new FormData();
      formdata.append('file', file)
      formdata.append('module', 'bulk')
      AxiosMethod.end_point = 'file-manager/direct/store'
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      let data = await AxiosMethod.axios_image_upload()
      if (data) {
        this.uploadFileLoading = false
        this.setFileUrl(data.data.data.url)
      }
      else {
        this.uploadFileLoading = false
      }
    },

    /**
     * Set file url
     * @param {*} file 
     */
    async setFileUrl(file) {
      this.templateLoading = true
      const AxiosMethod = new AxiosCall()
      var formdata = new FormData();
      formdata.append('file', file)

      AxiosMethod.end_point = this.updateUrl;
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form =formdata
      AxiosMethod.using_auth = true
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.templateLoading = false

        openToast(
            this.$store,
            data.message,
            "success"
        );
      }
      else {
        this.templateLoading = false
      }
    },

    /**
     * Select file
     */
    selectFile() {
      var input = document.createElement('input');
      input.type = 'file';
      input.onchange = e => {
        var file = e.target.files[0];
        this.uploadFile(file)
      }
      input.click();
    },
    close(){
      this.$store.commit('set_massUpdateModal' , false)
    }
  },

  computed:{
    massUpdateModal(){
      return this.$store.getters['get_massUpdateModal']
    }
  }
}
</script>

