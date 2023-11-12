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
            class="text-center c-table__header__item t12500 text-black"
            :class="head.order == true ? 'pointer' : ''"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
          {{head.name}}
        </div>
      </template>

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
              </div>
            </div>
          <template v-if="model === 'siteInventory'">
            <div
                v-if="header[1].show"
                class="c-table__contents__item"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <div class="d-flex align-center">
                          <span class="t14300 text-gray500 py-5 number-font">
                             {{item.previous_site_stock}}
                          </span>
              </div>
            </div>
            <div
                v-if="header[3].show"
                class="c-table__contents__item"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <div class="d-flex align-center">
                          <span class="t14300 text-gray500 py-5 number-font">
                             {{item.change_amount}}
                          </span>
              </div>
            </div>
            <div
                v-if="header[4].show"
                class="c-table__contents__item"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <div class="d-flex align-center">
                          <span class="t14300 text-gray500 py-5 number-font">
                             {{item.site_stock}}
                          </span>
              </div>
            </div>
            <div
                v-if="header[5].show"
                class="c-table__contents__item"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <div class="d-flex align-center">
                          <span class="t14300 text-gray500 py-5 number-font">
                             {{item.created_at}}
                          </span>
              </div>
            </div>
          </template>

          <template v-if="model === 'price'">
            <div
                v-if="header[1].show"
                class="c-table__contents__item"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <div class="d-flex align-center">
                          <span class="t14300 text-gray500 py-5 number-font">
                             {{item.customer_price}}
                          </span>
              </div>
            </div>
            <div
                v-if="header[2].show"
                class="c-table__contents__item"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <div class="d-flex align-center">
                          <span class="t14300 text-gray500 py-5 number-font">
                             {{item.base_discount}}
                          </span>
              </div>
            </div>
            <div
                v-if="header[3].show"
                class="c-table__contents__item"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <div class="d-flex align-center">
                          <span class="t14300 text-gray500 py-5 number-font">
                             {{item.marketing_discount}}
                          </span>
              </div>
            </div>
            <div
                v-if="header[4].show"
                class="c-table__contents__item"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <div class="d-flex align-center">
                          <span class="t14300 text-gray500 py-5 number-font">
                             {{item.site_price}}
                          </span>
              </div>
            </div>
            <div
                v-if="header[4].show"
                class="c-table__contents__item"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <div class="d-flex align-center">
                          <span class="t14300 text-gray500 py-5 number-font">
                             {{item.created_at}}
                          </span>
              </div>
            </div>
          </template>

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
    <ModalMassUpdate :updateUrl="updateUrl" />
  </div>
</template>

<script>
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import {
  SupplierPanelFilter
} from "@/assets/js/filter_supplier"
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import {
  openToast,
  openConfirm,
  isOdd
} from "@/assets/js/functions";
export default {
  components: {
    ModalMassUpdate,
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
     * Delete endpoint for change filter
     */
    deletePath: {
      type: String,
      default: ''
    },

    /**
     * Url for edit
     */
    editUrl: {
      type: String,
      default: ''
    },

    /**
     * Url for update contract status
     */
    changeStatusUrl: {
      type: String,
      default: '',
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
    updateUrl: {
      type: String,
      default: ''
    },



  },

  data() {
    return {
      order_type: "desc",
      ordering: {},
      per_page: '25',
      filter: [],
      active: [],
      status: [],
      panelFilter: new SupplierPanelFilter(),
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

    /**
     * Check is_active is true or false for show in table
     */
    checkActive() {
      this.header.forEach(element => {
        if (element.value === 'is_active' && element.show == true) {
          this.activeColumn = true;
        } else if (element.value === 'is_active' && element.show == false) {
          this.activeColumn = false;
        }
      });
      return this.activeColumn;
    },
  },

  watch: {
    items(val) {
      this.active = []
      val.forEach(element => {
        var active = false
        if (element.is_active == 1) active = true
        this.active.push(active)
      });
    }
  },

  methods: {
    editRoute(id, type) {
      if (type == 'legal') {
        return '/seller/edit/legal-seller/' + id;
      }
      if (type == 'genuine') {
        return '/seller/edit/natural-seller/' + id;
      }
    },
    getType(type) {
      const text = '';

      if (type == 'legal') {
        return 'حقوقی';
      }
      if (type == 'genuine') {
        return 'حقیقی';
      }
      return 'نامعلوم';
    },

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
            this.panelFilter.order_type = 'asc'
          } else {
            this.order_type = 'desc'
            this.panelFilter.order_type = 'desc'
          }

          this.panelFilter.order = index
          this.$router.push(this.$route.path + this.panelFilter.sort_query(this.$route.query))

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
      AxiosMethod.end_point = this.activePath + item.id
      if (this.active[index]) formdata.append('is_active', 1)
      else formdata.append('is_active', 0)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata

      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
    },

    /**
     * Change Status
     * @param {*} item
     */
    async changeStatus(item) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = this.changeStatusUrl + item.id
      if (item.contract_status === 'associate') formdata.append('contract_status', 'disassociate')
      else if (item.contract_status === 'disassociate') formdata.append('contract_status', 'associate')
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata

      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()

      if (data) {
        openToast(
            this.$store,
            'عملیات مورد نظر با موفقیت انحام شد.',
            "success"
        );

        this.updateList('true');
      } else {
        openToast(
            this.$store,
            'عملیات مورد نظر با مشکل مواجه شد.',
            "error"
        );
      }
    },

    /**
     * Update list
     * @param {*} status
     */
    updateList(status) {
      this.$emit('updateList', status);
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
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", this.deletePath + id, true)
    },
  },
}
</script>
