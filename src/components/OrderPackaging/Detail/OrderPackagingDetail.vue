<template>
    <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card
        class="ma-5 br-12"
        height="160"
        style="flex:0 0 150px">
        <header class="modal__header d-flex justify-center align-center ">
            <span class="t16400 pa-6">
              اطلاعات سفارش
              
            </span>
        </header>
        <v-divider color="grey" />
       <div  class="d-flex justify-center mx-16 mt-4 ">
         <div class="text-right my-3 mx-15">
                    <span class="t13400 color-grey">
                        شناسه سفارش :
                        
                    </span>
                </div>
                <div class="text-right my-3 mx-15">
                    <span  class="t13400 color-grey">
                      روش ارسال :  {{ orderListDetail.order_factor_id }}
                      <span class="t13400 color-grey">                      
                      </span>
                    </span>
                </div>
       </div>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="200">
    
        <Table
            class="flex-grow-1"
            :header="detailInfo"
            :items= "orderListDetail"
            :loading="loading"
            @updateList="updateList"
            @all-comparisons-successful="handleComparisonChange"
            deletePath="report/crud/delete/"
           />

        <v-divider />
        <v-card-actions class="pb-3">
            <v-row class="px-5 py-2" justify="end">
                <v-btn
                    height="40"
                    rounded
                    variant="flat"
                    class="px-8 mt-2">
                    گزارش مغایرت
                </v-btn>
                <v-btn
                    
                    color="primary500"
                    :disabled="!allComparisonsSuccessful"
                    height="40"
                    rounded
                    variant="flat"
                    class="px-8 mt-2"
                    :class="{'gray-button': !allComparisonsSuccessful}">
                    
                    اتمام بسته بندی            
                    </v-btn>
            </v-row>
        </v-card-actions>
    </v-card>

</div>
  </template>
  
  <script>
  import {ref} from 'vue'
  //Components
  import Table from '@/components/OrderPackaging/Table/TableDetail.vue'
  import OrderPackagingList from '@/composables/OrderPackaging';
  
  export default {
    components: {
      Table,
    },
  
    data(){
      return{
        cargo:null ,
        rule:[v=> !!v || 'این فیلد الزامی است'],
        allCargoData: [],
      filteredCargoData: [],
      allComparisonsSuccessful: false,

   
   

      }
    },
  
    setup(props) {
      const {
        pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , cargoReceivingHeader , item , filterField ,loading,  detailInfo, getOrderListDetail, orderListDetail
      } = OrderPackagingList();
      const orderDetails = ref(orderListDetail);
      return {
        pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , cargoReceivingHeader , item , filterField ,loading, detailInfo, getOrderListDetail, orderListDetail, orderDetails
      };
    },
  
    computed: {
      confirmModal() {
        return this.$store.getters['get_confirmForm'].confirmModal;
      },

 
    },
  
  
    watch: {
      cargo(newId) {
        if (newId && Array.isArray(this.allCargoData)) {
      this.filteredCargoData = this.allCargoData.filter(item => item.id === newId);
    } else {
      this.filteredCargoData = this.allCargoData;
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
      updateList(value) {
            if (value === 'true') {
                this.getOrderListDetail();
            }
        },
        
        handleComparisonChange(allSuccessful) {
        this.allComparisonsSuccessful = allSuccessful;
    },
   
    },
    mounted() {
      this.getOrderListDetail(this.$route.params.orderId);
    },
  }
  </script>
  