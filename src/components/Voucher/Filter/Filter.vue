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
              justify="start"
              align="center"
              class="px-10 d--rtl">
            <template v-for="(filter, index) in filterField" :key="index">
              <v-col v-if="filter.type === 'text' && filter.value !== 'lower_payment' && filter.value !== 'highest_payment'" cols="4">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <v-text-field
                    variant="outlined"
                    :name="filter.value"
                    hide-details
                    :placeholder="filter.value === 'shps_count_from' ? 'از' : filter.value === 'shps_count_to' ? 'تا': ''"
                    v-model="values[index].value" />
              </v-col>

              <v-col v-if="filter.type === 'text' && (filter.value === 'lower_payment' ||filter.value === 'highest_payment')" cols="6">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <v-text-field
                    variant="outlined"
                    :name="filter.value"
                    hide-details
                    :placeholder="filter.value === 'shps_count_from' ? 'از' : filter.value === 'shps_count_to' ? 'تا': ''"
                    v-model="values[index].value" />
              </v-col>

              <v-col v-if="filter.type === 'select'" cols="4">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <v-select
                    v-if="filter.value ==='voucher_type'"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    :items="voucherTypes"
                    v-model="voucherType" />
                <v-select
                    v-if="filter.value ==='discount_type'"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    :items="voucherAmountTypes"
                    v-model="voucherAmountType" />
                <v-select
                    v-if="filter.value ==='sending_method'"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    :items="sendingItems"
                    v-model="sendingItem" />
                <v-select
                    v-if="filter.value ==='is_active'"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    :items="voucherActives"
                    v-model="voucherActive" />
                <v-autocomplete
                    v-if="filter.value == 'state_id'"
                    :items="provinceList"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    v-model="provinceModel"
                    @update:modelValue="getCities()" />
                <v-autocomplete
                    v-if="filter.value == 'city_id'"
                    :items="cityList"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    :rules="rule"
                    v-model="cityModel" />
                <v-autocomplete
                    v-if="filter.value == 'sku_id'"
                    :items="skuList"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    item-title="name"
                    item-value="id"
                    v-model="skuModel"
                    v-debounce:1s.unlock="searchSku"/>
                <v-autocomplete
                    v-if="filter.value == 'user_id'"
                    :items="userList"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    item-title="name"
                    item-value="value"
                    v-model="customerModel"
                    v-debounce:1s.unlock="searchUser"/>
              </v-col>

              <v-col
                  cols="4"
                  v-else-if=" filter.value === 'submit_date'"
                  class="mt-3">
                <div class="t13300 text-right mb-3">{{filter.name}}</div>
                <div align="center" class="d-flex pb-5 align-center">
                  <date-picker
                      range
                      clearable
                      class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                      format="jYYYY-jMM-jDD"
                      display-format="jYYYY-jMM-jDD"
                      v-model="submitAtModel"
                      variant="outlined" />

                  <v-icon @click="submitAtModel= [] ;gregorianSubmitDate =[]">mdi-close</v-icon>
                </div>
              </v-col>

              <v-col cols="4" v-else-if=" filter.type === 'date' ">
                <div class="t13300 text-right mb-3">{{filter.name}}</div>
                <div align="center" class="d-flex pb-5 align-center" v-if=" filter.value === 'start_time' ">
                  <date-picker
                      range
                      clearable
                      class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                      format="jYYYY-jMM-jDD"
                      display-format="jYYYY-jMM-jDD"
                      v-model="start_time"
                      variant="outlined" />

                </div>
                <div align="center" class="d-flex pb-5 align-center" v-else-if=" filter.value === 'end_time' ">
                  <date-picker
                      range
                      clearable
                      class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                      format="jYYYY-jMM-jDD"
                      display-format="jYYYY-jMM-jDD"
                      v-model="end_time"
                      variant="outlined" />

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
} from '@/assets/js/filter_voucher.js'
import {
  AxiosCall
} from "@/assets/js/axios_call";
import {convertDateToGregorian} from "@/assets/js/functions";

export default {
  props: {
    filterField: [],
    path: null,
  },

  data() {
    return {
      dialog: false,
      values: [],
      originalData: [],
      filteredData: [],

      voucherTypes: [
        {
          title: 'عادی',
          value: 'regular'
        },
        {
          title: 'گروهی',
          value: 'group'
        },
        {
          title: 'نظیر به نظیر',
          value: 'peer_to_peer'
        },

      ],
      voucherAmountTypes: [
        {
          title: 'ریالی',
          value: 'rial'
        },
        {
          title: 'درصدی',
          value: 'percent'
        },

      ],
      voucherActives: [
        {
          title: 'فعال',
          value: '1'
        },
        {
          title: 'غیرفعال',
          value: '0'
        },

      ],
      sendingItems: [
        {
          title: 'پیش فرض',
          value: 'default'
        },
        {
          title: 'رایگان',
          value: 'free'
        },

      ],
      voucherType: null,
      voucherAmountType: null,
      voucherActive: null,
      sendingItem: null,
      state_id:null,
      start_time:[],
      end_time:[],
      provinceModel:null,
      skuModel:null,
      customerModel:null,
      userSearchList:[],
      skuSearchList:[]
    }
  },

  computed: {
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
            value: user
          }
          users.push(form)
        })
        return users
      } catch (e) {
        return e
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

    name() {
      try {
        const idObject = this.values.find(element => element.name === 'name');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    code() {
      try {
        const idObject = this.values.find(element => element.name === 'code');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    discount_from() {
      try {
        const idObject = this.values.find(element => element.name === 'discount_from');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    discount_to() {
      try {
        const idObject = this.values.find(element => element.name === 'discount_to');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    order_count_from() {
      try {
        const idObject = this.values.find(element => element.name === 'order_count_from');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    order_count_to() {
      try {
        const idObject = this.values.find(element => element.name === 'order_count_to');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    order_limit_from() {
      try {
        const idObject = this.values.find(element => element.name === 'order_limit_from');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    order_limit_to() {
      try {
        const idObject = this.values.find(element => element.name === 'order_limit_to');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    user_limit_from() {
      try {
        const idObject = this.values.find(element => element.name === 'user_limit_from');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    user_limit_to() {
      try {
        const idObject = this.values.find(element => element.name === 'user_limit_to');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    min_order_price_from() {
      try {
        const idObject = this.values.find(element => element.name === 'min_order_price_from');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    min_order_price_to() {
      try {
        const idObject = this.values.find(element => element.name === 'min_order_price_to');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    start_time() {
      try {
        const gregorianDate = convertDateToGregorian( this.start_time , '-' , false)
        return gregorianDate
      } catch (error) {
        return ''
      }
    },
    end_time() {
      try {
        const gregorianDate = convertDateToGregorian( this.end_time , '-' , false)
        return gregorianDate
      } catch (error) {
        return ''
      }
    },

  },

  methods: {
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
    setFilter() {
      const filter = new PanelFilter()

      if (this.name) {
        filter.name = this.name
      } else if (this.$route.query.name) {
        filter.name = null
      }
      if (this.code) {
        filter.code = this.code
      } else if (this.$route.query.code) {
        filter.code = null
      }
      if (this.discount_from) {
        filter.discount_from = this.discount_from
      } else if (this.$route.query.discount_from) {
        filter.discount_from = null
      }
      if (this.discount_to) {
        filter.discount_to = this.discount_to
      } else if (this.$route.query.discount_to) {
        filter.discount_to = null
      }
      if (this.order_count_from) {
        filter.order_count_from = this.order_count_from
      } else if (this.$route.query.order_count_from) {
        filter.order_count_from = null
      }
      if (this.order_count_to) {
        filter.order_count_to = this.order_count_to
      } else if (this.$route.query.order_count_to) {
        filter.order_count_to = null
      }
      if (this.order_limit_from) {
        filter.order_limit_from = this.order_limit_from
      } else if (this.$route.query.order_limit_from) {
        filter.order_limit_from = null
      }
      if (this.order_limit_to) {
        filter.order_limit_to = this.order_limit_to
      } else if (this.$route.query.order_limit_to) {
        filter.order_limit_to = null
      }

      if (this.user_limit_from) {
        filter.user_limit_from = this.user_limit_from
      } else if (this.$route.query.user_limit_from) {
        filter.user_limit_from = null
      }

      if (this.user_limit_to) {
        filter.user_limit_to = this.user_limit_to
      } else if (this.$route.query.user_limit_to) {
        filter.user_limit_to = null
      }

      if (this.min_order_price_from) {
        filter.min_order_price_from = this.min_order_price_from
      } else if (this.$route.query.min_order_price_from) {
        filter.min_order_price_from = null
      }

      if (this.min_order_price_to) {
        filter.min_order_price_to = this.min_order_price_to
      } else if (this.$route.query.min_order_price_to) {
        filter.min_order_price_to = null
      }
      if (this.skuModel) {
        filter.sku_id = this.skuModel
      } else if (this.$route.query.sku_id) {
        filter.sku_id = null
      }
      if (this.customerModel) {
        filter.user_id = this.customerModel
      } else if (this.$route.query.user_id) {
        filter.user_id = null
      }
      if (this.voucherType) {
        filter.voucher_type = this.voucherType
      } else if (this.$route.query.voucher_type) {
        filter.voucher_type = null
      }
      if (this.voucherAmountType) {
        filter.discount_type = this.voucherAmountType
      } else if (this.$route.query.discount_type) {
        filter.discount_type = null
      }
      if (this.sendingItem) {
        filter.sending_method = this.sendingItem
      } else if (this.$route.query.sending_method) {
        filter.sending_method = null
      }
      if (this.state_id) {
        filter.state_id = this.state_id
      } else if (this.$route.query.state_id) {
        filter.state_id = null
      }
      if (this.voucherActive) {
        filter.is_active = this.is_active
      } else if (this.$route.query.is_active) {
        filter.is_active = null
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
      this.statusModel = null;
      this.typeModel = null;
      this.filterField.forEach(el => {
        const form = {
          name: el.value,
          value: 'null'
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

    this.getProvince();
  }
}
</script>
