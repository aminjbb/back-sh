<template>
  <div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading" />

    <header class="c-table__header d-flex justify-between">
      <template v-for="(head, index) in header">
        <div v-if="head.show" class="text-center c-table__header__item t12500 text-black" style="padding:20px 3px" :class="head.order == true ? 'pointer' : ''" :key="index" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          {{ head.name }}
        </div>
      </template>

      <div class="text-center c-table__header__item t12500 text-black" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" style="padding:20px 3px">
        عملیات
      </div>
    </header>
    <div class="stretch-table">
      <div v-if="items && items.length > 0/*  && !loading */ " class="c-table__contents">
        <div v-for="(item , index) in items" :key="index" :class="oddIndex(index) ? 'bg-gray90' : ''" class="d-flex justify-between c-table__contents__row">
          <div v-if="header[0].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ rowIndexTable(index) }}
                    </span>
          </div>

          <div v-if="header[1].show" class="c-table__contents__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <img :src="item.image" width="48" height="48">
          </div>

          <div v-if="header[2].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.label">
                          {{ item.label }}
                        </template>
                        <template v-else>
                          -
                        </template>
                    </span>
          </div>

          <div v-if="header[3].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.customerPrice">
                            {{ item.customerPrice}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>

          <div v-if="header[4].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.sitePrice">
                            {{ item.sitePrice }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>

          <div v-if="header[5].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.siteStock">
                            {{ item.siteStock }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>

          <div v-if=" header[6].show" class="c-table__contents__item number-font text-right" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-text-field v-model="item.count"  variant="outlined"/>
          </div>

          <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-center">
            <v-menu :location="location">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" class="text-gray500">
                  mdi-dots-vertical
                </v-icon>
              </template>

              <v-list class="c-table__more-options">
                <v-list-item-title>
                  <div class="ma-3 pointer d--rtl"  @click="removeItem(item.id)">
                    <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
                    <span class="mr-2 text-grey-darken-1 t14300">حذف</span>
                  </div>
                </v-list-item-title>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
      <div v-else class="null-data-table d-flex justify-center align-center flex-column">
        <img src="@/assets/img/NullTable.png" alt="shavaz image">
        <div class="d-flex justify-center align-center flex-column">
          <span class="title4 text-black mb-5">لیست خالی!</span>
          <span class="t14300 text-gray500">تاکنون کالایی به لیست، افزوده نشده است.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isOdd, openConfirm,
  splitChar
} from "@/assets/js/functions";
import {th} from "vuetify/locale";

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
     * Model
     */
    model: String,

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
      per_page: '25'
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
     * Return odd index
     * @param {*} index
     */
    oddIndex(index) {
      return isOdd(index)
    },


    removeItem (id) {
      const index = this.items.findIndex(item=> item.id === id)
      if (index !== -1) {
        this.items.splice(index,1)
      }

    }
  },
}
</script>
