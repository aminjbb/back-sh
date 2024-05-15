<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5">
        <v-col cols="6" />

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <PanelFilter
                path="withdraw-request/index"
                :filterField="filterField"
                :statusItems="status"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          :getWithdrawRequestList="getWithdrawRequestList"
          class="flex-grow-1"
          :header="header"
          :items="WithdrawRequestList.data"
          :page="page"
          :perPage="dataTableLength"
          activePath="page/crud/update/activation/"
          :loading="loading"
          updateUrl="page/csv/mass-update"

          model="page" />

      <v-divider />

      <v-card-actions class="pb-3">

        <v-row class="pr-5">
          <v-col cols="3">
            <ModalExcelDownload getEndPoint="finance/admin/transaction/crud/withdraw/export"/>
          </v-col>

          <v-col cols="6" >
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
import Table from '@/components/DepositRequest/Table/Table.vue'
import WithdrawRequests from "@/composables/DepositRequest";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  setup() {
    const status = [
      {
        label: 'در انتظار',
        value: 'waiting',
      },
      {
        label: 'در حال بررسی',
        value: 'in_review',
      },
      {
        label: 'رد شده',
        value: 'rejected',
      }
    ]
    const {
      pageLength,
      getWithdrawRequestList,
      WithdrawRequestList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = WithdrawRequests();
    return {
      pageLength,
      getWithdrawRequestList,
      WithdrawRequestList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading,
      status
    };
  },

  components: {
    PanelFilter,
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    updateList(status){
      if(status === 'true'){
        this.getWithdrawRequestList();
      }
    },
  },

  mounted() {
    this.getWithdrawRequestList();
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getPageList();
          openToast(
              this.$store,
              'صفحه مورد نظر با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
    $route(){
      this.getWithdrawRequestList();

    }
  }
}
</script>
