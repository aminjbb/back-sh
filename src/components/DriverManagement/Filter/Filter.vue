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
  
               
  
                <!-- Select fields -->
                <template v-else-if="Filter.type === 'select'">
                  <v-col cols="4">
                    <div class="t13300 text-right mb-1">{{ Filter.name }}</div>
  
                  
  
  
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
                        range
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
  import {PanelFilter} from "@/assets/js/filter_driver.js";  
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
        filteredData: [],
      
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
      retail_id() {
        try {
          const labelObject = this.values.find(element => element.name === 'retail_id');
          return labelObject.value
        } catch (error) {
          return ''
        }
      },
      count_from() {
        try {
          const labelObject = this.values.find(element => element.name === 'count_from');
          return labelObject.value
        } catch (error) {
          return ''
        }
      },
      count_to() {
        try {
          const labelObject = this.values.find(element => element.name === 'count_to');
          return labelObject.value
        } catch (error) {
          return ''
        }
      },
      factor_id() {
        try {
          const labelObject = this.values.find(element => element.name === 'factor_id');
          return labelObject.value
        } catch (error) {
          return ''
        }
      },
      number_from() {
        try {
          const labelObject = this.values.find(element => element.name === 'number_from');
          return labelObject.value
        } catch (error) {
          return ''
        }
      },
      number_to() {
        try {
          const labelObject = this.values.find(element => element.name === 'number_to');
          return labelObject.value
        } catch (error) {
          return ''
        }
      },
      created_at() {
        try {
          const labelObject = this.values.find(element => element.name === 'created_at');
          return labelObject.value
        } catch (error) {
          return ''
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
  
      setFilter() {
        const Filter = new PanelFilter()
        if (this.factor_id) {
          Filter.factor_id = this.factor_id
        }
  
        if (this.retail_id) {
          Filter.id = this.retail_id
        }
        else {
          Filter.id = null
        }
  
       
  
       
  
       
        if (this.statusModel) {
          Filter.status = this.statusModel
        }
        else {
          Filter.status = null
        }
  
        Filter.page = 1;
        if (this.$route.query.per_page)   Filter.per_page = this.$route.query.per_page;
  
        this.$router.push('/' + this.path + '/' + Filter.query_maker());
        this.dialog = false;
      },
  
      removeAllFilters() {
        this.$router.push('/' + this.path);
        this.values = [];
  
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