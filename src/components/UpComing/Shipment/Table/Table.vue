<template>
  <div
      :class="variant == 'outlined' ? 'table-outlined': ''"
      :style="{height: height}"
      class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading"/>

    <header class="c-table__header d-flex justify-start">
      <template v-for="(head, index) in header">
        <template v-if="head.value">
          <div
              v-if="head.show"
              @click="createOrdering(head.value, head.order)"
              class="text-right c-table__header__item t12 w500 px-0"
              :class="head.order == true ? 'pointer' : ''"
              :key="index"
              :style="{ width: itemsWidth, flex:head.value === 'label' ? `1 0 ${itemsWidth}` :  `0 0 ${itemsWidth}`}">
            {{ head.name }}
          </div>
        </template>
        <template v-else>
          <div
              v-if="head.show"
              class="text-right pointer c-table__header__item t12 w500"
              :key="index"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            {{ head.name }}
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
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ rowIndexTable(index) }}
                        </span>
              <template v-if="checkbox">
                <v-checkbox class="mr-1" v-model="item.value"/>
              </template>
            </div>
          </div>

          <div
              v-if=" header[1].show"
              class="c-table__contents__item text-right"
              :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5 number-font">
                       {{ item.sku_label }}
                    </span>
          </div>


          <div
              v-if=" header[2].show"
              class="c-table__contents__item text-right"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14 w300 text-gray500 py-5 number-font">
                       {{ item.shps_count }}
                    </span>
          </div>
          <div
              v-if=" header[3].show"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14 w300 text-gray500 py-5 number-font">
                {{ item.min_tolerance }}
              </span>

          </div>
          <div
              v-if=" header[4].show"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14 w300 text-gray500 py-5 number-font">
                {{ item.max_tolerance }}
              </span>
          </div>

          <div
              v-if=" header[4].show"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
              <span class="t14 w300 text-gray500 py-5 number-font">
             <v-text-field :min="0" type="number" v-if="form[index]" v-model="form[index].count" variant="outlined"/>
              </span>
          </div>
          <div
              v-if=" header[4].show && form[index]"
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-progress-circular
                v-if="form[index].loading"
                indeterminate
                color="primary"></v-progress-circular>
            <div
                v-else
                @click="validate(item , index)"
                class="seller__add-sku-btn d-flex justify-center align-center pointer">

              <v-icon size="15">mdi-plus</v-icon>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="null-data-table d-flex justify-center align-center flex-column">
        <img src="@/assets/img/NullTable.png" alt="shavaz image">
        <div class="d-flex justify-center align-center flex-column">
          <span class="title4 text-black mb-5">لیست خالی!</span>
          <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
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
      form: []
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
    items(val){
      this.items.forEach(element => {
        const form = {
          loading: false,
          count: element.packed_count
        }
        this.form.push(form)
      })
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
          let query = this.$route.query
          if (this.order_type === 'desc') {
            this.order_type = 'asc'
          } else {
            this.order_type = 'desc'
          }
          this.$router.replace({
            query: {
              ...query,
              order_type :this.order_type,
              order :index
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

    validate(item , index){
      if (this.form[index].count< item.min_tolerance || this.form[index].count > item.max_tolerance){
        const formData = {
          count :this.form[index].count,
          shps:item.id,
          buying_price:this.form[index].price
        }
        const form ={
          dialog:true,
          object:formData
        }
        this.$store.commit('set_warningTolerance' , form)
      }
      else{
        this.updateShps(index)
      }
    },
    /**
     * Change Active
     * @param {*} index
     * @param {*} item
     */
    async updateShps(index) {
      this.form[index].loading = true
      const formData = new FormData()
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/shps/pack`
      formData.append('shipment_id', this.$route.params.shipmentId)
      formData.append('shps', this.items[index].id)
      formData.append('package_id', localStorage.getItem('packId'))
      formData.append('packed_count', this.form[index].count)
      AxiosMethod.form = formData
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.form[index].loading = false
        openToast(
            this.$store,
            ' کالا با موفقیت ویرایش شد.',
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

  },

}
</script>
