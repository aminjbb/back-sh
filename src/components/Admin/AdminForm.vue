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

              <v-col cols="12" md="4">
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
                      :rules="emailRule"
                  />
              </v-col>
              <v-col cols="12" md="4">
                  <div class="text-right my-5">
                      <span class="t14500">
                          سطح دسترسی
                      </span>
                  </div>
                <v-autocomplete
                    density="compact"
                    variant="outlined"
                    single-line
                    label="سطح دسترسی"
                    :items="rolePermissionList"
                    :rules="rule"
                    v-model="form.rolePermission"
                    item-title="name"
                    item-value="id"

                />
              </v-col>
              <v-col cols="12" md="4">
                  <div class="text-right my-5">
                      <span class="t14500">
                          تاریخ تولد
                      </span>
                  </div>
                  <v-text-field
                      label="تاریخ تولد"
                      single-line
                      clearable
                      density="compact"
                      variant="outlined"
                      class="custom-input"
                      :rules="rule"
                      v-model="form.birthDate"
                  />
                <date-picker
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
                  single-line
                  clearable
                  density="compact"
                  variant="outlined"
                  type="password"
                  :rules="!admin ? rule : []"
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
                  :rules="!admin ? confirmPasswordRules : []"
                  v-model="form.repeatPassword"
              />
            </v-col>
          </v-row>
      </v-form>
  </div>
</template>
<script>
import { watch } from 'vue'
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import ModalUploaderAvatar from '@/components/Public/ModalUploaderAvatar.vue'
import {convertDateToJalai} from "@/assets/js/functions";
import RolePermission from '@/composables/RolePermission'
export default {
  setup(){
    const {
      allRolePermission,
      getAllRolePermission,
    } = new RolePermission()
    return {
      allRolePermission,
      getAllRolePermission
    }
  },
  props: {
    admin:null
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
        rolePermission:''
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
        (v) => !!v || "این فیلد الزامی است",
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

        this.form.fistName = this.admin.first_name
        this.form.lastName = this.admin.last_name
        this.form.phoneNumber = this.admin.phone_number
        this.form.email = this.admin.email
        this.form.rolePermission = this.admin.role_id
        this.form.birthDate =  convertDateToJalai(this.admin.birth_date , '-' , false)
        this.$store.commit('set_avatar' ,this.admin.avatar)
      } catch (error) { }
    }
  },
  watch: {
    admin(val) {
      this.setForm()
    }
  },
  computed:{
    rolePermissionList(){
      try {
        let rolePermissions = []
        this.allRolePermission.forEach(rolePermission =>{
          const form = {
            name : rolePermission.label,
            id : rolePermission.id
          }
          rolePermissions.push(form)
        })
        return rolePermissions
      }
      catch (e){

      }
    }
  },
  mounted() {
      this.getAllRolePermission()

  }
}
</script>
