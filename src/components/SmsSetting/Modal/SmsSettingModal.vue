<template>
  <div>
    <div class="ma-5 pointer" @click="dialog= true">
      <v-icon class="text-grey-darken-1">mdi-pen-minus</v-icon>
      <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
    </div>

    <v-dialog v-model="dialog" width="auto">
      <template v-slot:default="{ isActive }">
        <v-card width="670" class="px-10 ">

          <div class="my-4">
            <v-icon @click="dialog=false" class="pointer align-center">mdi-close</v-icon>
            <div class="text-center t16 w700">
              ویرایش متن
            </div>
          </div>

          <v-divider/>

          <div class="my-4 py-5">
            <v-text-field
                variant="outlined"
                v-model="textForm"/>
          </div>

          <v-card-actions class="my-4">
            <v-row justify="space-between" no-gutters>
              <v-btn
                  :loading="loading"
                  @click="confirmed()"
                  height="40"
                  rounded
                  class= "bg-primary500 px-8 ">
                تایید
              </v-btn>
              <v-btn
                  @click="dialog = false"
                  variant="outlined"
                  height="40"
                  rounded
                  class="px-8 ">
                انصراف
              </v-btn>
            </v-row>
          </v-card-actions>

        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>

import {AxiosCall} from "@/assets/js/axios_call";
import SmsNotification from "@/composables/SmsNotification";

export default {
  name: "SmsSettingModal",

  props:{
    id: null,
    smsSettingData: {}
  },

  setup() {
    const {
      getSmsSettingList,
      smsSettingList,
    } = SmsNotification();
    return {
      getSmsSettingList,
      smsSettingList
    }
  },

  data() {
    return {
      dialog: false,
      textForm: '',
      loading: false,
    }
  },

  mounted() {
    this.setForm()
  },

  methods: {
    setForm() {
      try {
        this.textForm = this.smsSettingData.text
      } catch (error) { }
    },

    async confirmed() {
      try {
        this.loading = true
        let formdata = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'system/admin/sms/setting/crud/update/' + this.id
        if (this.smsSettingData.value) formdata.append('value', 1)
        else formdata.append('value', 0)
        formdata.append('text', this.textForm)
        AxiosMethod.store = this.$store
        AxiosMethod.form = formdata

        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()

      } catch (error) {
        this.loading = false
      }
    },
  }
}
</script>