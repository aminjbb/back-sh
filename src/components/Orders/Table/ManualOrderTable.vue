<template>
  <div   :class="variant == 'outlined' ? 'table-outlined': ''"
      :style="{height: height}" class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading" />

    <header class="c-table__header d-flex justify-between">
      <template v-for="(head, index) in header">
        <template v-if="head.value">
          <div
              v-if="head.show"
              @click="createOrdering(head.value, head.order)"
              class="text-right c-table__header__item t12500"
              :class="head.order == true ? 'pointer' : ''"
              :key="index"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
            {{head.name}}
          </div>
        </template>
        <template v-else>
          <div
              v-if="head.show"
              class="text-right pointer c-table__header__item t12500"
              :key="index"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            {{head.name}}
          </div>
        </template>
      </template>
      <div class="c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t12500 ">
                عملیات
            </span>
      </div>
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
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{rowIndexTable(index)}}
                        </span>
              <template v-if="checkbox">
                <v-checkbox class="mr-1" v-model=item.value />
              </template>
            </div>
          </div>

          <div
              v-if="header[1].show"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
              class="c-table__contents__item">
            <template v-if="item?.shps?.sku?.image_url">
                        <span class="t14300 text-gray500 py-5 number-font">
                          <img :src="item?.shps?.sku?.image_url" width="48" height="48" alt="shps">
                        </span>

            </template>
            <template v-else>
                        <span class="t14300 text-gray500 py-5 number-font">
                            -
                        </span>

            </template>

          </div>
          <div
              v-if="header[2].show"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
              class="c-table__contents__item">
            <template v-if="item?.shps?.sku">
                        <span class="t14300 text-gray500 py-5 number-font">
                           {{ item?.shps?.sku?.label }}
                        </span>

            </template>
            <template v-else>
                        <span class="t14300 text-gray500 py-5 number-font">
                            -
                        </span>

            </template>

          </div>
          <div
              v-if="header[3].show"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
              class="c-table__contents__item">
            <template v-if="item.customer_price">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{ item.customer_price }}
                        </span>

            </template>
            <template v-else>
                        <span class="t14300 text-gray500 py-5 number-font">
                            0
                        </span>

            </template>

          </div>
          <div
              v-if="header[4].show"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
              class="c-table__contents__item">
            <template v-if="item.site_price">
                        <span class="t14300 text-gray500 py-5 number-font">
                           {{ item?.site_price}}

                        </span>

            </template>
            <template v-else>
                        <span class="t14300 text-gray500 py-5 number-font">
                            0
                        </span>

            </template>

          </div>
          <div
              v-if="header[5].show"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
              class="c-table__contents__item">
            <template v-if=" item?.shps?.site_stock">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{ item?.shps?.site_stock}}
                        </span>

            </template>
            <template v-else>
                        <span class="t14300 text-gray500 py-5 number-font">
                            0
                        </span>

            </template>

          </div>
          <div
              v-if="header[6].show"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
              class="c-table__contents__item" >
                        <div style="width: 100%;">
                             <v-text-field v-model="values[index].count" variant="outlined"/>
                        </div>
          </div>
            <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item">
            <v-menu :location="location">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props">
                  mdi-dots-vertical
                </v-icon>
              </template>

              <v-list class="c-table__more-options">

                <v-list-item>
                  <v-list-item-title>
                    <div class="ma-5 pointer" @click="removeItem(index)">
                      <v-icon color="grey-darken-1" icon="mdi-trash-can-outline" size="xsmall"/>
                      <span class="mr-2 text-grey-darken-1 t14300">
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
          <span class="title4 text-black mb-5">لیست خالی!</span>
          <span class="t14300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
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
  AxiosCall
} from '@/assets/js/axios_call.js'

import {
  PanelFilter
} from "@/assets/js/filter"
export default {
  components: {
  },

  props: {
    /**
     * Update button url
     */
    updateUrl: {
      type: String,
      default: '',
    },

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
     * Model
     */
    model: '',

    /**
     * Active checkbox
     */
    checkbox: {
      type: Boolean,
      default: false,
    },

    /**
     * Variant
     * Variant values: outlined
     */
    variant: {
      type: String,
      default: 'default',
    },

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
     * Edit endpoint for change active
     */
    activePath: {
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
      active: [],
      filter: [],
      panelFilter: new PanelFilter(),
      values:[],
      activeColumn: false,
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

  watch: {
    items(val) {

    }
  },

  methods: {
    splitChar,
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

            if (this.model === 'sku') {
              this.skuPanelFilter.order_type = 'asc'
            } else {
              this.panelFilter.order_type = 'asc'
            }
          } else {
            this.order_type = 'desc'

            if (this.model === 'sku') {
              this.skuPanelFilter.order_type = 'desc'
            } else {
              this.panelFilter.order_type = 'desc'
            }
          }



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
     * Change Active
     * @param {*} index
     * @param {*} item
     */
    async changeActive(index, item) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = this.activePath + item?.sku?.id
      if (this.active[index]) formdata.append('is_active', 1)
      else formdata.append('is_active', 0)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata

      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
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
    removeItem (index) {

      this.items.splice(index,1)

    },

    updateList(status) {
      this.$emit('updateList', status);
    },
  },
}
</script>
