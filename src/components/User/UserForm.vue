<template>
  <div>
    <v-form ref="addForm" v-model="valid">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <div class="d-flex justify-center">

            <ModalUploaderAvatar :getAvatar="getAvatar" ref="ModalUploaderAvatar"/>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-right my-5">
                      <span class="t14500">
                          نام
                      </span>
          </div>
          <v-text-field
              density="compact"
              variant="outlined"
              single-line
              label="نام"
              :rules="persianRule"
              v-model="form.fistName"
          />
        </v-col>

        <v-col cols="12" md="4">
          <div class="text-right my-5">
                      <span class="t14500">
                          نام خانوادگی
                      </span>
          </div>
          <v-text-field
              density="compact"
              variant="outlined"
              single-line
              label="نام خانوادگی"
              :rules="persianRule"
              v-model="form.lastName"
          />
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-right my-5">
                      <span class="t14500">
                         شماره موبایل
                      </span>
          </div>
          <v-text-field
              density="compact"
              variant="outlined"
              single-line
              label="شماره موبایل"
              :rules="mobileRule"
              v-model="form.phoneNumber"
          />
        </v-col>

        <v-col cols="12" md="5">
          <div class="text-right my-5">
                      <span class="t14500">
                          ایمیل
                      </span>
          </div>
          <v-text-field
              label="ایمیل"
              single-line
              clearable
              density="compact"
              variant="outlined"
              v-model="form.email"
          />
        </v-col>
        <v-col cols="12" md="5">
          <div class="text-right my-5">
                      <span class="t14500">
                          تاریخ تولد
                      </span>
          </div>
          <v-text-field
              label="تاریخ تولد"
              single-line
              name="create-user-date"
              clearable
              density="compact"
              variant="outlined"
              class="custom-input"
              :rules="rule"
              v-model="form.birthDate"
          />
          <date-picker
              name="create-user-date"
              class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
              format="jYYYY-jMM-jDD"
              display-format="jYYYY-jMM-jDD"
              v-model="form.birthDate"
              variant="outlined"
              placeholder="تاریخ تولد"
              custom-input=".custom-input"
          />
        </v-col>

        <v-col cols="12" md="5">
          <div class="text-right my-5">
                      <span class="t14500">
                          گذر واژه
                      </span>
          </div>
          <v-text-field
              label="گذر واژه"
              name="create-user-password"
              single-line
              clearable
              density="compact"
              variant="outlined"
              type="password"
              :rules="!user ? rule : []"
              v-model="form.password"
          />
        </v-col>
        <v-col cols="12" md="5">
          <div class="text-right my-5">
                      <span class="t14500">
                          تکرار گذر واژه
                      </span>
          </div>
          <v-text-field
              label="تکرار گذر واژه"
              single-line
              clearable
              density="compact"
              variant="outlined"
              type="password"
              :rules="!user ? confirmPasswordRules : []"
              v-model="form.repeatPassword"
          />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import ModalUploaderAvatar from '@/components/Public/ModalUploaderAvatar.vue'
import {convertDateToJalai} from "@/assets/js/functions";
export default {

  props: {
    user:null
  },
  components: {
    datePicker: VuePersianDatetimePicker,
    ModalUploaderAvatar
  },

  data() {
    return {
      form: {
        fistName: '',
        lastName: '',
        phoneNumber:'',
        email:'',
        birthDate:'',
        password:'',
        repeatPassword:'',
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
      persianRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) =>
            /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
            "فقط حروف فارسی ",
      ],
      mobileRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) =>
            /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
                v
            ) || "شماره موبایل معتبر نیست",
      ],
      emailRule: [
        (v) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                v
            ) || " ایمیل معتبر نیست",
      ],
      confirmPasswordRules: [
        (value) => !!value || "این فیلد الزامی است",
        (value) => value === this.form.password || "تکرار رمز صحیح نیست. لطفا مجدد رمز خود را وارد کنید.",
      ],
    }
  },

  methods: {
    /**
     * Get image id
     * @param {*} url
     */
    getAvatar(url) {
      this.form.avatar = url
    },

    /**
     * Set from
     */
    setForm() {
      try {

        this.form.fistName = this.user.first_name
        this.form.lastName = this.user.last_name
        this.form.phoneNumber = this.user.phone_number
        this.form.email = this.user.email
        this.form.birthDate =  convertDateToJalai(this.user.birth_date , '-' , false)
        this.$store.commit('set_avatar' ,this.user.avatar)
      } catch (error) { }
    }
  },
  watch: {
    user(val) {
      this.setForm()
    }
  },

}
</script>
