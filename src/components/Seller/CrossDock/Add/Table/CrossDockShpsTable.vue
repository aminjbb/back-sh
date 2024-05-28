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
      <div
          v-if="model === 'crossDockShps'"
          class="text-right c-table__header__item t12500 px-0"
          :style="{ width: itemsWidth, flex:`0 0 ${itemsWidth}`}">
          <v-checkbox @change="selectAllShp()" v-model="allShps" color="success" />
      </div>
      <template v-for="(head, index) in header">
        <template v-if="head.value">
          <div
              v-if="head.show"
              class="text-right c-table__header__item t12500 px-0"
              :class="head.order == true ? 'pointer' : ''"
              :key="index"
              :style="{ width: itemsWidth, flex:head.value === 'label' ? `1 0 ${itemsWidth}` :  `0 0 ${itemsWidth}`}">
              <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
              {{head.name}}
          </div>
        </template>
        <template v-else>
          <div
              v-if="head.show"
              class="text-right c-table__header__item t12500"
              :class="head.order == true ? 'pointer' : ''"
              :key="index"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
            {{head.name}}
          </div>
        </template>

      </template>
      <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
        <span class="t12500 text-black">عملیات</span>
      </div>
    </header>
    <div class="stretch-table">
      <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
        <div
            v-for="(item , index) in items"
            :key="index"
            :class="oddIndex(index) ? 'bg-gray90' : isNotProvidableCount(index) ? 'bg-disableRow' : ''"
            class="d-flex justify-start">
          <div
              v-if="model === 'crossDockShps'"
              class="text-right c-table__header__item t12500 px-0"
              :style="{ width: itemsWidth, flex:`0 0 ${itemsWidth}`}">
            <v-checkbox :disabled="isNotProvidableCount(index)" v-model="selectedShps[index]" color="success" @change="selectShp(index  ,item)"/>
          </div>
          <div
              v-if="header[0].show"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{rowIndexTable(index)}}
                        </span>
              <template v-if="checkbox">
                <v-checkbox class="mr-1"  v-model=item.value />
              </template>
            </div>
          </div>
          <div
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{item.order_id}}
                        </span>
            </div>
          </div>

          <div
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{item.shps}}
                        </span>
            </div>
          </div>

          <div
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{item.sku_label}}
                        </span>
            </div>
          </div>

          <div
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{item.count}}
                        </span>
            </div>
          </div>

          <div
              v-if="model === 'crossDockShps'"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{convertDateToJalai(item.created_at , '-' , true)}}
                        </span>
            </div>
          </div>
          <div
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font">
                              {{convertDateToJalai(item.warehouse_deadline , '-' , false)}}
                        </span>
            </div>
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
                    <div @click="openModalNotProvidable(item)" class="ma-5 pointer">
                      <v-icon size="small" class="text-grey-darken-1">mdi-close-thick</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14300">
                                            عدم توانایی تامین
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
    <ModalNotProvidable :getOrders="getOrders"/>
  </div>
</template>

<script>
import ModalNotProvidable from "@/components/Seller/CrossDock/CrossDockModal/ModalNotProvidable.vue";

import {
  convertDateToJalai,
  isOdd
} from '@/assets/js/functions'

import {
  PanelFilter
} from "@/assets/js/filter"
import {
  SkuPanelFilter
} from "@/assets/js/filter_sku"
export default {

  components:{
    ModalNotProvidable
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
     * Get orders
     */
    getOrders: {
      type: Function
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
      allShps:false,
      selectedShps:[],
      selectedShpsValue:[],

      order_type: "desc",
      skuStatus: [],
      ordering: {},
      per_page: '25',
      active: [],
      sellable: [],
      filter: [],
      panelFilter: new PanelFilter(),
      skuPanelFilter: new SkuPanelFilter(),

    }
  },

  computed: {
    draftCrossDockSelectedShps(){
      return this.$store.getters['get_crossDockSelectedShps']
    },
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

    }
  },

  methods: {
    isNotProvidableCount(index){
      if (this.items[index].not_providable_count &&this.items[index].not_providable_count == this.items[index].count ) return true
      return false
    },
    openModalNotProvidable(item){
      const form = {
        dialog : true,
        id :item
      }
      this.$store.commit('set_notProvidableModal',form)
    },
    convertDateToJalai,
    /**
     * Get icon
     * @param {*} column
     */
    getIcon(column) {
      return this.ordering[column] ? 'mdi-sort-descending' : 'mdi-sort-ascending';
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
     * Return odd index
     * @param {*} index
     */
    oddIndex(index) {
      return isOdd(index)
    },
    selectShp(index , item){
      if (this.selectedShps[index]) this.selectedShpsValue.push(item)
      else {
        const skuSelectedIndex = this.selectedShpsValue.findIndex(el => el.id == item.id )
        this.selectedShpsValue.splice(skuSelectedIndex, 1)
      }
      if (this.selectedShpsValue.length === this.items.length) this.allShps = true
      else  this.allShps = false
    },
    selectAllShp(){
      this.selectedShpsValue = []
      this.selectedShps.forEach((element , index)=>{
        this.selectedShps[index] = false
      })
      if (this.allShps){
        this.items.forEach((shps , index)=>{
          this.selectedShps[index] = true
          this.selectedShpsValue.push(shps)
        })
      }
    }
  },
  mounted() {
    if (this.items){
      this.items.forEach(shps => {
        let index = -1
        if (this.draftCrossDockSelectedShps)  index = this.draftCrossDockSelectedShps.findIndex(element => element.id === shps.id)
        if ( index >-1){
          this.selectedShps.push(true)
          this.selectedShpsValue .push(shps)
        }
        else this.selectedShps.push(false)
      })
    }
  }
}
</script>
