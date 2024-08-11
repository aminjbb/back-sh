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
            class="text-center c-table__header__item t14600"
            :class="head.order == true ? 'pointer' : ''"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
          {{head.name}}
        </div>

      </template>

      <div class="c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
       <span>
          <v-icon>
              mdi-dots-vertical
            </v-icon>
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

<!-- row -->
          <div
              v-if="header[0].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
          </div>
<!-- id 1-->
          <div
              v-if="header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14300 text-gray500 py-5">
                  <template v-if="item.sku_id">
                    <span >
                         {{item.sku_id}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!-- label 2-->
          <div
              v-if="header[2].show"
              class="c-table__contents__item justify-center"
              :style="{  width: itemsWidth, flex: `0 0 ${itemsWidth}`}">
              <span class="t14300 text-gray500 py-5">
                  <template v-if="item.sku.label">
                    <span >
                         {{item.sku.label}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!-- score 3-->
          <div
              v-if="header[3].show"
              class="c-table__contents__item justify-center " >
              <v-rating
                  style="direction: ltr!important;"
                  v-model="item.score"
                  size="18"
                  half-increments
                  readonly>
                <template v-slot:item="props">
                  <v-icon
                      size="large"
                      :color="props.isFilled ? 'rgb(243, 193, 28)' : 'grey-lighten-1'">
                    mdi-star
                  </v-icon>
                </template>
              </v-rating>
          </div>
<!--  brand 4-->
          <div
              v-if=" header[4].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14300 text-gray500 py-5">
                  <template v-if="item.sku.brand.name">
                    <span >
                         {{item.sku.brand.name}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!--  user 5-->
          <div
              v-if=" header[5].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14300 text-gray500 py-5">
                  <template v-if="item.user.first_name">
                    <span >
                         {{item.user.first_name}} {{item.user.last_name}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!--  phone_number 6-->
          <div
              v-if=" header[6].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14300 text-gray500 py-5">
                  <template v-if="item.user.phone_number">
                    <span >
                         {{item.user.phone_number}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!--  email 7-->
          <div
              v-if=" header[7].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14300 text-gray500 py-5 px-15">
                  <template v-if="item.user.email">
                    <span class="t10 w600">
                         {{item.user.email}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!--  admin 8-->
          <div
              v-if=" header[8].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14300 text-gray500 py-5">
                  <template v-if="item.creator">
                    <span >
                         {{item.creator.first_name}} {{item.creator.last_name}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!--  created_at 9-->
          <div
              v-if=" header[9].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14300 text-gray500 py-5 ">
                  <template v-if="item.created_at_fa">
                    <span class="number-font" >
                        {{ item.created_at_fa }}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!--  updated_at 10-->
          <div
              v-if=" header[10].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14300 text-gray500 py-5">
                  <template v-if="item.updated_at_fa">
                    <span class="number-font" >
                        {{ item.updated_at_fa }}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!--  checkStatus 11-->
          <div v-if="header[11].show"
               class="c-table__contents__item justify-center"
               style="padding : 3px"
               :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span >
                        <template v-if="item.status">
                          <v-sheet  class="[ br-12 text-end py-2 px-7 ]"  :color="getStatusClass(item.status)" >
                            {{ getPersianStatus(item.status) }}
                          </v-sheet>
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
          </div>


<!-- Check -->
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
                    <div class=" pointer" @click="$router.push( editUrl +  item.id )">
                      <v-icon class="text-grey-darken-1">mdi-eye-outline</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14300">
                              نمایش جزئیات
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
import {isOdd} from '@/assets/js/functions'

export default {

  props: {
    /**
     * List Items for header
     */
    header: [],

    /**
     * Edit button url
     */
    editUrl: '',

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
    getStatusClass(status){
      if (status === 'waiting') return '#FFF3E0'
      else if (status === 'rejected') return '#FFEBEE'
      else if (status === 'approved') return '#E8F5E9'
    },

    getPersianStatus(status){
      if (status === 'waiting') return ' در انتظار '
      else if (status === 'rejected') return ' رد شده '
      else if (status === 'approved') return ' تایید شده '
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
