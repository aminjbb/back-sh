<template>
  <div :style="{height: height}" class="c-table pl-1" >
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
            class="text-center c-table__header__item t14 w600"
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
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
          </div>
<!-- shps_id 1-->
          <div
              v-if="header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14 w300 text-gray500 py-5">
                  <template v-if="item.shps">
                    <span class="number-font">
                         {{item.shps}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!-- sku_label 2-->
          <div
              v-if="header[2].show"
              class="c-table__contents__item justify-center"
              :style="{  width: itemsWidth, flex: `0 0 ${itemsWidth}`}">
              <span class="t14 w300 text-gray500 py-5">
                  <template v-if="item.sku_label">
                    <span class="number-font">
                         {{item.sku_label}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!-- count 3-->
          <div
              v-if="header[3].show"
              class="c-table__contents__item justify-center"
              :style="{  width: itemsWidth, flex: `0 0 ${itemsWidth}`}">
              <span class="t14 w300 text-gray500 py-5">
                  <template v-if="item.count">
                    <span class="number-font">
                         {{item.count}}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>
<!--  picked_count 4-->
          <div
              v-if=" header[4].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14 w300 text-gray500 py-5 number-font">
                    <span >
                         {{item.picked_count}}
                    </span>
              </span>
          </div>
<!--  pick_upper 5-->
          <div
              v-if=" header[5].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14 w300 text-gray500 py-5">
                     <template v-if="item.pick_upper">
                    <span >
                        {{ item.pick_upper }}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>

<!--  created_at_fa 6-->
          <div
              v-if=" header[6].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14 w300 text-gray500 py-5">
                  <template v-if="item.updated_at_fa">
                    <span class="number-font " >
                        {{ item.updated_at_fa }}
                    </span>
                  </template>
                  <template v-else>
                      -
                  </template>
              </span>
          </div>



<!-- operation -->
          <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item">
            <v-menu :close-on-content-click="false" :location="location">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props">
                  mdi-dots-vertical
                </v-icon>
              </template>

              <v-list class="c-table__more-options">
                <v-list-item>
                  <v-list-item-title>

<!-- Modal-->
                    <ReportDialog @reloadNewReports="reloadList()" :id="item.id" />

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
          <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {isOdd} from '@/assets/js/functions'
import ReportDialog from '@/components/ReportBugTask/ReportDialog.vue';


export default {

  props: {
    /*
    show modal
    */
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
      menu: false,
      order_type: "desc",
      ordering: {},
      per_page: '25',
      filter: [],
    }
  },

  components: {ReportDialog},

  computed: {
    /**
     * Get each items table based of header length
     */
    itemsWidth() {
      let headerLength = 0;
      if (this.header && this.header.length > 0) {
        this.header.forEach(element => {
          if (element.show === true) {
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

    reloadList(){
      this.$emit('reload-reports')
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
