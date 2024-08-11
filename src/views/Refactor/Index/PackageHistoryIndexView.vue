<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card
            height="164"
            class="ma-5 br-12"
            style="flex: 0 0 164px;">
          <header class="modal__header d-flex justify-center align-center">
            <span class="t16400 pa-6">
                اطلاعات بسته
            </span>
          </header>

          <v-divider color="grey" />

          <div class="d-flex justify-center align-center">
            <div class="mt-8">
              <span class="t12 w500 text-black ml-1">شناسه بسته :</span>
              <span v-if="packageContent && packageContent.id" class="t14 w300 text-gray500 number-font">{{packageContent.id}}</span>
            </div>
          </div>
        </v-card>

        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column" style="height: calc(100% - 164px);">
          <ShTable
              class="flex-grow-1"
              :headers="historyHeader"
              :items="itemListTable"
              :activePath="'warehouse/crud/update/activation/'">
            <template v-slot:customSlot="item">
              <span class="t13500 text-black py-5 expanded-background" style="background-color: #F5F5F5;">
                {{ renameStatus(item.data.custom) }}
              </span>
            </template>

          </ShTable>

<!--          <Table-->
<!--              class="flex-grow-1"-->
<!--              :header="historyHeader"-->
<!--              :items="packageHistory"-->
<!--              @updateList="updateList"-->
<!--              model="package" />-->
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script >
import {defineAsyncComponent} from "vue";
const PackageHistory = defineAsyncComponent(()=> import ('@/components/Package/PackageHistory.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ShTable from "@/components/Components/Table/sh-table.vue";
import Table from '@/components/Package/Table/HistoryTable.vue'
import Package from "@/composables/Package";
import { AxiosCall } from '@/assets/js/axios_call.js'

export default {
  data() {
    return {
      packageContent: null,
      packageHistory: [],
      itemListTable: []
    }
  },

  components: {
    Table,
    DashboardLayout,
    Header,
    ShTable
  },

  setup(props) {
    const { historyHeader, } = Package();
    return { historyHeader };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    async getPackage() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'package/crud/get/' + this.$route.params.packageId
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.packageContent = data.data;
        console.log(this.packageContent);
      }
    },

    async getPackageHistory() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'package/crud/history/' + this.$route.params.packageId
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.packageHistory = data.data.data
      }
    },

    renameStatus(status) {
      if (status === 'loading') {
        return 'لودینگ'
      } else if (status === 'luggage') {
        return 'در حال بارگیری'
      } else if (status === 'sent_to_warehouse') {
        return 'انتقال به انبار اصلی'
      } else if (status === 'received_by_warehouse') {
        return 'رسیده به انبار اصلی'
      }
      else if (status === 'completed') {
        return 'پر شده'
      }else {
        return 'خالی';
      }

    },

    getPackageType(type){
      console.log(type, 'type')
      if(type === 'bulk'){
        return 'بالک'
      }else{
        return 'پالت'
      }
    },
  },

  mounted() {
    this.getPackage();
    this.getPackageHistory();
  },

  watch: {
    packageHistory(){
      this.itemListTable = []

      this.packageHistory.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                updated_at: item.updated_at_fa,
                type: item.type? this.getPackageType(item.type) : '---',
                shps_count: item.shps_count,
                custom: item.status,
              },
          ),
      )
    }
  }
}
</script>