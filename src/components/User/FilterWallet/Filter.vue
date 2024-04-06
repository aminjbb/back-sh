<template>
  <div class="text-center c-modal-table-filter">
    <v-btn @click="openModal()" variant="outlined" rounded class="px-3 mt-1 mr-4">
      <template v-slot:prepend>
        <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
      </template>
      فیلتر
    </v-btn>

    <v-dialog v-if="dialog" v-model="dialog" width="1000">
      <v-card>
        <v-row justify="center" align="center" class="pa-5">
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
          <v-row justify="end" align="center" class="px-10">
            <template v-for="(Filter, index) in filterFieldWallet" :key="index">
              <!-- Text filds -->
              <v-col v-if="Filter.type === 'text'" cols="4">
                <div class="t13300 text-right mb-1">{{ Filter.name }}</div>

                <v-text-field variant="outlined" :placeholder="Filter.place" :name="Filter.value " v-model="values[index].value" />
              </v-col>

              <!-- Auto complete fields -->
              <template v-else-if="Filter.type === 'auto-complete'">
                <v-col cols="4">
                  <div class="t13300 text-right mb-1">{{ Filter.name }}</div>
                  <v-autocomplete v-if="Filter.value === 'admin'" :items="adminList" v-model='admin' item-title="label" item-value="value" single-line no-data-text="لطفا ادمین را جستجو کنید" clearable v-debounce="searchAdmin" variant="outlined" />
                  <v-autocomplete v-if="Filter.value === 'user_id'" placeholder="شماره تلفن کاربر را وارد کنید" variant="outlined" prepend-inner-icon-cb="mdi-map-marker" rounded="lg" v-model="user" :items="userList" item-title="name" item-value="value" v-debounce="searchUser">

                  </v-autocomplete>
                </v-col>

              </template>
              <!-- Select fields -->
              <template v-else-if="Filter.type === 'select'">
                <v-col cols="4">
                  <div class="t13300 text-right mb-1">{{ Filter.name }}</div>

                  <v-select v-if="Filter.value === 'status'" density="compact" variant="outlined" single-line item-title="label" item-value="value" :items="statusItems" v-model="statusModel" />
                  <v-select v-if="Filter.value === 'charge_type'" density="compact" variant="outlined" single-line item-title="label" item-value="value" :items="transactionReason" v-model="transactionModal" />

                </v-col>
              </template>

              <!-- Date fields -->
              <template v-else-if="Filter.value === 'created_at'">
                <v-col cols="4" class="mt-3">
                  <div class="t13300 text-right mb-1">{{ Filter.name }}</div>
                  <date-picker range clearable class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font" format="jYYYY-jMM-jDD" display-format="jYYYY-jMM-jDD" v-model="createdAtModel" variant="outlined" />
                </v-col>
              </template>
            </template>
          </v-row>
        </div>

        <div class="mt-3 mb-5 px-5">
          <v-divider />
        </div>

        <v-row justify="center" align="center" class="px-5 pb-2">
          <v-col cols="6">
            <v-btn @click="removeAllFilters()" variant="text" height="40" rounded class="px-5 mt-1 mr-5">
              حذف همه فیلترها
            </v-btn>
          </v-col>

          <v-col cols="6">
            <div class="text-right">
              <v-btn @click="setFilter()" color="primary500" height="40" rounded class="px-5 mt-1 mr-5">
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

import {UserWalletFilter} from "@/assets/js/wallet_filter.js";
import value from "@/composables/Export";
import {
  AxiosCall
} from "@/assets/js/axios_call";
import {
  jalaliToGregorian
} from '@/assets/js/functions';

export default {
  props: {
    filterFieldWallet: [],
    path: ''
  },


  data() {
    return {
      dialog: false,
      active: false,
      values: [],
      userSearchList: [],
      createdAtModel: null,
      statusModel: '',
      transactionModal: '',
      gregorianCreateDate: [],
      gregorianUpdateDate: [],
      statusItems: [{
        label: 'در انتظار',
        value: 'waiting',
      },
        {
          label: 'کنسل شده',
          value: 'cancel',
        },
        {
          label: '  ناموفق',
          value: 'failed ',
        },
        {
          label: 'موفق',
          value: 'success  ',
        }
      ],
      transactionReason: [{
        label: 'هزینه پستی',
        value: 'post_cost',
      },
        {
          label: 'انصراف از خرید',
          value: ' cancel_order',
        },
        {
          label: 'مغایرت',
          value: 'difference_order',
        },
        {
          label: 'سایر',
          value: 'other',
        },
        {
          label: 'مرجوعی سفارش',
          value: 'return_order',
        },
      ]

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
    status() {
      try {
        const labelObject = this.values.find(element => element.name === 'status');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    deposit_amount_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'deposit_amount_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    deposit_amount_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'deposit_amount_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    withdraw_amount_to() {
      try {
        const labelObject = this.values.find(element => element.name === 'withdraw_amount_to');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    withdraw_amount_from() {
      try {
        const labelObject = this.values.find(element => element.name === 'withdraw_amount_from');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    shvz_tracking_code() {
      try {
        const labelObject = this.values.find(element => element.name === 'shvz_tracking_code');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    refid() {
      try {
        const labelObject = this.values.find(element => element.name === 'refid');
        return labelObject.value
      } catch (error) {
        return ''
      }
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
    value,

    setFilter() {

      const filter = new UserWalletFilter()
      filter.page = 1;
      if (this.user ?.id) {
        filter.user_id = this.user ?.id
      } else {
        filter.user_id = null
      }
      if (this.statusModel) {
        filter.status = this.statusModel
      } else {
       filter.status = null
      }
      if (this.withdraw_amount_to) {
        filter.withdraw_amount_to = this.withdraw_amount_to
      } else {
        filter.withdraw_amount_to = null
      }
      if (this.withdraw_amount_from) {
        filter.withdraw_amount_from = this.withdraw_amount_from
      } else {
        filter.withdraw_amount_from = null
      }
      if (this.deposit_amount_from) {
        filter.deposit_amount_from = this.deposit_amount_from
      } else {
        filter.deposit_amount_from = null
      }
      if (this.deposit_amount_to) {
        filter.deposit_amount_to = this.deposit_amount_to
      } else {
        filter.deposit_amount_to = null
      }
      if (this.shvz_tracking_code) {
        filter.shvz_tracking_code = this.shvz_tracking_code
      } else {
        filter.shvz_tracking_code = null
      }
      if (this.refid) {
        filter.refid = this.refid
      } else {
        filter.refid = null
      }
      if (this.createdAt && this.createdAt[0]) {
        filter.created_at_from = this.createdAt[0]
      } else {
        filter.created_at_from = null
      }
      if (this.createdAt && this.createdAt[1]) {
        filter.created_at_to = this.createdAt[1]
      } else {
        filter.created_at_to = null
      }

      if(this.$route.query.per_page){
        filter.per_page = this.$route.query.per_page;
      }
      this.$router.push('/' + this.path + '/' + filter.query_maker(this.$route.query));
      this.dialog = false;
    },

    removeAllFilters() {
      this.$router.push('/' + this.path);
      this.values = [];

      this.filterFieldWallet.forEach(el => {
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
    }
  },

  mounted() {
    this.filterFieldWallet.forEach(el => {
      const form = {
        name: el.value,
        value: ''
      }
      this.values.push(form)
    })
  }
}
</script>