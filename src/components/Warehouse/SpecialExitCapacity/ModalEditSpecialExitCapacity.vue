<template>
  <div class="text-right ">
    <v-btn
        @click="dialog = true"
        rounded
        variant="text"
        class="px-8 mt-1"
        color="success">
      <span>
        <v-icon>
          mdi-pen
        </v-icon>
      </span>
    </v-btn>
    <v-dialog v-model="dialog" width="500">
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="pa-1 my-2">
          <v-col class="mx-10" cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7" class="t16400 ">
            ویرایش
          </v-col>
        </v-row>
        <v-divider/>
        <v-row justify="center" class="my-10">
          <v-col cols="12" class="px-15">
            <div class="text-right my-5">
                      <span class="t14500 text-gray600">
                        ظرفیت ویژه خروج
                      </span>
            </div>
          <v-form ref="editSpecialExitCapacity" v-model="valid">
            <v-text-field
                density="compact"
                variant="outlined"
                type="number"
                single-line
                placeholder="ظرفیت را به صورت عدد وارد نمایید"
                :rules="rule  "
                v-model="form.capacity"
            />
          </v-form>
          </v-col>
          <v-col cols="12">
            <div class="pa-4 d-flex justify-center">
              <v-btn
                  @click="validate()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 ma-1 "
              >
                تایید
              </v-btn>
              <v-btn
                  @click="dialog = false"
                  height="40"
                  rounded
                  variant="outlined"
                  class="px-8 mt-1"
              >
                انصراف
              </v-btn>

            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  props:{
    /** special id row **/
    id:null,
    /** capacity row **/
    capacity:null
  },
  data(){
    return {
      valid:true,
      rule: [v => !!v || 'این فیلد الزامی است'],
      dialog:false,
      form:{
        capacity:null
      }
    }
  },

  methods: {
    async validate(){
      await this.$refs.addWarehouseExitCapacity.validate()
      if (this.valid) await this.addExitSpecialCapacity()
      this.loading = false
    },
    async addExitSpecialCapacity(){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/print/barcode/${this.shipmentId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.detail = data.data
        this.dialog = true
      }
    },

  },

  mounted() {
    this.form.capacity = this.capacity
  }
}
</script>
