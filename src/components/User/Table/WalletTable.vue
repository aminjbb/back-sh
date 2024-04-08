<template>
  <div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading" />

    <header class="c-table__header d-flex justify-between">
      <template v-for="(head, index) in header">
        <div
            v-if="head.show"
            @click="createOrdering(head.value, head.order)"
            class="text-center c-table__header__item t12500"
            :class="head.order == true ? 'pointer' : ''"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
          {{head.name}}
        </div>
      </template>
    </header>

    <div class="stretch-table">
      <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
        <div
            v-for="(item , index) in items"
            :key="index"
            :class="oddIndex(index) ? 'bg-gray90' : ''"
            class="d-flex justify-between c-table__contents__row">
          <div
              v-if="header[0].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
          </div>

          <div
              v-if=" header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item?.user?.phone_number" class="t14300 text-gray500 py-5 number-font">
                        {{ item?.user?.phone_number }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>


          <div
              v-if=" header[2].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item?.user?.first_name" class="t14300 text-gray500 py-5">
                        {{ item?.user?.first_name }} {{ item?.user?.last_name }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>

          <div
              v-if=" header[3].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">

            <button v-if="item.refid" type="button" v-clipboard:copy="item.refid" v-clipboard:success="onCopy" v-clipboard:error="onError" class=" text-right">
              <span class="text-gray500 t14300 text-right"> {{ item.refid.substring(0,15) }}</span>
            </button>

            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>

          <div
              v-if=" header[4].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.status" class="t14300 text-gray500 py-5">
                        {{ translateType(item.status) }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>
          <div
              v-if=" header[5].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.status" class="t14300 text-gray500 py-5">

                        {{ translateType(item.charge_type) }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>
          <div
              v-if=" header[6].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.type == 'withdraw'" class="t14300 text-error py-5 number-font">
                        - {{splitChar(item.amount ) }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>

          <div
              v-if=" header[7].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                      <span v-if="item.type === 'deposit'" class="t14300 text-success py-5 number-font d--ltr">
                        + {{splitChar( item.amount)}}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>
          <div
              v-if=" header[8].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.wallet" class="t14300 text-gray500 py-5 number-font">
                        {{ splitChar(item.wallet.value) }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>
          <div
              v-if=" header[9].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.created_at_fa" class="t14300 text-gray500 py-5 number-font">
                        {{ item.created_at_fa }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>


        </div>
      </div>
      <div v-else class="null-data-table d-flex justify-center align-center flex-column">
        <img src="@/assets/img/NullTable.png" alt="shavaz image">
        <div class="d-flex justify-center align-center flex-column">
          <span class="title4 text-black mb-5">لیست خالی!</span>
          <span class="t14300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
        </div>
      </div>
    </div>
    <ModalMassUpdate :updateUrl="updateUrl" />
  </div>
</template>

<script>
import {
  openToast
} from "@/assets/js/functions";
import {
  PanelFilter
} from "@/assets/js/filter"
import {
  openConfirm,
  convertDateToJalai,
  isOdd,
  splitChar
} from "@/assets/js/functions";
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
export default {
  components: {ModalMassUpdate},

  props: {
    /**
     * List Items for header
     */
    header: [],

    /**
     * List of items
     */
    items: [],

    /**
     * Model
     */
    model: '',

    /**
     * Height
     */
    height: {
      type: String,
      default: '500',
    },

    /**
     * Edit endpoint for change filter
     */
    editPath: {
      type: String,
      default: ''
    },
    /**
     * Edit endpoint for change ban
     */
    banPath: {
      type: String,
      default: ''
    },
    /**
     * Delete endpoint for change filter
     */
    deletePath: {
      type: String,
      default: ''
    },

    /**
     * url for edit user
     */
    editUrl: {
      type: String,
      default: ''
    },
    /**
     * url for edit user
     */
    updateUrl: {
      type: String,
      default: ''
    },

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


  },

  data() {
    return {
      order_type: "desc",
      ordering: {},
      per_page: '25',
      filter: [],
      isBan:[],
      panelFilter: new PanelFilter(),
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
  },

  methods: {
    splitChar,
    convertDateToJalai,

    translateType(type) {
      const translations = {
        'post_cost': 'هزینه پستی',
        'difference_order': 'مغایرت',
        'cancel_order': ' انصراف از خرید',
        'return_order': ' مرجوعی سفارش',
        'other': ' سایر',
        'success': 'موفق ',
        'waiting': 'در انتظار',
        'failed': 'ناموفق',
        'cancel': 'کنسل شده',

      };
      return translations[type] || type;
    },

    /**
     * Clipboard success msg
     */
    onCopy() {
      openToast(
          this.$store,
          'متن  با موفقیت کپی شد.',
          "success"
      );
    },
    /**
     * Clipboard error msg
     */
    onError() {
      openToast(
          this.$store,
          'کپی متن با مشکل مواجه شد.',
          "error"
      );
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
     * Create ordering
     * @param {*} index
     * @param { boolean } order
     */
    createOrdering(index, order) {
      if (order === true) {
        if (index) {
          if (this.order_type === 'desc') {
            this.order_type = 'asc'
            this.panelFilter.order_type = 'asc'
          } else {
            this.order_type = 'desc'
            this.panelFilter.order_type = 'desc'
          }

          this.panelFilter.order = index
          this.$router.push(this.$route.path + this.panelFilter.sort_query(this.$route.query))

          this.ordering = {};
          this.ordering[index] = !this.ordering[index];
        }
      }
    },

    /**
     * Get icon
     * @param {*} column
     */
    getIcon(column) {
      return this.ordering[column] ? 'mdi-sort-descending' : 'mdi-sort-ascending';
    },

    returnTrueOrFalse(data) {
      if (data === 1) return true
      else return false
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
     * @param {*} id
     */
    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", this.deletePath + id, true)
    },
  },
  watch:{
    items(val){
      val.forEach(admin => {
        if (admin.is_ban === 1)  this.isBan.push(true)
        else this.isBan.push(false)
      })
    }
  }
}
</script>
