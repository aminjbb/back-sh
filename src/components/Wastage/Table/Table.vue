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
            class="text-center c-table__header__item t12 w500 text-black"
            :class="head.order == true ? 'pointer' : ''"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">

          {{head.name}}
        </div>
      </template>

      <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
        <v-menu :location="location">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">
              mdi-dots-vertical
            </v-icon>
          </template>

          <v-list v-if="model !== 'menu'">
            <v-list-item >
              <v-list-item-title>
                <v-btn
                    @click="massUpdateModal()"
                    variant="text"
                    height="40"
                    rounded
                    class="px-5 mt-1 text-grey-darken-1 t14 w300">
                  <template v-slot:append>
                    <v-icon>mdi-pen-minus</v-icon>
                  </template>
                  ویرایش گروهی تنظیمات سئو
                </v-btn>
              </v-list-item-title>

            </v-list-item>
          </v-list>
        </v-menu>
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
              style="width: 4.33333%; flex: 0 0 4.33333%;">
                    <span class="t12 w500text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}

                    </span>
          </div>

          <div
              v-if="item.id && header[1].show"
              class="c-table__contents__item"
              style="flex: 0 0 10.33333%; "
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12 w500text-gray500 py-5 number-font mr-10">
                        {{ item.shps_s }}
                    </span>
          </div>

          <div
              v-if="header[2].show"
              class="c-table__contents__item"
              style="width: 0.33333%; flex: 0 0 10.33333%;padding: 3px 5px;">
                    <span class="t10 w500text-gray500 py-5 number-font">
                        <template v-if="item.shps && item.shps.label">
                            {{ item.shps.label }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>
          <div
              v-if="header[3].show"
              class="c-table__contents__item"
              style="width: 10.33333%; flex: 0 0 7.33333%;padding: 3px 5px;">
                    <span class="t12 w500text-gray500 py-5 number-font">
                        <template v-if="item.package_id && item.package_id">
                            {{ item.package_id }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>
          <div
              v-if="header[4].show"
              class="c-table__contents__item"
              style="width: 10.33333%; flex: 0 0 6.33333%;padding: 3px 5px;"
          >
                    <span class="t12 w500text-gray500 py-5">
                        <template v-if="item.package_type">
                            {{ getPackageType(item.package_type) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>

          <div
              v-if="header[5].show"
              class="c-table__contents__item"
              style="width: 5.33333%; flex: 0 0 5.33333%;"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12 w500text-gray500 py-5 number-font mr-10">
                        <template v-if="item.shipment_id">
                            {{item.shipment_id}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>

          <div
              v-if="header[6].show"
              class="c-table__contents__item"
              style=" width: 0.33333%; flex: 0 0 5.33333%; padding: 3px 5px;"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t10 w500text-gray500 py-5 number-font mr-8">
                        <template v-if="item.shipment_type">
                            {{getShipmentType(item.shipment_type)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>
          <div
              v-if="header[7].show"
              class="c-table__contents__item"
              style="padding: 3px 5px;"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12 w500text-gray500 py-5 mr-10">
                        <template v-if="item.shps && item.shps.seller">
                            {{ item.shps.seller.shopping_name }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>




          <div
              v-if="header[9].show"
              class="c-table__contents__item"
              style="width: 15.33333%; flex: 0 0 10.33333%; padding: 6px 5px;"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12 w500text-gray500 py-5">
                        <template v-if="item.creator">
                            {{ item.creator.first_name }} {{ item.creator.last_name }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>

          <div
              v-if="header[9].show"
              class="c-table__contents__item"
              style="padding: 2px 5px;"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12 w500text-gray500 py-5 number-font mr-10">
                        <template v-if="item.created_at_fa">
                            {{ item.created_at_fa }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
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
                  <div class="ma-3 pointer d--rtl" @click="removeItem(item.id)">
                    <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
                    <span class="mr-1 text-grey-darken-1 t13 w400">
                                        حذف
                                    </span>
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
          <span class="t18 w600 text-black mb-5">لیست خالی!</span>
          <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {openConfirm,isOdd} from "@/assets/js/functions";
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
     * Delete endpoint for change filter
     */
    deletePath: {
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
      filter: []
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
    getPackageType(type){
      if(type === 'bulk'){
        return 'بالک'
      }else{
        return 'پالت'
      }
    },

    getShipmentType(type){
      if(type === 'cross_dock_marketplace'){
        return 'فروش مارکت'
      }else if(type === 'consignment_shavaz'){
        return 'انبارش شاوز'
      }else if(type === 'consignment_marketplace'){
        return 'انبارش مارکت'
      }
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

    /**
     * Remove Item
     * @param {*} id
     */
    removeItem(id) {
      openConfirm(this.$store, "با حذف کالا دیگر به جزئیات آن دسترسی نخواهید داشت.آیا از انجام این کار اطمینان دارید؟", "حذف کالا", "delete", this.deletePath + id, true);
    },

    /**
     * Update list
     * @param {*} status
     */
    updateList(status) {
      this.$emit('updateList', status);
    },
  },
}
</script>
