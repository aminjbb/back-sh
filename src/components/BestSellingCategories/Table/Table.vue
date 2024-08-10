<template>
  <div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading"/>
    <header class="c-table__header d-flex justify-between">
      <template v-for="(head, index) in header">
        <div v-if="head.show" @click="createOrdering(head.value, head.order)" class="text-center c-table__header__item t12500 text-black " style="padding:20px 3px" :class="head.order == true ? 'pointer' : ''" :key="index" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
          {{head.name}}
        </div>
      </template>
    </header>

    <div class="stretch-table">
      <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
        <div v-for="(item , index) in items" :key="index" :class="oddIndex(index) ? 'bg-gray90' : ''"
             class="d-flex justify-start">
          <div v-if="header[0].show" class="c-table__contents__item justify-center"
               :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font justify-end">
                            {{ rowIndexTable(index) }}
                        </span>
            </div>
          </div>

          <div
              v-if="header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
             <span class="text-grey-darken-2">{{ item.label }}</span>
          </div>

          <div
              v-if="header[2].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
            <span class="text-grey-darken-2">
              <img :src="item?.image?.image_url" width="100" height="28" alt="" class="br br__4">
            </span>
          </div>

          <div
              v-if="header[3].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
            <span class="number-font text-grey-darken-2">{{ translateDevice(item.device) }}</span>
          </div>

          <div
              v-if="header[4].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
            <span class="number-font text-grey-darken-2">{{ item?.link }}</span>
          </div>

          <div
              v-if="header[5].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
            <span class="number-font text-grey-darken-2">{{ item?.creator?.full_name }}</span>
          </div>

          <div
              v-if="header[6].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
            <span>
              <v-switch
                  @change="changeActive(index , item)"
                  v-model="values[index]"
                  dense
                  color="success"/>
            </span>
          </div>

          <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-center  ">
            <v-menu  :location="location">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" class="text-gray500">
                  mdi-dots-vertical
                </v-icon>
              </template>

              <v-list class="c-table__more-options">
                <v-list-item-title>
                  <div class="ma-3 pointer d--rtl" @click="$router.push(`/best-selling-categories/${item.id}/best-selling-edit`)">
                    <v-icon class="text-grey-darken-1" size="x-small">mdi-pen</v-icon>
                    <span class="mr-2 text-grey-darken-1 t14300">ویرایش </span>
                  </div>
                </v-list-item-title>
                <v-list-item-title>
                  <div class="ma-3 pointer d--rtl" @click="removeItem(item.id)">
                    <v-icon class="text-grey-darken-1" size="x-small">mdi-delete</v-icon>
                    <span class="mr-2 text-grey-darken-1 t14300">حذف </span>
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
          <span class="t14300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {
  openConfirm,
  isOdd
} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

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

    /**
     * Edit endpoint for change active
     */
    activePath: {
      type: String,
      default: ''
    },

  },

  data() {
    return {
      order_type: "desc",
      ordering: {},
      per_page: '25',
      values: [],

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
        const width = 100 / (headerLength);
        return `${width}%`;
      }
      return 'auto';
    },
  },

  methods: {

    translateDevice(device) {
      if (device==='desktop') return 'دسکتاپ'
      else if (device==='mobile') return 'موبایل'
      else if (device==='tablet') return 'تبلت'
    },

    /**
     * Change Active
     * @param {*} index
     * @param {*} item
     */
    async changeActive(index, item) {
      var formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `category/best_selling/crud/update/activation/` + item.id
      if (this.values[index]) formData.append('is_active', 1)
      else formData.append('is_active', 0)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formData

      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
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
              order_type: this.order_type,
              order: index
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
      openConfirm(this.$store, "با حذف تصویر، تمام اطلاعات مربوطه نیز حذف می‌شودآیا از انجام این کار اطمینان دارید؟", "حذف تصویر", "delete", this.deletePath + id, true);
    }
  },

  watch: {
    items(val) {
      this.values = []
      if (this.items.length > 0) {
        this.items.forEach(element => {
          if (element.is_active) this.values.push(true)
          else this.values.push(false)
        })
      }
    }
  }
}
</script>
