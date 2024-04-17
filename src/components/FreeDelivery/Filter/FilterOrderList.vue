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
            <template v-for="(filter, index) in filterFieldCOrderList" :key="index">
              <v-col v-if="filter.type === 'text' " cols="4">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <v-text-field
                    variant="outlined"
                    :name="filter.value"
                    hide-details
                    v-model="values[index].value" />
              </v-col>




              <template v-else-if="filter.type === 'auto-complete'">
                <v-col cols="4">
                  <div class="t13300 text-right mb-1">{{ filter.name }}</div>
                  <v-autocomplete v-if="filter.value === 'user_id'" placeholder="شماره تلفن کاربر را وارد کنید" variant="outlined" prepend-inner-icon-cb="mdi-map-marker" rounded="lg" v-model="user" :items="userList" item-title="name" item-value="value" v-debounce="searchUser">

                  </v-autocomplete>
                </v-col>

              </template>



              <template v-else-if="filter.value === 'created_at'">
                <v-col cols="4" class="mt-3">
                  <div class="t13300 text-right mb-1">{{ filter.name }}</div>
                  <date-picker range clearable class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font" format="jYYYY-jMM-jDD" display-format="jYYYY-jMM-jDD" v-model="createdAtModel" variant="outlined" />
                </v-col>
              </template>            </template>
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
  AxiosCall
} from "@/assets/js/axios_call";
import {
  OrderListPanelFilter
} from '@/assets/js/filter_free_delivery_order_list.js'
import FreeDelivery from "@/composables/FreeDelivery.js";
import {
  jalaliToGregorian
} from '@/assets/js/functions';

export default {
  props: {
    filterFieldCOrderList: [],
    path: null,
  },

  data() {
    return {
      dialog: false,
      values: [],
      userSearchList: [],
      createdAtModel: null,
      gregorianCreateDate: [],
      gregorianUpdateDate: [],

    }
  },
  setup() {
    const {
      header,
      loading,
      filterFieldCOrderList

    } = FreeDelivery()
    return {
      header,
      loading,
      filterFieldCOrderList

    }
  },

  computed: {
    userList() {
      try {
        let users = []
        this.userSearchList.forEach(user => {
          const form = {
            name: user ?.first_name + ' ' + user ?.last_name + '(' + user.phone_number + ')',
            value: user
          }
          users.push(form)
        })
        return users
      } catch (e) {
        return e
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

    paid_price_from() {
      try {
        const idObject = this.values.find(element => element.name === 'paid_price_from');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    paid_price_to() {
      try {
        const idObject = this.values.find(element => element.name === 'paid_price_to');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    details_count_from() {
      try {
        const idObject = this.values.find(element => element.name === 'details_count_from');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    details_count_to() {
      try {
        const idObject = this.values.find(element => element.name === 'details_count_to');
        return idObject.value
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
      const filter = new OrderListPanelFilter()

      if (this.id) {
        filter.id = this.id
      } else if (this.$route.query.id) {
        filter.id = null
      }
      if (this.user ?.id) {
        filter.user_id = this.user ?.id
      } else {
        filter.user_id = null
      }
      if (this.paid_price_from) {
        filter.paid_price_from = this.paid_price_from
      } else if (this.$route.query.paid_price_from) {
        filter.paid_price_from = null
      }
      if(this.paid_price_to) {
        filter.paid_price_to = this.paid_price_to
      } else if (this.$route.query.paid_price_to) {
        filter.paid_price_to = null
      }
      if (this.createdAt && this.createdAt[0]) {
        filter.submit_date_from_date = this.createdAt[0]
      } else {
        filter.submit_date_from_date = null
      }
      if (this.createdAt && this.createdAt[1]) {
        filter.submit_date_to_date = this.createdAt[1]
      } else {
        filter.submit_date_to_date = null
      }
      if (this.details_count_from && this.details_count_from) {
        filter.details_count_from = this.details_count_from
      } else {
        filter.details_count_from = null
      }
      if (this.details_count_to && this.details_count_to) {
        filter.details_count_to = this.details_count_to
      } else {
        filter.details_count_to = null
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

      this.filterFieldCOrderList.forEach(el => {
        const form = {
          name: el.value,
          value: 'null'
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
    this.filterFieldCOrderList.forEach(el => {
      const form = {
        name: el.value,
        value: ''
      }
      this.values.push(form)
    });


  }
}
</script>
