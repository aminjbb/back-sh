<template>
  <div class="">

    <div class=" pointer" @click="dialog= true">
      <v-icon class="text-grey-darken-1">mdi-pencil-box-outline</v-icon>
      <span class="mr-2 text-grey-darken-1 t14300">ویرایش تکی</span>
    </div>

    <v-dialog v-model="dialog" width="468">
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14500">ویرایش تکی</span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5">
          <v-row justify="center" align="center">
            <v-col cols="12">
              <div class="t13300 text-right mb-2">کد ارسال قبلی</div>
              <v-text-field
                  variant="outlined"
                  v-model="form.old_barcode"
              />
            </v-col>
            <v-col cols="12">
              <div class="t13300 text-right mb-2">کد ارسال جدید</div>
              <v-text-field
                  variant="outlined"
                  v-model="form.new_barcode"
              />
            </v-col>
            <v-col cols="12">
              <div class="t13300 text-right mb-2">روش ارسال</div>
              <v-text-field
                  variant="outlined"
                  v-model="form.new_sending_method"
              />
            </v-col>
          </v-row>
        </div>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10">
          <v-btn
              width="80"
              @click="validate()"
              color="primary500"
              :loading="loading"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <btn
              class="mt-3 mr-2"
              @click="dialog = false"
              style="cursor: pointer;">
            انصراف
          </btn>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  name: "SingleEditModal",

  props: {
    deliveryItem: {},
  },

  data() {
    return {
      dialog: false,
      loading: false,

      form: {
        old_barcode: '',
        new_barcode: '',
        new_sending_method: ''
      },
    }
  },

  mounted () {
    this.setForm()
  },

  methods: {
   async validate() {

     try {
       this.loading = true
       var formData = new FormData();
       const AxiosMethod = new AxiosCall()
       AxiosMethod.end_point = 'admin/order/delivery/barcode/import'
         formData.append(`barcode_list[0][new_barcode]`, this.form.new_barcode)
         formData.append(`barcode_list[0][old_barcode]`, this.form.old_barcode)
         formData.append(`barcode_list[0][new_sending_method]`, this.form.new_sending_method)
       AxiosMethod.store = this.$store
       AxiosMethod.toast_error = true
       AxiosMethod.form = formData
       AxiosMethod.using_auth = true
       AxiosMethod.token = this.$cookies.get('adminToken')
       let data = await AxiosMethod.axios_post()
       if (data){
         this.loading = false
         this.dialog = false
         openToast(this.$store, 'آپدیت بارکد ها با موفقیت انجام شد', "success");
       }
       else{
         this.loading = false
       }
     }
     catch (e) {
       console.log(e)
       this.loading = false
     }
    },

    setForm(){
      try {
        this.form.old_barcode = this.deliveryItem.old_barcode
        this.form.new_barcode = this.deliveryItem.new_barcode
        this.form.new_sending_method = this.deliveryItem.new_sending_method
      } catch (error) {}
    }
  }
}
</script>

<style scoped>

</style>