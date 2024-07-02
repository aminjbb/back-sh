<template>
   <div class="h-100 d-flex flex-column align-stretch seller">
       <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
           <v-row
               justify="center"
               align="center"
               class="px-10 py-3">
               <v-col cols="6">

                 <sh-btn
                     title="افزودن"
                     prepend-icon="mdi-plus"
                     color="primary500"
                     :height="40"
                     :to="'/driver-management/create'"
                     rounded="xl"
                     :width="120"
                     :hasIcon="true"
                     class="mt-1"

                 />
            </v-col>
   
               <v-col cols="6">
                   <v-row justify="end">
                     <PanelFilter
                         @resetPage="resetPage"
                         path="driver-management/index"
                         :filterField="filterField"
                     />
                   </v-row>
               </v-col>
           </v-row>
       </v-card>
   
       <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
           <ShTable

               class="flex-grow-1"
               :header="headers"
               :items="DriverManagementList.data"
               :page="page"
               :perPage="dataTableLength"
               activePath="page/crud/update/activation/"
               :loading="loading"
               updateUrl="page/csv/mass-update"
               deletePath="driver/crud/delete/"
               model="page" > </ShTable>
<!--         <div>-->
<!--&lt;!&ndash;           <ShTable&ndash;&gt;-->
<!--&lt;!&ndash;               :headers="headers"&ndash;&gt;-->
<!--&lt;!&ndash;               :items="plants"&ndash;&gt;-->
<!--&lt;!&ndash;               :loading="loading"&ndash;&gt;-->
<!--&lt;!&ndash;               :items-per-page="10"&ndash;&gt;-->
<!--&lt;!&ndash;               :height="300"&ndash;&gt;-->
<!--&lt;!&ndash;           >&ndash;&gt;-->

<!--             <template v-slot:item.actions="{ item }">-->
<!--               <v-btn @click="editItem(item)">Edit</v-btn>-->
<!--             </template>-->
<!--          -->
<!--         </div>-->
           <v-divider />
          {{header}}
           <v-card-actions class="pb-3">
               <v-row class="px-8">
                   <v-col cols="3" class="d-flex justify-start">
                       <ModalExcelDownload getEndPoint="cargo/csv/requested/cargo/export" />
                   </v-col>
   
                   <v-col cols="6" class="d-flex justify-center">
                       <div class="text-center">
                           <v-pagination
                               v-model="page"
                               :length="pageLength"
                               rounded="circle"
                               size="40"
                               :total-visible="7"
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
   import Table from '@/components/DriverManagement/Table/Table.vue'
   import DriverManagement from "@/composables/DriverManagement";
   import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
   import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
   import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
   import { openToast} from "@/assets/js/functions";
   import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
   import shBtn from "@/components/components/Kits/Buttons/sh-btn.vue";
   import ShTable from "@/components/components/Table/sh-table.vue";


   export default {
     data() {
       return {
         perPageFilter:false,
         headers: [
           { title: 'Plant', align: 'start', sortable: false, key: 'name' },
           { title: 'Light', align: 'end', key: 'light' },
           { title: 'Height', align: 'end', key: 'height' },
           { title: 'Pet Friendly', align: 'end', key: 'petFriendly' },
           { title: 'Price ($)', align: 'end', key: 'price' },
         ],
         plants: [
           {
             name: 'Fern',
             light: 'Low',
             height: '20cm',
             petFriendly: 'Yes',
             price: 20,
           },
           {
             name: 'Snake Plant',
             light: 'Low',
             height: '50cm',
             petFriendly: 'No',
             price: 35,
           },
           {
             name: 'Monstera',
             light: 'Medium',
             height: '60cm',
             petFriendly: 'No',
             price: 50,
           },
           {
             name: 'Pothos',
             light: 'Low to medium',
             height: '40cm',
             petFriendly: 'Yes',
             price: 25,
           },
           {
             name: 'ZZ Plant',
             light: 'Low to medium',
             height: '90cm',
             petFriendly: 'Yes',
             price: 30,
           },
           {
             name: 'Spider Plant',
             light: 'Bright, indirect',
             height: '30cm',
             petFriendly: 'Yes',
             price: 15,
           },
           {
             name: 'Air Plant',
             light: 'Bright, indirect',
             height: '15cm',
             petFriendly: 'Yes',
             price: 10,
           },
           {
             name: 'Peperomia',
             light: 'Bright, indirect',
             height: '25cm',
             petFriendly: 'Yes',
             price: 20,
           },
           {
             name: 'Aloe Vera',
             light: 'Bright, direct',
             height: '30cm',
             petFriendly: 'Yes',
             price: 15,
           },
           {
             name: 'Jade Plant',
             light: 'Bright, direct',
             height: '40cm',
             petFriendly: 'Yes',
             price: 25,
           },
         ],
         loading: false
       }
     },
       setup() {
           const {
               pageLength,
               getDriverList,
               DriverManagementList,
               filterField,
               dataTableLength,
               page,
               header,
               addPagination,
               addPerPage,
               loading
           } = DriverManagement();
           return {
               pageLength,
               getDriverList,
               DriverManagementList,
               filterField,
               dataTableLength,
               page,
               header,
               addPagination,
               addPerPage,
               loading
           };
       },
   
       components: {
         shBtn,
         PanelFilter,
           Table,
           ModalGroupAdd,
           ModalColumnFilter,
           ModalExcelDownload,
         ShTable

       },
   
       computed: {
            confirmModal() {
                return this.$store.getters['get_confirmForm'].confirmModal
            }
       },
   
       methods: {
         editItem(item) {
         },
            changeHeaderShow(index, value) {
                this.header[index].show = value
            },
         resetPage(){
           this.perPageFilter = true
           this.page = 1
           setTimeout(()=>{
             this.perPageFilter = false
           }, 1000)
         }
       },
   
       mounted() {
            this.getDriverList();
       },
   
       watch: {
         dataTableLength() {
           this.perPageFilter = true
           this.page = 1
           let query = this.$route.query
           if (query) {
             this.$router.replace({
               query: {
                 ...query,
                 per_page: this.dataTableLength,
               }
             })
           }
           else {
             this.$router.push({
               query: {
                 per_page: this.dataTableLength,
               }
             })
           }
           this.perPageFilter = false
         },
         page(){
           if (!this.perPageFilter){
             this.getDriverList()
           }
         },

            confirmModal(val) {
                if (localStorage.getItem('deleteObject') === 'done') {
                    if (!val) {
                    this.getDriverList();
                    openToast(
                        this.$store,
                        'محصول با موفقیت حذف شد',
                        "success"
                    );
                    localStorage.removeItem('deleteObject')
                    }
                }
            },

           $route(){
               this.getDriverList();
           }
       }
   }
   </script>
   



  