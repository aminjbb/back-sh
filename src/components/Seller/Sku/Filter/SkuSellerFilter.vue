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
                        v-debounce="searchProduct"
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


                </v-col>
              </template>

              <!-- Date fields -->
              <template v-else-if="filter.type === 'date'">
                <v-col cols="4" class="mt-3">
                  <div class="t13300 text-right mb-1">{{ filter.name }}</div>

                  <v-text-field
                      v-model="values[index].value"
                      variant="outlined"
                      :placeholder="filter.name"
                      :class="`start-input${filter.value}`">

                  </v-text-field>
                  <date-picker
                      clearable
                      format="jYYYY-jMM-jDD"
                      display-format="jYYYY-jMM-jDD"
                      :custom-input="`.start-input${filter.value}`"
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
import value from "@/composables/Export";
import Product from "@/composables/Product";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {SkuSellerPanelFilter} from "@/assets/js/filter_sku_to_seller";

export default {
  components: {  datePicker: VuePersianDatetimePicker,},
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
    id() {
      try {
        const labelObject = this.values.find(element => element.name === 'id');
        return labelObject.value
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
    warehouse_stock_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'warehouse_stock_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    warehouse_stock_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'warehouse_stock_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    site_stock_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'site_stock_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    site_stock_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'site_stock_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    base_discount_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'base_discount_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    base_discount_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'base_discount_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    marketing_discount_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'marketing_discount_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    marketing_discount_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'marketing_discount_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    site_price_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'site_price_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    site_price_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'site_price_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    customer_price_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'customer_price_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    customer_price_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'customer_price_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    marketing_discount_start_time() {
      try {
        const labelObject = this.values.find(element => element.name === 'marketing_discount_start_time');
        const splitDate = labelObject.value.split('-')
        return jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
      } catch (error) {
        return ''
      }
    },
    marketing_discount_end_time() {
      try {
        const labelObject = this.values.find(element => element.name === 'marketing_discount_end_time');
        const splitDate = labelObject.value.split('-')
        return jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
      } catch (error) {
        return ''
      }
    },
    base_discount_start_time() {
      try {
        const labelObject = this.values.find(element => element.name === 'base_discount_start_time');
        const splitDate = labelObject.value.split('-')
        return jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
      } catch (error) {
        return ''
      }
    },
    base_discount_end_time() {
      try {
        const labelObject = this.values.find(element => element.name === 'base_discount_end_time');
        const splitDate = labelObject.value.split('-')
        return jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
      } catch (error) {
        return ''
      }
    },

  },

  methods: {

    setFilter() {
      const filter = new SkuSellerPanelFilter()
      filter.page = 1;
      if (this.id) {
        filter.id = this.id
      }
      else if (this.$route.query.id) {
        filter.id = null
      }
      if (this.label) {
        filter.sku = this.label
      }
      else if (this.$route.query.sku) {
        filter.label = null
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

      if (this.warehouse_stock_from) {
        filter.warehouse_stock_from = this.warehouse_stock_from
      }
      else {
        filter.inventory_stock_from = null
      }

      if (this.warehouse_stock_to) {
        filter.warehouse_stock_to = this.warehouse_stock_to
      }
      else {
        filter.warehouse_stock_to = null
      }

      if (this.site_stock_from) {
        filter.site_stock_from = this.site_stock_from
      }
      else {
        filter.site_stock_from = null
      }

      if (this.site_stock_to) {
        filter.site_stock_to = this.site_stock_to
      }
      else {
        filter.site_stock_to = null
      }


      if (this.base_discount_from) {
        filter.base_discount_from = this.base_discount_from
      }
      else {
        filter.base_discount_from = null
      }

      if (this.base_discount_to) {
        filter.base_discount_to = this.base_discount_to
      }
      else {
        filter.base_discount_to = null
      }
      if (this.marketing_discount_from) {
        filter.marketing_discount_from = this.marketing_discount_from
      }
      else {
        filter.marketing_discount_from = null
      }
      if (this.marketing_discount_to) {
        filter.marketing_discount_to = this.marketing_discount_to
      }
      else {
        filter.marketing_discount_to = null
      }
      if (this.site_price_from) {
        filter.site_price_from = this.site_price_from
      }
      else {
        filter.site_price_from = null
      }
      if (this.site_price_to) {
        filter.site_price_to = this.site_price_to
      }
      else {
        filter.site_price_to = null
      }
      if (this.customer_price_from) {
        filter.customer_price_from = this.customer_price_from
      }
      else {
        filter.customer_price_from = null
      }
      if (this.customer_price_to) {
        filter.customer_price_to = this.customer_price_to
      }
      else {
        filter.customer_price_to = null
      }
      if (this.marketing_discount_start_time) {
        filter.marketing_discount_start_time = this.marketing_discount_start_time
      }
      else {
        filter.marketing_discount_start_time = null
      }
      if (this.marketing_discount_end_time) {
        filter.marketing_discount_end_time = this.marketing_discount_end_time
      }
      else {
        filter.marketing_discount_end_time = null
      }
      if (this.base_discount_start_time) {
        filter.base_discount_start_time = this.base_discount_start_time
      }
      else {
        filter.base_discount_start_time = null
      }
      if (this.base_discount_end_time) {
        filter.base_discount_end_time = this.base_discount_end_time
      }
      else {
        filter.base_discount_end_time = null
      }

      filter.per_page = this.$route.query.per_page;
      this.$router.push('/' + this.path + '/' + filter.query_maker(this.$route.query));
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
        value: null
      }
      this.values.push(form)
    })
  }
}
</script>