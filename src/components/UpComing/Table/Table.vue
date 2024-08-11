<template>
  <div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading"/>

    <header class="c-table__header d-flex justify-between">
      <template v-for="(head, index) in header">
        <div
            v-if="head.show"
            @click="createOrdering(head.value, head.order)"
            class="text-center c-table__header__item t12 w500 text-black"
            :class="head.order == true ? 'pointer' : ''"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          <v-icon v-if="head.order == true" :icon="getIcon(head.value)"/>
          {{ head.name }}
        </div>
      </template>

      <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
        <span class="t12 w500 text-black">عملیات</span>
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
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ rowIndexTable(index) }}
                        </span>
          </div>

          <div
              v-if="item.id && header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.id }}
                        </span>
          </div>

          <div
              v-if="header[2].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            <template v-if="item.id">
                                {{ translateType(item.type) }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
          </div>

          <div
              v-if="header[3].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            <template v-if="item.shps_count">
                                {{ item.shps_count }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
          </div>

          <div
              v-if="header[4].show"
              class="c-table__contents__item justify-center "
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            <template v-if="item.shps_variety">
                                {{ item.shps_variety }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
          </div>
          <div
              v-if="header[5].show"
              class="c-table__contents__item justify-center "
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            <template v-if="item.seller">
                                {{ item.seller.shopping_name }}
                            </template>
                            <template v-else-if="item.seller === null">
                                شاواز
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
          </div>
          <div
              v-if="header[6].show"
              class="c-table__contents__item justify-center "
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                              {{ item?.factor?.supplier?.shopping_name }}
                        </span>
          </div>
          <div
              v-if="header[7].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5">
                            <template v-if="item.creator">
                                {{ item.creator.first_name + ' ' + item.creator.last_name }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
          </div>

          <div
              v-if="header[8].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            <template v-if="item.created_at_fa">
                                {{ convertDateToJalai(item.sent_to_warehouse_at , '-' , false) }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
          </div>

          <div
              v-if="header[9].show"
              class="c-table__contents__item justify-center"
              :ref="`factor--${index}`"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <template v-if="item.status">
              <div
                  class="factor-dropdown__selected"
                  :style="{ backgroundColor: BgSelected(item.status) }">
                <span style="font-size: 9px " > در حال ارسال به انبار</span>
              </div>
            </template>
            <template v-else>
              نامعلوم
            </template>
          </div>

          <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-center">
            <v-menu :close-on-content-click="false" :location="location">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" class="text-gray500">
                  mdi-dots-vertical
                </v-icon>
              </template>

              <v-list class="c-table__more-options">
                <v-list-item>
                  <v-list-item-title>
                    <div v-if="model ==='assignShpsToPackage'" class="ma-5 pointer" @click="$router.push(`/assign-shps-package/${item.id}/accept`)">
                      <v-icon size="small" class="text-grey-darken-1">mdi-comment-processing-outline</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14 w300">
                        پردازش محموله
                      </span>
                    </div>
                    <div v-else class="ma-5 pointer" @click="$router.push(`/processing-shipment/${item.id}/shps-list`)">
                      <v-icon size="small" class="text-grey-darken-1">mdi-comment-processing-outline</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14 w300">
                        پردازش محموله
                      </span>
                    </div>

                  </v-list-item-title>

                  <v-list-item-title>

                    <div class=" pointer" @click="print(item)">
                      <v-icon size="small" class="text-grey-darken-1">mdi-printer-outline</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14 w300">
                         پرینت محموله
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
import {isOdd, convertDateToJalai} from "@/assets/js/functions";

export default {
  components: {
  },

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
      active: []
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
    convertDateToJalai,

    print(item) {
      window.open(`${ import.meta.env.VITE_API_SITEURL}up-coming/${item.id}/print`, '_blank');

    },

    translateType(type) {
      const translations = {
        'consignment': 'انبارش',
        'in_review': 'در حال بررسی'
      };
      return translations[type] || type;
    },

    BgSelected(status) {
      if (status === 'in_review') {
        return '#EDE7F6';  // Light purple
      }
      if (status === 'approved') {
        return '#E8F5E9';  // Light green
      }
      if (status === 'rejected') {
        return '#FFEBEE';  // Light red
      }
      return 'transparent';  // Default background
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


  },
}
</script>
