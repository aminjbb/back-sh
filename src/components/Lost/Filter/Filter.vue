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
        <header class="modal__header d-flex justify-center align-center">
                <span class="t16400 pa-6">
                    فیلتر پیشرفته
                </span>

          <v-btn
              class="modal__header__btn"
              @click="closeModal()"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div>
          <v-row
              justify="center"
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

              <v-col v-else-if="filter.type === 'select'" cols="4">
                <div class="t13300 text-right mb-1">{{filter.name}}</div>
                <v-autocomplete
                    v-if="filter.value === 'supplier_id'"
                    density="compact"
                    variant="outlined"
                    single-line
                    :items="dataSupplier"
                    v-model="supplierModel"
                    item-title="label"
                    item-value="value" />

                <v-autocomplete
                    v-if="filter.value === 'creator_id'"
                    density="compact"
                    variant="outlined"
                    single-line
                    :items="dataCreator"
                    v-model="creatorModel"
                    item-title="label"
                    item-value="value" />

                <v-select
                    v-if="filter.value === 'package_type'"
                    density="compact"
                    variant="outlined"
                    single-line
                    item-title="label"
                    item-value="value"
                    :items="packageTypes"
                    v-model="packageType" />

                <v-select
                    v-if="filter.value === 'shipment_type'"
                    density="compact"
                    variant="outlined"
                    single-line
                    item-title="label"
                    item-value="value"
                    :items="shipmentTypes"
                    v-model="shipmentType" />
              </v-col>

              <v-col
                  cols="4"
                  v-else-if=" filter.value === 'date'"
                  class="mt-3">
                <div class="t13300 text-right mb-1">{{filter.name}}</div>
                <div align="center" class="d-flex pb-5 align-center">
                  <date-picker
                      range
                      clearable
                      class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                      format="jYYYY-jMM-jDD"
                      display-format="jYYYY-jMM-jDD"
                      v-model="createdAtModel"
                      variant="outlined" />

                  <v-icon @click="createdAtModel= [] ;gregorianCreateDate =[]">mdi-close</v-icon>
                </div>
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
              حذف فیلترها
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
                اعمال تغییرات
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  PanelFilter
} from '@/assets/js/filter_lost.js'
import {
  AxiosCall
} from "@/assets/js/axios_call";

import {
  jalaliToGregorian
} from '@/assets/js/functions'

import Admin from "@/composables/Admin";
import Supplier from "@/composables/Supplier";

export default {
  props: {
    filterField: [],
    path: ''
  },

  data() {
    return {
      dialog: false,
      values: [],
      originalData: [],
      filteredData: [],
      createdAtModel: null,
      gregorianCreateDate: [],
      creatorModel: '',
      supplierModel: '',
      packageTypes: [{
        label: 'پالت',
        value: 'pallet'
      },
        {
          label: 'بالک',
          value: 'bulk'
        },

      ],
      shipmentTypes: [{
        label: 'کراس داک فروشندگان',
        value: 'cross_dock_marketplace'
      },
        {
          label: 'محموله های شاواز',
          value: 'consignment_shavaz'
        },{
          label: 'محموله های فروشندگان',
          value: 'consignment_marketplace'
        },

      ],
      packageType: '',
      shipmentType: '',
    }
  },

  setup(props) {
    const {
      allSuppliers,
      getAllSuppliers
    } = Supplier();

    const {
      admin,
      getAdmins
    } = Admin();

    return {
      allSuppliers,
      getAllSuppliers,
      admin,
      getAdmins
    };
  },

  computed: {
    dataSupplier(){
      try {
        const suppliers = []
        this.allSuppliers.data.forEach(element => {
          const form = {
            label : element.shopping_name,
            value : element.id
          }
          suppliers.push(form)
        });
        return  suppliers
      } catch (error) {
        return []
      }
    },

    dataCreator(){
      try {
        const creators = []
        this.admin.data.forEach(element => {
          const form = {
            label : element.first_name +' ' +element.last_name,
            value : element.id
          }
          creators.push(form)
        });
        return creators
      } catch (error) {
        return []
      }
    },

    id() {
      try {
        const idObject = this.values.find(element => element.name === 'id');
        return idObject.value
      } catch (error) {
        return ''
      }
    },

    package_id() {
      try {
        const findObject = this.values.find(element => element.name === 'package_id');
        return findObject.value
      } catch (error) {
        return ''
      }
    },
    sku_label() {
      try {
        const findObject = this.values.find(element => element.name === 'sku_label');
        return findObject.value
      } catch (error) {
        return ''
      }
    },
    shps_s() {
      try {
        const findObject = this.values.find(element => element.name === 'shps_s');
        return findObject.value
      } catch (error) {
        return ''
      }
    },
    shopping_name() {
      try {
        const findObject = this.values.find(element => element.name === 'shopping_name');
        return findObject.value
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
        } else if (this.createdAtModel[0] && this.createdAtModel[1]) {
          const splitDate = this.createdAtModel[0].split('-')
          const splitDateUp = this.createdAtModel[1].split('-')
          this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
          this.gregorianCreateDate[1] = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2])
        }
      }
      return this.gregorianCreateDate;
    },
  },

  methods: {
    setFilter() {
      const filter = new PanelFilter()

      if (this.package_id) {
        filter.package_id = this.package_id
      } else if (this.$route.query.package_id) {
        filter.id = null
      }

      if (this.packageType) {
        filter.package_type = this.packageType
      } else if (this.$route.query.package_type) {
        filter.package_type = null
      }
      if (this.shopping_name) {
        filter.shopping_name = this.shopping_name
      } else if (this.$route.query.shopping_name) {
        filter.shopping_name = null
      }
      if (this.shps_s) {
        filter.shps_s = this.shps_s
      } else if (this.$route.query.shps_s) {
        filter.shps_s = null
      }
      if (this.sku_label) {
        filter.sku_label = this.sku_label
      } else if (this.$route.query.sku_label) {
        filter.sku_label = null
      }
      if (this.createdAt && this.createdAt[0]) {
        filter.created_at_from_date = this.createdAt[0]
      } else {
        filter.created_at_from_date = null
      }

      if (this.createdAt && this.createdAt[1]) {
        filter.created_at_to_date = this.createdAt[1]
      } else {
        filter.created_at_to_date = null
      }

      if (this.supplierModel === '') {
        filter.supplier_id = null
      } else if (this.supplierModel !== '') {
        filter.supplier_id = this.supplierModel
      } else if (this.$route.query.supplier_id) {
        filter.supplier_id = this.$route.query.supplier_id
      }

      if (this.creatorModel === '') {
        filter.creator_id = null
      } else if (this.creatorModel !== '') {
        filter.creator_id = this.creatorModel
      } else if (this.$route.query.creator_id) {
        filter.creator_id = this.$route.query.creator_id
      }

      if (this.shipmentType === '') {
        filter.shipment_type = null
      } else if (this.shipmentType !== '') {
        filter.shipment_type = this.shipmentType
      } else if (this.$route.query.shipment_type) {
        filter.shipment_type = this.$route.query.shipment_type
      }
      filter.page = 1;
      if (this.$route.query.per_page) {
        filter.per_page = this.$route.query.per_page;
      }

      this.$router.push('/lost/index' + filter.query_maker());
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

    async getSupplier() {
      const form = {
        per_page: 10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/state/crud/index`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.provinces = data.data.data
      }
    },

    async getCreator() {
      this.cities = []
      this.cityModel = null
      const form = {
        per_page: 10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/state/crud/get/${this.provinceModel}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.cities = data.data.cities
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
    });

    this.getAllSuppliers();
    this.getAdmins();
  }
}
</script>
