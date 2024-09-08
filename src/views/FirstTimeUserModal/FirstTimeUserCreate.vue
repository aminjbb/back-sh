<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="create-product flex-column d-flex h-100vh">
        <v-card class="ma-5 br--12 pb-15 flex-grow-1" height="600">
          <div class="text-center py-5 t16">
            افزودن مودال
          </div>
          <v-divider/>
          <v-form
              class="create-product__info-form scroller"
              v-model="valid">
            <v-row justify="start" align="center">
              <v-col cols="6">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">عنوان</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>

                <v-text-field
                    v-model="form.name"
                    placeholder="عنوان مودال را وارد نمایید"
                    variant="outlined"
                    :rules="titleRule"
                    rounded="lg">

                </v-text-field>
              </v-col>

              <v-col cols="6">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">کد تخفیف نظیر به نظیر</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>

                <v-autocomplete
                    variant="outlined"
                    prepend-inner-icon-cb="mdi-map-marker"
                    rounded="lg"
                    :items="voucherList"
                    :rules="DiscountCodeRule"
                    item-title="name"
                    item-value="id"
                    v-debounce="searchVoucher">
                </v-autocomplete>
              </v-col>

              <v-col cols="12">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">توضیحات</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>
                <v-text-field
                    v-model="form.content"
                    placeholder="توضیحات را وارد نمایید"
                    density="compact"
                    variant="outlined"
                    single-line/>
              </v-col>

              <v-col cols="12">
                <div class="text-right my-5">
                   <span class="t14 w500 text-gray600">تصویر</span>
                   <span class="t14 w500 text-scanError">*</span>
                </div>
                <UploadFileSection @getImage="getImage"/>
                <div class="d-flex align-center mt-5" v-if="form.image">
                  <span>IMG- {{ form.image }}</span>
                  <span class="mr-15">
                <v-icon
                    @click="removeItem(form.image , 'mobile')"
                    color="error">mdi-delete</v-icon></span>
                </div>
              </v-col>
            </v-row>

          </v-form>

          <footer class="create-warehouse__actions">
            <v-row justify="end" class="pl-10 pt-5">
              <v-btn
                  :loading="loading"
                  @click="validate()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                تایید
              </v-btn>
            </v-row>
          </footer>
        </v-card>
        <Modal
            ref="modal"
            :title="`تایید مودال`"
            :width="468"
            @successAction="createFirstTimeUserModal()"
            @cancelAction="closeModal()"
            @closeModal="closeModal()">
          <template v-slot:modalBody>
            <div class="text-center">کاربر عزیز مودال  عنوان مدال در وضعیت روشن می باشد در صورت تایید باعث غیر </div>
            <div class="text-center">
              فعال شدن مودال عنوان مدال  میشوید و مودال جدید وضعیت روشن میگردد
            </div>
          </template>

        </Modal>
      </div>
    </v-main>
  </v-layout>
</template>


<script>
import {defineAsyncComponent} from "vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const UploadFileSection = defineAsyncComponent(() => import('@/components/Public/UploadFileSection.vue'))
const Modal = defineAsyncComponent(() => import('@/components/Components/Modal/Modal.vue'))

export default {
  name: "FirstTimeUserCreate",

  components: {
    Modal,
    DashboardLayout,
    Header,
    UploadFileSection
  },

  data() {
    return {
      valid: false,
      loading: false,
      titleRule: [v => !!v || 'کاربر عزیز عنوان مودال نمیتواند خالی باشد'],
      DiscountCodeRule: [v => !!v || 'کاربر عزیز کد تخفیف گروهی انتخاب نکردین'],

      form:{
        name:'',
        voucher_id:'',
        content:'',
        image:''
      },
      vouchersList: [],
    }
  },

  computed: {
    voucherList() {
      try {
        let voucher = []
        this.vouchersList.forEach(item => {
          const form = {
            name: item.label + '(' + item.id + ')',
            id: item.id,
          }
          voucher.push(form)
        })
        return voucher
      } catch (e) {
        return []
      }
    },
  },

  methods: {
    getImage(image) {
      this.form.image = image.data.data.image_id
    },

    removeItem(id, status) {
      this.imageId = id;
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, false)
    },

    async searchVoucher(e) {
      const filter = {
        per_page: 10,
        q: e,
        is_active: 1,
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = filter
      AxiosMethod.end_point = 'page/modal/vouchers/'
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.vouchersList = data.data.data
      }
    },

    validate() {
      this.createFirstTimeUserModal.validate()
      setTimeout(()=>{
        if (this.valid) this.createFirstTimeUserModal()
      } , 200)

      // this.$refs.modal.dialog = true
    },

    async createFirstTimeUserModal() {
      console.log('name', this.form.name)
      console.log('voucher_id', this.form.voucher_id)
      console.log('content',this.form.content )
      console.log('image_id',this.form.image )
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'page/modal/crud/create?accept'
      formData.append('name', this.form.name)
      formData.append('voucher_id', this.form.voucher_id)
      formData.append('content', this.form.content)
      formData.append('image_id', this.form.image)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        openToast(this.$store, 'سفارش با موفقیت ایجاد شد.', "success")

      } else {
        this.loading = false
      }
    },

    closeModal(){
      this.$refs.modal.dialog = false
    }
  }
}
</script>
