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
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
          </div>

          <div
              v-if="item.id && header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.seller_sku_id }}
                    </span>
          </div>
          <div
              v-if="item.id && header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="t14300 text-gray500 py-5 number-font d--ltr">
                        {{ item.placement?.row_number }} -
                        {{ item.placement?.placement_number }} -
                        {{item.placement?.step_number}} -
                        {{item.placement?.shelf_number}}
                    </div>
          </div>

          <div
              v-if="header[2].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.status }}

                    </span>
          </div>
          <div
              v-if="header[3].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="t14300 text-gray500 py-5 number-font" style="width: 100%;">
                      <v-text-field variant="outlined" v-model="form[index].priority"></v-text-field>

                    </div>
          </div>
          <div
              v-if="header[4].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                     <v-btn @click="savePickupChange(index , item.id)" variant="text">
                       <v-icon color="success">
                         mdi-plus
                       </v-icon>
                     </v-btn>
                    </span>
          </div>



        </div>
      </div>
      <div v-else class="null-data-table d-flex justify-center align-center flex-column">
        <img src="../../../assets/img/NullTable.png" alt="shavaz image">
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
  isOdd, openToast
} from "@/assets/js/functions";


import {
  openModal
} from "@/assets/js/functions_seller";
import {AxiosCall} from "@/assets/js/axios_call";
export default {

  props: {
    /**
     * List Items for header
     */
    header: Array,

    /**
     * List of items
     */
    items: Array,

    /**
     * Model
     */
    model: String,

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
      ordering: {},
      per_page: '25',
      filter: [],
      activeColumn: false,
      form:[]
    }
  },

  components: {
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

    async savePickupChange(index , id){
      const formData= new FormData()
      formData.append('pickup_task_id' , id)
      formData.append('priority' , this.form[index].priority)
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.toast_error = true
      AxiosMethod.form = formData
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `warehouse/order/pickup/change-priority`
      let data = await AxiosMethod.axios_post()
      if (data){
        this.$emit('updateTable')
        openToast(this.$store , 'با موفقیت ویرایش شد' , 'success')
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
  },

  watch:{
    items(newVal){
      if (newVal.length){
        newVal.forEach(element=>{
          const form = {
            priority: element.priority
          }
          this.form.push(form)
        })
      }
      else{
        this.form =[]
      }

    }
  }
}
</script>
