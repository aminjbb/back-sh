<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <!--      <WalletUser />-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card
            height="80"
            class="ma-5 br--12"
        >
          <v-row
              justify="center"
              align="center"
              class="px-10 py-2"
          >
            <v-col cols="6">
             <div class="d-flex justify-start align-center">
               <v-card class="rounded-circle	d-flex justify-center align-center"  height="65" width="65">
                 <img height="55" width="55" :src="seller?.logo?.image_url">
               </v-card>
               <div class="mr-3">
                <div>
                   <span class="t12 w500">
                    {{seller?.shopping_name}}
                 </span>
                  <span class="t20 w500 text-primary500">
                   .
                 </span>
                  <span class="t12 w500">
                    {{getSellerType(seller?.type)}}
                 </span>
                </div>
                 <div>
                   <span class="t12 w500 text-gray500">
                    {{seller?.full_name}}
                 </span>
                   <span class="t20 w500 text-primary500">
                   .
                 </span>
                   <span class="t12 w500 text-gray500">
                    {{seller?.phone_number}}
                 </span>
                 </div>
               </div>
             </div>

            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <PanelFilter
                    @resetPage="resetPage"
                    :path="`seller-cartable/${$route.params.sellerId}/requests`"
                    :filterField="filterFieldRequest"
                    :sectionItems="infoSections"
                    :statusItems="statusItems"

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
                      class="text-gray500 t14 w300 text-right"/>
                </template>
              </v-tooltip>

            </template>
            <template v-slot:customSlot2="item">
              <v-chip :color="statusColor(item.data.status)">
                {{ item.data.custom2 }}
              </v-chip>
            </template>
            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon color="primary500" @click="openFormModal(item.index)" :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-eye
                </v-icon>
              </div>
            </template>
          </ShTable>
          <v-divider/>
          <Modal ref="requestActionModal" :title="modalTitle"
                 successTitle="تایید درخواست" cancelTitle="رد درخواست"
                 successColor="success"
                 cancelColor="primary500" cancelVariant="flat"
                 @cancelAction="rejectRequest()" @successAction="approveRequest()">
            <template v-slot:modalBody>
              <SellerRequestForm ref="SellerRequestForm" :addressFields="addressFields" :formType="requestFormType"
                                 :items="requestForm"/>
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
import Seller from '@/composables/Seller.js'
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  data() {
    return {
      infoSections: [
        {
          key: 'company_info', value: 'اطلاعات شرکت'
        },
        {
          key: 'seller_info', value: 'اطلاعات فروشنده'
        },
        {
          key: 'shop_info', value: 'اطلاعات فروشگاه'
        },
        {
          key: 'payment_info', value: 'اطلاعات پرداخت'
        },
      ],
      infoTitles: [
        {
          key: 'email', value: 'ایمیل'
        },
        {
          key: 'shopping_name', value: 'نام فروشگاه'
        },
        {
          key: 'logo_image_id', value: 'لوگو فروشگاه'
        },
        {
          key: 'sheba_number', value: 'شمار شبا'
        },
        {
          key: 'account_number', value: 'شماره حساب'
        },
        {
          key: 'signatory', value: 'صاحبان امضا'
        },
        {
          key: 'tax_code', value: 'کد مالیاتی'
        },
        {
          key: 'tax_code_expire_date', value: 'تاریخ اعتبار'
        },
        {
          key: 'newspaper_image_id', value: 'روزنامه رسمی'
        }, {
          key: 'address', value: 'آدرس'
        },
      ],
      requestForm: [],
      modalTitle: '',
      requestFormType: 'notAddress',
      addressFields: null,
      actionField: '',
      statusItems:[
        {
          label:'تایید شده',
          value:'approved',
        },
        {
          label:'رد شده',
          value:'reject',
        },
        {
          label:'در انتظار بررسی',
          value:'processing',
        },
      ],

    }
  },
  setup() {
    const {
      pageLength, filterFieldRequest,
      dataTableLength, page, requestListHeader,
      loading, sellerRequests,
      getRequests, isFilterPage
    } = new SellerCartable()
    const {
      getSeller , seller
    } = new Seller()
    return {
      pageLength, filterFieldRequest,
      dataTableLength, page, requestListHeader,
      loading, sellerRequests,
      getRequests, isFilterPage,  getSeller , seller
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
  methods: {
    openFormModal(index) {
      this.requestFormType = 'notAddress'
      if (this.sellerRequests[index].title === "email") {
        this.actionField = 'email'
        this.modalTitle = 'درخواست ایمیل'
        if (this.sellerRequests[index].old_value) {
          this.requestForm = [
            {
              label: 'ایمیل قدیمی',
              type: 'text',
              class: 'text-left',
              value: this.sellerRequests[index].old_value,
              col: '4'
            },
            {
              label: 'ایمیل جدید',
              type: 'text',
              class: 'text-left',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        } else {
          this.requestForm = [

            {
              label: 'ایمیل',
              type: 'text',
              class: 'text-left',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        }

      }
      if (this.sellerRequests[index].title === "tax_code") {
        this.actionField = 'tax_code'
        this.modalTitle = 'درخواست کد مالیاتی'
        if (this.sellerRequests[index].old_value) {
          this.requestForm = [
            {
              label: 'کد مالیاتی قدیم',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].old_value,
              col: '4'
            },
            {
              label: 'کد مالیاتی جدید',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]


        } else {
          this.requestForm = [

            {
              label: 'کد مالیاتی ',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        }

      }
      if (this.sellerRequests[index].title === "shopping_name") {
        this.actionField = 'shopping_name'
        this.modalTitle = 'درخواست نام فروشگاه'
        if (this.sellerRequests[index].old_value) {
          this.requestForm = [
            {
              label: 'نام فروشگاه قدیم',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].old_value,
              col: '4'
            },
            {
              label: 'نام فروشگاه جدید',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]


        } else {
          this.requestForm = [

            {
              label: 'نام فروشگاه',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        }

      }
      if (this.sellerRequests[index].title === "sheba_number") {
        this.actionField = 'sheba_number'
        this.modalTitle = 'درخواست شمار شبا'
        if (this.sellerRequests[index].old_value) {
          this.requestForm = [
            {
              label: 'شمار شبا قدیم',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].old_value,
              col: '4'
            },
            {
              label: 'شمار شبا جدید',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]


        } else {
          this.requestForm = [

            {
              label: 'شمار شبا',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        }

      }
      if (this.sellerRequests[index].title === "account_number") {
        this.actionField = 'account_number'
        this.modalTitle = 'درخواست شماره حساب'
        if (this.sellerRequests[index].old_value) {
          this.requestForm = [
            {
              label: 'شماره حساب قدیم',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].old_value,
              col: '4'

            },
            {
              label: 'شماره حساب جدید',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]


        } else {
          this.requestForm = [

            {
              label: 'شماره حساب',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        }

      }
      if (this.sellerRequests[index].title === "signatory") {
        this.actionField = 'signatory'
        this.modalTitle = 'درخواست صاحبان امضا'
        if (this.sellerRequests[index].old_value) {
          this.requestForm = [
            {
              label: 'صاحبان امضا قدیم',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].old_value,
              col: '4'
            },
            {
              label: 'صاحبان امضا جدید',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]


        } else {
          this.requestForm = [

            {
              label: 'صاحبان امضا',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        }

      }
      if (this.sellerRequests[index].title === "tax_code_expire_date") {
        this.actionField = 'tax_code_expire_date'
        this.modalTitle = 'درخواست تاریخ اعتبار'
        if (this.sellerRequests[index].old_value) {
          this.requestForm = [
            {
              label: 'تاریخ اعتبار قدیم',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].old_value,
              col: '4'
            },
            {
              label: 'تاریخ اعتبار جدید',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]


        } else {
          this.requestForm = [

            {
              label: 'تاریخ اعتبار',
              type: 'text',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        }

      }
      if (this.sellerRequests[index].title === "address") {
        this.actionField = 'address'
        this.modalTitle = 'درخواست آدرس'
        this.requestFormType = 'address'
        this.addressFields = this.sellerRequests[index].fields
      }
      if (this.sellerRequests[index].title === "newspaper_image_id") {
        this.actionField = 'newspaper_image_id'
        this.modalTitle = 'درخواست روزنامه رسمی'
        if (this.sellerRequests[index].old_value) {
          this.requestForm = [
            {
              label: 'روزنامه رسمی قدیم',
              type: 'image',
              class: 'text-right',
              value: this.sellerRequests[index].old_value,
              col: '4'
            },
            {
              label: 'روزنامه رسمی جدید',
              type: 'image',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]


        } else {
          this.requestForm = [

            {
              label: 'روزنامه رسمی',
              type: 'image',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        }

      }
      if (this.sellerRequests[index].title === "logo_image_id") {
        this.actionField = 'logo_image_id'
        this.modalTitle = 'درخواست لوگو'
        if (this.sellerRequests[index].old_value) {
          this.requestForm = [
            {
              label: 'لوگو قدیم فروشگاه',
              type: 'image',
              class: 'text-right',
              value: this.sellerRequests[index].old_value,
              col: '4'
            },
            {
              label: 'لوگو جدید فروشگاه',
              type: 'image',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]


        } else {
          this.requestForm = [

            {
              label: 'لوگو قدیم فروشگاه',
              type: 'image',
              class: 'text-right',
              value: this.sellerRequests[index].value,
              col: '4'
            }
          ]
        }

      }
      this.$refs.requestActionModal.dialog = true
    },
    returnPersianSection(sectionStatus) {
      const newObject = this.infoSections.find(element => element.key == sectionStatus)
      return newObject?.value
    },
    returnPersianTitle(sectionStatus) {
      const newObject = this.infoTitles.find(element => element.key == sectionStatus)
      return newObject?.value
    },
    getStatus(status) {
      if (status == 'processing') return 'در انتظار بررسی'
      else if (status == 'approved') return 'تایید شده'
      else if (status == 'reject') return 'رد شده'
    },
    statusColor(status) {
      if (status == 'processing') return 'Orange600'
      else if (status == 'approved') return 'success'
      else if (status == 'reject') return 'error'
    },
    async approveRequest() {
     try {
       this.$refs.requestActionModal.loading = true
       const formData = new FormData()
       const AxiosMethod = new AxiosCall()
       AxiosMethod.using_auth = true
       AxiosMethod.toast_error = true
       AxiosMethod.store = this.$store
       AxiosMethod.end_point = `seller/cartable/update/status/${this.$route.params.sellerId}`
       AxiosMethod.token = this.$cookies.get('adminToken')
       formData.append('status', 'approved')
       formData.append('reason', this.$refs.SellerRequestForm.description)
       formData.append('field', this.actionField)
       AxiosMethod.using_auth = true
       AxiosMethod.form = formData
       let data = await AxiosMethod.axios_post()
       if (data) {
         this.$refs.requestActionModal.loading = false
         this.$refs.requestActionModal.dialog = false
         this.getRequests()

       } else {
         this.$refs.requestActionModal.loading = false
       }
     }
     catch (e) {
       this.$refs.requestActionModal.loading = false
     }
    },
    async rejectRequest() {
      try {
        this.$refs.requestActionModal.cancelLoading = true
        const formData = new FormData()
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.store = this.$store
        AxiosMethod.end_point = `seller/cartable/update/status/${this.$route.params.sellerId}`
        AxiosMethod.token = this.$cookies.get('adminToken')
        formData.append('status', 'reject')
        formData.append('reason', this.$refs.SellerRequestForm.description)
        formData.append('field', this.actionField)
        AxiosMethod.form = formData
        AxiosMethod.using_auth = true
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.$refs.requestActionModal.cancelLoading = false
          this.$refs.requestActionModal.dialog = false
          this.getRequests()

        } else {
          this.$refs.requestActionModal.cancelLoading = false
        }
      }
      catch (e) {
        this.$refs.requestActionModal.cancelLoading = false
      }
    },
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    },

    getSellerType(type){
      if (type === 'legal') return 'حقوقی'
      else if (type === 'genuine') return 'حقیقی'
    }
  },
  computed: {
    itemsList() {
      try {
        const items = []
        this.sellerRequests.forEach(element => {
          const form = {
            section: this.returnPersianSection(element.section),
            title: this.returnPersianTitle(element.title),
            custom: element.description,
            status: element.status,
            custom2: this.getStatus(element.status),
          }
          items.push(form)
        })
        return items
      } catch (e) {
        console.log(e)
        return []
      }
    }
  },
  mounted() {
    this.getRequests()
    this.getSeller()
  },

  watch:{
    $route(){
      this.getRequests()

    }
  }
}
</script>