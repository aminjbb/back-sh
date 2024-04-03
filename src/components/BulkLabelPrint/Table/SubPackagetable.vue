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
            class="text-center c-table__header__item t12500 text-black"
            :class="head.order == true ? 'pointer' : ''"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
          <v-icon v-if="head.order == true" :icon="getIcon(head.value)"/>
          {{ head.name }}
        </div>
      </template>

      <div class="text-center c-table__header__item t12500 text-black"
           :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
        عملیات
      </div>
    </header>

    <div class="stretch-table">
      <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
        <div
            v-for="(item, index) in items"
            :key="index"
            :class="oddIndex(index) ? 'bg-gray90' : ''"
            class="d-flex justify-between c-table__contents__row">
          <div
              v-if="header[0].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{ rowIndexTable(index) }}
                        </span>
          </div>

          <div
              v-if="item.id && header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{ item.shps }}
                        </span>
          </div>

          <div
              v-if="header[2].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14300 text-gray500 py-5">
                            <template v-if="item.sku.label">
                                {{ item.sku.label }}
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
                        <span class="t14300 text-gray500 py-5 number-font">
                            <template v-if="item.packed_count">
                                {{ item.packed_count }}
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
                        <span class="t14300 text-gray500 py-5 number-font">
                            <template v-if="item.shipment_id">
                                {{ item.shipment_id }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
          </div>

          <v-list-item>
            <v-list-item-title>
              <div class="ma-5 pointer" @click="getShpssDetailLost(item)">
                <v-icon size="small" class="text-grey-darken-1">mdi-delete-variant</v-icon>
                <span class="mr-2 text-grey-darken-1 t14300">
                                              ثبت مفقودی
                                            </span>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <div class="ma-5 pointer" @click="getShpssDetailWastage(item)">
                <v-icon size="small" class="text-grey-darken-1">mdi-delete-variant</v-icon>
                <span class="mr-2 text-grey-darken-1 t14300">
                                              ثبت ضایعات
                                            </span>
              </div>
            </v-list-item-title>
          </v-list-item>
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
  AxiosCall
} from '@/assets/js/axios_call.js'
import {
  SupplierPanelFilter
} from "@/assets/js/filter_supplier"

import {
  openToast,
  openConfirm,
  isOdd
} from "@/assets/js/functions";

export default {

  props: {
    packageId: null,
    /**
     * List Items for header
     */
    header: [],

    /**
     * List of items
     */
    items: {
      type: Array,
      default: () => []
    },


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
      active: [],
      panelFilter: new SupplierPanelFilter(),
      activeColumn: false,
      fetchCargoData: [],
      paramsQuery: [],
      filter: [],
      reportType: null,
      shps_s: null,
      loading: false,
      shipments: [],
      isSubmitted: false,
      submittedItemId: null,
      shipmentId: null,
      shps_id:null


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
    packageManagement(){
      this.$store.commit('set_packageManagementModal' , true)
    },
    async getDetail(shipment) {
      this.shipmentId = shipment.shipment_id
      this.shps_id = shipment.shps
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/print/barcode/${shipment.shipment_id}?shps=${shipment.shps}&package_id=${this.packageId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        const dialogForm = {
          dialog: true,
          object: data.data
        }
        this.$store.commit('set_bulkPrintLabel', dialogForm)


        this.detail = data.data
        this.dialog = true
      }
    },

    /**
     * LostShpss modal
     */
    async getShpssDetailLost(item) {


      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `package/shps/items/${item.package_id}?shps=${item.shps}&shipment_id=${item.shipment_id}`
      let data = await AxiosMethod.axios_get()
      if (data) {

        const form = {
          dialog: true,
          object: data.data
        }

        this.$store.commit('set_shps_s', item.id);
        this.$store.commit('set_reportType', 'lost');
        this.$store.commit('set_modalLostShpss', form)
      }
    },
    async getShpssDetailWastage(item) {

      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `package/shps/items/${item.package_id}?shps=${item.shps}&shipment_id=${item.shipment_id}`
      let data = await AxiosMethod.axios_get()
      if (data) {

        const form = {
          dialog: true,
          object: data.data
        }
        this.$store.commit('set_shps_s', item.sku.id);
        this.$store.commit('set_reportType', 'wastage');
        this.$store.commit('set_modalLostShpss', form)

      }
    },

    /**
     * sending data in save btn
     */

    async submitShipmentsForm(itemId, shipmentId , shps) {
      let packageId = null
      if (this.packageId.includes('-')) {
        const cargoSplit = this.packageId.split('-')
        if (cargoSplit[1]) packageId = cargoSplit[1]
        else packageId = this.packageId
      } else packageId = this.packageId
      this.loading = true;
      let formdata = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.end_point = 'package/shps/print/label';
      AxiosMethod.form = formdata

      formdata.append('package_id', packageId);

      formdata.append('shps', shps);
      formdata.append(`shipment_id`, shipmentId);
      AxiosMethod.store = this.$store;
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');

      try {
        let data = await AxiosMethod.axios_post();
        if (data) {
          this.isSubmitted = true;
          openToast(this.$store, 'با موفقیت ذخیره شد', "success");
          this.submittedItemId = itemId;
          this.loading = false;
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        this.loading = false;
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
      openConfirm(this.$store, "با حذف راننده دیگر به جزئیات آن دسترسی نخواهید داشت.آیا از انجام این کار اطمینان دارید؟", "حذف راننده", "delete", this.deletePath + id, true)
    },
  },
}
</script>
