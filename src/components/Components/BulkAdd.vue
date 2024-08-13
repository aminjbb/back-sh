<template>
  <div class="text-center">
    <div class="text-center">
      <v-btn
          :loading="templateLoading"
          @click="getTemplate()"
          width="166"
          variant="text"
      >
                        <span class="t14300 text-primary500">
                            دانلود فایل نمونه
                        </span>
      </v-btn>
    </div>

    <div class="text-center my-5 mb-10">
      <v-btn
          :loading="uploadFileLoading"
          @click="selectFile()"
          width="166"
          color="primary500"
          rounded
      >
                        <span class="t14300">
                            انتخاب فایل
                        </span>
      </v-btn>
    </div>
  </div>
</template>
<script>
import {AxiosCall} from '@/assets/js/axios_call.js'
import {openToast} from "@/assets/js/functions";

export default {
  props: {
    getEndPoint: '',
    uploadEndpoint: null,
    updateShps: {type: Function},
    isRetail: false,
    isVoucher: false,
    updateCondition: {type: Function},
    condition: null,
    type: null,
    dataForm: null,
    title:'افزودن گروهی',
    btnColor:'',
    btnVariant:'outlined',
    plusIcon : false,
    isSnap : false,
    headerTitle:{type:String , default:' افزودن گروهی'},
    dialog:{type:Boolean , default: false}
  },

  data() {
    return {
      categoryName: '',
      label: '',
      active: false,
      templateLoading: false,
      uploadFileLoading: false
    }
  },

  methods: {
    /**
     * Get template
     */
    async getTemplate() {
      this.templateLoading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = this.getEndPoint
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.using_auth = true
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.templateLoading = false
        window.open(data.data);
      } else {
        this.templateLoading = false
      }
    },

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
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_image_upload()
      if (data) {
        this.uploadFileLoading = false
        if (this.uploadEndpoint) this.setFileUrl(data.data.data.url)

        else if (this.isVoucher) {
          this.updateCondition(this.condition , data.data.data.url)
          this.dialog = false
        }


      } else {
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
      if(this.type== "voucher"){
        formdata.append(this.dataForm, file)
      }else {
        formdata.append('file', file)
      }


      AxiosMethod.end_point = this.uploadEndpoint;
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      AxiosMethod.store = this.$store
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_post()
      if (data) {
        if (this.isRetail) {
          this.updateShps(data.data.shps_list)
        }
        else if(this.isSnap) this.$emit('updateList' , data.data)

        this.templateLoading = false

        openToast(
            this.$store,
            data.message,
            "success"
        );
      } else {
        this.templateLoading = false
      }
    },

    /**
     * Select file
     */
    selectFile() {

      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('multiple', '')
      input.addEventListener('change', e => {
        var file = e.target.files[0];
        this.uploadFile(file)
      })
      input.click()

    }
  },
}
</script>
