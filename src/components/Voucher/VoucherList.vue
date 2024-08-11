<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">
        <v-col cols="6" >
          <v-btn
              @click="$router.push('/voucher/create')"
              color="primary500"
              height="40"
              rounded
              class="px-8 ">
            <template v-slot:prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            افزودن
          </v-btn>
        </v-col>

        <v-col cols="6">
          <v-row justify="end" class="mt-0">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="headerVouchers" />

            <PanelFilter
                @resetPage="resetPage"
                path="voucher/index"
                :filterField="indexFilterField"
                :typeItems="voucherTypes"
                :statusItems="activeFilter"
                :voucherAmountTypes="voucherAmountTypes"
                :sendingItems="sendingItems"
                :page="page"
                :perPage="dataTableLength"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="headerVouchers"
          :items="itemListTable"
          :page="page"
          :perPage="dataTableLength"
          activePath="voucher/activation/"
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
                          <div class="ma-3 pointer d--rtl" v-if="item.data.voucher_type === 'گروهی'" @click="$router.push(`/voucher/${item.data.id}/list`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
                                  لیست کد های تخفیف
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" v-if="item.data.voucher_type === 'نظیر به نظیر'" @click="$router.push(`/voucher/${item.data.id}/peer`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
                                  لیست کد های تخفیف
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="$router.push(`/voucher/${item.data.id}/edit`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-pen-minus</v-icon>

                              <span class="mr-2 text-grey-darken-1 t14300">
                                    ویرایش
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="$router.push(`/voucher/${item.data.id}/shps`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
                                  نمایش کالاهای تخفیف
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="$router.push(`/voucher/${item.data.id}/customer`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
                                  نمایش مشتری های تخفیف
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="$router.push(`/voucher/${item.data.id}/get`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
                                 جزئیات کد تخفیف
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="$router.push(`/voucher/${item.data.id}/order`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
                                  لیست سفارشات
                              </span>
                          </div>
                      </v-list-item-title>

                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="removeItem(item.data.id)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14300">
                                    حذف
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
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
const ModalColumnFilter = defineAsyncComponent(()=> import ("@/components/Public/ModalColumnFilter.vue"))
const PanelFilter = defineAsyncComponent(()=> import ("@/components/PanelFilter/PanelFilter.vue"))
import ShTable from "@/components/Components/Table/sh-table.vue";
import Voucher from "@/composables/Voucher";
import {openConfirm, openToast, splitChar} from "@/assets/js/functions";

export default {
  data() {
    return {
        perPageFilter:false,
        itemListTable: []
    }
  },

  setup(props) {
    const voucherTypes= [
      {
        title: 'همه',
        value: ''
      },
      {
        title: 'عادی',
        value: 'regular'
      },
      {
        title: 'گروهی',
        value: 'group'
      },
      {
        title: 'نظیر به نظیر',
        value: 'peer_to_peer'
      },

    ]
    const voucherAmountTypes= [
      {
        title: 'همه',
        value: ''
      },
      {
        title: 'ریالی',
        value: 'rial'
      },
      {
        title: 'درصدی',
        value: 'percent'
      },

    ]
    const activeFilter= [
      {
        label: 'وضعیت',
        value: '',
      },
      {
        label: 'فعال',
        value: '1',
      },
      {
        label: 'غیرفعال',
        value: '0',
      }
    ]
    const sendingItems = [
      {
        title: 'همه',
        value: ''
      },
      {
        title: 'پیش فرض',
        value: 'default'
      },
      {
        title: 'رایگان',
        value: 'free'
      }
    ]
    const {
      headerVouchers,
      filterField,
      page,
      voucherList,
      dataTableLength,
      pageLength,
      getVoucherList,
      indexFilterField,
    } = Voucher()
    return {
      headerVouchers ,
      filterField ,
      page ,
      voucherList,
      dataTableLength ,
      pageLength ,
      getVoucherList ,
      indexFilterField ,
      voucherTypes,
      voucherAmountTypes,
      activeFilter,
      sendingItems
    }
  },

  components: {
    PanelFilter,
    ModalColumnFilter,
    ShTable
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.headerVouchers[index].show = value
    },
    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    splitChar,
    removeItem(id) {
          openConfirm(this.$store, "آیا از حذف آیتم مورد نظر مظمئن هستید ؟", "حذف تخفیف", "delete", 'voucher/crud/delete/'+id, true);
      },
  },

  mounted() {
    this.getVoucherList()
  },

  watch: {
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getVoucherList()
          openToast(
              this.$store,
              'آیتم با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
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
    $route(to){
      this.getVoucherList(to)

    },
    page(){
      if (!this.perPageFilter){
        this.getVoucherList()
      }
    },

    voucherList() {
          this.itemListTable = []
          this.voucherList.forEach((item) => {
              this.itemListTable.push(
                  {
                      id: item.id,
                      name: item.name ? item.name : '---',
                      discount_type: item.discount_type && item.discount_type === 'percent' ? 'درصدی' : item.discount_type ? 'ریالی' : '-',
                      voucher_type: item.voucher_type === 'group' ? 'گروهی' : item.voucher_type === 'peer_to_peer' ? 'نظیر به نظیر' : item.voucher_type === 'regular' ? 'عادی' : null,
                      voucherCode: item.code ? item.code : '-',
                      discount: item.discount ? item.discount : '-',
                      order_limit: item.order_limit ? item.order_limit : '-',
                      user_limit: item.user_limit ? item.user_limit : '-',
                      min_order_price: item.min_order_price ? this.splitChar(item.min_order_price) : '-',
                      order_count: item.order_count ? item.order_count : '-',
                      start_time_fa: item.start_time_fa ? item.start_time_fa : '-',
                      end_time_fa: item.end_time_fa ? item.end_time_fa : '-',
                      state_id: item.state_id ? item.state_id : '-',
                      is_active: item.is_active,
                      is_active_id: item.id,
                  }
              )
          })
      },
  }
}
</script>
