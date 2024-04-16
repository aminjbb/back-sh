<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="70" class="ma-5 br-12 pt-5" max-height="70">
      <div class="d-flex align-center justify-lg-space-evenly">

        <div>
                <span class="t14500">
                    عنوان:
                </span>
          <span class="t14500 text-gray500">
                    {{ detailData?.name }}
                </span>
        </div>
        <div>

                <span class="t14500">
                    روش ارسال:
                </span>

          <span class="t14500 text-gray500">
             {{ setKeyPost(detailData?.post) }} {{setKeyTipax(detailData?.tipax)}} {{setKeyNafis(detailData?.nafis)}} {{setKeyPishtaz(detailData?.pishtaz)}}</span>
        </div>

      </div>
    </v-card>
    <v-card height="70" class="mx-5 br-12" max-height="70">
      <v-row
          justify="end"
          align="center"
          class="px-10 py-5">


        <v-col cols="6">
          <v-row justify="end">

            <ModalTableFilter :path="`free-delivery/${$route.params.freeDeliveryId}/orderList`" :filterFieldCOrderList="filterFieldCOrderList "/>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="headerOrderList"
          :items="orderList"
          :page="page"
          :perPage="pageLength"
          :loading="false"
      />

      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row class="pr-5">
          <v-col cols="3">
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
                          <span class="ml-5">
                              تعداد سطر در هر صفحه
                          </span>
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
import Table from "@/components/FreeDelivery/Table/TableOrderList.vue";
import ModalTableFilter from "@/components/FreeDelivery/Filter/FilterOrderList.vue";
import FreeDelivery from '@/composables/FreeDelivery'
export default {
  setup() {
    const { getVoucherShps,voucher , dataTableLength ,headerOrderList, geOrderList, orderList, getDetail, filterFieldCOrderList,
      detailData,
      pageLength,page , getVoucherDetail , voucherDetail} = new FreeDelivery()
    function setKeyPost (post)
    {  if (post === true) {
      return 'پست '  }
    }
    function setKeyNafis (nafis)
    {  if (nafis === true) {
      return 'نفیس '  }
    }
    function setKeyPishtaz (pishtaz)
    {  if (pishtaz === true) {
      return 'پیشتاز '  }
    }
    function setKeyTipax ( tipax)
    {
      if (tipax === true)
      {    return 'تیپاکس'
      }    }
    return {getVoucherShps,voucher,dataTableLength , headerOrderList , geOrderList, orderList, filterFieldCOrderList,
      pageLength,page,getVoucherDetail , voucherDetail, getDetail,
      detailData,  setKeyTipax, setKeyNafis, setKeyPishtaz, setKeyPost}
  },

  data() {
    return{
      freeDeliveryId:this.$route.params.freeDeliveryId,

    }
  },
  methods:{

  },
  components: {
    Table,
    ModalTableFilter
  },
  mounted() {
    this.geOrderList()
    this.getDetail()
  },
  watch:{
    $route(){
      this.geOrderList()
    }
  }
}
</script>