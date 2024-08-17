<template>
  <div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading"/>

    <header class="c-table__header d-flex justify-space-evenly ">
      <template v-for="(head, index) in header">
        <div
            v-if="head.show"
            class="text-center c-table__header__item t12 w500 ml-15"
            :class="head.order == true ? 'pointer' : ''"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          <v-icon v-if="head.order == true"/>
          {{ head.name }}
        </div>

      </template>

    </header>

    <div class="stretch-table">
      <div v-if="items && items.length > 0 && !loading" class="c-table__contents ">
        <div
            v-for="(item , index) in items"
            :key="index"
            :class="oddIndex(index) ? 'bg-gray90' : ''"
            class="d-flex  c-table__contents__row "

        >
          <div
              v-if="header[0].show"
              class="c-table__contents__item justify-center "
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
              >
                    <span class="t14 w300 text-gray500 py-5 number-font ">
                        {{ rowIndexTable(index) }}
                    </span>
          </div>

          <div
              v-if=" header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }"
              >
                    <span class="t14 w300 text-gray500 py-5">
                        {{ item.code }}
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
import {
  isOdd
} from '@/assets/js/functions'


export default {

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
    },


  },

  data() {
    return {
      order_type: "desc",
      ordering: {},
      per_page: '25',
      filter: [],
      isBan: [],
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
     * Return odd index
     * @param {*} index
     */
    oddIndex(index) {
      return isOdd(index)
    },

  },

}
</script>
