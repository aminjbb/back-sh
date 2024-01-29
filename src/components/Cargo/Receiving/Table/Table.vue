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
            class="text-center c-table__header__item t10400 text-black"
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
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
          </div>
          <div
              v-if=" header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
          </div>

          <div
              v-if=" header[2].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.shps_variety }}
                    </span>
          </div>
          <div
              v-if=" header[3].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.shps_count }}
                    </span>
          </div>
          <div v-if="header[4].show" class="c-table__contents__item justify-center " :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-progress-circular
                v-if="form[index].loading"
                indeterminate
                color="primary"></v-progress-circular>
            <div
                v-else
                @click="updatePackage(item , index)"
                class="seller__add-sku-btn d-flex justify-center align-center pointer">

              <v-icon size="15" v-if="!form[index].sent_to_warehouse">mdi-dots-horizontal</v-icon>
              <v-icon size="15" v-else>mdi-check</v-icon>
            </div>
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
    <ModalRequestShipment  />

  </div>
</template>

<script>
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import {
  SupplierPanelFilter
} from "@/assets/js/filter_supplier"
import ModalRequestShipment from "@/components/RetailShipment/Modal/ModalRequestShipment.vue";

import ActivationModal from "@/components/Public/ActivationModal.vue";
import {
  openToast,
  openConfirm,
  isOdd, convertDateToJalai
} from "@/assets/js/functions";
export default {
  components: {
    ModalRequestShipment,
    ActivationModal,
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
     * check disabled btn
     */
    checkDisabledCloseCargo: {
      type: Function,
    },
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
      form:[
        {
          sent_to_warehouse:false,
          loading:false
        }
      ],
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
        if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == true) {
          this.activeColumn = true;
        } else if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == false) {
          this.activeColumn = false;
        }
      });
      return this.activeColumn;
    },
  },

  watch: {
    items(val) {
      this.form = []

      val.forEach(element => {
        let form ={}
        if (element.status =='received_by_warehouse'){
          form = {
            sent_to_warehouse:true,
            loading:false
          }
        }
        else{
          form = {
            sent_to_warehouse:false,
            loading:false
          }
        }

        this.form.push(form)
        this.checkDisabledCloseCargo(this.form)
      });
    }
  },

  methods: {

    changeValue(index, value) {
      this.active[index] = value
    },
    /**
     * retailShipment detail modal
     */
    async updatePackage(item , index) {
     try {
       this.form[index].loading = true
       const AxiosMethod = new AxiosCall()
       AxiosMethod.using_auth = true
       AxiosMethod.toast_error = true
       AxiosMethod.store = this.$store
       AxiosMethod.token = this.$cookies.get('adminToken')
       AxiosMethod.end_point = `package/received/${item.id}`
       let data = await AxiosMethod.axios_post()
       if (data) {
         this.form[index].loading = false
         this.form[index].sent_to_warehouse = true
         this.checkDisabledCloseCargo( this.form)
       }
       else{
         this.form[index].loading = false
       }
     }
     catch (e) {
       this.form[index].loading = false
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
