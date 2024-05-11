<template>
  <div class="text-center c-modal-table-filter">
    <v-btn
        @click="dialog=true"
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
            <v-btn @click="dialog=false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-10">
              <span class="t14300">فیلتر</span>
            </div>
          </v-col>
        </v-row>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div>
          <v-row
              justify="start"
              align="center"
              class="px-10 d--rtl">
            <template
                v-for="(filter, index) in filterField"
                :key="index">

              <!-- Text fields -->
              <v-col v-if="filter.type === 'text'" cols="4">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <v-text-field
                    variant="outlined"
                    :name="filter.value"
                    v-model="values[index].value" />
              </v-col>

              <!-- Number fields -->
              <v-col v-if="filter.type === 'number'" cols="4">
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
              </v-col>

              <!-- Auto complete fields -->
              <template v-else-if="filter.type === 'auto-complete' && path!=='product/get/skugroups/index'">
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
                    />
                    <v-autocomplete
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
              <template v-else-if="filter.type === 'select' && path!=='product/get/skugroups/index'">
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
                  <v-autocomplete
                      v-if="filter.value == 'state_id'"
                      :items="provinceList"
                      density="compact"
                      variant="outlined"
                      single-line
                      v-model="provinceModel"
                      @update:modelValue="getCities()" />
                  <v-autocomplete
                      v-if="filter.value == 'city_id'"
                      :items="cityList"
                      density="compact"
                      variant="outlined"
                      single-line
                      v-model="cityModel" />

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
                      v-if="filter.value === 'status'"
                      density="compact"
                      variant="outlined"
                      single-line
                      item-title="label"
                      item-value="value"
                      :items="status"
                      v-model="statusModel" />
                </v-col>
              </template>

              <!-- Date fields -->
              <v-col
                  cols="4"
                  v-else-if="(filter.type === 'date' || filter.value === 'created_at') && path!=='product/get/skugroups/index'"
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
                variant="text" height="40"
                rounded
                class="px-5 mt-1 mr-5">
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
import {UserPanelFilter} from "@/assets/js/filter_user";
import {activeFilter, sellableFilter, supplierTypeFilter, paymentTypeFilter, status} from "@/assets/js/filter_items"
import {PanelFilter} from "@/assets/js/filter";
import {jalaliToGregorian} from "@/assets/js/functions";
import {SkuPanelFilter} from "@/assets/js/filter_sku";
import Product from "@/composables/Product";
import {AxiosCall} from "@/assets/js/axios_call";
import {SupplierPanelFilter} from "@/assets/js/filter_supplier";
import Supplier from "@/composables/Supplier";
import Admin from "@/composables/Admin";

export default {
  props: {
    filterField: [],
    path: '',
    brandsList:[],
    colorsList: [],
    categoriesList:[],
    disableCategory: false,
    skuGroupList:[]
  },

  setup(){
    const {searchProduct} = Product()
    const {getAllSuppliers, allSuppliers} = Supplier()
    const {getAdmins,  admin} = Admin()

    return {searchProduct, getAllSuppliers, allSuppliers, getAdmins, admin}
  },

  data() {
    return{
      values: [],
      gregorianCreateDate: [],
      gregorianUpdateDate: [],

      activeModel: '',
      sellableModal: '',
      provinceModel:'',
      cityModel:'',
      supplierTypeModel:'',
      paymentTypeModel:'',
      supplierModel:'',
      creatorModel:'',
      statusModel: '',

      createdAtModel: null,
      dialog: false,

      activeFilter,
      sellableFilter,
      supplierTypeFilter,
      paymentTypeFilter,
      status
    }
  },

  mounted() {
    this.filterField.forEach(el => {
      const form = {
        name: el.value,
        value: ''
      }
      this.values.push(form)
    })

    this.getProvince();
    this.getAllSuppliers();
    this.getAdmins();
  },

  computed: {
    firstName() {
      try {
        const nameObject = this.values.find(element => element.name === 'first_name');
        return nameObject.value
      } catch (error) {
        return ''
      }
    },
    lastName() {
      try {
        const labelObject = this.values.find(element => element.name === 'last_name');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    phoneNumber() {
      try {
        const idObject = this.values.find(element => element.name === 'phone_number');
        return idObject.value
      } catch (error) {
        return ''
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
    label() {
      try {
        const labelObject = this.values.find(element => element.name === 'label');
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
    id() {
      try {
        const nameObject = this.values.find(element => element.name === 'id');
        return nameObject.value
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

    fullName() {
      try {
        const fullNameObject = this.values.find(element => element.name === 'full_name');
        return fullNameObject.value
      } catch (error) {
        return ''
      }
    },
    shoppingName() {
      try {
        const shoppingNameObject = this.values.find(element => element.name === 'shopping_name');
        return shoppingNameObject.value
      } catch (error) {
        return ''
      }
    },
    email() {
      try {
        const emailObject = this.values.find(element => element.name === 'email');
        return emailObject.value
      } catch (error) {
        return ''
      }
    },
    kosarId() {
      try {
        const kosarIdObject = this.values.find(element => element.name === 'kosar_id');
        return kosarIdObject.value
      } catch (error) {
        return ''
      }
    },
    phone() {
      try {
        const phoneObject = this.values.find(element => element.name === 'phone');
        return phoneObject.value
      } catch (error) {
        return ''
      }
    },
    paymentPeriod() {
      try {
        const paymentPeriodObject = this.values.find(element => element.name === 'payment_period');
        return paymentPeriodObject.value
      } catch (error) {
        return ''
      }
    },
    idSuppliyer() {
      try {
        const idObject = this.values.find(element => element.name === 'id');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    phoneNumberSupplier() {
      try {
        const phoneNumberObject = this.values.find(element => element.name === 'phone_number');
        return phoneNumberObject.value
      } catch (error) {
        return ''
      }
    },
    cityList() {
      try {
        let cityList = []
        this.cities.forEach(city => {
          const form = {
            title: city.label,
            value: city.id
          }
          cityList.push(form)
        })
        return cityList
      } catch (e) {
        return []
      }
    },
    provinceList() {
      try {
        let provinceList = []
        this.provinces.forEach(province => {
          const form = {
            title: province.label,
            value: province.id
          }
          provinceList.push(form)
        })
        return provinceList
      } catch (e) {
        return []
      }
    },

    dataSupplier(){
      try {
        const suppliers = []
        this.allSuppliers.data.forEach(element => {
          const form = {
            label : element.full_name,
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

    // id() {
    //   try {
    //     const idObject = this.values.find(element => element.name === 'id');
    //     return idObject.value
    //   } catch (error) {
    //     return ''
    //   }
    // },

    factorNumber() {
      try {
        const factorNumberObject = this.values.find(element => element.name === 'factor_number');
        console.log('factorNumberObject.value', factorNumberObject.value)
        return factorNumberObject.value
      } catch (error) {
        return ''
      }
    },

    // createdAt() {
    //   if (this.createdAtModel) {
    //     if (this.createdAtModel[0] && !this.createdAtModel[1]) {
    //       const splitDate = this.createdAtModel[0].split('-')
    //       this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
    //       this.gregorianCreateDate[1] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
    //     } else if (this.createdAtModel[0] && this.createdAtModel[1]) {
    //       const splitDate = this.createdAtModel[0].split('-')
    //       const splitDateUp = this.createdAtModel[1].split('-')
    //       this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
    //       this.gregorianCreateDate[1] = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2])
    //     }
    //   }
    //   return this.gregorianCreateDate;
    // },
  },

  methods: {
    setFilter() {
      if (this.path === 'admin/index' || this.path === 'user/index' ) {
        const filter = new UserPanelFilter()
        filter.page = 1;
        if (this.firstName) {
          filter.firstName = this.firstName
        }
        else {
          filter.firstName = null
        }

        if (this.lastName) {
          filter.lastName = this.lastName
        }
        else {
          filter.lastName = null
        }

        if (this.phoneNumber) {
          filter.phoneNumber = this.phoneNumber
        }
        else {
          filter.phoneNumber = null
        }

        if(this.$route.query.per_page){
          filter.per_page = this.$route.query.per_page;
        }
        this.$router.push('/' + this.path + '/' + filter.query_maker(this.$route.query));
        this.dialog = false;
      }

      else if (this.path === 'product/index' || this.path === 'brand/index' || this.path ==='categories/index' || this.path === 'color/index' || this.path === 'attributes/index') {
        const filter = new PanelFilter()
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

        if (this.group) {
          filter.group = this.group
        }
        else {
          filter.group = null
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

        if(this.$route.query.per_page){
          filter.per_page = this.$route.query.per_page;
        }
        filter.page = 1;
        this.$router.push('/' + this.path + '/' + filter.query_maker());
        this.dialog = false;
      }

      else if (this.path === 'product/get/skus/index') {
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


        if (this.sellableModal) {
          filter.sellable = this.sellableModal
        } else if (this.$route.query.sellable){
          filter.sellable = null
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
        console.log(this.$route.query)
        this.$router.push('/' + this.path + '/' + filter.query_maker(this.$route.query));
        this.dialog = false;
      }

      else if (this.path === 'product/get/skugroups/index') {
        const filter = new PanelFilter()
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

        if (this.id) {
          filter.id = this.id
        }
        else {
          filter.id = null
        }

        if(this.$route.query.per_page){
          filter.per_page = this.$route.query.per_page;
        }
        filter.page = 1;
        this.$router.push('/' + this.path + '/' + filter.query_maker());
        this.dialog = false;
      }

      else if (this.path === 'supplier/index') {
        const filter = new SupplierPanelFilter()

        if (this.fullName) {
          filter.full_name = this.fullName
        } else if (this.$route.query.full_name) {
          filter.full_name = null
        }

        if (this.shoppingName) {
          filter.shopping_name = this.shoppingName
        } else if (this.$route.query.shopping_name){
          filter.shopping_name = null
        }

        if (this.email) {
          filter.email = this.email
        } else if (this.$route.query.email){
          filter.email = null
        }

        if (this.idSuppliyer) {
          filter.id = this.idSuppliyer
        } else if (this.$route.query.id){
          filter.id = null
        }

        if (this.kosarId) {
          filter.kosar_id = this.kosarId
        } else if (this.$route.query.kosar_id){
          filter.kosar_id = null
        }

        if (this.phone) {
          filter.phone = this.phone
        } else if (this.$route.query.phone){
          filter.phone = null
        }

        if (this.phoneNumberSupplier) {
          filter.phone_number = this.phoneNumberSupplier
        } else if (this.$route.query.phone_number){
          filter.phone_number = null
        }

        if (this.paymentPeriod) {
          filter.payment_period = this.paymentPeriod
        } else if (this.$route.query.payment_period){
          filter.payment_period = null
        }

        if (this.paymentTypeModel) {
          filter.payment_type = this.paymentTypeModel
        } else if (this.$route.query.payment_type){
          filter.payment_type = null
        }

        if (this.supplierTypeModel) {
          filter.type = this.supplierTypeModel
        } else if (this.$route.query.type){
          filter.type = null
        }

        if (this.provinceModel) {
          filter.state_id = this.provinceModel
        } else if (this.$route.query.state_id){
          filter.state_id = null
        }

        if (this.cityModel) {
          filter.city_id = this.cityModel
        } else if (this.$route.query.city_id){
          filter.city_id = null
        }

        filter.page = 1;

        if (this.$route.query.per_page) {
          filter.per_page = this.$route.query.per_page;
        }

        this.$router.push('/' + this.path + '/' + filter.query_maker());
        this.dialog = false;
      }

      else if (this.path === 'factor/index') {
        const filter = new PanelFilter()

        if (this.idSuppliyer) {
          filter.id = this.idSuppliyer
        }
        else if (this.$route.query.id) {
          filter.id = null
        }

        if (this.factorNumber) {
          filter.factor_number = this.factorNumber
        }
        else if (this.$route.query.factor_number) {
          filter.factor_number = null
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


        if (this.statusModel === '') {
          filter.status = null
        } else if (this.statusModel !== '') {
          filter.status = this.statusModel
        } else if (this.$route.query.status) {
          filter.status = this.$route.query.status
        }

        filter.page = 1;

        if (this.$route.query.per_page) {
          filter.per_page = this.$route.query.per_page;
        }

        this.$router.push('/' + this.path + '/' + filter.query_maker());
        this.dialog = false;
      }
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

    async getProvince() {
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
    async getCities() {
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
    }
  }
}
</script>
