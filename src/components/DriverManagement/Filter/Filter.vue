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

          <div>
                <v-row
                    justify="start"
                    align="center"
                    class="px-10 d--rtl">
                    <template v-for="(filter, index) in filterField" :key="index">
                        <v-col v-if="filter.type === 'text'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                variant="outlined"
                                :name="filter.value"
                                v-model="values[index].value" />
                        </v-col>

                        

                       
                    </template>
                </v-row>
            </div>

          
          
          <div class="d--rtl">
            <v-row
                justify="end"
                align="center"
                class="px-10"
            >
            
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
  

  import Product from "@/composables/Product";
  import {DriverFilter} from "@/assets/js/filter_driver.js"; 
  export default {
    components: { },
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
        
        filteredData: [],
      
       
  
        createdAtModel: null,
        updatedAtModel: null,
        gregorianCreateDate: [],
        gregorianUpdateDate: []
      }
    },
  
    computed: {
      full_name() {
        try {
          const labelObject = this.values.find(element => element.name === 'full_name');
          return labelObject.value
        } catch (error) {
          return ''
        }
      },
     
      identification_code() {
        try {
          const labelObject = this.values.find(element => element.name === 'identification_code');
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
  
    },
  
    methods: {
  
      setFilter() {
        const Filter = new DriverFilter()
        if (this.full_name) {
          Filter.full_name = this.full_name
        }
  
        if (this.identification_code) {
          Filter.identification_code = this.identification_code
        }
        else {
          Filter.id = null
        }
       
        if (this.phone_number) {
          Filter.phone_number = this.phone_number
        }
        else {
          Filter.phone_number = null
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