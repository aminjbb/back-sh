<template>
  <div class="text-center c-modal-table-filter">
    <v-btn
        @click="openModal()"
        variant="outlined"
        rounded
        class="px-3 mt-1 mr-4"
    >
      <template v-slot:prepend>
        <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
      </template>
      فیلتر
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="1000"
    >
      <v-card>
        <v-row
            justify="center"
            align="center"
            class="pa-5"
        >
          <v-col cols="5">
            <v-btn @click="closeModal()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-10">
                              <span class="t14300">
                                  فیلتر
                              </span>
            </div>
          </v-col>
        </v-row>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d--rtl">
          <v-row
              justify="end"
              align="center"
              class="px-10"
          >
            <template
                v-for="(Filter, index) in filterField"
                :key="index"
            >
              <!-- Text filds -->
              <v-col
                  v-if="Filter.type === 'text'"
                  cols="4"
              >
                <div class="t13300 text-right mb-1">{{ Filter.name }}</div>

                <v-text-field
                    variant="outlined"
                    :placeholder="Filter.place"
                    :name="Filter.value "
                    v-model="values[index].value"
                />
              </v-col>

              <!-- Auto complete fields -->
              <template v-else-if="Filter.type === 'auto-complete'">
                <v-col cols="4">
                  <div class="t13300 text-right mb-1">{{ Filter.name }}</div>
                  <v-autocomplete
                      v-if="Filter.value === 'admin'"
                      :items="adminList"
                      v-model='admin'
                      item-title="label"
                      item-value="value"
                      single-line
                      no-data-text="لطفا ادمین را جستجو کنید"
                      clearable
                      v-debounce="searchAdmin"
                      variant="outlined"
                  />
                  <v-autocomplete
                      v-if="Filter.value === 'user_id'"
                      placeholder="شماره تلفن کاربر را وارد کنید"
                      variant="outlined"
                      prepend-inner-icon-cb="mdi-map-marker"
                      rounded="lg"
                      v-model="user_id"
                      :items="userList"
                      item-title="name"
                      item-value="value"
                      v-debounce="searchUser">

                  </v-autocomplete>
                </v-col>

              </template>



              <!-- Select fields -->
              <template v-else-if="Filter.type === 'select'">
                <v-col cols="4">
                  <div class="t13300 text-right mb-1">{{ Filter.name }}</div>

                  <v-select
                      v-if="Filter.value === 'status'"
                      density="compact"
                      variant="outlined"
                      single-line
                      item-title="label"
                      item-value="value"
                      :items="statusItems"
                      v-model="statusModel"
                  />


                </v-col>
              </template>


              <!-- Date fields -->
              <template v-else-if="Filter.type === 'date'">
                <v-col cols="4" class="mt-3">
                  <div class="t13300 text-right mb-1">{{ Filter.name }}</div>

                  <v-text-field
                      v-model="values[index].value"
                      variant="outlined"
                      :placeholder="Filter.name"
                      :class="`start-input${Filter.value}`">

                  </v-text-field>
                  <date-picker
                      clearable
                      format="jYYYY-jMM-jDD"
                      display-format="jYYYY-jMM-jDD"
                      :custom-input="`.start-input${Filter.value}`"
                      v-model="values[index].value" />
                </v-col>
              </template>
            </template>
          </v-row>
        </div>

        <div class="mt-3 mb-5 px-5">
          <v-divider />
        </div>

        <v-row
            justify="center"
            align="center"
            class="px-5 pb-2"
        >
          <v-col cols="6">
            <v-btn
                @click="removeAllFilters()"
                variant="text" height="40"
                rounded
                class="px-5 mt-1 mr-5"
            >
              حذف همه فیلترها
            </v-btn>
          </v-col>

          <v-col cols="6">
            <div class="text-right" >
              <v-btn
                  @click="setFilter()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-5 mt-1 mr-5"
              >
                مشاهده
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import { jalaliToGregorian } from '@/assets/js/functions'

import Product from "@/composables/Product";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {AxiosCall} from "@/assets/js/axios_call";
import {PanelFilter} from "../../../assets/js/filter_deposit_request";

export default {
  components: {  datePicker: VuePersianDatetimePicker,},
  setup(){
    const {product, loading, searchProduct } = Product()
    return {product, loading, searchProduct}
  },
  props: {
    filterField: [],
    path: '',
    model:''
  },

  data() {
    return {
      dialog: false,
      active: false,
      values: [],
      originalData: [],
      userSearchList:[],
      filteredData: [],
      user:null,
      statusItems: [
        {
          label: 'در انتظار',
          value: 'pending',
        },
        {
          label: 'در حال بررسی',
          value: 'in_review',
        },
        {
          label: 'رد شده',
          value: 'rejected',
        }
      ],
      admin:'',
      admins:[],
      statusModel: '',

      createdAtModel: null,
      updatedAtModel: null,
      gregorianCreateDate: [],
      gregorianUpdateDate: []
    }
  },

  computed: {
    userList(){
      try {
        let users = []
        this.userSearchList.forEach(user => {
          const form = {
            name: user?.first_name + ' ' +user?.last_name + '(' + user.phone_number + ')',
            value: user
          }
          users.push(form)
        })
        return users
      } catch (e) {
        return e
      }
    },
    user_id() {
      try {
        const labelObject = this.values.find(element => element.name === 'user_id');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },

    phone_number() {
      try {
        const labelObject = this.values.find(element => element.name === 'phone_number');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    card_number() {
      try {
        const labelObject = this.values.find(element => element.name === 'card_number');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    admin() {
      try {
        const labelObject = this.values.find(element => element.name === 'admin');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    amount_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'amount_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    amount_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'amount_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    value_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'value_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    value_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'value_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    adminList(){
      try {
        const admins = []
        this.admins.forEach(admin =>{
          const form = {
            label : admin.first_name + ' ' + admin.last_name,
            value : admin.id
          }
          admins.push(form)
        })
        return admins
      }
      catch (e){
        return []
      }
    },
    created_at_from() {
      try {
        const splitDate = this.created_at[0].split('-')
        return jalaliToGregorian(parseInt(splitDate[0]), parseInt(splitDate[1]), parseInt(splitDate[2]))
      } catch (error) {
        return ''
      }
    },
    created_at_to() {
      try {
        const splitDate = this.created_at[1].split('-')
        return jalaliToGregorian(parseInt(splitDate[0]), parseInt(splitDate[1]), parseInt(splitDate[2]))
      } catch (error) {
        return ''
      }
    },

  },

  methods: {
    async searchUser(search) {
      this.skuSearchList = []
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `user/crud/index?phone_number=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.userSearchList = data.data.data
      }
    },

    setFilter() {
      const Filter = new PanelFilter()
      if (this.user_id) {
        Filter.user_id = this.user_id
      }
      else {
        Filter.user_id = null
      }
      console.log(this.phone_number)
      if (this.phone_number) {
        Filter.phone_number = this.phone_number
      }
      else {
        Filter.phone_number = null
      }

      if (this.card_number) {
        Filter.card_number = this.card_number
      }
      else {
        Filter.card_number = null
      }

      if (this.amount_to) {
        Filter.amount_to = this.amount_to
      }
      else {
        Filter.amount_to = null
      }

      if (this.amount_from) {
        Filter.amount_from = this.amount_from
      }
      else {
        Filter.amount_from = null
      }

      if (this.value_to) {
        Filter.value_to = this.value_to
      }
      else {
        Filter.value_to = null
      }
      if (this.value_from) {
        Filter.value_from = this.value_from
      }
      else {
        Filter.value_from = null
      }

      Filter.page = 1;
      if (this.$route.query.per_page)   Filter.per_page = this.$route.query.per_page;
      this.$router.push('/' + this.path + '/' + Filter.query_maker());
      this.dialog = false;
    },

    removeAllFilters() {
      this.$router.push('/' + this.path);
      this.values = [];
      this.statusModel = ''
      this.filterField.forEach(el => {
        const form = {
          name: el.value,
          value: ''
        }

        this.values.push(form)
        this.dialog = false;
      })
    },

    openModal() {
      this.dialog = true;
    },

    closeModal() {
      this.dialog = false;
    },

    DateFilter(value) {
      if (value === 'created_at') {
        this.createdAtModel = [];
        this.gregorianCreateDate = [];
      } else if (value === 'updated_at') {
        this.updatedAtModel = [];
        this.gregorianUpdateDate = [];
      }
    },
    async searchAdmin(e){
      const form = {
        first_name:e
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `admin/crud/index/`
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.form = form
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.loading=false
        this.admins = data.data.data
      }
      else{
        this.loading=false
      }
    }
  },

  mounted() {
    this.filterField.forEach(el => {
      const form = {
        name: el.value,
        value: null
      }
      this.values.push(form)
    })
  }
}
</script>