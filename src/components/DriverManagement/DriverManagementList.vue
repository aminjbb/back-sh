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
               :headers="headerDriver"
               :items="DriverManagementList.data"
               :page="page"
               :perPage="dataTableLength"
               :loading="loading"
               :delete="deleteTable"
               :menuTable="menuTable"

               updateUrl="page/csv/mass-update"
               activePath="page/crud/update/activation/"
           > </ShTable>

           <v-divider />

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
   import shBtn from "@/components/Components/Kits/Buttons/sh-btn.vue";
   import ShTable from "@/components/Components/Table/sh-table.vue";


   export default {
     data() {
       return {
         perPageFilter:false,

         loading: false,
         deleteTable: { text: "با حذف راننده دیگر به جزئیات آن دسترسی نخواهید داشت.آیا از انجام این کار اطمینان دارید؟", title: "حذف راننده", path: "driver/crud/delete/" },
         menuTable: [
             {icon: "mdi-pen", text: "ویرایش", to:"/driver-management/update/", params: true},
         ]
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
             headerDriver,
               addPagination,
               addPerPage,
               loading,
             consignmentPrintList,
             headerConsignmentShipmentList
           } = DriverManagement();
           return {
               pageLength,
               getDriverList,
               DriverManagementList,
               filterField,
               dataTableLength,
               page,
             headerDriver,
               addPagination,
               addPerPage,
               loading,
             consignmentPrintList,
             headerConsignmentShipmentList
           };
       },

       components: {
         shBtn,
         PanelFilter,
           Table,
           ModalGroupAdd,
           ModalColumnFilter,
           ModalExcelDownload,
            ShTable,


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




