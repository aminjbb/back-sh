<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 pt-3">
            <v-col cols="6" />

            <v-col cols="6">
                <v-row justify="end" class="mt-0">
                    <ModalColumnFilter
                        :changeHeaderShow="changeHeaderShow"
                        :header="header" />

                  <PanelFilter
                      @resetPage="resetPage"
                      path="returned-orders/index"
                      :filterField="filterField"
                      :statusItems="status"
                      :paymentMethods="paymentMethods"
                      :packedStatus="packedStatus"
                  />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
<!--        <Table
            class="flex-grow-1"
            :header="header"
            :items="returnedOrderList?.data"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
            @updateList="updateList"
            deletePath="returned-orders/crud/delete/"
            model="returned-orders" />-->
        <ShTable
            class="flex-grow-1"
            :headers="header"
            :items="itemListTable"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
        >
            <template v-slot:actionSlot="item">
                <div class="text-center">
                    <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                        mdi-dots-vertical
                    </v-icon>
                </div>

                <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                    <v-list class="c-table__more-options">
                        <v-list-item-title>
                            <div class="ma-3 pointer d--rtl" @click="$router.push(`/returned-orders/request/${item.data.id}`)">
                                <v-icon class="text-grey-darken-1" size="x-small">mdi-keyboard-return</v-icon>
                                <span class="mr-2 text-grey-darken-1 t14300">
                                        بررسی درخواست مرجوعی
                                </span>
                            </div>
                        </v-list-item-title>

                        <v-list-item-title>
                            <div class="ma-3 pointer d--rtl" @click="showDetails(item.data.id)">
                                <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
                                <span class="mr-2 text-grey-darken-1 t14300">
                                        نمایش جزئیات
                                </span>
                            </div>
                        </v-list-item-title>

                        <v-list-item-title>
                            <div class="ma-3 pointer d--rtl" @click="showFactor(item.data.id)">
                                <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                                <span class="mr-2 text-grey-darken-1 t14300">
                                        نمایش فاکتور مالی
                                </span>
                            </div>
                        </v-list-item-title>

                        <v-list-item-title>
                            <div class="ma-3 pointer d--rtl" @click="$router.push(`/returned-orders/receipt/${item.data.id}`)">
                                <v-icon class="text-grey-darken-1" size="x-small">mdi-email-outline</v-icon>
                                <span class="mr-2 text-grey-darken-1 t14300">
                                        رسید ارسال
                                </span>
                            </div>
                        </v-list-item-title>
                    </v-list>
                </v-menu>
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
    <DetailsModal />
    <FactorModal />
</div>
</template>

<script>
import ReturnedOrders from "@/composables/ReturnedOrders";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import {openModal} from "@/assets/js/functions_seller";
import {splitChar} from "@/assets/js/functions";
import DetailsModal from "@/components/ReturnedOrders/Modal/DetailsModal.vue";
import FactorModal from "@/components/ReturnedOrders/Modal/FactorModal.vue";


export default {
  data() {
    return {
        perPageFilter:false,
        itemListTable: []
    }
  },
    setup() {
      const status = [
        {
          label: 'پیش پردازش',
          value: 'pre_progress'
        },
        {
          label: 'ارسال شده',
          value: 'sending'
        },
        {
          label: 'تحویل داده شده',
          value: 'received'
        }
      ]
      const paymentMethods= [
        {
          label: 'کیف پول',
          value: 'wallet'
        },
        {
          label: 'آنلاین',
          value: 'online'
        },
        {
          label: 'اسنپ پی',
          value: 'snap_pay'
        }
      ]
      const packedStatus = [
        {
          label: 'بارگیری شده',
          value: '1'
        },
        {
          label: 'بارگیری نشده',
          value: '0'
        }
      ]

        const {
            pageLength,
            getReturnedOrderList,
            returnedOrderList,
            filterField,
            dataTableLength,
            page,
            header,
            loading
        } = ReturnedOrders();
        return {
            pageLength,
            getReturnedOrderList,
            returnedOrderList,
            filterField,
            dataTableLength,
            page,
            header,
            loading,
            paymentMethods,
            status,
            packedStatus
        };
    },

    components: {
        PanelFilter,
        ModalColumnFilter,
        ShTable,
        FactorModal,
        DetailsModal
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
        resetPage(){
            this.perPageFilter = true
            this.page = 1
            setTimeout(()=>{
                this.perPageFilter = false
            }, 1000)
        },

        splitChar,
        showFactor(id) {
            openModal(this.$store, 'set_returnedOrderFactorModal', id, true)
        },
        showDetails(id) {
            openModal(this.$store, 'set_returnedOrderDetailsModal', id, true)
        },
        getPaymentMethod(method) {
            if (method === 'saman') {
                return 'درگاه سامان'
            } else if (method === 'wallet') {
                return 'کیف پول'
            } else if (method === 'snapp') {
                return 'اسنپ پی'
            }
        },
        getPaymentStatus(method) {
            if (method === 'unsuccessful') {
                return 'نا موفق'
            } else if (method === 'contradictory') {
                return 'دارای مغایرت'
            } else if (method === 'successful') {
                return 'موفق'
            }
        },
        getOrderStatus(method) {
            if (method === 'paid') {
                return 'پرداخت شده'
            } else if (method === 'contradictory') {
                return 'دارای مغایرت'
            } else if (method === 'successful') {
                return 'موفق'
            }
        },

    },

    mounted() {
        this.getReturnedOrderList();
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
          this.getReturnedOrderList()
        }
      },
      $route(){
        this.getReturnedOrderList()
      },

        returnedOrderList() {
            if(this.returnedOrderList.data) {

                this.itemListTable = []
                this.returnedOrderList.data.forEach((item) => {
                    this.itemListTable.push(
                        {
                            id: item.id,
                            returned_id: item.returned_id ? item.returned_id : '-',
                            user: item.user ? item.user.first_name+' '+item.user.last_name : '-',
                            shps_count: item.shps_count ? item.shps_count : '-',
                            orderStatus: item.status ? this.getOrderStatus(item.status) : '-',
                            returned_status: item.returned_status ? item.returned_status : '-',
                            payment_status: item.payment_status ? this.getPaymentStatus(item.payment_status) : '-',
                            payment_method: item.payment_method ? this.getPaymentMethod(item.payment_method) : '-',
                            paid_price: item.paid_price ? this.splitChar(item.paid_price) : '-',
                            request_status: item.request_status === 1 ? 'mdi-check-bold|success' : 'mdi-close-thick|error',
                            packed_status: item.packed_status === 1 ? 'mdi-check-bold|success' : 'mdi-close-thick|error',
                            submit_date_fa: item.submit_date_fa ? item.submit_date_fa : '-',
                            receive_date_fa: item.receive_date_fa ? item.receive_date_fa : '-',
                            created_at_fa: item.created_at_fa ? item.created_at_fa : '-',
                            discount: item.discount ? this.splitChar(item.discount) : '-',
                            state: item.state ? item.state.label : '-',
                            city: item.city ? item.city.label : '-',
                            identifier_code: item.identifier_code ? item.identifier_code : '-',
                            bank_id: item.bank_id ? item.bank_id : '-',

                        }
                    )
                })
            }
        },
    }
}
</script>
