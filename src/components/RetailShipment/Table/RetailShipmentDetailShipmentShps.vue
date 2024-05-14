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
              class="text-right c-table__header__item t12500 px-0"
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
    <div class="stretch-table">
      <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
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
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item?.sku_label }}
                    </span>
          </div>

          <div
              v-if=" header[3].show"
              class="c-table__contents__item text-right"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
           <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.shps_count }}
                    </span>
          </div>
          <div
              v-if=" header[4].show"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
           <span class="t14300 text-gray500 py-5 number-font">
                        {{ item?.min_tolerance }}
                    </span>
          </div>
          <div
              v-if=" header[5].show"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          <span class="t14300 text-gray500 py-5 number-font">
                        {{ item?.max_tolerance }}
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
import {
  openConfirm
} from '@/assets/js/functions'
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import {
  openToast
} from "@/assets/js/functions";
export default {
  props: {
    updateSkuUrl:{
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
      if (this.header && this.header.length > 0) {
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
     * Mass update modal
     */
    massUpdateModal() {
      this.$store.commit('set_massUpdateModal', true)
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

          if (this.model === 'sku') {
            this.skuPanelFilter.order = index
            this.$router.push(this.$route.path + this.skuPanelFilter.sort_query(this.$route.query))
          } else {
            this.panelFilter.order = index
            this.$router.push(this.$route.path + this.panelFilter.sort_query(this.$route.query))
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


    /**
     * Change Active
     * @param {*} index
     * @param {*} item
     */
    async updateSku(sku, shps , index) {
      const formData = new FormData()
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = this.updateSkuUrl
      formData.append('shps', shps)
      formData.append('sku_id', sku)
      formData.append('priority', this.form[index].priority)
      if (this.model == 'partition')  formData.append('partition_id',this.$route.params.partitionId )
      AxiosMethod.form = formData
      let data = await AxiosMethod.axios_post()
      if (data) {
        openToast(
            this.$store,
            'کد کالا با موفقیت ویرایش شد.',
            "success"
        );
      }

    },

    /**
     * Return odd index
     * @param {*} index
     */
    oddIndex(index) {
      return isOdd(index)
    },



    updateList(status) {
      console.log('2.skuTable',status)
      this.$emit('updateList', status);
    },
  },
}
</script>
