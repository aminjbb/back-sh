<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
     <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
       <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
         <v-row
             justify="center"
             align="center"
             class="px-10 py-5">
           <v-col cols="6">
             <v-row justify="start">
               <v-btn
                   @click="openAddModal"
                   color="primary500"
                   height="40"
                   rounded
                   class="px-8 mt-1">
                 <template v-slot:prepend>
                   <v-icon>mdi-plus</v-icon>
                 </template>
                 افزودن
               </v-btn>
             </v-row>
           </v-col>

           <v-col cols="6">
             <v-row justify="end">
               <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="headerFakeComment"/>

               <PanelFilter
                   @resetPage="resetPage"
                   path="fake-comment/index"
                   :filterField="filterFieldFakeComment"
                   :page="page"
                   :brandsList="brandsList"
                   :scoreItems="scoreItems"
                   :statusItems="statusComment"
                   :perPage="dataTableLength"/>
             </v-row>
           </v-col>
         </v-row>
       </v-card>

       <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
         <ShTable
             class="flex-grow-1"
             :headers="headerFakeComment"
             :items="itemListTable"
             :page="page"
             :perPage="dataTableLength"
             :loading="loading">

           <template v-slot:customSlot="item">
             <v-sheet  class="t12 rounded-lg py-2 px-5"  :color="getStatusClass(item.data.custom)" width="100">
               {{getPersianStatus(item.data.custom)}}
             </v-sheet>
           </template>

           <template v-slot:actionSlot="item">
             <div class="text-center">
               <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                 mdi-dots-vertical
               </v-icon>
             </div>

             <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
               <v-list class="c-table__more-options">
                 <v-list-item>
                   <v-list-item-title>
                     <div class=" pointer" @click="$router.push(`/fake-comment/get/`+item.data.id)">
                       <v-icon class="text-grey-darken-1">mdi-eye-outline</v-icon>
                       <span class="mr-2 text-grey-darken-1 t14 w300">نمایش جزئیات</span>
                     </div>
                   </v-list-item-title>
                   <v-list-item-title>
                     <div class=" pointer" @click="removeItem(item.data.id)">
                       <v-icon class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                       <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                     </div>
                   </v-list-item-title>
                 </v-list-item>
               </v-list>
             </v-menu>
           </template>
         </ShTable>

         <v-divider />

         <v-card-actions class="pb-3">
           <v-row class="pr-5">
             <v-col cols="3">
               <ModalExcelDownload getEndPoint="product/comment/fake/export" />
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
                     next-icon="mdi-chevron-left" />
               </div>
             </v-col>

             <v-col cols="3">
               <div
                   align="center"
                   id="rowSection"
                   class="d-flex align-center">
                 <span class="ml-5">تعداد سطر در هر صفحه</span>
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

       <Modal
           ref="fakeCommentModal"
           :width="908"
           title="افزودن نظر شاواز"
           @successAction="validate()"
           @cancelAction="closeModal()">
         <template v-slot:modalBody>
           <v-form v-model="valid" ref="createFakeComment">
             <v-row>
               <v-col cols="6">
                 <div class="text-right my-5">
                   <span class="t12 w400 text-gray600">تاریخ ثبت</span>
                 </div>
                 <v-text-field
                     class="input-start-date"
                     variant="outlined"
                     v-model="form.submit"
                     :rules="rule"/>
                 <date-picker
                     clearable
                     type="datetime"
                     display-format="jYYYY-jMM-jDD"
                     :custom-input="`.input-start-date`"
                     v-model="form.submit" />
               </v-col>

               <v-col cols="6">
                 <div class="text-right my-5">
                   <span class="t12 w400 text-gray600">نام کاربر</span>
                 </div>
                 <v-autocomplete
                     density="compact"
                     variant="outlined"
                     :rules="rule"
                     single-line
                     :items="userList"
                     rules="rule"
                     v-model="form.user_id"
                     item-title="name"
                     item-value="value"
                     v-debounce="searchUser"
                 />
               </v-col>

               <v-col cols="6" class="d-flex justify-end align-center">
                 <v-rating
                     v-model="form.score"
                     :rules="ratingRule"
                     half-increments
                     class="me-3"
                     style="direction: ltr!important;">
                   <template v-slot:item="props">
                     <v-icon
                         size="x-large"
                         :color="props.isFilled ? 'rgb(243, 193, 28)' : 'grey-lighten-1'">
                       mdi-star
                     </v-icon>
                   </template>
                 </v-rating>
                 <span>امتیاز</span>
               </v-col>

               <v-col cols="6">
                 <div class="text-right my-5">
                   <span class="t12 w400 text-gray600">نام کالا</span>
                 </div>
                 <v-autocomplete
                     density="compact"
                     variant="outlined"
                     :rules="rule"
                     single-line
                     :items="skuList"
                     rules="rule"
                     v-model="form.shps"
                     item-title="name"
                     item-value="value"
                     v-debounce="searchSku"/>
               </v-col>

               <v-col cols="12">
                 <div class="text-right my-5">
                   <span class="t12 w400 text-gray600">متن نظر</span>
                 </div>
                 <v-textarea
                     :rules="rule"
                     max-rows="3"
                     density="compact"
                     variant="outlined"
                     v-model="form.comment"
                 />
               </v-col>
             </v-row>
           </v-form>

         </template>
       </Modal>

       <Modal
           ref="approvedFakeCommentModal"
           :width="468"
           title="افزودن نظر شاواز"
           @successAction="createFakeComment()"
           @cancelAction="closeModalApproveModal()">
         <template v-slot:modalBody>
           <div class="text-center t12 text-gray600">با انجام این عملیات، نظر شما در سایت نمایش داده خواهد شد.آیا از انجام این کار اطمینان دارید؟</div>
         </template>
       </Modal>
     </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const PanelFilter = defineAsyncComponent(()=> import('@/components/PanelFilter/PanelFilter.vue'))
const ModalColumnFilter = defineAsyncComponent(()=> import('@/components/Public/ModalColumnFilter.vue'))
const ModalExcelDownload = defineAsyncComponent(()=> import('@/components/Public/ModalExcelDownload.vue'))
const ShTable = defineAsyncComponent(()=> import('@/components/Components/Table/sh-table.vue'))
import {openToast, openConfirm, convertDateToGregorian} from "@/assets/js/functions";
import commentsComposable from "@/composables/Comments";
import Modal from "@/components/Components/Modal/Modal.vue";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {AxiosCall} from "@/assets/js/axios_call";
import BrandsComposable from "@/composables/Brands";

export default {
  components: {
    datePicker: VuePersianDatetimePicker,
    Modal,
    DashboardLayout,
    Header,
    ModalColumnFilter,
    PanelFilter,
    ModalExcelDownload,
    ShTable
  },

  setup() {
    const scoreItems = [
      {
        label: 'بدون امتیاز',
        value: '0'
      },
      {
        label: '۱ ستاره',
        value: '1'
      },
      {
        label: '۲ ستاره',
        value: '2'
      },
      {
        label: '۳ ستاره',
        value: '3'
      },
      {
        label: '۴ ستاره',
        value: '4'
      },
      {
        label: '۵ ستاره',
        value: '5'
      },
    ]
    const statusComment = [
      {
        label: 'تایید شده',
        value: 'approved'
      },
      {
        label: 'رد شده',
        value: 'rejected'
      },
      {
        label: 'در انتظار',
        value: 'waiting'
      }
    ]

    const { allBrands, getAllBrands } = BrandsComposable();

    const {
      headerFakeComment,
      filterFieldFakeComment,
      getAllFakeComments,
      fakeCommentData,
      page,
      dataTableLength,
      pageLength,
      loading,
    } = commentsComposable();

    return {
      headerFakeComment,
      filterFieldFakeComment,
      getAllFakeComments,
      fakeCommentData,
      page,
      dataTableLength,
      pageLength,
      loading,
      scoreItems,
      statusComment,
      allBrands,
      getAllBrands
    }
  },

  data() {
    return {
      itemListTable: [],
      removeTableItem: {
        text: "آیا از انجام این کار مطمئن هستید؟",
        title: "حذف آیتم",
        path: "product/comment/crud/fake/delete/",
      },
      perPageFilter:false,
      valid: false,
      form:{
        user_id: null,
        submit:null,
        score: null,
        shps: null,
        comment: null
      },
      rule: [v => !!v || "این فیلد الزامی است"],
      ratingRule: [v => v !== null || "امتیاز الزامی است"],
      skuSearchList: [],
      userSearchList: []
    }
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    skuList() {
      try {
        let sku = []
        this.skuSearchList.forEach(skuSearch => {
          const form = {
            name: skuSearch.sku?.label,
            value: skuSearch.id
          }
          sku.push(form)
        })
        return sku
      } catch (e) {
        return []
      }
    },

    userList(){
      try {
        let users = []
        this.userSearchList.forEach(user => {
          const form = {
            name: user.full_name,
            value: user.id
          }
          users.push(form)
        })
        return users
      } catch (e) {
        return e
      }
    },

    brandsList() {
      try {
        const brands = []
        this.allBrands.data.forEach(element => {
          const form = {
            label: element.label,
            value: element.id
          }
          brands.push(form)
        });
        return brands
      } catch (error) {
        return []
      }
    },
  },

  mounted() {
    this.getAllFakeComments()
    this.getAllBrands()
  },

  methods: {
    changeHeaderShow(index, value) {
      if (index >= 0 && index < this.headerFakeComment.length) {
        this.headerFakeComment[index].show = value;
      }
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },

    getStatusClass(status){
      if (status === 'waiting') return '#FFF3E0'
      else if (status === 'rejected') return '#FFEBEE'
      else if (status === 'approved') return '#E8F5E9'
    },

    getPersianStatus(status){
      if (status === 'waiting') return ' در انتظار '
      else if (status === 'rejected') return ' رد شده '
      else if (status === 'approved') return ' تایید شده '
    },

    openAddModal() {
      this.$refs.fakeCommentModal.dialog = true
    },

    closeModal() {
      this.$refs.fakeCommentModal.dialog = false
    },

    closeModalApproveModal() {
      this.$refs.approvedFakeCommentModal.dialog = false
    },

    async searchUser(search) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `user/fake/crud/index?name=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.userSearchList = data.data.data
      }
    },

    validate() {
      if (this.form.score === null) {
        openToast( this.$store, 'وارد کردن امتیاز الزامی است', "error")
      }
      this.$refs.createFakeComment.validate();

      setTimeout(() => {
        if (this.valid && this.form.score !== null) {
          this.$refs.fakeCommentModal.dialog = false
          this.$refs.approvedFakeCommentModal.dialog = true
        }
      }, 200);
    },

   async createFakeComment() {
     let dateSplit = this.form.submit.split(' ')
     const convertDate = convertDateToGregorian(dateSplit[0] , '/' , false)

      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/comment/crud/fake/create'
      formData.append('comment' , this.form.comment)
      formData.append('shps' , this.form.shps)
      formData.append('score' , this.form.score)
      formData.append('user_id' , this.form.user_id)
      formData.append('date' , convertDate + ' ' + dateSplit[1] + ':00')

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$refs.approvedFakeCommentModal.dialog = false
        this.form.comment = null
        this.form.shps = null
        this.form.score = null
        this.form.submit = null
        this.form.user_id = null
       await this.getAllFakeComments()
      }
      else{
        this.loading=false
      }
    },

    async searchSku(search) {
      this.skuSearchList = []

      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `seller/sku/search?q=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.skuSearchList = data.data.data
      }
    },
  },

  watch: {
    fakeCommentData() {
      this.itemListTable = []
      this.fakeCommentData.forEach((item) => {
        this.itemListTable.push(
            {
              id: item.id,
              sku_id: item.sku_id,
              label: item.sku?.label ? item.sku?.label : '-',
              score: item.score ? item.score : '',
              brand: item.sku.brand.name ? item.sku.brand.name : '-',
              admin: item.creator.first_name ? item.creator.first_name + ' ' + item.creator.last_name : '-',
              created_at: item.created_at_fa ? item.created_at_fa : '-',
              custom: item.status
            }
        )
      })
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

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getAllFakeComments()
          openToast(
              this.$store,
              'کامنت با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },

    $route(){
     this.getAllFakeComments()
    },

    page(){
      if (!this.perPageFilter){
        this.getAllFakeComments()
      }
    }
  }
}
</script>