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
      <Table
          class="flex-grow-1"
          :header="headerVouchers"
          :items="voucherList"
          :page="page"
          :perPage="dataTableLength"
          activePath="voucher/activation/"
          @updateList="updateList"
          deletePath="voucher/crud/delete/"
          model="order" />

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
import Table from '@/components/Voucher/Table/VoucherListTable.vue'
import Voucher from "@/composables/Voucher";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import {openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  data() {
    return {
      perPageFilter:false
    }
  },

  setup(props) {
    const voucherTypes= [
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
    Table,
    ModalColumnFilter
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

    updateList(status) {
      if (status === 'true') {
        this.getVoucherList();
      }
    }
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
    }
  }
}
</script>
