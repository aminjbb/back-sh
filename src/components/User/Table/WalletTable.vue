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
                    <span v-if="item.user.phone_number" class="t14300 text-gray500 py-5">
                        {{ item.user.phone_number }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>


          <div
              v-if=" header[2].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.user.first_name" class="t14300 text-gray500 py-5">
                        {{ item.user.first_name }} {{ item.user.last_name }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>

          <div
              v-if=" header[3].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.refid" class="t14300 text-gray500 py-5">
                        {{ item.refid }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>

          <div
              v-if=" header[4].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.status" class="t14300 text-gray500 py-5">
                        {{ item.status }}
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
                        {{ item.status }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>
          <div
              v-if=" header[6].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.type == 'withdraw'" class="t14300 text-error py-5">
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
                    <span v-if="item.email" class="t14300 text-gray500 py-5">
                        {{ item.email }}
                    </span>
            <span v-else class="t14300 text-gray500 py-5">
                        ----
                    </span>
          </div>
          <div
              v-if=" header[9].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.email" class="t14300 text-gray500 py-5">
                        {{ item.email }}
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
  AxiosCall
} from '@/assets/js/axios_call.js'
import {
  PanelFilter
} from "@/assets/js/filter"
import {
  openToast,
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
    /**
     * Mass update modal
     */

    getStatusColor(status) {
      const color = '';

      if (status == 'open') {
        return 'green';
      }
      if (status == 'answered') {
        return 'green';
      }
      if (status == 'resolved') {
        return 'grey-lighten-1';
      }
      if (status == 'postponed') {
        return 'red';
      }

      return '';
    },

    getStatusText(status) {
      const text = '';

      if (status == 'open') {
        return 'باز';
      }
      if (status == 'answered') {
        return 'پاسخ داده شده';
      }
      if (status == 'resolved') {
        return 'بسته شده';
      }
      if (status == 'postponed') {
        return 'متوقف شده';
      }
      if (status == 'seen') {
        return 'دیده شده';
      }

      return 'نامعلوم';
    },

    getPriorityText(priority) {
      const text = '';

      if (priority == 'urgent') {
        return 'ضروری';
      }
      if (priority == 'low') {
        return 'پایین';
      }
      if (priority == 'high') {
        return 'بالا';
      }
      if (priority == 'medium') {
        return 'متوسط';
      }

      return 'معمولی';
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
     * Change filter
     * @param {*} index
     * @param {*} item
     */


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
