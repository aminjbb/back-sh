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
  
          <div class="text-center c-table__header__item t12500 text-black" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
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
                          {{rowIndexTable(index)}}
                      </span>
                  </div>
  
                  <div
                      v-if="item.id && header[1].show"
                      class="c-table__contents__item justify-center"
                      :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                      <span class="t14300 text-gray500 py-5 number-font">
                          {{ item.id }}
                      </span>
                  </div>
  
                  <div
                      v-if="header[2].show"
                      class="c-table__contents__item justify-center"
                      :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                      <span class="t14300 text-gray500 py-5">
                          <template v-if="item.sku_label">
                              {{ item.sku_label }}
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
                          <template v-if="item.count">
                              {{ item.count }}
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
        @click="toggleIcon(index)">
        <v-icon size="15" :class="{ 'icon-circle': !iconStates[index] }">{{ iconStates[index] ? 'mdi-plus' : 'mdi-check' }}</v-icon>
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
                            
  
                             
  
                           
  
                              <v-list-item >
                                  <v-list-item-title>
                                      <div
                                          class="ma-5 pointer"
                                          @click="$router.push(`/driver-management/update`)">
                                          <v-icon size="small" class="text-grey-darken-1">mdi-pen</v-icon>
                                          <span class="mr-2 text-grey-darken-1 t14300">
                                            پرینت گروهی برچسب                                           
                                              </span>
                                      </div>
                                  </v-list-item-title>
                              </v-list-item>
  
                              <v-list-item>
                                  <v-list-item-title>
                                      <div class="ma-5 pointer" @click="getShpssDetail(item)">
                                          <v-icon size="small" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                                          <span class="mr-2 text-grey-darken-1 t14300">
                                            ثبت مفقودی
                                          </span>
                                      </div>
                                  </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                  <v-list-item-title>
                                      <div class="ma-5 pointer" @click="getShpssDetailLost(item)">
                                          <v-icon size="small" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                                          <span class="mr-2 text-grey-darken-1 t14300">
                                            ثبت ضایعات 
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
     
      <ModalDamageReport/>
     <ModalLostReport/>
  </div>
  </template>
  
  <script>
  import ModalLostReport from "@/components/BulkLabelPrint/Modal/ModalLostReport.vue";
  import ModalDamageReport from "@/components/BulkLabelPrint/Modal/ModalDamageReport.vue";

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
  import {
      openModal
  } from "@/assets/js/functions_seller";
  export default {
      components: {
        ModalLostReport,
        ModalDamageReport

      },
  
      props: {
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
              filter: [],
              active: [],
              panelFilter: new SupplierPanelFilter(),
              activeColumn: false,
              fetchCargoData: [],


           
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
      watch: {
        items(newItems) {
        this.iconStates = newItems.map(() => true);
    },
},
      methods: {
          /**
           * Open Basic Discount modal
           * @param {*} id
           */
         
        
           toggleIcon(index) {
     
                let iconStatesCopy = [...this.iconStates];
                iconStatesCopy[index] = !iconStatesCopy[index];
                this.iconStates = iconStatesCopy;
    },
   
    


  
          /**
           * Get row index in table
           * @param {*} index
           */

          /**
     * LostShpss modal
     */
    async getShpssDetail(item) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `package/shps/list/${item.id}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        const form = {
          dialog :true,
          object : data.data
        }
        this.$store.commit('set_modalLostShpss' , form)
      }
    },

    async getShpssDetailLost(item) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `package/shps/list/${item.id}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        const form = {
          dialog :true,
          object : data.data
        }
        this.$store.commit('set_modalDamageShpss' , form)
      }
    },


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
              console.log("Removing item with ID:", id);
                  console.log("Delete path:", this.deletePath + id);
                  // openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)

                  openConfirm(this.$store, "با حذف راننده دیگر به جزئیات آن دسترسی نخواهید داشت.آیا از انجام این کار اطمینان دارید؟", "حذف راننده","delete", this.deletePath + id, true)
          },
      },
  }
  </script>
  