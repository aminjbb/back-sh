<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5">
        <v-col cols="6"/>

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header"/>

            <PanelFilter
                @resetPage="resetPage"
                path="withdraw-request/index"
                :filterField="filterField"
                :statusItems="status"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :loading="loading"
          :page="page"
          :perPage="dataTableLength"
          activePath="product/crud/update/activation/">

        <template v-slot:customSlot="item">
          <div v-if="item.data.custom === 'pending'" class="factor-dropdown">
            <div
                class="factor-dropdown__selected"
                @click="showDropDown(item.index)"
                :style="{ backgroundColor: BgSelected(item.data.custom) }">
              <span class="t10400">{{ factorSelectedTitle(item.data.custom) }}</span>
              <v-icon icon="mdi-chevron-down"></v-icon>
            </div>

            <div class="factor-dropdown__items  align-center pr-2" :id="`factor-dropdown__items-${item.index}`">
              <div class="factor-dropdown__item my-2 t10400" id="factor-dropdown__item--1">
                {{ translateType(item.data.custom) }}
              </div>
              <div
                  class="factor-dropdown__item my-2 t10400"
                  id="factor-dropdown__item--2"
                  @click="openRejectModal(item)">
                رد شده
              </div>
              <div
                  class="factor-dropdown__item retail-status-box my-2 t10400"
                  id="factor-dropdown__item--3"
                  @click="updateStatus(item.index,'approved',item)">
                تایید شده
              </div>
            </div>
          </div>
          <div
              v-else
              class="expanded-background"
              :style="{ backgroundColor: BgSelected(item.data.status) }">
            {{ factorSelectedTitle(item.data.status) }}
          </div>
        </template>

        <template v-slot:actionSlot="item">
          <div class="text-center">
            <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
              mdi-dots-vertical
            </v-icon>
          </div>
          <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false">
            <v-list class="c-table__more-options">
              <v-list-item>
                <v-list-item-title>
                  <DetailModalTest  :item="item.data"/>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </ShTable>
      <v-divider/>

      <v-card-actions class="pb-3">

        <v-row class="pr-5">
          <v-col cols="3">
            <ModalExcelDownload getEndPoint="finance/admin/transaction/crud/withdraw/export"/>
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
                  next-icon="mdi-chevron-left"/>
            </div>
          </v-col>

          <v-col cols="3" class="d-flex justify-end">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
              <span class="ml-5">تعداد سطر در هر صفحه</span>
              <span
                  class="mt-2"
                  id="row-selector">
                <v-select
                    v-model="dataTableLength"
                    class="t1330"
                    variant="outlined"
                    :items="[25,50,100]"/>
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <ModalRejectWithdrawRequest :getWithdrawRequestList="getWithdrawRequestList" />
  </div>
</template>

<script>
import WithdrawRequests from "@/composables/DepositRequest";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalRejectWithdrawRequest from "@/components/DepositRequest/Modal/ModalRejectedWithdraw.vue";
import DetailModalTest from "@/components/DepositRequest/Modal/Modal.vue";
import {openToast} from "@/assets/js/functions";
import { AxiosCall } from "../../assets/js/axios_call";


export default {
  components: {
    PanelFilter,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable,
    ModalRejectWithdrawRequest,
    DetailModalTest
  },

  data() {
    return {
      perPageFilter: false,
      itemListTable:[]
    }
  },
  setup() {
    const status = [
      {
        label: 'در انتظار',
        value: 'pending',
      },
      {
        label: 'تایید شده',
        value: 'accepted',
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

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    showDropDown(index) {
      const itemDropdown = document.getElementById(`factor-dropdown__items-${index}`);
      itemDropdown.classList.toggle('active');
    },

    BgSelected(status) {
      if (status === 'pending') {
        return '#FFF3E0'; // Light purple
      }
      if (status === 'accepted') {
        return '#E8F5E9'; // Light green
      }
      if (status === 'rejected') {
        return '#FFEBEE'; // Light red
      }
      return 'transparent'; // Default background
    },

    factorSelectedTitle(status) {
      if (status === 'pending') {
        return 'در انتظار '
      }
      if (status === 'accepted') {
        return '  تایید شده'
      }
      if (status === 'rejected') {
        return '  رد شده '
      }

    },

    translateType(type) {
      const translations = { 'pending': 'درانتظار' }
      return translations[type] || type;
    },

    openRejectModal(item) {
      const form = {
        dialog: true,
        object: item
      }
      this.$store.commit('set_modalRejectWithdrawRequest', form)
    },

    async updateStatus(index, status, item) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      formdata.append('status', status)
      AxiosMethod.end_point = 'finance/admin/transaction/crud/withdraw/accept/' + item.data.id
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()

      if (data.status === 'Success') {
        this.getWithdrawRequestList()
        openToast(this.$store, 'وضعیت با موفقیت ویرایش شد.', "success");
        this.$router.push(`/withdraw-request/index`)

      } else {
        this.loading = true
      }
    },
  },

  mounted() {
    this.getWithdrawRequestList();
  },

  watch: {
    WithdrawRequestList() {
      this.itemListTable = []

      this.WithdrawRequestList.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                user_id: item.user_id,
                name: item?.user?.first_name + ' ' + item?.user?.last_name ,
                phone_number: item.user.phone_number,
                amount: item.amount,
                card_number: item.card_number,
                wallet_value: item.user.wallet.value,
                total_inventory:  parseInt(item.user.wallet.value) + parseInt(item.amount ),
                created_at: item.created_at_fa,
                updated_at: item.updated_at_fa,
                custom: item.status,
              },
          ),
      )
    },

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
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },

    page() {
      if (!this.perPageFilter) {
        this.getWithdrawRequestList()
      }
    },

    $route(){
      this.getWithdrawRequestList();

    }
  }
}
</script>
