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
                    <span class="t13400 color-grey">
                      روش ارسال :
                    </span>
                </div>
       </div>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="200">
        <Table
            class="flex-grow-1"
            :header="detailInfo"
            :items= "detailMockData"
            :loading="loading"
            @updateList="updateList"
            deletePath="report/crud/delete/"
           />

        <v-divider />
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
      "detailMockData": [
        {
            "id": 1,
            "shps": {
                "id": 10,
                "sku": {
                    "id": 15,
                    "label": "شامپوی بدن شون مناسب برای  پوست چرب 1 عدد",
                    "seller": {
                        "id": 1,
                        "shopping_name": "شاواز"
                    }
                }
            },
            "price": 200000,
            "discount": 20000,
            "total_price": 2000000,
            "total_price_after_discount": 1800000,
            "total_price_after_tax": 2180000,
            "paid_price": 21600000,
            "count": 10,
            "logistic_packed_count": 0,
            "base_discount": 0,
            "marketing_discount": 0,
            "discount_code": null
        },
        {
            "id": 2,
            "shps": {
                "id": 2,
                "sku": {
                    "id": 6,
                    "label": "کرم پودر شون رنگ  بژ مناسب برای پوست  چرب دارای خاصیت  آبرسانی 1 باکس",
                    "seller": {
                        "id": 2,
                        "shopping_name": "فروشگاه نکین اسدی3ثث"
                    }
                }
            },
            "price": 200000,
            "discount": 20000,
            "total_price": 2000000,
            "total_price_after_discount": 1800000,
            "total_price_after_tax": 2180000,
            "paid_price": 21600000,
            "count": 10,
            "logistic_packed_count": 0,
            "base_discount": 0,
            "marketing_discount": 0,
            "discount_code": null
        }
    ]
   

      }
    },
  
    setup(props) {
      const {
        pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , cargoReceivingHeader , item , filterField ,loading, getShpsList, detailInfo
      } = OrderPackagingList();
      return {
        pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , cargoReceivingHeader , item , filterField ,loading, getShpsList, detailInfo
      };
    },
  
    computed: {
      confirmModal() {
        return this.$store.getters['get_confirmForm'].confirmModal;
      },

      mocketData() {
                return this.$store.state.mocketData;
             },
             paymentMethods() {
                return this.mocketData.map(item => item.payment_method);
            },
    },
    async mounted() {
  try {
    const data = await this.getShpsList();
    console.log("Fetched data:", data);
    this.allCargoData = await this.getShpsList();
    console.log("All Cargo Data:", this.allCargoData);
    this.filteredCargoData = this.allCargoData;
  } catch (error) {
    console.error("Error fetching all cargo data:", error);
    this.allCargoData = [];
    this.filteredCargoData = [];
  }
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
      /**
       * Change Header Status
       * @param {*} index
       * @param {*} value
       */
      changeHeaderShow(index, value) {
        this.header[index].show = value
      },
      $route(){
                this.getShpsList();

            }
    }
  }
  </script>
  