<template>
  <div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading" />

    <header class="c-table__header d-flex justify-between">
      <template v-for="(head, index) in header">
        <div
            v-if="head.show"
            @click="createOrdering(head.value, head.order)"
            class="text-center c-table__header__item t12 w500 text-black"
            style="padding:20px 3px"
            :class="head.order == true ? 'pointer' : ''"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
          {{ head.name }}
        </div>
      </template>
    </header>

    <div class="stretch-table">
      <div
          v-if="items && items.length > 0/*  && !loading */ "
          class="c-table__contents">
        <div
            v-for="(item , index) in items"
            :key="index"
            :class="oddIndex(index) ? 'bg-gray90' : ''"
            class="d-flex justify-between c-table__contents__row">
          <div
              v-if="header[0].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t14 w300 text-gray500 py-5 number-font">{{ rowIndexTable(index) }}</span>
          </div>

          <div
              v-if="header[1].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t14 w300 text-gray500 py-5 number-font">{{ item.shps?.id }}</span>
          </div>

          <div
              v-if="header[2].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
             <span class="t14 w300 text-gray500 py-5 number-font">
               <template v-if="item.shps">{{ item.shps?.sku?.label   }}</template>
               <template v-else>-</template>
             </span>
          </div>

          <div
              v-if="header[3].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t13 w400 text-gray500 py-5">
              <template v-if="item.count">{{ item.count }}</template>
              <template v-else>-</template>
            </span>
          </div>

          <div
              v-if="header[4].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-text-field v-model="form[index].cancelled_count"  variant="outlined" />
          </div>

          <div
              v-if="header[4].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="number-font text-gray500">
                {{item.cancelled_count}}
              </span>
          </div>

          <div
              v-if="header[5].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
               :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t13 w400 text-gray500 py-5 number-font">
              {{ item.remained_count }}
            </span>
          </div>

          <div
              v-if="header[6].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
               :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t13 w400 text-gray500 py-5 number-font">
              <template v-if="item.shps">{{ item.shps?.sku?.seller?.shopping_name }}</template>
              <template v-else>-</template>
            </span>
          </div>

          <div
              v-if="header[7].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t13 w400 text-gray500 py-5 number-font">
              <template v-if="item.customer_price">{{ splitChar(item.customer_price) }}</template>
              <template v-else>-</template>
            </span>
          </div>

          <div
              v-if="header[8].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t13 w400 text-gray500 py-5 number-font">
              <template v-if="item.base_discount">{{ splitChar(item.base_discount) }}</template>
              <template v-else>-</template>
            </span>
          </div>

          <div
              v-if="header[9].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t13 w400 text-gray500 py-5 number-font">
              {{ splitChar(item.marketing_discount) }}
            </span>
          </div>

          <div
              v-if="header[10].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t13 w400 text-gray500 py-5 number-font">
              <template v-if="item.voucher_code">{{ splitChar(item.voucher_code) }}</template>
              <template v-else>-</template>
            </span>
          </div>

          <div
              v-if="header[11].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t13 w400 text-gray500 py-5 number-font">
              <template v-if="item.paid_price">{{ splitChar(item.paid_price) }}</template>
              <template v-else>-</template>
            </span>
          </div>

          <div
              v-if="header[12].show"
              class="c-table__contents__item justify-center"
              style="padding:3px"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t13 w400 text-gray500 py-5">
              <template v-if="item.shps_status">{{ item.shps_status }}</template>
              <template v-else>-</template>
            </span>
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
import {isOdd, splitChar} from "@/assets/js/functions";

export default {

  props: {
    /**
     * List Items for header
     */
    header: Array,

    /**
     * List of items
     */
    items: Array,

    /**
     * Height
     */
    height: {
      type: String,
      default: '500',
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
    }
  },

  data() {
    return {
      order_type: "desc",
      ordering: {},
      per_page: '25',
      form: [],
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
    splitTime(date) {
      try {
        const dateSplit = date.split(' ')
        return dateSplit[1]
      } catch (e) {

      }
    },
    splitChar,
    /**

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
          let query = this.$route.query
          if (this.order_type === 'desc') {
            this.order_type = 'asc'
          } else {
            this.order_type = 'desc'
          }
          this.$router.replace({
            query: {
              ...query,
              order_type :this.order_type,
              order :index
            }
          })

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


    /**
     * Return odd index
     * @param {*} index
     */
    oddIndex(index) {
      return isOdd(index)
    },

    getShpsStatus(status) {
      if (status === 'saman') {
        return 'درگاه سامان'
      } else if (status === 'wallet') {
        return 'کیف پول'
      } else if (status === 'snapp') {
        return 'اسنپ پی'
      }
    }


  },


  watch:{
    items(newVal){
      this.form = []
      if (newVal.length){
        newVal.forEach(item=>{
          const form = {
            shps: item.shps?.id,
            count:item.remained_count,
            cancelled_count : 0
          }
          this.form.push(form)
        })

      }
    }
  }
}
</script>
