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
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
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
