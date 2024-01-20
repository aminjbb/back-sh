<template>
    <div class="h-100 d-flex flex-column align-stretch seller">
      <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 pt-3">
          <v-col cols="6" />
  
          <v-col cols="6">
            <v-row justify="end" class="mt-0">
              
  
              <ModalTableFilter path="orders/index" :filterField="[]" />
            </v-row>
          </v-col>
        </v-row>
      </v-card>
  
      <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="headerFreeDelivery"
            :items="mockFreeDelivry"
            :page="page"
            :perPage="dataTableLength"
            activePath="asdasd"
            @updateList="updateList"
            deletePath="order/crud/delete/"
            model="order" />
  
        <v-divider />
  
        <v-card-actions class="pb-3">
          <v-row class="px-8">
            <v-col cols="3" class="d-flex justify-start" />
  
            <v-col cols="6" class="d-flex justify-center">
              <div class="text-center">
                <v-pagination
                    v-model="page"
                    :length="pageLength"
                    rounded="circle"
                    size="40"
                    :total-visible="4"
                    prev-icon="mdi-chevron-right"
                    next-icon="mdi-chevron-left" />
              </div>
            </v-col>
  
            <v-col cols="3" class="d-flex justify-end">
              <div
                  align="center"
                  id="rowSection"
                  class="d-flex align-center">
                          <span class="ml-5">
                              تعداد سطر در هر صفحه
                          </span>
                <span class="mt-2" id="row-selector">
                              <v-select
                                  v-model="dataTableLength"
                                  class="t1330"
                                  variant="outlined"
                                  :items="[25,50,100]" />
                          </span>
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <script>
  import Table from '@/components/FreeDelivery/Table/Table.vue'
  import FreeDelivery from "@/composables/FreeDelivery";
  import ModalTableFilter from '@/components/Orders/Filter/Filter.vue'

  
  export default {
    data() {
      return {
        "mockFreeDelivry": [
            {
                "id": 1,
                "state": {
                    "id": 1,
                    "name": "fars",
                    "label": "فارس",
                    "priority": "5",
                    "is_active": 1,
                    "created_at": null,
                    "updated_at": null
                },
                "post": false,
                "pishtaz": false,
                "nafis": false,
                "tipax": false,
                "is_active": false,
                "order_count": 10,
                "order_limit": 1,
                "user_limit": 10,
                "min_order_price": 100000,
                "max_discount": 1000,
                "start_time": "2024-07-08 12:00:00",
                "start_time_fa": "1403/04/18",
                "end_time": "2024-09-09 13:00:00",
                "end_time_fa": "1403/06/19"
            },
            {
                "id": 2,
                "state": {
                    "id": 1,
                    "name": "fars",
                    "label": "فارس",
                    "priority": "5",
                    "is_active": 1,
                    "created_at": null,
                    "updated_at": null
                },
                "post": true,
                "pishtaz": false,
                "nafis": false,
                "tipax": true,
                "is_active": true,
                "order_count": 10,
                "order_limit": 1,
                "user_limit": 10,
                "min_order_price": 100000,
                "max_discount": 1000,
                "start_time": "2024-07-08 12:00:00",
                "start_time_fa": "1403/04/18",
                "end_time": "2024-09-09 13:00:00",
                "end_time_fa": "1403/06/19"
            },
            {
                "id": 3,
                "state": {
                    "id": 1,
                    "name": "fars",
                    "label": "فارس",
                    "priority": "5",
                    "is_active": 1,
                    "created_at": null,
                    "updated_at": null
                },
                "post": true,
                "pishtaz": false,
                "nafis": false,
                "tipax": true,
                "is_active": true,
                "order_count": 10,
                "order_limit": 1,
                "user_limit": 10,
                "min_order_price": 100000,
                "max_discount": 1000,
                "start_time": "2024-07-08 12:00:00",
                "start_time_fa": "1403/04/18",
                "end_time": "2024-09-09 13:00:00",
                "end_time_fa": "1403/06/19"
            }
        ],
      }
    },
  
    setup(props) {
      const {
         headerFreeDelivery, filterField , page , voucherList
        ,dataTableLength ,pageLength ,getVoucherList
      } = FreeDelivery();
      return {
         headerFreeDelivery, filterField , page , voucherList
        ,dataTableLength ,pageLength , getVoucherList ,
      };
    },
  
    components: {
      Table,
      ModalTableFilter,
    
    },
  
    computed: {
      confirmModal() {
        return this.$store.getters['get_confirmForm'].confirmModal
      }
    },
  
    methods: {
      changeHeaderShow(index, value) {
        this.headerFreeDelivery[index].show = value
      },
  
      updateList(status) {
        if (status === 'true') {
          this.getVoucherList();
        }
      },
    },
  
    mounted() {
      this.getVoucherList()
    },
  
    watch: {
      dataTableLength(val) {
      },
    }
  }
  </script>
  