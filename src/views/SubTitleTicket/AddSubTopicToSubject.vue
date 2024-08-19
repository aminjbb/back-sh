<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="">
        <v-card class="ma-5 br-12 py-10 position__relative" height="320">
          <div class="text-center t14500 pb-5">افزودن زیر موضوع</div>
          <v-divider/>

          <v-form ref="addForm" v-model="valid">
            <v-row class=" mr-16" justify="center" align="center">
              <v-col cols="12" md="12">
                <div class="text-right my-5">
                  <span class="t12400">عنوان موضوع :</span>
                  <span class="t12400 mr-2">پیگیری سفارش</span>
                </div>
              </v-col>

              <v-col cols="12" md="5">
                <div class="text-right my-5">
                  <span class="t12400">عنوان زیرموضوع</span>
                  <span class="text-error mr-1">*</span>
                </div>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    single-line
                />
              </v-col>

              <v-col cols="12" md="5">
                <div class="text-right my-5">
                  <span class="t12400">فیلدهای اجباری</span>
                </div>
                <v-autocomplete
                    density="compact"
                    variant="outlined"
                    single-line
                    :items="requiredFiledList"
                    item-title="name"
                    item-value="id"
                />
              </v-col>

              <v-col cols="12" md="2" class="mt-14">
                <v-btn
                    :loading="loading"
                    @click="validate()"
                    color="primary500"
                    rounded>
                  دخیره
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="520">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
              :activePath="`add/endpoint`">
            <template v-slot:customSlot="item">
              <div class="d-flex justify-center align-center">
                <div
                    v-for="(field, fieldIndex) in item.data.required_field"
                    :key="fieldIndex"
                    class="rounded bg-gray200 t14400 px-2 py-1 mx-1">{{ field }}</div>
              </div>
            </template>
          </ShTable>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const ShTable = defineAsyncComponent(()=> import('@/components/Components/Table/sh-table.vue'))
import SubTitleTicket from "@/composables/SubTitleTicket";

export default {
  name: "AddSubTopicToSubject",

  components: {
    DashboardLayout,
    Header,
    ShTable
  },

  setup() {
    const {
      page,
      dataTableLength
    } = SubTitleTicket

    return {
      page,
      dataTableLength
    }
  },

  data() {
    return {
      valid: false,
      loading: false,
      itemListTable:[
        {
          sub_topic: 'نرسیدن سفارش',
          created_at: '1402/06/12 11:24:52',
          updated_at: '1402/06/12 11:24:52',
          required_field: ['شناسه کالا', 'شماره سفارش'],
          is_active: 1,
        }
      ],

      header: [
        { name: 'ردیف', title: 'ردیف', show: true, align:'center', sortable: false, key: 'row'},
        { name: 'عنوان زیر موضوع', title: 'عنوان زیر موضوع', show: true, align:'center', key: 'sub_topic'},
        { name: 'تاریخ ایجاد', title: 'تاریخ ایجاد', show: true, align:'center', key: 'created_at'},
        { name: 'تاریخ به روزرسانی', title: 'تاریخ به روزرسانی', show: true, align:'center', key: 'updated_at'},
        { name: 'فیلد های اجباری', title: 'فیلد های اجباری', show: true, align:'center', key: 'custom'},
        { name: 'وضعیت', title: 'وضعیت', show: true, key:'is_active', sortable: false, align: 'center'},
      ]
    }
  }
}
</script>