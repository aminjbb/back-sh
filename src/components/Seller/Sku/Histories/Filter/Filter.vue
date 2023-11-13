<template>
  <div class="text-center c-modal-table-filter">
      <v-btn
          @click="openModal()"
          variant="outlined"
          rounded
          class="px-3 mt-1 mr-4">
          <template v-slot:prepend>
                        <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
            </template>
          فیلتر
          </v-btn>

      <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="1000">
      <v-card>
        <v-row
            justify="center"
            align="center"
            class="pa-5">
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
              justify="center"
              align="center"
              class="px-10 d--rtl">
            <template v-for="(filter, index) in filterField" :key="index">
              <v-col v-if="filter.type === 'text'" cols="6">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <v-text-field
                    variant="outlined"
                    :name="filter.value"
                    v-model="values[index].value" />
              </v-col>

              <v-col v-if="filter.type === 'number'" cols="6">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <v-text-field
                    v-if="filter.value == 'phone_number'"
                    variant="outlined"
                    :name="filter.value"
                    placeholder="برای مثال : ۰۹۱۲۱۱۱۱۱۱۱"
                    v-model="values[index].value" />

                <v-text-field
                    v-if="filter.value == 'phone'"
                    variant="outlined"
                    :name="filter.value"
                    placeholder="برای مثال : ۷۷۷۷۷۷۷۷-۰۲۱"
                    v-model="values[index].value" />

                <v-text-field
                    v-if="filter.value == 'identification_code'"
                    variant="outlined"
                    :name="filter.value"
                    v-model="values[index].value" />
              </v-col>

              <v-col v-else-if="filter.type === 'select'" cols="6">
                <div class="t13300 text-right mb-1">{{filter.name}}</div>

                <v-autocomplete
                    v-if="filter.value == 'state_id'"
                    :items="provinceList"
                    density="compact"
                    variant="outlined"
                    single-line
                    :rules="rule"
                    v-model="provinceModel"
                    @update:modelValue="getCities()" />

                <v-autocomplete
                    v-if="filter.value == 'city_id'"
                    :items="cityList"
                    density="compact"
                    variant="outlined"
                    single-line
                    :rules="rule"
                    v-model="cityModel" />

                <v-select
                    v-if="filter.value == 'type'"
                    density="compact"
                    variant="outlined"
                    single-line
                    item-title="label"
                    item-value="value"
                    :items="supplierTypeFilter"
                    v-model="supplierTypeModel" />

                <v-select
                    v-if="filter.value == 'payment_type'"
                    density="compact"
                    variant="outlined"
                    single-line
                    item-title="label"
                    item-value="value"
                    :items="paymentTypeFilter"
                    v-model="paymentTypeModel" />
              </v-col>
            </template>
          </v-row>
        </div>

        <div class="mt-3 mb-5 px-5">
          <v-divider />
        </div>

        <v-row
            justify="center"
            align="center"
            class="px-5 py-5">
          <v-col cols="6">
            <v-btn
                @click="removeAllFilters()"
                variant="text"
                height="40"
                rounded
                class="px-5 mt-1 mr-5">
              حذف همه فیلترها
            </v-btn>
          </v-col>

          <v-col cols="6">
            <div class="text-right">
              <v-btn
                  @click="setFilter()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-5 mt-1 mr-5">
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
import { SupplierPanelFilter } from '@/assets/js/filter_supplier.js'
import {AxiosCall} from "@/assets/js/axios_call";
import {SkuSellerPanelFilter} from "@/assets/js/filter_sku_to_seller";
import {jalaliToGregorian} from "@/assets/js/functions";

export default {
  props: {
    filterField: [],
    path: ''
  },

  data() {
    return {
      dialog: false,
      active: false,
      values: [],
      originalData: [],
      filteredData: [],
      provinces: [],
      cities: [],
      provinceModel:'',
      cityModel:'',

      paymentTypeFilter: [{
        label: 'همه',
        value: '',
      },
        {
          label: 'نقدی',
          value: 'cash',
        },
        {
          label: 'امانی',
          value: 'safekeeping',
        },
        {
          label: 'اعتباری',
          value: 'credit',
        }
      ],
      paymentTypeModel: '',

      supplierTypeFilter: [{
        label: 'همه',
        value: '',
      },
        {
          label: 'حقوقی',
          value: 'legal',
        },
        {
          label: 'حقیقی',
          value: 'genuine',
        },
      ],
      supplierTypeModel: '',
    }
  },

  computed: {
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
    created_at_from_date() {
      try {
        const labelObject = this.values.find(element => element.name === 'created_at_from_date');
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
      if (this.created_at_from_date) {
        filter.created_at_from_date = this.created_at_from_date
      }
      else {
        filter.created_at_from_date = null
      }

      filter.page = 1;

      if (this.$route.query.per_page) {
        filter.per_page = this.$route.query.per_page;
      }

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

  },

  mounted() {
    this.filterField.forEach(el => {
      const form = {
        name: el.value,
        value: ''
      }
      this.values.push(form)
    });
  }
}
</script>
