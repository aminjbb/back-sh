<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
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
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <PanelFilter
                    @resetPage="resetPage"
                    :path="`wallet/index`"
                    :filterField="filterField"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card
            class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
            height="580">
          <ShTable
              class="flex-grow-1"
              :headers="requestListHeader"
              :items="itemsList"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength">
              <template v-slot:customSlot="item">
                <v-tooltip :text="item.data.custom">
                  <template v-slot:activator="{ props }">
                    <text-clamp
                        v-bind="props"
                        :text='item.data.custom'
                        :max-lines='1'
                        autoResize
                        location="center"
                        class="text-gray500 t14 w300 text-right" />
                  </template>
                </v-tooltip>

              </template>
            <template v-slot:customSlot2="item">
              <v-chip :color="statusColor(item.data.status)">
                {{item.data.custom2}}
              </v-chip>
            </template>
          </ShTable>
          <v-divider/>
          <Modal ref="requestActionModal" title="درخواست"
                 successTitle="تایید درخواست" cancelTitle="رد درخواست"
                 successColor="success"
                 cancelColor="primary500" cancelVariant="flat"
                 @cancelAction="rejectRequest()" @successAction="approveRequest()">
            <template v-slot:modalBody>
                <SellerRequestForm :items="requestForm"/>
            </template>
          </Modal>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>
<script>
import {defineAsyncComponent} from "vue";

const ModalExcelDownload = defineAsyncComponent(() => import ('@/components/Public/ModalExcelDownload.vue'))
const ModalColumnFilter = defineAsyncComponent(() => import ('@/components/Public/ModalColumnFilter.vue'))
const ShTable = defineAsyncComponent(() => import ('@/components/Components/Table/sh-table.vue'))
const PanelFilter = defineAsyncComponent(() => import ('@/components/PanelFilter/PanelFilter.vue'))
const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))
const Modal = defineAsyncComponent(() => import ('@/components/Components/Modal/Modal.vue'))
const SellerRequestForm = defineAsyncComponent(() => import ('@/components/SellerCarteble/SellerCartableForm.vue'))
import SellerCartable from '@/composables/SellerCartable.js'

export default {
  data(){
    return{
      infoSections:[
        {
          key:'company_info',value:'اطلاعات شرکت'
        },
        {
          key:'seller_info',value:'اطلاعات فروشنده'
        },
        {
          key:'shop_info',value:'اطلاعات فروشگاه'
        },
        {
          key:'payment_info',value:'اطلاعات پرداخت'
        },
      ],
      infoTitles:[
        {
          key:'email',value:'ایمیل'
        },
        {
          key:'shopping_name',value:'نام فروشگاه'
        },
        {
          key:'logo_image_id',value:'لوگو فروشگاه'
        },
        {
          key:'sheba_number',value:'شمار شبا'
        },
        {
          key:'account_number',value:'شماره حساب'
        },
        {
          key:'signatory',value:'صاحبان امضا'
        },
        {
          key:'tax_code',value:'کد مالیاتی'
        },
        {
          key:'tax_code_expire_date',value:'تاریخ اعتبار'
        },
        {
          key:'newspaper_image_id',value:'روزنامه رسمی'
        },{
          key:'address',value:'آدرس'
        },
      ],
      requestForm:[
        {
          label:'ایمیل',
          type:'text',
        },
        {
          label:'ایمیل جدید',
          type:'text',
        },
      ]
    }
  },
  setup() {
    const {
      pageLength, filterField,
      dataTableLength, page, requestListHeader,
      loading, sellerRequests,
      getRequests, isFilterPage
    } = new SellerCartable()
    return {
      pageLength, filterField,
      dataTableLength, page, requestListHeader,
      loading, sellerRequests,
      getRequests, isFilterPage
    }
  },
  components: {
    ModalExcelDownload,
    ModalColumnFilter,
    ShTable,
    PanelFilter,
    DashboardLayout,
    Header,
    Modal,
    SellerRequestForm
  },
  methods:{

    returnPersianSection(sectionStatus){
      const newObject = this.infoSections.find(element=> element.key == sectionStatus)
      return newObject?.value
    },
    returnPersianTitle(sectionStatus){
      const newObject = this.infoTitles.find(element=> element.key == sectionStatus)
      return newObject?.value
    },
    getStatus(status){
      if (status == 'processing') return 'در انتظار بررسی'
      else if (status == 'approved') return 'تایید شده'
      else if (status == 'rejected') return 'رد شده'
    },
    statusColor(status){
      if (status == 'processing') return 'Orange600'
      else if (status == 'approved') return 'success'
      else if (status == 'rejected') return 'error'
    },
    approveRequest(){
      console.log('approve')
    },
    rejectRequest(){
      console.log('reject')
    },
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
  },
  computed:{
    itemsList(){
     try {
       const items = []
       this.sellerRequests.forEach(element=>{
         const form = {
           section: this.returnPersianSection(element.section),
           title: this.returnPersianTitle(element.title),
           custom: element.description,
           status:element.status,
           custom2: this.getStatus( element.status) ,
         }
         items.push(form)
       })
       return items
     }
     catch (e) {
       console.log(e)
       return []
     }
    }
  },
  mounted() {
    this.getRequests()
  },
}
</script>