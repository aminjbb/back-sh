<template>
  <div
      :class="variant == 'outlined' ? 'table-outlined': ''"
      :style="{height: height}"
      class="c-table pl-1">

    <header class="c-table__header d-flex justify-between">

      <div
          v-for="(head, index) in header"
          class="text-right pointer c-table__header__item t12500"
          :key="index"
          :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
        {{head.name}}

      </div>

    </header>
    <div class="stretch-table">
      <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
        <div
            v-for="(item , index) in items"
            :key="index"
            :class="oddIndex(index) ? 'bg-gray90' : ''"
            class="d-flex justify-between">
          <div
              v-if="header[0].show"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-grey-darken-3 py-5 number-font">
                            {{convertDateToJalai(item.date , '-' , false)}}
                        </span>

            </div>
          </div>

          <div
              v-if="header[1].show"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-grey-darken-3 py-5">
                            {{ item.count }}
                        </span>
            </div>
          </div>
          <div
              v-if="header[2].show"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
              <ModalEditSpecialExitCapacity :getWarehouseExitCapacityList="getWarehouseExitCapacityList" :id="item.id" :capacity="item.count"/>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {convertDateToJalai, isOdd} from '@/assets/js/functions'
import AddAttributeValueModal from '@/components/Attributes/Add/AddAttributeValueModal.vue'
import { openConfirm } from '@/assets/js/functions'
import { AxiosCall } from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import { PanelFilter } from  "@/assets/js/filter"
import { SkuPanelFilter } from  "@/assets/js/filter_sku"
import ModalEditSpecialExitCapacity from "@/components/Warehouse/SpecialExitCapacity/ModalEditSpecialExitCapacity.vue";
export default {
  components: {
    ModalEditSpecialExitCapacity,
    ModalMassUpdate,
    AddAttributeValueModal
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
     * get WarehouseExitCapacity
     */
    getWarehouseExitCapacityList: {
      type:Function
    },
  },

  data() {
    return {
      order_type: "desc",
      skuStatus: [],
      ordering: {},
      per_page: '25',
      filter: [],
      panelFilter: new PanelFilter(),
      skuPanelFilter: new SkuPanelFilter(),
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
  },

  methods: {
    convertDateToJalai,
    convertDate(date){
      return  convertDateToJalai(date, '-' ,true)
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
     */
    createOrdering(index) {
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
