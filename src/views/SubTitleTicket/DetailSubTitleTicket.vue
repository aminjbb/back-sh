<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="">
        <v-card class="ma-5 br-12 py-10 position__relative" height="164">
          <div class="text-center t14500 pb-5">اطلاعات موضوع</div>
          <v-divider/>
          <div class="d-flex justify-center ga-16 align-center px-10 pt-5">
            <div class="">
              <span> عنوان موضوع:  </span>
              <span class="t12400">{{ subTitleEdit?.title }}</span>
            </div>
            <div class="d-flex align-center">
              <div> فیلدهای اجباری:  </div>
              <div class="d-flex justify-center align-center">
                <div
                    v-for="(field, fieldIndex) in subTitleEdit?.mandatory_fields"
                    :key="fieldIndex"
                    class="rounded bg-gray200 t14400 px-2 py-1 mx-1">{{ translateMandatoryFields(field) }}</div>
              </div>
            </div>
          </div>

        </v-card>

        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="450">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
              :activePath="`ticket/topic/crud/update/activation/`">
            <template v-slot:customSlot="item">
              <div class="d-flex justify-center align-center">
                <div
                    v-for="(field, fieldIndex) in item.data.custom"
                    :key="fieldIndex"
                    class="rounded bg-gray200 t14400 px-2 py-1 mx-1">{{ translateMandatoryFields(field) }}</div>
              </div>
            </template>
          </ShTable>

          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="pr-5">
              <v-col cols="9">
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
import {defineAsyncComponent} from "vue";
import SubTitleTicket from "@/composables/SubTitleTicket";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const ShTable = defineAsyncComponent(()=> import('@/components/Components/Table/sh-table.vue'))

export default {
  name: "DetailSubTitleTicket",

  components:{
    DashboardLayout,
    Header,
    ShTable
  },

  setup() {
    const {
      getSubTitle,
      subTitleEdit,
      page,
      pageLength,
      dataTableLength
    } = SubTitleTicket()

    return {
      getSubTitle,
      subTitleEdit,
      page,
      pageLength,
      dataTableLength
    }
  },

  data() {
    return{
      header: [
        { name: 'ردیف', title: 'ردیف', show: true, align:'center', sortable: false, key: 'row'},
        { name: 'عنوان زیر موضوع', title: 'عنوان زیر موضوع', show: true, align:'center', key: 'title'},
        { name: 'تاریخ ایجاد', title: 'تاریخ ایجاد', show: true, align:'center', key: 'created_at'},
        { name: 'تاریخ به روزرسانی', title: 'تاریخ به روزرسانی', show: true, align:'center', key: 'updated_at'},
        { name: 'فیلد های اجباری', title: 'فیلد های اجباری', show: true, align:'center', key: 'custom'}
      ],
      itemListTable:[]
    }
  },

  mounted() {
    this.getSubTitle()
  },

  methods: {
    translateMandatoryFields(text) {
      if (text==='photo') return 'تصویر'
      else if (text==='seller_sku_id') return 'شناسه کالا'
      else if (text==='order_number') return 'شماره سفارش'
    },
  },

  watch:{
    subTitleEdit() {
      this.itemListTable = []
      this.subTitleEdit.children.forEach((item) => {
        this.itemListTable.push(
            {
              id: item.id,
              title: item.title,
              custom: item.mandatory_fields,
              created_at:  item.created_at_fa + ' ' +item.created_at.split('T')[1].split('.')[0],
              updated_at:  item.updated_at_fa + ' ' +item.updated_at.split('T')[1].split('.')[0],
            }
        )
      })
    },
  }
}
</script>

<style scoped>

</style>