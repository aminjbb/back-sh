<template lang="">
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

                <div>
                    <v-row 
                        justify="end"
                        align="center" 
                        class="px-10"
                    >
                        <template 
                            v-for="(filter, index) in filterField" 
                            :key="index"
                        >
                            <!-- Text filds -->
                            <v-col 
                                v-if="filter.type === 'text'"
                                cols="4" 
                            >
                                <div class="t13300 text-right mb-1">{{filter.name}}</div>

                                <v-text-field 
                                    variant="outlined" 
                                    :placeholder="filter.name"
                                    :name="filter.value "
                                    v-model="values[index].value"
                                />
                            </v-col>

                            <!-- Auto complete fields -->
                            <template v-else-if="filter.type === 'auto-complete'">
                                <template v-if="filter.value !== 'category'">
                                    <v-col cols="4">
                                        <div class="t13300 text-right mb-1">{{filter.name}}</div>
                                      <v-autocomplete
                                          v-if="filter.value === 'product'"
                                          :items="productList"
                                          v-model='values[index].value'
                                          item-title="label"
                                          item-value="value"
                                          single-line
                                          clearable
                                          v-debounce:1s.unlock="searchProduct"
                                          variant="outlined"
                                      />
                                        <v-autocomplete
                                            v-if="filter.value === 'color'"
                                            :items="colorsList"
                                            v-model='values[index].value'
                                            item-title="label"
                                            item-value="value"
                                            single-line
                                            clearable
                                            variant="outlined"
                                        />  <v-autocomplete
                                            v-if="filter.value === 'group'"
                                            :items="skuGroupList"
                                            v-model='values[index].value'
                                            item-title="label"
                                            item-value="value"
                                            single-line
                                            clearable
                                            variant="outlined"
                                        />

                                        <v-autocomplete
                                            v-if="filter.value === 'brand'"
                                            :items="brandsList"
                                            v-model='values[index].value'
                                            item-title="label"
                                            item-value="value"
                                            single-line
                                            clearable
                                            variant="outlined"
                                        />
                                    </v-col>
                                </template>

                                <template v-else-if="!disableCategory">
                                    {{disableCategory}}
                                    <v-col cols="4">
                                        <div class="t13300 text-right mb-1">{{filter.name}}</div>

                                        <v-autocomplete
                                            v-if="filter.value === 'category'"
                                            :items="categoriesList"
                                            v-model='values[index].value'
                                            item-title="label"
                                            item-value="value"
                                            single-line
                                            clearable
                                            variant="outlined"
                                        />
                                    </v-col>
                                </template>
                            </template>

                            <!-- Select fields -->
                            <template v-else-if="filter.type === 'select'">
                                <v-col cols="4">
                                      <div class="t13300 text-right mb-1">{{filter.name}}</div>

                                      <v-select
                                          v-if="filter.value === 'active'"
                                          density="compact"
                                          variant="outlined"
                                          single-line
                                          item-title="label"
                                          item-value="value"
                                          :items="activeFilter"
                                          v-model="activeModel"
                                      />

                                      <v-select
                                          v-if="filter.value === 'sellable'"
                                          density="compact"
                                          variant="outlined"
                                          single-line
                                          item-title="label"
                                          item-value="value"
                                          :items="sellableFilter"
                                          v-model="sellableModal"
                                      />
                                </v-col>
                            </template>
                            
                            <!-- Date fields -->
                            <template v-else-if="filter.type === 'date'">
                                <v-col cols="4" class="mt-3">
                                    <div class="t13300 text-right mb-1">{{ filter.name }}</div>

                                    <div align="center" class="d-flex pb-5 align-center">
                                          <v-icon @click="DateFilter(filter.value)">mdi-close</v-icon>

                                          <date-picker
                                              v-if="filter.value === 'created_at'"
                                              range
                                              clearable
                                              class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                              format="jYYYY-jMM-jDD"
                                              display-format="jYYYY-jMM-jDD"
                                              v-model="createdAtModel"
                                              variant="outlined"
                                              :placeholder="filter.name"
                                          />

                                          <date-picker
                                              v-if="filter.value === 'updated_at'"
                                              range
                                              clearable
                                              class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                              format="jYYYY-jMM-jDD"
                                              display-format="jYYYY-jMM-jDD"
                                              v-model="updatedAtModel"
                                              variant="outlined"
                                              :placeholder="filter.name"
                                          />
                                    </div>
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

import { SkuPanelFilter } from '@/assets/js/filter_sku.js'
import { jalaliToGregorian } from '@/assets/js/functions'
import value from "@/composables/Export";
import Product from "@/composables/Product";

export default {
  setup(){
    const {product, loading, searchProduct } = Product()
    return {product, loading, searchProduct}
  },
  props: {
      filterField: [],
      path: '',
      brandsList:[],
      colorsList: [],
      categoriesList:[],
      disableCategory: false,
      skuGroupList:[],
      model:''
  },

  data() {
      return {
          dialog: false,
          active: false,
          values: [],
          originalData: [],
          filteredData: [],
          activeFilter: [
              {
                  label: 'همه',
                  value: '',
              },
              {
                  label: 'فعال',
                  value: '1',
              },
              {
                  label: 'غیرفعال',
                  value: '0',
              },
          ],
          sellableFilter: [
              {
                  label: 'همه',
                  value: '',
              },
              {
                  label: 'فعال',
                  value: '1',
              },
              {
                  label: 'غیرفعال',
                  value: '0',
              },
          ],
          activeModel: '',
          sellableModal: '',

          createdAtModel: null,
          updatedAtModel: null,
          gregorianCreateDate: [],
          gregorianUpdateDate: []
      }
  },

  computed: {
    productList() {
      try {
        const products = []
        this.product.data.forEach(element => {
          const form = {
            label: element.label,
            value: element.id
          }

          products.push(form)
        });
        return products
      } catch (error) {
        return []
      }
    },
    name() {
      try {
          const nameObject = this.values.find(element => element.name === 'name');
          return nameObject.value
      } catch (error) {
          return ''
      }
    },
    id() {
      try {
          const nameObject = this.values.find(element => element.name === 'id');
          return nameObject.value
      } catch (error) {
          return ''
      }
    },

    label() {
      try {
          const labelObject = this.values.find(element => element.name === 'label');
          return labelObject.value
      } catch (error) {
          return ''
      }
    },

    color() {
      try {
          const nameObject = this.values.find(element => element.name === 'color');
          return nameObject.value
      } catch (error) {
          return ''
      }
    },

    brand() {
      try {
          const labelObject = this.values.find(element => element.name === 'brand');
          return labelObject.value
      } catch (error) {
          return ''
      }
    },

    category() {
      try {
          const labelObject = this.values.find(element => element.name === 'category');
          return labelObject.value
      } catch (error) {
          return ''
      }
    },
    group() {
      try {
          const labelObject = this.values.find(element => element.name === 'group');
          return labelObject.value
      } catch (error) {
          return ''
      }
    },

    productValue() {
      try {
        const labelObject = this.values.find(element => element.name === 'product');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },

    createdAt() {
      if (this.createdAtModel) {
          if (this.createdAtModel[0] && !this.createdAtModel[1]) {
              const splitDate = this.createdAtModel[0].split('-')
              this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
              this.gregorianCreateDate[1] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
          }

          else if (this.createdAtModel[0] && this.createdAtModel[1]) {
              const splitDate = this.createdAtModel[0].split('-')
              const splitDateUp = this.createdAtModel[1].split('-')
              this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
            this.gregorianCreateDate[1] = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2])
          }
      }
      return this.gregorianCreateDate;
    },

    updatedAt() {
      if (this.updatedAtModel) {
          if (this.updatedAtModel[0] && !this.updatedAtModel[1]) {
              const splitDate = this.updatedAtModel[0].split('-')
              this.gregorianUpdateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
              this.gregorianUpdateDate[1] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
          }

          else if (this.updatedAtModel[0] && this.updatedAtModel[1]) {
              const splitDate = this.updatedAtModel[0].split('-')
              const splitDateUp = this.updatedAtModel[1].split('-')
              this.gregorianUpdateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
              this.gregorianUpdateDate[1] = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2])
          }
      }
      return this.gregorianUpdateDate;
    },
  },

  methods: {

    setFilter() {
      const filter = new SkuPanelFilter()

      if (this.id) {
          filter.id = this.id
      }
      else {
          filter.id = null
      }
      if (this.group) {
          filter.sku_group = this.group
      }
      else {
          filter.sku_group = null
      }
      if (this.name) {
          filter.name = this.name
      }
      else {
          filter.name = null
      }

      if (this.label) {
          filter.label = this.label
      }
      else if (this.$route.query.label) {
          filter.label = null
      }
      if (this.productValue) {

          filter.product = this.productValue
      }
      else if (this.$route.query.product) {
          filter.product = null
      }

      if (this.activeModel === '') {
          filter.active = null
      }
      else if (this.activeModel !== '') {
          filter.active = this.activeModel
      }
      else if (this.$route.query.is_active) {
          filter.active = this.$route.query.is_active
      }

      if (this.createdAt[0]) {
          filter.created_at_from_date = this.createdAt[0]
      }
      else {
          filter.created_at_from_date = null
      }

      if (this.createdAt[1]) {
          filter.created_at_to_date = this.createdAt[1]
      }
      else {
          filter.created_at_to_date = null
      }

      if (this.updatedAt[0]) {
          filter.updated_at_from_date = this.updatedAt[0]
      }
      else {
          filter.updated_at_from_date = null
      }

      if (this.updatedAt[1]) {
          filter.updated_at_to_date = this.updatedAt[1]
      }
      else {
          filter.updated_at_to_date = null
      }

      if (this.sellableModal === '') {
          filter.sellable = null
      }
      else if (this.sellableModal !== '') {
          filter.sellable = this.sellableModal
      }
      else if (this.$route.query.is_sellable) {
          filter.sellable = this.$route.query.is_sellable
      }

      if (this.color) {
          filter.color = this.color
      }
      else if (this.$route.query.color) {
          filter.color = ''
      }

      if (this.brand) {
          filter.brand = this.brand
      }
      else if (this.$route.query.brand) {
          filter.brand = ''
      }

      if (this.category) {
          filter.category = this.category
      }
      else if (this.$route.query.category) {
          filter.category = ''
      }


      filter.page = 1;
      filter.per_page = this.$route.query.per_page;
      this.$router.push('/' + this.path + '/' + filter.query_maker());
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
  },

  mounted() {
    this.filterField.forEach(el => {
        const form = {
            name: el.value,
            value: ''
        }
        this.values.push(form)
    })
  }
}
</script>