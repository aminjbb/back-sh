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
          <div
              v-if=" header[4].show "
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">

            <div
                class="seller__add-sku-btn d-flex justify-center align-center pointer"
                @click="submitShipmentsForm(item.id , item.shipment_id , item.shps,item.placer_id,item.placement_id)">
              <v-icon size="15">
                {{ submittedItemId === item.id || item.label_printed === 1 ? 'mdi-check' : 'mdi-plus' }}
              </v-icon>
            </div>
          </div>

          <div
              v-if=" header[5].show "
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            {{ item.admin_name }}
          </div>

          <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-center">
            <v-menu :location="location">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" class="text-gray500">
                  mdi-dots-vertical
                </v-icon>
              </template>
              <v-list class="c-table__more-options">
                <v-list-item>
                  <v-list-item-title>
                    <div
                        class="ma-5 pointer"
                        @click=getDetail(item)>
                      <v-icon size="small" class="text-grey-darken-1">mdi-pen</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14300">
                                              پرینت
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
    <ModalInitialBulkPrintLabel v-if="dialog" :shpsId="shps_id" :packageId="packageId" :shipmentId="shipmentId" :placerId="currentItem.placer_id" :placementId="currentItem.placement_id"/>
    <PackageManagementModal :getShpsList="getShpsList" :packageId="packageId" :shpsId="shps_id"
                            :shipmentId="shipmentId"/>
  </div>
</template>
<script>
import ModalInitialBulkPrintLabel from "@/components/BulkLabelPrint/Modal/ModalInitialBulkPrintLabel.vue";
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import {
  SupplierPanelFilter
} from "@/assets/js/filter_supplier"

import {
  openToast,
  isOdd
} from "@/assets/js/functions";
import PackageManagementModal from "@/components/BulkLabelPrint/Modal/PackageManagementModal.vue";

export default {
  components: {
    PackageManagementModal,
    ModalInitialBulkPrintLabel,
  },
  props: {
    getShpsList: {
      type: Function
    },
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
      dialog:false,
      currentItem:null,
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
      shps_id: null


    }
  },

  computed: {
    /**
     * Get each items table based of header length
     */
    itemsWidth() {
      let headerLength = 0;
      if (this.header && this.header.length > 0) {
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
      }
    },
  },

  methods: {
    packageManagement(shipment) {
      this.shipmentId = shipment.shipment_id
      this.shps_id = shipment.shps
      this.$store.commit('set_packageManagementModal', true)
    },
    async getDetail(shipment) {
      this.currentItem = shipment
      this.shipmentId = shipment.shipment_id
      this.shps_id = shipment.shps
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/print-initial/barcode/${shipment.shipment_id}?shps=${shipment.shps}&package_id=1&placer_id=${shipment.placer_id}&placement_id=${shipment.placement_id}`
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

    async submitShipmentsForm(itemId, shipmentId, shps, placerId,placementId) {

      this.loading = true;
      let formdata = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.end_point = 'package/shps-initial/print/label';
      AxiosMethod.form = formdata

      formdata.append('package_id', 1);
      formdata.append('initial_placer_id', placerId);
      formdata.append('initial_placement_id', placementId);

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
  },
}
</script>
    