<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :loading="loading"
          :page="page"
          :perPage="dataTableLength"
          :activePath="'category/best_selling/crud/update/activation/'">
        <template v-slot:showSlot="item">
          <ModalShowDes :description="item.data.description" />
        </template>
      </ShTable>
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
                            :total-visible="7"
                            prev-icon="mdi-chevron-right"
                            next-icon="mdi-chevron-left" />
                    </div>
                </v-col>
                <v-col cols="3" class="d-flex justify-end">
                    <div align="center" id="rowSection" class="d-flex align-center">
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
import ContactUs from "@/composables/ContactUs.js"
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue"
import ShTable from "@/components/Components/Table/sh-table.vue";
import { convertDateToJalai, } from "@/assets/js/functions";
import ModalShowDes from "@/components/ContactUs/Modal/ModalShowDes.vue";

export default {
  setup() {
    const {
      pageLength,
      contactUsList,
      addPerPage,
      getContactUs,
      dataTableLength,
      page,
      header,
      loading
    } = ContactUs();
    return {
      pageLength,
      contactUsList,
      addPerPage,
      getContactUs,
      dataTableLength,
      page,
      header,
      loading
    };
  },

  data() {
    return {
      itemListTable: []
    }
  },

  components: {
    ShTable,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ModalShowDes
  },

  mounted() {
    this.getContactUs();
  },

  methods: {
    translateType(type) {
      const translations = {
        'suggestion': 'پیشنهاد',
        'criticism': 'نقد',
        'commercial': 'تبلیغات',
        'digital_marketing': 'دیجیتال مارکتینگ',
        'support': 'حمایت',
        'other': 'سایر',
      };
      return translations[type] || type;
    }
  },

  watch: {
    contactUsList(){
      this.itemListTable = []

      this.contactUsList.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                full_name : item.full_name,
                phone_number: item.phone_number ? item.phone_number : '---' ,
                subject: this.translateType(item.subject),
                created_at: convertDateToJalai (item.created_at , '-' , true),
                description: item.description
              },
          ),
      )
    },

    dataTableLength(val) {
      this.addPerPage(val)
    },

    $route() {
      this.getContactUs();

    }
  }
}
</script>
