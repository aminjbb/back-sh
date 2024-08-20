<template>
  <div
      :class="variant == 'outlined' ? 'table-outlined': ''"
      :style="{height: height}"
      class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading"/>

    <header class="c-table__header d-flex justify-between">
      <template v-for="(head, index) in header">
        <template v-if="head.value">
          <div
              v-if="head.show"
              @click="createOrdering(head.value, head.order)"
              class="text-center c-table__header__item t11 w500"
              :class="head.order == true ? 'pointer' : ''"
              :key="index"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-icon v-if="head.order == true"/>
            {{ head.name }}
          </div>
        </template>
        <template v-else>
          <div
              v-if="head.show"
              class="text-center c-table__header__item t11 w500"
              :class="head.order == true ? 'pointer' : ''"
              :key="index"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-icon v-if="head.order == true"/>
            {{ head.name }}
          </div>
        </template>
      </template>
      <div
          v-if="model !== 'permission' "
          class="c-table__header__item"
          :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
        <v-menu :location="location">
          <template v-slot:activator="{ props }">

            <span v-bind="props">
                        عملیات
                    </span>
          </template>
        </v-menu>
      </div>
    </header>
    <div class="stretch-table">
      <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
        <div
            v-for="(item , index) in items"
            :key="index"
          :class="item.pay_type != 'snapp' ? 'bg-primary400' : ''"
            class="d-flex justify-between">
          <div
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          1
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          {{ item.id }}
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          {{ item.order_number }}
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          {{ item.user.first_name }}
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          {{ item.user.phone_number }}
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          {{ item.items_count }}
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          {{getOrderStatus(item.status )}}
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          <v-chip :color="chipColor(statuses[index])">
                          {{ statuses[index] }}
                          </v-chip>
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font" v-if="item.pay_type === 'wallet'">
                          کیف پول
                        </span>
              <span class="t14 w300 text-gray500 py-5 number-font" v-else-if="item.pay_type === 'snapp'">
                          اسنپ پی
                        </span>
              <span class="t14 w300 text-gray500 py-5 number-font" v-else>
                         پرداخت اینترنتی
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          {{ splitChar(item.paid_price) }}
                        </span>

            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font" v-if="item.shipping">
                          <v-icon color="success" size="30">mdi-check</v-icon>
                        </span>
                        <span class="t14 w300 text-gray500 py-5 number-font" v-else>
                          <v-icon color="error" size="30">mdi-close</v-icon>
                        </span>

            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font" v-if="item.sending_method === 'nafis'">
                          نفیس اکسپرس
                        </span>
                        <span class="t14 w300 text-gray500 py-5 number-font" v-if="item.sending_method === 'post'">
                         پست
                        </span>
                        <span class="t14 w300 text-gray500 py-5 number-font" v-if="item.sending_method === 'pishtaz'">
                          پست پیشتاز
                        </span>


            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                          {{ item.submit_date }}
                        </span>



            </div>
          </div>
          <div
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
              class="c-table__contents__item">
            <v-menu :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props">
                  mdi-dots-vertical
                </v-icon>
              </template>

              <v-list class="c-table__more-options">
                <v-list-item>
                  <v-list-item-title>
                    <div class="ma-5 pointer" @click="cancelSnapPayOrder(item.order_number , index)">
                      <v-icon class="text-grey-darken-1">mdi-pencil-box-outline</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14 w300">
                                            کنسل سفارش
                                        </span>
                    </div>
                  </v-list-item-title>

                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <div class="ma-5 pointer" @click="removeItem(index)">
                      <v-icon class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14 w300">
                                            حذف
                                        </span>
                    </div>
                  </v-list-item-title>

                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
      <div v-else class="null-data-table d-flex justify-center align-center flex-column">
        <img src="@/assets/img/NullTable.png" alt="shavaz image">
        <div class="d-flex justify-center align-center flex-column">
          <span class="t18 w600 text-black mb-5">لیست خالی!</span>
          <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isOdd, splitChar
} from '@/assets/js/functions'


import {
  openConfirm
} from '@/assets/js/functions';
import {AxiosCall} from "@/assets/js/axios_call";
import {log10} from "chart.js/helpers";

export default {


  props: {
    updateUrl: {
      type: String,
      default: '',
    },
    /**
     * Edit button url
     */
    editUrl: '',

    /**
     * List Items for header
     */
    header: [],

    /**
     * List of items
     */
    items: [],

    /**
     * Delete Path
     */
    deletePath: '',
    /**
     * Page on table
     */
    page: {
      type: Number,
      default: 1
    },

    /**
     * PerPage of data
     */
    perPage: {
      type: Number,
      default: 1
    },

    /**
     * Active loading
     */
    loading: {
      type: Boolean,
      default: false
    },
    uploadImageUrl: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      statuses:[],
      orderStatus: [
        {
          text: 'پرداخت شده',
          value: 'paid'
        },
        {
          text: 'پیش پردازش',
          value: 'pre_progress'
        },
        {
          text: 'در حال ارسال',
          value: 'sending'
        },
        {
          text: 'در حال پردازش',
          value: 'processing'
        },
        {
          text: 'لغو شده',
          value: 'cancelled'
        },
        {
          text: 'تحویل شده',
          value: 'received'
        },
        {
          text: 'مرجوعی',
          value: 'returned'
        },
        {
          text: 'در انتظار پرداخت',
          value: 'payment_in_progress'
        },
        {
          text: 'انقضای سفارش',
          value: 'payment_out_date'
        },
        {
          text: 'درحال بسته بندی',
          value: 'boxing'
        }
      ],
    }
  },

  computed: {
    /**
     * Get each items table based of header length
     */
    itemsWidth() {
      let headerLength = 0;
      if (this.header && this.header.length > 0) {
        this.header.forEach(element => {
          if (element.show == true) {
            headerLength++;
          }
        });
        const width = 100 / (headerLength + 1);
        return `${width}%`;
      }
      return 'auto';
    },
    /**
     * Get row index in table
     * @param {*} index
     */
    rowIndexTable(index) {
      let rowIndex = 0
      if (this.page === 1) {
        rowIndex = (1 + index)
        return rowIndex
      } else {
        rowIndex = ((this.page - 1) * this.perPage) + index + 1
        return rowIndex
      }
    },

    /**
     * Check is_active is true or false for show in table
     */
    checkActive() {
      this.header.forEach(element => {
        if (element.value === 'is_active' && element.show == true) {
          this.activeColumn = true;
        } else if (element.value === 'is_active' && element.show == false) {
          this.activeColumn = false;
        }
      });
      return this.activeColumn;
    },
  },

  watch: {
    items(val){
      val.forEach(element=>{
        this.statuses.push('در انتظار')
      })
    }
  },

  methods: {
    splitChar,

    async cancelSnapPayOrder(id , index){

     try {
       var formData = new FormData();
       const AxiosMethod = new AxiosCall()
       AxiosMethod.end_point = 'admin/order/cancel/snapp/orders'
       formData.append('order_number[0]', id)
       AxiosMethod.store = this.$store
       AxiosMethod.toast_error = true
       AxiosMethod.form = formData
       AxiosMethod.using_auth = true
       AxiosMethod.token = this.$cookies.get('adminToken')
       let data = await AxiosMethod.axios_post()
       if (data){
         this.statuses[index] = 'موفق'
       }
       else{
         this.statuses[index] = 'ناموفق'
       }
     }
     catch (e) {
       this.statuses[index] = 'ناموفق'
     }
    },

    chipColor(status){
      if (status === 'در انتظار') return 'warning'
      else if (status === 'موفق') return 'success'
      else if (status === 'ناموفق') return 'error'
    },
    /**
     * return persian order status
     * @param {*} status
     */
    getOrderStatus(status) {
      const persianStatus = this.orderStatus.find(orderStatus => orderStatus.value === status)
      if (persianStatus) return persianStatus.text

    },


    /**
     * Get icon
     * @param {*} column
     */
    getIcon(column) {
      return this.ordering[column] ? 'mdi-sort-descending' : 'mdi-sort-ascending';
    },


    /**
     * Return odd index
     * @param {*} index
     */
    oddIndex(index) {
      return isOdd(index)
    },

    /**
     * Remove Item
     * @param {*} index
     */
    removeItem(index) {
      this.$emit('removeItem' , index)
    },

    changeStatus(index , text){
      this.statuses[index] = text
    }
  },
}
</script>
