<template>
    <v-form
      ref="addVoucher"
      class="create-product__info-form scroller"
      v-model="valid">
    <v-row justify="start" align="center">
      <v-col cols="12">
        <div class="text-center">
          <span class="t14500">ویرایش کد تخفیف</span>
        </div>
      </v-col>
      <v-col >
        <div class="text-right my-5">
                <span class="t14500 text-gray600">
                   عنوان *
                </span>
        </div>

        <v-text-field
            variant="outlined"
            :rules="rule"
            v-model="voucherForm.title"
            rounded="lg">

        </v-text-field>

      </v-col>

      <v-col cols="12" md="5">
        <div class="text-right my-5">
                      <span class="t14500">
                          تاریخ پایان
                      </span>
        </div>
        <v-text-field
            placeholder="روز و ساعت پایان"
            density="compact"
            variant="outlined"
            single-line
            class="end-date"
            :rules="rule"
            v-model="voucherForm.endTime" />
        <date-picker
            class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
            format="jYYYY-jMM-jDD HH:mm"
            display-format="jYYYY-jMM-jDD HH:mm"
            type="datetime"
            v-model="voucherForm.endTime"
            variant="outlined"
            placeholder="تاریخ تولد"
            custom-input=".end-date"
        />
      </v-col>




    </v-row>

  </v-form>
</template>


<script>

import {AxiosCall} from "@/assets/js/axios_call";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import {
  convertDateToJalai, openConfirm
} from "@/assets/js/functions";


export default {
  components: {
    ModalGroupAdd,
    datePicker: VuePersianDatetimePicker,
  },
  props: {
    voucherDetail:null
  },
  data() {
    return {
      voucherForm: {
        title: null,

        endTime:'',

      },



      rule: [v => !!v || 'این فیلد الزامی است'],
      englishRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) => RegExp("^[a-zA-Z0-9$@$!%*?&#^-_. +]+$").test(v) || "کد تخفیف قابل قبول نیست",
      ],
      valid: false,
      provinces:[]

    }
  },

  methods: {

    setForm() {
      try {
          this.voucherForm.title = this.voucherDetail.name

          if(this.voucherDetail.end_time_fa) {
              this.voucherForm.endTime = this.voucherDetail.end_time_fa
          }

/*      const endTime =  convertDateToJalai(this.voucherDetail.end_time , '-' , true)
        const endDateSplit = this.voucherDetail.end_time.split(' ')
        this.voucherForm.endTime =`${endTime} ${endDateSplit[1].slice(0,5)}`*/

      } catch (error) {
          console.log(error)
      }
    }

  },
  computed: {

  },
  watch: {
    voucherDetail(val){
      this.setForm()
    }

  },


}
</script>


<style>
</style>
