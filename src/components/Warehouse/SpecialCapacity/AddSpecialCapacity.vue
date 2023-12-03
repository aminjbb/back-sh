<template>

  <v-form ref="addWarehouse"   class="create-product__info-form scroller"  v-model="valid">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <div class="text-center">
          <span class="t14500">ظرفیت ویژه</span>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="text-right my-5">
                      <span class="t14500 text-gray600">
                          تاریخ
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            placeholder="یک روز را انتخاب نمایید"
            :rules="rule"
            class="custom-input"
            v-model="form.date"
        />
        <date-picker
            :min="minDate"
            clearable
            custom-input=".custom-input"
            format="jYYYY-jMM-jDD"
            display-format="jYYYY-jMM-jDD"  v-model="form.date"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14500 text-gray600">
                        ظرفیت Market
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            placeholder="ظرفیت را به صورت عدد وارد نمایید"
            :rules="rule  "
            v-model="form.market"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14500 text-gray600">
                       ظرفیت Retail
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            placeholder="ظرفیت را به صورت عدد وارد نمایید"
            :rules="rule  "
            v-model="form.retail"
        />
      </v-col>
      <v-col cols="12" >
        <v-row justify="end" class="my-10">
          <v-btn
              @click="addSpecialCapacity()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1"
          >

            تایید
          </v-btn>
        </v-row>
      </v-col>

    </v-row>
    <v-col cols="12">
      <SpecialCapacityTable
          :header="SpecialCapacityHeader"
          :items="SpecialCapacityObject"
          deletePath="warehouse/storage/exception/crud/delete/"/>
    </v-col>
  </v-form>
</template>
<script>
import { watch } from 'vue'
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import ModalUploaderAvatar from '@/components/Public/ModalUploaderAvatar.vue'
import {convertDateToGregorian, convertDateToJalai, gregorian_to_jalali} from "@/assets/js/functions";
import {da} from "vuetify/locale";
import Warehouse from "@/composables/Warehouse";
import SpecialCapacityTable from '@/components/Warehouse/SpecialCapacity/SpecialCapacityTable.vue'
import Table from "@/components/Admin/AdminTable/AdminTable.vue";
import {AxiosCall} from "@/assets/js/axios_call";
export default {
  setup(){
    const {SpecialCapacityHeader} = new Warehouse()
    return {SpecialCapacityHeader}
  },


  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },
  props: {
    user:null
  },
  components: {
    Table,
    datePicker: VuePersianDatetimePicker,
    ModalUploaderAvatar,
    SpecialCapacityTable
  },

  data() {
    return {
      minDate:'',
      form: {
        date: '',
        market: '',
        retail:'',

      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
      SpecialCapacityObject:[]
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
    },

   async getSpecialCapacity(){
     const AxiosMethod = new AxiosCall()

     AxiosMethod.using_auth = true
     AxiosMethod.token = this.$cookies.get('adminToken')
     AxiosMethod.end_point = `warehouse/storage/exception/crud/index/${this.$route.params.warehouseId}`
     let data = await AxiosMethod.axios_get()
     if (data) {
       this.SpecialCapacityObject = data.data.data
     }
    } ,
    async addSpecialCapacity(){
      const date = convertDateToGregorian(this.form.date , '-' , false)
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      formData.append('date' , date)
      formData.append('market_storage_count', this.form.market)
      formData.append('retail_storage_count', this.form.retail)
     AxiosMethod.using_auth = true
     AxiosMethod.form = formData
     AxiosMethod.token = this.$cookies.get('adminToken')
     AxiosMethod.end_point = `warehouse/storage/exception/crud/create/${this.$route.params.warehouseId}`
     let data = await AxiosMethod.axios_post()
     if (data) {
       this.getSpecialCapacity()
     }
    }
  },
  watch: {
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getSpecialCapacity();
          this.$cookies.remove('deleteItem')
        }
      }
    },
  },
  mounted() {
    this.getSpecialCapacity()
    const date = new Date();
    let dateSplit = date.toISOString()
    dateSplit = dateSplit.split('T')
    const dateObject = dateSplit[0].split('-')
    this.minDate = gregorian_to_jalali(parseInt(dateObject[0]), parseInt(dateObject[1]), parseInt(dateObject[2]))
  }
}
</script>

<style>
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>
