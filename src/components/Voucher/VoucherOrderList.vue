<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="70" class="ma-5 br-12 pt-5" max-height="70">
      <div class="d-flex align-center justify-lg-space-evenly">
        <div>
          <span class="t14500">
             عنوان:
          </span>
          <span class="t14500 text-gray500">
             {{ voucherDetail?.name }}
          </span>
        </div>
        <div>
          <span class="t14500">
             کد تخفیف:
          </span>
          <span class="t14500 text-gray500" >
             {{ voucherDetail?.code }}
          </span>
        </div>
        <div class="d-flex">
          <span class="t14500">
             نوع تخفیف:
          </span>
          <div>
            <span class="t14500 text-gray500" v-if="voucherDetail?.discount_type === 'percent'">
              درصدی
            </span>
            <span class="t14500 text-gray500" v-else>
              ریالی
            </span>
          </div>
        </div>
        <div>
          <span class="t14500">
             مقدار تخفیف:
          </span>
          <span class="t14500 text-gray500 number-font"  v-if="voucherDetail?.discount_type === 'percent'">
              {{ voucherDetail?.discount }} %
          </span> <span class="t14500 text-gray500 number-font"  v-else>
              {{  voucherDetail?.discount  }} ریال
          </span>
        </div>
      </div>
    </v-card>
    <v-card height="70" class="mx-5 br-12" max-height="70">
    </v-card>
    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          @resetPage="resetPage"
          class="flex-grow-1"
          :header="headerOrder"
          :items="voucher?.data"
          :page="page"
          :perPage="pageLength"
          :loading="false"
          model="customer"
      />

      <v-divider/>
      <v-card-actions class="pb-3">
        <v-row class="pr-5">
          <v-col cols="3">
            <ModalExcelDownload :getEndPoint="`voucher/export/orders/${voucherId}`" />
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

          <v-col cols="3">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
              <span class="ml-5"> تعداد سطر در هر صفحه</span>
              <span class="mt-2" id="row-selector">
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
  </div>
</template>
<script>
import Table from "@/components/Voucher/Table/VoucherOrderTable.vue";
import Voucher from '@/composables/Voucher'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  components: {
    Table,
    ModalExcelDownload
  },

  data() {
    return {
      voucherId: this.$route.params.voucherId,
      perPageFilter:false
    }
  },

  setup() {
    const {
      headerOrder ,
      getVoucherOrder,
      voucher ,
      dataTableLength ,
      pageLength,
      page ,
      getVoucherDetail ,
      voucherDetail ,
      addPaginationOrder ,
      addPerPageOrder
    } = new Voucher()

    return {
      headerOrder,
      getVoucherOrder,
      voucher,
      dataTableLength ,
      pageLength,
      page,
      getVoucherDetail ,
      voucherDetail ,
      addPaginationOrder ,
      addPerPageOrder
    }
  },

  mounted() {
    this.getVoucherOrder()
    this.getVoucherDetail()
  },

  methods: {
    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    }
  },

  watch:{
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

    $route(){
      this.getVoucherOrder()
    },

    page(){
      if (!this.perPageFilter){
        this.addPaginationOrder()
      }
    }
  }
}
</script>