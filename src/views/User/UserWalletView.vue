
<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <WalletUser />-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card
            height="70"
            class="ma-5 br--12 stretch-card-header-70"
        >
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5"
          >
            <v-col cols="6">
              <v-row v-if="$route.query.user_id" justify="start">
                <IncreseWalletModal :getTransactionList="getTransactionList"/>

                <DecreaseWalletModal :getTransactionList="getTransactionList"/>

              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter
                    :changeHeaderShow="changeHeaderShow"
                    :header="header"
                />

                <PanelFilter
                    @resetPage="resetPage"
                    :userId="$route.query.user_id"
                    :path="`wallet/index`"
                    :filterField="filterFieldWallet"
                    :statusItems="statusItems"
                    :chargeType="transactionReason"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card
            class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
            height="580">
          <ShTable
              class="flex-grow-1"
              :headers="headerTransaction"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength">
            <template v-slot:customSlot="item">
              <span v-if="item.data.type == 'withdraw'" class="t14 w300 text-error py-5 number-font">  {{splitChar(item.data.custom ) }} - </span>
              <span v-else class="t14 w300 text-black py-5 number-font">  --- </span>
            </template>

            <template v-slot:customSlot2="item">
              <span v-if="item.data.type == 'deposit'" class="t14 w300 text-success py-5 number-font d--ltr">  {{splitChar(item.data.custom ) }} +</span>
              <span v-else class="t14 w300 text-black py-5 number-font">  --- </span>
            </template>
          </ShTable>

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="pr-5">
              <v-col cols="3">
                <ModalExcelDownload getEndPoint="user/csv/get/export"/>
              </v-col>

              <v-col cols="6">
                <div class="text-center" >
                  <v-pagination
                      v-model="page"
                      :length="pageLengthWallet"
                      rounded="circle"
                      size="40"
                      :total-visible="7"
                      prev-icon="mdi-chevron-right"
                      next-icon="mdi-chevron-left"
                  />
                </div>
              </v-col>

              <v-col cols="3">
                <div
                    align="center"
                    id="rowSection"
                    class="d-flex align-center"
                >
                            <span class="ml-5">
                                تعداد سطر در هر صفحه
                            </span>
                  <span class="mt-2"  id="row-selector">
                                <v-select
                                    v-model="dataTableLength"
                                    class="t1330"
                                    variant="outlined"
                                    :items="[25,50,100]"
                                />
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
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import IncreseWalletModal from "@/components/User/Modal/IncreseWalletModal.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import DecreaseWalletModal from "@/components/User/Modal/DecreaseWalletModal.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import User from "@/composables/User";
import {splitChar} from "@/assets/js/functions";
const WalletUser = defineAsyncComponent(()=> import ('@/components/User/Wallet/WalletUser.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

export default {
  components:{
    Header,
    DashboardLayout,
    PanelFilter,
    ModalExcelDownload,
    ModalGroupAdd,
    ModalColumnFilter,
    IncreseWalletModal,
    DecreaseWalletModal,
    ShTable
  },

  setup() {
    const {
      pageLength,
      users,
      getUsers,
      dataTableLength,
      pageLengthWallet,
      page,
      header,
      userList,
      getUserList,
      filterField,
      filterFieldWallet,
      addPerPage,
      headerTransaction,
      getTransactionList,
      transactionList,
      loading
    } = User()
    return {
      pageLength,
      users,
      getUsers ,
      dataTableLength ,
      pageLengthWallet,
      page  ,
      header ,
      userList ,
      getUserList ,
      filterField ,
      filterFieldWallet,
      addPerPage,
      headerTransaction,
      getTransactionList,
      transactionList,
      loading
    }
  },

  data() {
    return {
      userId: this.$route.params.userId,
      statusItems: [
        {
          label: 'در انتظار',
          value: 'waiting',
        },
        {
          label: 'کنسل شده',
          value: 'cancel',
        },
        {
          label: '  ناموفق',
          value: 'failed ',
        },
        {
          label: 'موفق',
          value: 'success  ',
        }
      ],
      transactionReason: [
        {
          label: 'هزینه پستی',
          value: 'post_cost',
        },
        {
          label: 'انصراف از خرید',
          value: ' cancel_order',
        },
        {
          label: 'مغایرت',
          value: 'difference_order',
        },
        {
          label: 'سایر',
          value: 'other',
        },
        {
          label: 'مرجوعی سفارش',
          value: 'return_order',
        },
      ],
      perPageFilter:false,
      itemListTable: [],
    }
  },

  mounted() {
    this.getTransactionList()
    this.getUsers()
  },

  methods: {
    splitChar,
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

    translateType(type) {
      const translations = {
        'post_cost': 'هزینه پستی',
        'difference_order': 'مغایرت',
        'cancel_order': ' انصراف از خرید',
        'return_order': ' مرجوعی سفارش',
        'other': ' سایر',
        'success': 'موفق ',
        'waiting': 'در انتظار',
        'failed': 'ناموفق',
        'cancel': 'کنسل شده',
        'operator_mistake': 'خطای اپراتور',

      };
      return translations[type] || type;
    },
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  watch: {
    transactionList() {
      this.itemListTable = []

      this.transactionList.forEach((item) =>
          this.itemListTable.push(
              {
                type: item.type,
                phone_number: item?.user?.phone_number,
                name: item?.user?.first_name + ' ' + item?.user?.last_name,
                refid : item.refid ? item.refid.substring(0,15) : '---' ,
                status: this.translateType(item.status),
                reason: item.charge_type ? this.translateType(item.charge_type) : '---',
                custom: item.amount? item.amount : '---' ,
                custom2: item.amount? item.amount : '---',
                wallet_value: splitChar(item.latest_balance),
                create_at:  item.created_at_fa + ' ' +item.created_at.split('T')[1].split('.')[0],
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
        this.getTransactionList()
      }
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getUserList();
          this.$cookies.remove('deleteItem')
        }
      }
    },
    $route(to){
      this.getTransactionList(to)
    }
  }
}
</script>

