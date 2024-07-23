<template>
  <div class="text-center c-modal-table-filter">
    <sh-btn
        @click="dialog=true"
        :title="`فیلتر`"
        :flat="true"
        :variant="`outlined`"
        :rounded="true"
        :prependImg="true"
        class="px-3 mt-1 mr-4" />

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
                <sh-textfield
                    :variant="`outlined`"
                    :placeholder="filter.place"
                    :name="filter.value"
                    v-model="values[index].value"
                />
              </v-col>

              <!-- Number fields -->
              <v-col v-if="filter.type === 'number'" cols="4">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <sh-textfield
                    v-if="filter.value == 'phone_number'"
                    :variant="`outlined`"
                    :placeholder="`برای مثال : ۰۹۱۲۱۱۱۱۱۱۱`"
                    :name="filter.value"
                    v-model="values[index].value"
                />

                <sh-textfield
                    v-if="filter.value == 'phone'"
                    :variant="`outlined`"
                    :placeholder="`برای مثال : ۷۷۷۷۷۷۷۷-۰۲۱`"
                    :name="filter.value"
                    v-model="values[index].value"
                />

                <sh-textfield
                    v-if="filter.value == 'identification_code'"
                    :variant="`outlined`"
                    :placeholder="`برای مثال : ۷۷۷۷۷۷۷۷-۰۲۱`"
                    :name="filter.value"
                    v-model="values[index].value"
                />
              </v-col>

              <!-- Auto complete fields -->
              <template v-else-if="filter.type === 'auto-complete' && path!=='product/get/skugroups/index'">
                <template v-if="filter.value !== 'category_id'">
                  <v-col cols="4">
                    <div class="t13300 text-right mb-1">{{filter.name}}</div>
                    <!-- product Fields -->
                    <sh-autocomplete
                        v-if="filter.value === 'product'"
                        :items="productList"
                        v-model='values[index].value'
                        :item-title="`label`"
                        :item-value="`value`"
                        :single-line="true"
                        :clearable="true"
                        :v-debounce="searchProduct"
                        :variant="`outlined`"
                    />

                    <!-- colors Fields -->
                    <sh-autocomplete
                        v-if="filter.value === 'color_id'"
                        :items="colorsList"
                        v-model='values[index].value'
                        :item-title="`label`"
                        :item-value="`value`"
                        :single-line="true"
                        :clearable="true"
                        :variant="`outlined`"
                    />

                    <!-- group Fields -->
                    <sh-autocomplete
                        v-if="filter.value === 'group'"
                        :items="skuGroupList"
                        v-model='values[index].value'
                        :item-title="`label`"
                        :item-value="`value`"
                        :single-line="true"
                        :clearable="true"
                        :variant="`outlined`"
                    />

                    <!-- product Fields -->
                    <sh-autocomplete
                        v-if="filter.value === 'product_id'"
                        :items="productList"
                        v-model='values[index].value'
                        :item-title="`label`"
                        :item-value="`value`"
                        :single-line="true"
                        :clearable="true"
                        :v-debounce="searchProductList"
                        :variant="`outlined`"
                    />

                    <!-- brand Fields -->
                    <sh-autocomplete
                        v-if="filter.value === 'brand_id'"
                        :items="brandsList"
                        v-model='values[index].value'
                        :item-title="`label`"
                        :item-value="`value`"
                        :single-line="true"
                        :clearable="true"
                        :variant="`outlined`"
                    />

                    <!-- admin Fields -->
                    <sh-autocomplete
                        v-if="filter.value === 'admin' || filter.value === 'creator_id' || filter.value === 'admin_id'"
                        :items="adminList"
                        v-model='values[index].value'
                        item-title="label"
                        item-value="value"
                        :single-line="true"
                        :clearable="true"
                        :no-data-text="`ادمین را جستوجو کنید`"
                        v-debounce="searchAdmin"
                        :variant="`outlined`"
                    />

                    <!-- userId Fields -->
                    <sh-autocomplete
                        v-if="filter.value === 'user_id'"
                        :placeholder="`شماره تلفن کاربر را وارد کنید`"
                        :variant="`outlined`"
                        prepend-inner-icon-cb="mdi-map-marker"
                        v-model='values[index].value'
                        :items="userList"
                        :item-title="`name`"
                        :item-value="`value`"
                        v-debounce="searchUser"
                    />
                  </v-col>
                </template>

                <template v-else-if="!disableCategory">
                  {{disableCategory}}
                  <v-col cols="4">
                    <div class="t13300 text-right mb-1">{{filter.name}}</div>
                    <sh-autocomplete
                        v-if="filter.value === 'category_id'"
                        :items="categoriesList"
                        v-model='values[index].value'
                        :item-title="`label`"
                        :item-value="`value`"
                        :single-line="`single-line`"
                        :clearable="`clearable`"
                        :variant="`outlined`"
                    />

<!--                    <v-autocomplete-->
<!--                        v-if="filter.value === 'category_id'"-->
<!--                        :items="categoriesList"-->
<!--                        v-model='values[index].value'-->
<!--                        item-title="label"-->
<!--                        item-value="value"-->
<!--                        single-line-->
<!--                        clearable-->
<!--                        variant="outlined"-->
<!--                    />-->
                  </v-col>
                </template>
              </template>

              <!-- Select fields -->
              <v-col cols="4" v-else-if="filter.type === 'select' && this.path !== 'product/get/skugroups/index'">
                <div class="t13300 text-right mb-1">{{filter.name}}</div>
                <!-- Active status -->
                <sh-select
                    v-if=" this.path !== 'product/get/skugroups/index' && filter.value === 'is_active' || filter.value === 'is_filterable' || filter.value === 'is_index' || filter.value === 'is_follow'"
                    :items="statusItems"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- hasOption status -->
                <sh-select
                    v-if="filter.value === 'icon' || filter.value === 'image_id' || filter.value==='device'"
                    :items="statusHasOption"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- menu status -->
                <sh-autocomplete
                    v-if="filter.value === 'menu_id'"
                    :items="menuList"
                    v-model="values[index].value"
                    :single-line="true"
                    :clearable="true"
                    :density="`compact`"
                    :variant="`outlined`"
                    :item-title="`title`"
                    :item-value="`value`"
                />

                <!-- page_type status -->
                <sh-select
                    v-if="filter.value === 'page_type'"
                    :items="typeItems"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- status -->
                <sh-select
                    v-if="filter.value === 'status'"
                    :items="statusItems"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- type -->
                <sh-select
                    v-if="filter.value === 'type'"
                    :items="typeItems"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- priority -->
                <sh-select
                    v-if="filter.value === 'priority'"
                    :items="priorityItems"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- type_package -->
                <sh-select
                    v-if="filter.value === 'type_package'"
                    :items="typeItems"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- shipment_type status -->
                <sh-select
                    v-if="filter.value === 'shipment_type'"
                    :items="shipmentTypeItems"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- province fields -->
                <sh-autocomplete
                    v-if="filter.value == 'receive_state_id' || filter.value === 'state_id'"
                    :items="provinceList"
                    v-model="values[index].value"
                    @update:modelValue="getCities(values[index].value)"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :clearable="true"
                    :item-title="`title`"
                    :item-value="`value`"
                />

                <!-- cities fields -->
                <sh-autocomplete
                    v-if="filter.value == 'receive_city_id' || filter.value === 'city_id'"
                    :items="cityList"
                    v-model="values[index].value"
                    :clearable="`clearable`"
                    :density="`compact`"
                    :variant="`outlined`"
                    single-line
                    :item-title="`title`"
                    :item-value="`value`"
                />

                <!-- payment_type status -->
                <sh-select
                    v-if="filter.value === 'payment_type'"
                    :items="paymentType"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- charge_type status -->
                <sh-select
                    v-if="filter.value === 'charge_type'"
                    :items="chargeType"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- supplier fields -->
                <sh-autocomplete
                    v-if="filter.value === 'supplier_id'"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :items="dataSupplier"
                    v-model="values[index].value"
                    :item-title="`label`"
                    :item-value="`value`"
                />

                <!-- creator fields -->
                <sh-autocomplete
                    v-if="filter.value === 'creator_id'"
                    :density="`compact`"
                    :variant="`outlined`"
                    single-line
                    :items="dataCreator"
                    v-model="values[index].value"
                    :item-title="`label`"
                    :item-value="`value`"
                />

                <!-- admin fields -->
                <sh-autocomplete
                    v-if="filter.value === 'admin'"
                    :items="adminList"
                    v-model='admin'
                    :v-debounce="searchAdmin"
                    :no-data-text="`ادمین را جستوجو کنید`"
                    :single-line="true"
                    :clearable="true"
                    :density="`compact`"
                    :variant="`outlined`"
                    :item-title="`title`"
                    :item-value="`value`"
                />

                <!-- voucher_type status -->
                <sh-select
                    v-if="filter.value ==='voucher_type'"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :items="typeItems"
                    v-model="values[index].value"/>

                <!-- discount_type status -->
                <sh-select
                    v-if="filter.value ==='discount_type'"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :items="voucherAmountTypes"
                    v-model="values[index].value"/>

                <!-- sending_method status -->
                <sh-select
                    v-if="filter.value ==='sending_method'"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :items="sendingItems"
                    v-model="values[index].value"/>

                <!-- payment_status status -->
                <sh-select
                    v-if="filter.value ==='payment_status'"
                    :items="paymentStatuses"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- payment_method status -->
                <sh-select
                    v-if="filter.value ==='payment_method'"
                    :items="paymentMethods"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- packed status -->
                <sh-select
                    v-if="filter.value ==='packed_status'"
                    :items="packedStatus"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>

                <!-- sku_id status -->
                <sh-autocomplete
                    v-if="filter.value === 'sku_id'"
                    :items="skuList"
                    v-model="values[index].value"
                    :v-debounce="searchSku"
                    :clearable="true"
                    :density="`compact`"
                    :variant="`outlined`"
                    :item-title="`title`"
                    :item-value="`value`"
                />

                <!-- user_id status -->
                <sh-autocomplete
                    v-if="filter.value === 'user_id'"
                    :items="userList"
                    :density="`compact`"
                    :variant="`outlined`"
                    :placeholder="`شماره تلفن کاربر را وارد کنید`"
                    :single-line="true"
                    :item-title="`name`"
                    :item-value="`value`"
                    v-model="values[index].value"
                    v-debounce="searchUser"
                />

                <!-- score -->
                <sh-select
                    v-if="filter.value ==='score'"
                    :items="scoreItems"
                    v-model="values[index].value"
                    :density="`compact`"
                    :variant="`outlined`"
                    :single-line="true"
                    :item-title="`label`"
                    :item-value="`value`"/>
              </v-col>

              <!-- Date fields -->
              <v-col
                  cols="4"
                  v-else-if="(filter.type === 'date' || filter.value === 'created_at') && path!=='product/get/skugroups/index'"
                  class="mt-3">
                <div class="t13300 text-right mb-1">{{filter.name}}</div>
                <div align="center" class="d-flex pb-5 align-center">
                  <sh-datepicker
                      v-model="values[index].value"
                      :variant="`variant`"/>

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
            <sh-btn
                @click="removeAllFilters()"
                :title="`حذف همه فیلترها`"
                :flat="true"
                :height="40"
                :variant="`text`"
                :rounded="true"
                class="px-5 mt-1 mr-5"
            />
          </v-col>

          <v-col cols="6">
            <div class="text-right">
              <sh-btn
                  @click="setFilter()"
                  :title="`مشاهده`"
                  :color="`primary500`"
                  :flat="true"
                  :height="40"
                  :rounded="true"
                  class="px-5 mt-1 mr-5" />
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Product from "@/composables/Product";
import {AxiosCall} from "@/assets/js/axios_call";
import Supplier from "@/composables/Supplier";
import Admin from "@/composables/Admin";
import Menu from "@/composables/Menu";
import {jalaliToGregorian} from "@/assets/js/functions";
import {defineAsyncComponent} from "vue";
const ShBtn = defineAsyncComponent(()=> import ('@/components/Components/Kits/Buttons/sh-btn.vue'))
const ShDatepicker = defineAsyncComponent(()=> import ('@/components/Components/Kits/DatePicker/sh-datepicker.vue'))
const ShSelect = defineAsyncComponent(()=> import ('@/components/Components/Kits/Select/sh-select.vue'))
const ShAutocomplete = defineAsyncComponent(()=> import ('@/components/Components/Kits/AutoComplete/sh-autocomplete.vue'))
const ShTextfield = defineAsyncComponent(()=> import ('@/components/Components/Kits/TextField/sh-textfield.vue'))

export default {
  components: {ShBtn, ShDatepicker, ShSelect, ShAutocomplete, ShTextfield},
  props: {
    filterField: [],
    statusItems: [],
    priorityItems: [],
    paymentStatuses: [],
    paymentMethods: [],
    packedStatus: [],
    statusHasOption:[],
    paymentType:[],
    voucherAmountTypes: [],
    sendingItems: [],
    typeItems: [],
    chargeType:[],
    shipmentTypeItems: [],
    brandsList:[],
    colorsList: [],
    categoriesList:[],
    skuGroupList:[],
    disableCategory: false,
    path: '',
    page:Number,
    perPage:Number,
    userId:null,
    factorId:null,
    scoreItems:[]
  },

  setup(){
    const { product, searchProduct, getProduct } = Product()
    const { getAllSuppliers, allSuppliers } = Supplier()
    const { getAdmins,  admin } = Admin()
    const { allMenu, getAllMenu } = new Menu()

    return {
      searchProduct,
      product,
      getAllSuppliers,
      allSuppliers,
      getAdmins,
      admin,
      allMenu,
      getAllMenu,
      getProduct
    }
  },

  data() {
    return{
      values: [],
      admins:[],
      gregorianCreateDate: [],
      gregorianUpdateDate: [],
      skuSearchList:[],
      userSearchList:[],
      cities: [],
      provinces: [],

      provinceModel:'',
      cityModel:'',
      admin:'',

      createdAtModel: null,
      province : null,
      city: null,
      userModal: null,
      typeModel: null,

      dialog: false
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

    if (this.path === 'menu/index') {
      this.getAllMenu()
    }

    else if (this.path === 'product/get/skus/index') {
      this.searchProduct(' ')
    }

    else if (
        this.path === 'supplier/index' ||
        this.path === 'seller/index' ||
        this.path === 'voucher/index' ||
        this.path === 'orders/manual-order-list' ||
        this.path === 'orders/index' ||
        this.path === 'returned-orders/index') {
      this.getProvince()
    }

    else if (this.path === 'factor/index' ||
        this.path === 'retail-shipment/index' ||
        this.path === 'shipment-requests/index' ||
        this.path === 'withdraw-request/index' ||
        this.path === 'wastage/index' ||
        this.path === 'best-selling-categories/index' ||
        this.path === 'lost/index') {
      this.getAdmins()
      if (this.path === 'wastage/index' || this.path === 'lost/index'|| this.path === 'factor/index') {
        this.getAllSuppliers()
      }
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
    skuList() {
      try {
        let sku = []
        this.skuSearchList.forEach(permission => {
          const form = {
            name: permission.label + '(' + permission.id + ')',
            id: permission.id
          }
          sku.push(form)
        })
        return sku
      } catch (e) {
        return []
      }
    },

    userList(){
      try {
        let users = []
        this.userSearchList.forEach(user => {
          const form = {
            name: user?.first_name + ' ' +user?.last_name + '(' + user.phone_number + ')',
            value: user.id
          }
          users.push(form)
        })
        return users
      } catch (e) {
        return e
      }
    },
    menuList(){
      try {
        let menus = []
        this.allMenu.forEach(menu =>{
          const form = {
            title:menu.label,
            value : menu.id
          }
          menus.push(form)
        })
        return menus
      }
      catch (e) {
        return  []
      }
    }
  },

  methods: {
    setFilter() {
      let params = '?'
      let fullPath = this.$route.path;
      this.$emit('resetPage')
      this.values.forEach((el) => {
        if (el.value) {
          if (el.name === 'created_at' || el.name === 'updated_at' || el.name === 'start_time' || el.name === 'end_time' || el.name === 'logistic_at' || el.name === 'logistic_date') {
            let created_at_from = null
            let created_at_to = null

            if (el.value[0] && (!el.value[1] || el.value[1]==null)) {
              const splitDate = el.value[0].split('-');
              created_at_from = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2]);
            }
            else if ((el.value[0] && el.value[1]) && el.value[0] != null && el.value[1]!= null) {
              const splitDate = el.value[0].split('-');
              const splitDateUp = el.value[1].split('-');
              created_at_from = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2]);
              created_at_to = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2]);
            }

            if (el.name === 'created_at') {
              if (created_at_from != null ){
                params += 'created_at_from_date=' + created_at_from + '&';
              }
              if (created_at_to != null){
                params += '&created_at_to_date=' + created_at_to + '&'
              }

            }

            else if (el.name === 'logistic_at') {
              if (created_at_from != null ){
                params += 'logistic_date_from=' + created_at_from + '&';
              }
              if (created_at_to != null){
                params += '&logistic_date_to=' + created_at_to + '&'
              }
            }

            else if (el.name === 'logistic_date') {
              if (created_at_from != null ){
                params += 'logistic_date_from=' + created_at_from + '&';
              }
              if (created_at_to != null){
                params += '&logistic_date_to=' + created_at_to + '&'
              }
            }

            else if (el.name === 'updated_at') {
              if (created_at_from != null ){
                params += 'updated_at_from_date=' + created_at_from + '&';
              }
              if (created_at_to != null){
                params += '&updated_at_to_date=' + created_at_to + '&'
              }
            }

            else if (el.name === 'start_time') {
              if (created_at_from != null ){
                params += 'start_time_from=' + created_at_from + '&';
              }
              if (created_at_to != null){
                params += '&start_time_to=' + created_at_to + '&'
              }
            }

            else if (el.name === 'end_time') {
              if (created_at_from != null ){
                params += 'end_time_from=' + created_at_from + '&';
              }
              if (created_at_to != null){
                params += '&end_time_to=' + created_at_to + '&'
              }
            }
          }
          else {
            params += el.name + '=' +el.value + '&';

          }
        }
      });
      if (this.userId != null ){
        params += 'user_id=' +this.userId + '&';
      }
      if (this.factorId != null ){
        params += 'factor_id=' +this.factorId + '&';
      }
      params = params.replace(/&$/, '');

      this.$router.push(fullPath + params);
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
    async getCities(province) {
      this.cities = []
      this.cityModel = null
      const form = {
        per_page: 10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/state/crud/get/${province}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.cities = data.data.cities
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
    },

    async searchSku(e) {
      const filter = {
        per_page: 10,
        q: e
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = filter
      AxiosMethod.end_point = `product/sku/crud/index/`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.skuSearchList = data.data.data
      }
    },

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

    async searchProductList(search) {
     this.searchProduct(search)
    },
  }
}
</script>
