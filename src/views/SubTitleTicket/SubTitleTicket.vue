<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
     <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
       <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
         <v-row
             justify="center"
             align="center"
             class="px-10 py-5">
           <v-col cols="6">
             <v-row justify="start">
               <v-btn
                   @click="$router.push(`sub-topic/1`)"
                   color="primary500"
                   height="40"
                   rounded
                   class="px-8 mt-1">
                 <template v-slot:prepend>
                   <v-icon>mdi-plus</v-icon>
                 </template>
                 ساخت موضوع
               </v-btn>
             </v-row>
           </v-col>

           <v-col cols="6">
             <v-row justify="end">
               <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

               <PanelFilter
                   @resetPage="resetPage"
                   path="sub-title/index"
                   :filterField="filterField"
                   :page="page"
                   :perPage="dataTableLength"/>
             </v-row>
           </v-col>
         </v-row>
       </v-card>

       <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
         <ShTable
             class="flex-grow-1"
             :headers="header"
             :items="itemListTable"
             :loading="loading"
             :page="page"
             :perPage="dataTableLength"
             :activePath="`add/endpoint`">
           <template v-slot:showSlot="item">
             <v-btn
                 height="40"
                 rounded
                 color="error"
                 class="px-8 mt-1"
                 variant="icon">
               <v-icon>mdi-eye</v-icon>
             </v-btn>
           </template>

           <template v-slot:actionSlot="item">
             <div class="text-center">
               <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                 mdi-dots-vertical
               </v-icon>
             </div>

             <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
               <v-list class="c-table__more-options">
                 <v-list-item>
                   <v-list-item-title>
                     <div class="ma-5 pointer" @click="$router.push(`sub-topic/${item.data.id}`)">
                       <v-icon size="small" class="text-grey-darken-1">
                         mdi-pencil-box-outline
                       </v-icon>
                       <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
                     </div>
                   </v-list-item-title>
                 </v-list-item>

                 <v-list-item>
                   <v-list-item-title>
                     <div class="ma-5 pointer" @click="$router.push(`sub-topic/${item.data.id}`)">
                       <v-icon size="small" class="text-grey-darken-1">
                         mdi-plus
                       </v-icon>
                       <span class="mr-2 text-grey-darken-1 t14 w300">افزودن زیر موضوع</span>
                     </div>
                   </v-list-item-title>
                 </v-list-item>

                 <v-list-item>
                   <v-list-item-title>
                     <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                       <v-icon size="small" class="text-grey-darken-1">
                         mdi-trash-can-outline
                       </v-icon>
                       <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                     </div>
                   </v-list-item-title>
                 </v-list-item>

               </v-list>
             </v-menu>
           </template>
         </ShTable>

         <v-divider />

         <v-card-actions class="pb-3">
           <v-row class="pr-5">
             <v-col cols="3">
               <ModalExcelDownload getEndPoint="admin/csv/get/export" />
             </v-col>

             <v-col cols="6">
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

             <v-col cols="3">
               <div
                   align="center"
                   id="rowSection"
                   class="d-flex align-center">
                 <span class="ml-5">تعداد سطر در هر صفحه</span>
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
    </v-main>
  </v-layout>
</template>

<script>
import { defineAsyncComponent } from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const PanelFilter = defineAsyncComponent(()=> import('@/components/PanelFilter/PanelFilter.vue'))
const ModalColumnFilter = defineAsyncComponent(()=> import('@/components/Public/ModalColumnFilter.vue'))
const ModalExcelDownload = defineAsyncComponent(()=> import('@/components/Public/ModalExcelDownload.vue'))
const ShTable = defineAsyncComponent(()=> import('@/components/Components/Table/sh-table.vue'))
import SubTitleTicket from "@/composables/SubTitleTicket";
import {openToast, openConfirm} from "@/assets/js/functions";

export default {
  name: "SubTitleTicket",

  components: {
    DashboardLayout,
    Header,
    ModalColumnFilter,
    PanelFilter,
    ModalExcelDownload,
    ShTable
  },

  setup() {
    const {
      header,
      filterField,
      page,
      dataTableLength,
      loading,
      subTitleTicket,
      getAllSubTitleTicket
    } = SubTitleTicket();

    return {
      header,
      filterField,
      page,
      dataTableLength,
      loading,
      subTitleTicket,
      getAllSubTitleTicket
    };
  },

  data() {
    return {
      itemListTable: [
        {
          id: 123,
          subject: 'پیگیری سفارش',
          creator: 'شهراد نورآذر',
          created_at: '1402/06/12 11:24:52',
          show: true,
          is_active: 1,
        },
        {
          id: 456,
          subject: 'ارسال سفارش',
          creator: 'شهراد نورآذر',
          created_at: '1402/06/12 11:24:52',
          show: true,
          is_active: 0,
        },
      ],
      removeTableItem: {
        text: "با حذف موضوع، زیر موضوع های آن نیز حذف خواهد شد.\n" +
            "آیا از انجام این کار مطمئن هستید؟؟",
        title: "حذف آیتم",
        path: "endpoint",
      },
      perPageFilter:false
    }
  },

  mounted() {
    // this.getAllSubTitleTicket()
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  watch: {
    subTitleTicket() {
      this.itemListTable = []
      this.subTitleTicket.forEach((item) => {console.log(item)
        this.itemListTable.push(
            {
              id: item.id,
              subject: item ,
              creator: item,
              created_at: item,
              show: item,
              is_active: item.is_active,
              is_active_id: item.id,
            }
        )
      })
    },

    // dataTableLength() {
    //   this.perPageFilter = true
    //   this.page = 1
    //   let query = this.$route.query
    //   if (query) {
    //     this.$router.replace({
    //       query: {
    //         ...query,
    //         per_page: this.dataTableLength,
    //       }
    //     })
    //   }
    //   else {
    //     this.$router.push({
    //       query: {
    //         per_page: this.dataTableLength,
    //       }
    //     })
    //   }
    //   this.perPageFilter = false
    // },

    // confirmModal(val) {
    //   if (localStorage.getItem('deleteObject') === 'done') {
    //     if (!val) {
    //       this.getAllSubTitleTicket();
    //       openToast(
    //           this.$store,
    //           'موضوع با موفقیت حذف شد',
    //           "success"
    //       );
    //       localStorage.removeItem('deleteObject')
    //     }
    //   }
    // },

    // $route(){
    //   this.getAllSubTitleTicket()
    // },

    // page(){
    //   if (!this.perPageFilter){
    //     this.getAllSubTitleTicket()
    //   }
    // }
  }
}
</script>

<style scoped>

</style>