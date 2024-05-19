<template>
    <div
        :class="variant == 'outlined' ? 'table-outlined': ''"
        :style="{height: height}"
        class="c-table pl-1">
      <v-progress-linear
          color="primary500"
          indeterminate
          reverse
          v-if="loading" />
  
      <header class="c-table__header d-flex justify-start">
        <template v-for="(head, index) in header">
          <template v-if="head.value">
            <div
                v-if="head.show"
                @click="createOrdering(head.value, head.order)"
                class="text-right c-table__header__item t10400 px-0"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="{ width: itemsWidth, flex:head.value === 'label' ? `1 0 ${itemsWidth}` :  `0 0 ${itemsWidth}`}">
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
  
      </header>
      <div class="stretch-table ">
        <div v-if="items && items.length > 0 && !loading" class="c-table__contents ">
          <div
              v-for="(item , index) in items"
              :key="index"
              :class="oddIndex(index) ? 'bg-gray90' : ''"
              class="d-flex justify-start">
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
                v-if=" header[1].show"
                class="c-table__contents__item text-right"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                      <span class="t14300 text-gray500 py-5 number-font">
                          {{ item.id }}
                      </span>
            </div>
  
            <div
                v-if=" header[2].show"
                class="c-table__contents__item text-right"
                :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
                      <span class="t12500 text-gray500 py-5 number-font">
                          {{ item.sku_label }}
                      </span>
            </div>
            <div
                v-if=" header[3].show"
                class="c-table__contents__item text-right"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
             <span class="t14300 text-gray500 py-5 number-font">
                          {{ item.buying_price}}
                      </span>
            </div>
            <div
                v-if=" header[4].show"
                class="c-table__contents__item text-right"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
             <span class="t14300 text-gray500 py-5 number-font">
                          {{ item.customer_price }}
                      </span>
            </div>
            <div
                v-if=" header[5].show"
                class="c-table__contents__item text-right"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
             <span class="t14300 text-gray500 py-5 number-font">
                          {{ item.shps_count }}
                      </span>
            </div>
            <div
                v-if=" header[6].show"
                class="c-table__contents__item text-right"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
             <span class="t14300 text-gray500 py-5 number-font">
                          {{ item.sum_buying_price }}
                      </span>
            </div>
            <div
                v-if=" header[7].show"
                class="c-table__contents__item text-right"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
             <span class="t14300 text-gray500 py-5 number-font">
                          {{ item.sum_customer_price }}
                      </span>
            </div>
            <div
                v-if=" header[8].show"
                class="c-table__contents__item text-right"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
             <span class="t14300 text-gray500 py-5 number-font ml-10">
                          {{ item.profit }}
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
     
    </div>
  </template>
  
  <script>
  import {
    isOdd
  } from '@/assets/js/functions'
  
  export default {
  
  
    props: {
  header: {
    type: Array,
    default: () => []
  },
      
     
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
        activeColumn: false,
        form:[
          {priority:''}
        ]
      }
    },
  
    computed: {
      /**
       * Get each items table based of header length
       */
      itemsWidth() {
        let headerLength = 0;
        if (this.header !== undefined && this.header.length > 0) {
          this.header.forEach(element => {
            if (element.show == true) {
              headerLength++;
            }
          });
          const width = 80 / (headerLength + 1);
          return `${width}%`;
        }
        return 'auto';
      },
  
     
    },
  
    watch: {
    items(val) {
      this.active = []
      this.form = []
      if (val){
        val.forEach(element => {
          const form = {
            priority : element.pivot?.priority
          }
          this.form.push(form)
          var active = false
          if (element.is_active == 1) active = true
          this.active.push(active)
        });
      }

    }
  },
    methods: {
     
  
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
  