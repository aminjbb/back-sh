<template>
    <div class="h-100 d-flex flex-column align-stretch">
      <v-card height="100" class="ma-5 br-12 stretch-card-header-90">
        <v-row
            justify="start"
            align="start"
            class="px-10 py-5">
          
            
            <v-col cols="12" md="6">
            
            <v-form @submit.prevent="onFormSubmit" v-model="valid" class="">
                
              <div class="text-right  ">
                
                  
              </div>
              <div>
                <v-text-field 
                variant="outlined" 
                :rules="rule" 
                v-model="cargo"
                placeholder="شناسه سفارش را اسکن نمایید"/>

              </div>
            </v-form>
          </v-col>
  
        </v-row>
      </v-card>
      <v-card
          class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch"
          height="580"
      >

        <Table
          
            class="flex-grow-1"
            deletePath="category/crud/delete/"
            :header="cargoReceivingHeader"
            :items="orderList"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
        />
  
        <v-divider/>
  
      
      </v-card>
    </div>
  </template>
  
  <script>
  import {ref} from 'vue'
  //Components
  import Table from '@/components/OrderPackaging/Table/Table.vue'
  import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
  import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
  import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
  import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
  import OrderPackagingList from '@/composables/OrderPackaging';
  
  export default {
    components: {
      Table,
      ModalTableFilter,
      ModalColumnFilter,
      ModalGroupAdd,
      ModalExcelDownload,
       
    },
  
    data(){
      return{
        cargo:null ,
        rule:[v=> !!v || 'این فیلد الزامی است'],
        allCargoData: [],
      filteredCargoData: [],
       
      "mocketData": [{
                    "id": 21,
                    "user": {
                        "first_name": "اویس",
                        "last_name": "اویس"
                    },
                    "shps_count": 10,
                    "status": "paid",
                    "payment_status": "unsuccessful",
                    "payment_method": "saman",
                    "packed_status": 1,
                    "total_price": 22500000,
                    "paid_price": 20000000,
                    "submit_date": "2023-12-30 13:11:39",
                    "submit_date_fa": "1402/10/09",
                    "receive_date": "2024-01-04 13:11:39",
                    "receive_date_fa": "1402/10/14",
                    "total_discount": 2500000,
                    "state": {
                        "id": 1,
                        "label": "فارس"
                    },
                    "city": {
                        "id": 1,
                        "label": "شیراز"
                    }
                },
                {
                    "id": 22,
                    "user": {
                        "first_name": "اویس",
                        "last_name": "اویس"
                    },
                    "shps_count": 10,
                    "status": "paid",
                    "payment_status": "contradictory",
                    "payment_method": "wallet",
                    "packed_status": 0,
                    "total_price": 22500000,
                    "paid_price": 20000000,
                    "submit_date": "2023-12-30 13:11:50",
                    "submit_date_fa": "1402/10/09",
                    "receive_date": "2024-01-04 13:11:50",
                    "receive_date_fa": "1402/10/14",
                    "total_discount": 2500000,
                    "state": {
                        "id": 1,
                        "label": "فارس"
                    },
                    "city": {
                        "id": 1,
                        "label": "شیراز"
                    }
                },
                {
                    "id": 23,
                    "user": {
                        "first_name": "اویس",
                        "last_name": "اویس"
                    },
                    "shps_count": 10,
                    "status": "paid",
                    "payment_status": "successful",
                    "payment_method": "snapp",
                    "packed_status": 0,
                    "total_price": 22500000,
                    "paid_price": 20000000,
                    "submit_date": "2023-12-30 13:11:51",
                    "submit_date_fa": "1402/10/09",
                    "receive_date": "2024-01-04 13:11:51",
                    "receive_date_fa": "1402/10/14",
                    "total_discount": 2500000,
                    "state": {
                        "id": 1,
                        "label": "فارس"
                    },
                    "city": {
                        "id": 1,
                        "label": "شیراز"
                    }
                }
            ]

      }
    },
  
    setup(props) {
      const {
        pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , cargoReceivingHeader , item , filterField ,loading, getShpsList,orderList, getOrderListDetail
      } = OrderPackagingList();
      return {
        pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , cargoReceivingHeader , item , filterField ,loading, getShpsList, orderList, getOrderListDetail
      };
    },
  
    computed: {
      confirmModal() {
        return this.$store.getters['get_confirmForm'].confirmModal;
     


      }
    },
    async mounted() {
      this.fetchCargoData();
},
  
    watch: {
      cargo(newCargoId) {
        if (newCargoId) {
            this.fetchCargoData(newCargoId);
            this.updatePackageIdInStore();
        }
        },

      confirmModal(val) {
        if (this.$cookies.get('deleteItem')) {
          if (!val) {
            this.getCategories()
            this.$cookies.remove('deleteItem')
          }
  
        }
      },
  
      dataTableLength(val) {
        this.addPerPage(val)
      },
  
    },
  
    methods: {
      async fetchCargoData(newCargoId) {
            this.getShpsList(newCargoId);
        },
        updatePackageIdInStore() {
        this.$store.commit('set_packageId', this.cargo);
    },
  
      updateSendingMethod() {
    const paymentMethod = "saman"; 
    this.$store.commit('set_sendingMethod', paymentMethod);
  },
  onFormSubmit() {
    if (this.valid) {
      this.$router.push( '/order-packaging/detail-info/' +this.cargo);

    }
  },


      /**
       * Change Header Status
       * @param {*} index
       * @param {*} value
       */
      changeHeaderShow(index, value) {
        this.header[index].show = value
      },
      $route(){
        this.fetchCargoData();
            }
    }
  }
  </script>
  