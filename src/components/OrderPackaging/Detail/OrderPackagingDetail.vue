<template>
    <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card
        class="ma-5 br-12"
        height="160"
        style="flex:0 0 150px">
        <header class="modal__header d-flex justify-center align-center">
            <span class="t16400 pa-6">
                ثبت کالای مفقودی یا ضایعات
            </span>
        </header>
        <v-divider color="grey" />
       <div  class="d-flex justify-between mx-16  ">
         <div class="text-right my-3 mx-15">
                    <span class="t13400 color-grey">
                        شناسه بسته :<span class="text-red">*</span>
                    </span>
                </div>
                <div class="text-right my-3 mx-15">
                    <span class="t13400 color-grey">
                        نوع بسته
                    </span>
                </div>
       </div>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="200">
        <Table
            class="flex-grow-1"
            :header="detailInfo"
            :items=[]
            :loading="loading"
            @updateList="updateList"
            deletePath="report/crud/delete/"
            model="report" />

        <v-divider />
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
     


      }
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

      filterDataById(id) {
      if (!id) {
        this.filteredCargoData = this.allCargoData;
        return;
      }
      this.filteredCargoData = this.allCargoData.filter(item => item.id === id);
    },
  


  onFormSubmit() {
     
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
                this.getShpsList();

            }
    }
  }
  </script>
  