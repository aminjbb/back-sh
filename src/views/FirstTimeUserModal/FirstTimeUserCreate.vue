<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="create-product flex-column d-flex h-100vh">
        <v-card class="ma-5 br--12 pb-15 flex-grow-1" height="600">
          <div class="text-center py-5 t16">افزودن مودال</div>
          <v-divider/>
          <v-form
              ref="form"
              class="create-product__info-form scroller"
              v-model="valid">
            <v-row justify="start" align="center" class=" mb-5">
              <v-col cols="6">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">عنوان مودال</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>

                <v-text-field
                    v-model="form.name"
                    placeholder="عنوان مودال را وارد نمایید"
                    variant="outlined"
                    :rules="titleRule"
                    :counter="200"
                    rounded="lg"/>
              </v-col>

              <v-col cols="6">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">کد تخفیف نظیر به نظیر</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>

                <v-autocomplete
                    v-model="form.voucher_id"
                    variant="outlined"
                    prepend-inner-icon-cb="mdi-map-marker"
                    rounded="lg"
                    :items="voucherList"
                    :rules="DiscountCodeRule"
                    item-title="name"
                    item-value="id"
                    v-debounce="searchVoucher"/>
              </v-col>

              <v-col cols="12">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">توضیحات</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>
                <v-text-field
                    v-model="form.content"
                    placeholder="توضیحات را وارد نمایید"
                    :rules="contentRule"
                    density="compact"
                    variant="outlined"
                    single-line/>
              </v-col>

              <v-col cols="12">
                <div class="text-right my-5">
                   <span class="t14 w500 text-gray600">تصویر</span>
                   <span class="t14 w500 text-scanError">*</span>
                </div>
                <UploadFileSection @getImage="getImage" acceptFile="image/png"/>
                <div class="t10 text-gray500 mt-2">کاربر عزیز فرمت عکس باید Png باشد </div>
                <div class="d-flex align-center mt-5" v-if="form.image">
                  <span>IMG-{{ form.image }}</span>
                  <span class="mr-15">
                    <v-icon
                        @click="removeItem(form.image)"
                        icon="mdi-delete"
                        color="error"/>
                  </span>
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
            @successAction="confirmed()"
            @cancelAction="closeModal()"
            @closeModal="closeModal()">
          <template v-slot:modalBody>
            <div class="text-center d--rtl">{{errorMsg}}</div>
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
import axios from "axios";

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
      titleRule: [
        v => !!v || 'کاربر عزیز عنوان مودال نمیتواند خالی باشد',
        v => (v.length <= 200) || 'کاربر عزیز عنوان مودال نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد' ],
      contentRule: [v => !!v || 'این فیلد الزامی است'],
      DiscountCodeRule: [v => !!v || 'کاربر عزیز کد تخفیف گروهی انتخاب نکردین'],
      imageId:null,

      form:{
        name:'',
        voucher_id:'',
        content:'',
        image:''
      },
      vouchersList: [],
      errorMsg: ''
    }
  },

  computed: {
    confirmModal(){
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    voucherList() {
      try {
        let voucher = []
        this.vouchersList.forEach(item => {
          const form = {
            name: item.name + '(' + item.id + ')',
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

    removeItem(id) {
      this.imageId = id;
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' +  id, true)
    },

    async searchVoucher(e) {
      const filter = {
        per_page: 10,
        name: e,
        is_active: 1,
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = filter
      AxiosMethod.end_point = 'page/modal/vouchers/'
      let data = await AxiosMethod.axios_get()
      if (data) {
        console.log( data.data.data)
        this.vouchersList = data.data.data
      }
    },

    validate() {
      if (!this.form.image) {
        openToast(this.$store, 'حتما باید عکس اضافه کنید', 'error');
        return;
      }
      this.$refs.form.validate();

      if (!this.valid) {
        return;
      }

      this.$refs.form.validate();

      if (this.valid) {
        this.createFirstTimeUserModal();
      }
    },

    async confirmed() {
        this.loading = true;
        let formData = new FormData();
        const AxiosMethod = new AxiosCall();
        AxiosMethod.end_point = 'page/modal/crud/create?accept';

        formData.append('name', this.form.name);
        formData.append('voucher_id', this.form.voucher_id);
        formData.append('content', this.form.content);
        formData.append('image_id', this.form.image);

        AxiosMethod.form = formData;
        AxiosMethod.store = this.$store;
        AxiosMethod.using_auth = true;
        AxiosMethod.token = this.$cookies.get('adminToken');
        AxiosMethod.toast_error = true;

        let data = await AxiosMethod.axios_post();
        if (data) {
          this.loading = false
          this.$refs.modal.dialog = false
          this.$router.push('/first-time-user/index')
        }
    },

    async createFirstTimeUserModal() {
      this.loading = true

      let formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('voucher_id', this.form.voucher_id);
      formData.append('content', this.form.content);
      formData.append('image_id', this.form.image);

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASEURL}/v1/page/modal/crud/create`,
            formData, {
              headers: {
                Authorization: "Bearer " + this.$cookies.get('adminToken'),
                'Content-Type': 'multipart/form-data'
              }
            })
        this.errorMsg = res.data.message
        if (res.status === 202) {
          this.loading = false
          this.$refs.modal.dialog = true
        }

        else {
          this.loading = false
          this.$router.push('/first-time-user/index')
        }

      } catch (err) {}
      finally {
        this.loading = false;
      }
    },

    closeModal(){
      this.$refs.modal.dialog = false
    }
  },

  watch:{
    confirmModal(val){
      if (!val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          this.form.image = ''
          localStorage.removeItem('deleteObject')
        }
      }
    },
  }
}
</script>
